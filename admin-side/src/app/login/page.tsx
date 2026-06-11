'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Admin login. POSTs to /api/auth/login which sets an httpOnly `admin_token`
// cookie; the middleware then lets the dashboard through.
export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const d = await res.json().catch(() => ({}));
                throw new Error(d.error || 'Login failed');
            }
            router.replace('/');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 30%, #15151f, #08080c)', padding: 24,
            fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
            <form onSubmit={submit} style={{
                width: '100%', maxWidth: 360, background: 'rgba(255,255,255,0.04)',
                border: '1px solid #2a2a35', borderRadius: 18, padding: 32,
                display: 'flex', flexDirection: 'column', gap: 16,
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#d4af37', fontWeight: 800, letterSpacing: 4, fontSize: 18 }}>VIP UZBE</div>
                    <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>Admin Panel</div>
                </div>
                <input
                    type="email" placeholder="admin@vipuzbe.com" value={email} autoComplete="username"
                    onChange={(e) => setEmail(e.target.value)} required
                    style={inputStyle}
                />
                <input
                    type="password" placeholder="Password" value={password} autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)} required
                    style={inputStyle}
                />
                {error && <div style={{ color: '#ff6b6b', fontSize: 13 }}>{error}</div>}
                <button type="submit" disabled={loading} style={{
                    padding: '12px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: '#d4af37', color: '#08080c', fontWeight: 700, fontSize: 15,
                    opacity: loading ? 0.6 : 1,
                }}>
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    padding: '12px 14px', borderRadius: 10, border: '1px solid #2a2a35',
    background: 'rgba(255,255,255,0.04)', color: '#eee', fontSize: 14, outline: 'none',
};
