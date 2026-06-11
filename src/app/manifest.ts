import type { MetadataRoute } from 'next';

// Generates /manifest.webmanifest — the install descriptor that turns the site
// into an installable PWA on phones and desktops.
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'VIP UZBE — Elite Luxury Hotel',
        short_name: 'VIP UZBE',
        description:
            'Book elite themed suites and 24/7 VIP concierge at VIP UZBE, the pinnacle of Tashkent luxury hospitality.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#08080c',
        theme_color: '#0b0b10',
        lang: 'en',
        categories: ['travel', 'lifestyle', 'business'],
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
            { name: 'Rooms & Suites', short_name: 'Rooms', url: '/rooms' },
            { name: 'Book Now', short_name: 'Book', url: '/booking' },
            { name: 'Contact', short_name: 'Contact', url: '/contact' },
        ],
    };
}
