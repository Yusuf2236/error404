import fs from 'fs';
import { DB_PATH } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Connection caps so an attacker can't exhaust file descriptors / memory by
// opening thousands of EventSource connections (each holds an fs.watch + timer).
const MAX_TOTAL = 200;          // total concurrent SSE streams — the real DoS ceiling
// NAT-friendly: mobile carriers put many real users behind one IP, so the
// per-IP cap is generous. The global MAX_TOTAL is what actually bounds resources.
const MAX_PER_IP = 50;          // concurrent SSE streams per client IP
let totalConnections = 0;
const perIp = new Map<string, number>();

function clientIp(request: Request) {
    return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
        request.headers.get('x-real-ip') || '127.0.0.1';
}

// Server-Sent Events stream. Watches the shared bookings.json and pushes an
// "update" event to every connected client whenever the file changes — including
// changes written by the *other* app (admin panel). Clients react by re-fetching.
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

            // Tell the client we're live so it can run an initial fetch.
            send('connected', { ok: true });

            try {
                watcher = fs.watch(DB_PATH, () => {
                    if (debounce) clearTimeout(debounce);
                    // Debounce: a single writeFileSync can emit several events.
                    debounce = setTimeout(() => send('update', { at: new Date().toISOString() }), 120);
                });
            } catch {
                // File may not exist yet; clients still get heartbeats.
            }

            // Keep the connection alive through proxies/timeouts.
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

    // Clean up when the client disconnects.
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
