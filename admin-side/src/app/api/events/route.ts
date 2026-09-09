import fs from 'fs';
import { DB_PATH } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Server-Sent Events stream for the admin panel. Watches the SAME shared
// bookings.json as the customer site, so a booking made by a guest pushes an
// "update" event here instantly. Connected admin screens then re-fetch bookings
// and stats — no manual refresh needed.
export async function GET(request: Request) {
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
        },
    });

    request.signal.addEventListener('abort', () => {
        if (watcher) watcher.close();
        if (heartbeat) clearInterval(heartbeat);
        if (debounce) clearTimeout(debounce);
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
        },
    });
}
