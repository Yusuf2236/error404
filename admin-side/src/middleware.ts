import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Fail closed: if the signing secret is missing we must NOT fall back to a
// publicly-known string (that would let anyone forge admin tokens).
const RAW_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = RAW_SECRET ? new TextEncoder().encode(RAW_SECRET) : null;

// In-memory per-IP rate limiter. NOTE: on multi-instance/serverless deploys this
// is per-instance only — put a shared store (Redis/Upstash) or an edge WAF
// (Cloudflare / Vercel) in front for real DDoS protection.
const ipMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 120;          // general requests / minute / IP
const LOGIN_LIMIT = 10;          // login attempts / minute / IP (brute-force guard)
const WINDOW_MS = 60 * 1000;

const loginMap = new Map<string, { count: number; lastReset: number }>();

const BLOCKED_AGENTS = ['python-requests', 'sqlmap', 'nikto', 'nmap', 'burp', 'metasploit'];

function hit(map: Map<string, { count: number; lastReset: number }>, ip: string, limit: number) {
    const now = Date.now();
    const d = map.get(ip) || { count: 0, lastReset: now };
    if (now - d.lastReset > WINDOW_MS) {
        d.count = 0;
        d.lastReset = now;
    }
    d.count++;
    map.set(ip, d);
    return d.count > limit;
}

async function isValidAdmin(token: string | undefined) {
    if (!token || !JWT_SECRET) return false;
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload.role === 'admin';
    } catch {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1';
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
    const path = request.nextUrl.pathname;

    // Block obvious scanners.
    if (BLOCKED_AGENTS.some((a) => userAgent.includes(a))) {
        return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
    }

    // General rate limit.
    if (hit(ipMap, ip, RATE_LIMIT)) {
        return NextResponse.json({ error: 'Too Many Requests' }, {
            status: 429,
            headers: { 'Retry-After': '60' },
        });
    }

    // --- Public endpoints: the login API (rate-limited harder) ---
    if (path === '/api/auth/login') {
        if (request.method === 'POST' && hit(loginMap, ip, LOGIN_LIMIT)) {
            return NextResponse.json({ error: 'Too many login attempts. Try again later.' }, {
                status: 429,
                headers: { 'Retry-After': '60' },
            });
        }
        return NextResponse.next();
    }

    // The login page itself is public.
    if (path === '/login') return NextResponse.next();

    const admin = await isValidAdmin(request.cookies.get('admin_token')?.value);

    // Protect every API route (bookings, stats, events/SSE, payments) — these
    // expose customer PII and must require a valid admin token.
    if (path.startsWith('/api/')) {
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized: admin token required' }, { status: 401 });
        }
        return NextResponse.next();
    }

    // Protect every admin page — redirect unauthenticated visitors to login.
    if (!admin) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Run on everything except Next internals and static assets.
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
