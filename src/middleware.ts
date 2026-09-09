import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Fail closed: never fall back to a publicly-known secret — that would let
// anyone forge an admin token. If JWT_SECRET is unset, verification fails.
const RAW_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = RAW_SECRET ? new TextEncoder().encode(RAW_SECRET) : null;

// In-memory rate limiting store (Note: In a distributed system, use Redis /
// Upstash, or an edge WAF like Cloudflare/Vercel, for real DDoS protection —
// this per-instance map does not survive serverless scale-out).
const ipMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 200;          // general requests / min / IP
const WINDOW_MS = 60 * 1000;

// Tighter limits on sensitive endpoints to blunt brute-force and PII scraping.
const sensitiveMap = new Map<string, { count: number; lastReset: number }>();
const LOGIN_LIMIT = 10;          // admin login attempts / min / IP
const BOOKING_LIMIT = 15;        // booking creations / min / IP
const MINE_LIMIT = 30;           // "my bookings" lookups / min / IP — NAT-tolerant but still blocks bulk scraping

function tooMany(map: Map<string, { count: number; lastReset: number }>, key: string, limit: number) {
    const now = Date.now();
    const d = map.get(key) || { count: 0, lastReset: now };
    if (now - d.lastReset > WINDOW_MS) {
        d.count = 0;
        d.lastReset = now;
    }
    d.count++;
    map.set(key, d);
    return d.count > limit;
}

const BLOCKED_AGENTS = [
    'python-requests', 'sqlmap', 'nikto', 'nmap', 'burp', 'metasploit'
];

const BLOCKED_PATHS = [
    '.env', '.git', 'wp-admin', 'wp-login', 'phpinfo', '.DS_Store', 'wallet', 'backup'
];

async function verifyToken(token: string) {
    if (!JWT_SECRET) return null; // fail closed when no secret is configured
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (e) {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        '127.0.0.1';
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
    const path = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams.toString();

    // 1. BLOCK BAD BOTS
    if (BLOCKED_AGENTS.some(agent => userAgent.includes(agent))) {
        return new NextResponse(JSON.stringify({ error: 'Access Denied: Suspicious Client Detected' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // 2. RATE LIMITING
    const now = Date.now();
    const clientData = ipMap.get(ip) || { count: 0, lastReset: now };

    if (now - clientData.lastReset > WINDOW_MS) {
        clientData.count = 0;
        clientData.lastReset = now;
    }

    clientData.count++;
    ipMap.set(ip, clientData);

    if (clientData.count > RATE_LIMIT) {
        return new NextResponse(JSON.stringify({ error: 'Too Many Requests' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
        });
    }

    // 2b. PER-ENDPOINT LIMITS (brute-force + PII-scraping defence)
    if (path.startsWith('/api/auth') && request.method === 'POST' && tooMany(sensitiveMap, `login:${ip}`, LOGIN_LIMIT)) {
        return new NextResponse(JSON.stringify({ error: 'Too many attempts. Try again later.' }), {
            status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
        });
    }
    if (path === '/api/bookings' && request.method === 'POST' && tooMany(sensitiveMap, `book:${ip}`, BOOKING_LIMIT)) {
        return new NextResponse(JSON.stringify({ error: 'Too many bookings. Slow down.' }), {
            status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
        });
    }
    if (path.startsWith('/api/bookings/mine') && tooMany(sensitiveMap, `mine:${ip}`, MINE_LIMIT)) {
        return new NextResponse(JSON.stringify({ error: 'Too many requests.' }), {
            status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
        });
    }

    // 3. PATH PROTECTION
    if (BLOCKED_PATHS.some(blocked => path.includes(blocked))) {
        return new NextResponse(JSON.stringify({ error: 'Access Denied: Illegal Resource' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // 4. SQL INJECTION CHECK (Improved)
    const maliciousPatterns = [
        /('|"|;|UNION|SELECT|DROP|INSERT|DELETE|UPDATE)/i,
        /(--|#|\/\*|\*\/)/,
        /SLEEP\(.*\)/i,
        /HEX\(.*\)/i
    ];

    if (maliciousPatterns.some(pattern => decodeURIComponent(searchParams).match(pattern))) {
        return new NextResponse(JSON.stringify({ error: 'Access Denied: Malicious Payload Detected' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // 5. ADMIN & API PROTECTION (HARDENED)
    if (path.startsWith('/admin')) {
        const adminToken = request.cookies.get('admin_token')?.value;

        if (!adminToken || !(await verifyToken(adminToken))) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (path.startsWith('/api/bookings') && !path.startsWith('/api/bookings/mine')) {
        // Allow CORS preflight (OPTIONS) and guest booking creation (POST) without a token.
        // The guest-facing /api/bookings/mine endpoint is exempt (filters by own email).
        if (request.method !== 'POST' && request.method !== 'OPTIONS') {
            const adminToken = request.cookies.get('admin_token')?.value;
            if (!adminToken || !(await verifyToken(adminToken))) {
                return NextResponse.json(
                    { error: 'Unauthorized: Valid Admin token required' },
                    { status: 401 }
                );
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
