import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-for-dev-only-do-not-use-in-prod'
);

// In-memory rate limiting store (Note: In a distributed system, use Redis)
const ipMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 200;
const WINDOW_MS = 60 * 1000;

const BLOCKED_AGENTS = [
    'python-requests', 'sqlmap', 'nikto', 'nmap', 'burp', 'metasploit'
];

const BLOCKED_PATHS = [
    '.env', '.git', 'wp-admin', 'wp-login', 'phpinfo', '.DS_Store', 'wallet', 'backup'
];

async function verifyToken(token: string) {
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

    if (path.startsWith('/api/bookings')) {
        if (request.method !== 'POST') {
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
