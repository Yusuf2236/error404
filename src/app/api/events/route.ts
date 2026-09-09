import fs from 'fs';
import { DB_PATH } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Server-Sent Events stream. Watches the shared bookings.json and pushes an
// "update" event to every connected client whenever the file changes — including
// changes written by the *other* app (admin panel). Clients react by re-fetching.
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
        },
    });

    // Clean up when the client disconnects.
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
