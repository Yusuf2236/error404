import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Offline',
    robots: 'noindex',
};

export default function OfflinePage() {
    return (
        <main
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                background: 'radial-gradient(120% 100% at 50% 30%, #1a1a24 0%, #08080c 100%)',
                color: '#e8e0c8',
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-192.png" alt="VIP UZBE" width={96} height={96} style={{ borderRadius: 20 }} />
            <h1 style={{ marginTop: '1.5rem', fontFamily: 'Georgia, serif', color: '#f5d061', letterSpacing: 2 }}>
                You&apos;re offline
            </h1>
            <p style={{ maxWidth: 360, opacity: 0.8, lineHeight: 1.6 }}>
                We couldn&apos;t reach VIP UZBE right now. Please check your connection — the app will
                reconnect automatically.
            </p>
        </main>
    );
}
