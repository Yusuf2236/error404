import fs from 'fs';
import { DB_PATH } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Connection caps so an attacker can't exhaust file descriptors / memory by
// opening thousands of EventSource connections. (This route is also gated by the
// admin middleware, so only authenticated admins reach it.)
const MAX_TOTAL = 100;
const MAX_PER_IP = 5;
let totalConnections = 0;
const perIp = new Map<string, number>();

function clientIp(request: Request) {
    return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') || '127.0.0.1';
}

// Server-Sent Events stream for the admin panel. Watches the SAME shared
// bookings.json as the customer site, so a booking made by a guest pushes an
// "update" event here instantly. Connected admin screens then re-fetch bookings
// and stats — no manual refresh needed.
export async function GET(request: Request) {
    const ip = clientIp(request);
    if (totalConnections >= MAX_TOTAL || (perIp.get(ip) || 0) >= MAX_PER_IP) {
        return new Response('Too many connections', { status: 503, headers: { 'Retry-After': '30' } });
    }
    totalConnections++;
    perIp.set(ip, (perIp.get(ip) || 0) + 1);
    let released = false;
    const release = () => {
        if (released) return;
        released = true;
        totalConnections = Math.max(0, totalConnections - 1);
        const n = (perIp.get(ip) || 1) - 1;
        if (n <= 0) perIp.delete(ip); else perIp.set(ip, n);
    };

    const encoder = new TextEncoder();
    let watcher: fs.FSWatcher | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let debounce: ReturnType<typeof setTimeout> | null = null;

    const stream = new ReadableStream({
        start(controller) {
            const send = (event: string, data: unknown) => {
                try {
                    controller.enqueue(
                        encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
                    );
                } catch {
                    // controller already closed
                }
            };

            send('connected', { ok: true });

            try {
                watcher = fs.watch(DB_PATH, () => {
                    if (debounce) clearTimeout(debounce);
                    debounce = setTimeout(() => send('update', { at: new Date().toISOString() }), 120);
                });
            } catch {
                // File may not exist yet; clients still get heartbeats.
            }

            heartbeat = setInterval(() => {
                try {
                    controller.enqueue(encoder.encode(`: ping\n\n`));
                } catch {
                    // ignore
                }
            }, 25000);
        },
        cancel() {
            if (watcher) watcher.close();
            if (heartbeat) clearInterval(heartbeat);
            if (debounce) clearTimeout(debounce);
            release();
        },
    });

    request.signal.addEventListener('abort', () => {
        if (watcher) watcher.close();
        if (heartbeat) clearInterval(heartbeat);
        if (debounce) clearTimeout(debounce);
        release();
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
        },
    });
}
