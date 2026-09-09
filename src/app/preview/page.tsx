'use client';

import { useState } from 'react';

// iPhone-ramkali preview sahifasi.
// Appning o'zini (`/`) iframe orqali iPhone korpusi ichida ko'rsatadi —
// VS Code Simple Browser'da ochilganda haqiqiy iOS telefonga o'xshaydi.
export default function PreviewPage() {
    const devices = {
        'iPhone 15 Pro': { w: 393, h: 852, island: true },
        'iPhone SE': { w: 375, h: 667, island: false },
        'iPhone 15 Pro Max': { w: 430, h: 932, island: true },
    } as const;

    const [device, setDevice] = useState<keyof typeof devices>('iPhone 15 Pro');
    const [path, setPath] = useState('/');
    const d = devices[device];

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: 'radial-gradient(circle at 50% 30%, #15151f 0%, #08080c 70%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                padding: 24,
                overflow: 'auto',
                fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
        >
            {/* Boshqaruv panel */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                {Object.keys(devices).map((name) => (
                    <button
                        key={name}
                        onClick={() => setDevice(name as keyof typeof devices)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 999,
                            border: device === name ? '1px solid #d4af37' : '1px solid #2a2a35',
                            background: device === name ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
                            color: device === name ? '#d4af37' : '#aaa',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        {name}
                    </button>
                ))}
                <input
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    placeholder="/booking, /profile ..."
                    style={{
                        padding: '8px 14px',
                        borderRadius: 999,
                        border: '1px solid #2a2a35',
                        background: 'rgba(255,255,255,0.04)',
                        color: '#eee',
                        fontSize: 13,
                        width: 180,
                        outline: 'none',
                    }}
                />
            </div>

            {/* iPhone korpusi */}
            <div
                style={{
                    position: 'relative',
                    width: d.w + 24,
                    height: d.h + 24,
                    borderRadius: 60,
                    background: 'linear-gradient(145deg, #2a2a32, #0d0d12)',
                    padding: 12,
                    boxShadow: '0 40px 120px rgba(0,0,0,0.7), inset 0 0 2px rgba(255,255,255,0.3)',
                    maxHeight: '85vh',
                }}
            >
                {/* Ekran */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: 48,
                        overflow: 'hidden',
                        background: '#000',
                    }}
                >
                    {/* Dynamic Island / notch */}
                    {d.island && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 12,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 120,
                                height: 34,
                                background: '#000',
                                borderRadius: 999,
                                zIndex: 10,
                            }}
                        />
                    )}
                    <iframe
                        src={path}
                        title="VIP UZBE preview"
                        style={{ width: '100%', height: '100%', border: 'none', background: '#08080c' }}
                    />
                </div>
            </div>

            <p style={{ color: '#666', fontSize: 12 }}>
                VIP UZBE · {device} · {d.w}×{d.h}
            </p>
        </div>
    );
}
