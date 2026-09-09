// VIP UZBE service worker — offline support + smart caching.
// Bump CACHE_VERSION to invalidate old caches on the next visit.
const CACHE_VERSION = 'vipuzbe-v1';
const APP_SHELL = `${CACHE_VERSION}-shell`;
const RUNTIME = `${CACHE_VERSION}-runtime`;

// Minimal shell precached so the app opens even with no network.
const PRECACHE_URLS = ['/', '/offline', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(APP_SHELL)
            .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((k) => !k.startsWith(CACHE_VERSION))
                        .map((k) => caches.delete(k))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // Never cache APIs (bookings, stats) or the SSE stream — always live.
    if (url.pathname.startsWith('/api/')) return;

    // HTML navigations: network-first, fall back to cache, then offline page.
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(RUNTIME).then((c) => c.put(request, copy));
                    return res;
                })
                .catch(() =>
                    caches.match(request).then((cached) => cached || caches.match('/offline'))
                )
        );
        return;
    }

    // Static assets (_next/static, icons, images): stale-while-revalidate.
    event.respondWith(
        caches.match(request).then((cached) => {
            const network = fetch(request)
                .then((res) => {
                    if (res && res.status === 200) {
                        const copy = res.clone();
                        caches.open(RUNTIME).then((c) => c.put(request, copy));
                    }
                    return res;
                })
                .catch(() => cached);
            return cached || network;
        })
    );
});
