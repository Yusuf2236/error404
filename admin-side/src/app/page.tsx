"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useTranslation } from "@/lib/LanguageContext";

export default function AdminDashboard() {
    const { t } = useTranslation();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/stats', { cache: 'no-store' });
            const data = await response.json();
            setStats(data);
        } catch (err) {
            console.error("Failed to fetch stats", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStats();

        // Live dashboard: any booking change (new reservation, status update,
        // cancellation) pushes an SSE "update" → revenue and counters refresh live.
        const events = new EventSource('/api/events');
        events.addEventListener('update', () => fetchStats());

        return () => events.close();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchStats();
    };

    if (loading) return <div className={styles.loading}>{t('loadingIntelligence')}...</div>;
    if (!stats) return <div className={styles.loading}>{t('failedToLoad')}</div>;

    // Calculate mock occupancy rate based on active bookings vs mock total rooms (20)
    const occupancyRate = Math.round((stats.activeBookings / 20) * 100);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{ margin: 0, fontSize: '2.25rem', fontWeight: 800 }}>{t('executiveDashboard')}</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={handleRefresh}
                        className={styles.refreshBtn}
                        style={{
                            textDecoration: 'none',
                            color: '#ffd700',
                            fontWeight: 600,
                            cursor: 'pointer',
                            opacity: refreshing ? 0.6 : 1,
                            pointerEvents: refreshing ? 'none' : 'auto'
                        }}
                    >
                        🔄 {refreshing ? t('loadingIntelligence') : t('refreshIntelligence')}
                    </button>
                </div>
            </div>

            <div className={styles.quickActions}>
                <button className={styles.actionBtn}>➕ {t('newReserve')}</button>
                <button className={styles.actionBtn}>📄 {t('exportIntelligence')}</button>
                <button className={styles.actionBtn}>🛠️ {t('systemDiagnostics')}</button>
                <button className={styles.actionBtn}>✉️ {t('sendDailyBrief')}</button>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statInfo}>
                        <p>{t('totalRevenue')}</p>
                        <h3>${stats.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className={styles.statGrowth}>+12.5%</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📅</div>
                    <div className={styles.statInfo}>
                        <p>{t('activeBookings')}</p>
                        <h3>{stats.activeBookings}</h3>
                    </div>
                    <div className={styles.statGrowth}>+5%</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🏨</div>
                    <div className={styles.statInfo}>
                        <p>{t('occupancyRate')}</p>
                        <h3>{occupancyRate}%</h3>
                    </div>
                    <div className={styles.statGrowth}>{t('high')}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⏳</div>
                    <div className={styles.statInfo}>
                        <p>{t('pendingRequests')}</p>
                        <h3>{stats.pendingBookings}</h3>
                    </div>
                    <div className={styles.statAlert}>{stats.pendingBookings > 0 ? t('actionNeeded') : t('allClear')}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className={styles.section}>
                    <h2>{t('residencyPerformance')} {t('weekly')}</h2>
                    <div className={styles.placeholderChart}>
                        {[85, 65, 75, 90, 95, 80, 70].map((h, i) => (
                            <div key={i} className={styles.barWrapper}>
                                <div className={styles.bar} style={{ height: `${h}%` }}>
                                    <span className={styles.barValue}>{h}%</span>
                                </div>
                                <h3>{[t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')][i]}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>{t('executiveIntelligenceMix')}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {Object.entries(stats.paymentMethods).map(([method, amount]) => (
                            <div key={method} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{t(method.toLowerCase() as any)}</span>
                                <span style={{ color: '#ffd700' }}>${(amount as number).toLocaleString()}</span>
                            </div>
                        ))}
                        {Object.keys(stats.paymentMethods).length === 0 && (
                            <p style={{ color: '#64748b', textAlign: 'center', marginTop: '2rem' }}>{t('noPaymentData')}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>{t('liveOperationalActivity')}</h2>
                <div className={styles.activityFeed}>
                    <div className={styles.activityItem}>
                        <div className={styles.activityDot} style={{ background: '#10b981' }}></div>
                        <div className={styles.activityContent}>
                            <p><strong>{t('platinumPanoramaSuite')}</strong> {t('wasFinalizedToPaidStatus')}</p>
                            <span>{t('twoMinsAgo')} • {t('system')}</span>
                        </div>
                    </div>
                    <div className={styles.activityItem}>
                        <div className={styles.activityDot} style={{ background: '#3b82f6' }}></div>
                        <div className={styles.activityContent}>
                            <p>{t('newIntelligence')}: <strong>BK-9421</strong> {t('receivedFrom')} John Smith</p>
                            <span>15 {t('minsAgo' as any)} • {t('webPortal')}</span>
                        </div>
                    </div>
                    <div className={styles.activityItem}>
                        <div className={styles.activityDot} style={{ background: '#f59e0b' }}></div>
                        <div className={styles.activityContent}>
                            <p>{t('staffAssigned')}: <strong>Jamshid</strong> {t('biriktirildi')} (Amir Temur Heritage)</p>
                            <span>1 {t('hourAgo' as any)} • {t('adminAction')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
