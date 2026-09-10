"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import { Booking } from "@/lib/db";
import { useTranslation } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function AdminBookings() {
    const { t } = useTranslation();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchBookings = useCallback(async () => {
        try {
            const response = await fetch('/api/bookings', { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;
        fetch('/api/bookings', { cache: 'no-store' })
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                if (active) {
                    setBookings(data);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Failed to fetch bookings", error);
                if (active) setLoading(false);
            });

        // Live bookings: a guest reserves on the public site → the shared DB file
        // changes → SSE pushes "update" → the list refreshes with no manual reload.
        const events = new EventSource('/api/events');
        events.addEventListener('update', () => {
            void fetchBookings();
        });

        return () => {
            active = false;
            events.close();
        };
    }, [fetchBookings]);

    const filteredBookings = bookings
        .filter(b => {
            const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const updateStatus = async (id: string, status: Booking['status']) => {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                fetchBookings(); // Refresh list
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const assignStaff = async (id: string, staff: string) => {
        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ assignedStaff: staff }),
            });

            if (response.ok) {
                fetchBookings();
            }
        } catch (error) {
            console.error("Failed to assign staff", error);
        }
    };

    if (loading) return <div>{t('loadingIntelligence')}...</div>;

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('bookingsIntelligence')}</h1>
            </div>

            <div className={styles.filterBar}>
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className={styles.filterSelect}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">{t('allStatuses')}</option>
                    <option value="pending">{t('pending') || 'Pending'}</option>
                    <option value="confirmed">{t('confirmed') || 'Confirmed'}</option>
                    <option value="paid">{t('paid') || 'Paid'}</option>
                    <option value="cancelled">{t('cancelled') || 'Cancelled'}</option>
                </select>
                <div className={styles.statsBadge}>
                    <span>{t('results')}: {filteredBookings.length}</span>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>{t('identity')}</th>
                                <th>{t('distinguishedGuest')}</th>
                                <th>{t('residency')}</th>
                                <th>{t('duration')}</th>
                                <th>{t('investment')}</th>
                                <th>{t('staff')}</th>
                                <th>{t('status')}</th>
                                <th>{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td style={{ fontFamily: 'monospace', color: '#ffd700', fontSize: '0.8rem' }}>{booking.id}</td>
                                    <td>
                                        <div style={{ fontWeight: 700 }}>{booking.customerName}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{booking.email}</div>
                                    </td>
                                    <td>
                                        <div style={{ textTransform: 'capitalize', fontWeight: 600 }}>{t(booking.roomType.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) as keyof typeof translations['en']) || booking.roomType}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{booking.guests} {t('guests')}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{booking.checkIn}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>→ {booking.checkOut}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 700, color: '#f8fafc' }}>${booking.totalPrice?.toLocaleString()}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                                            {booking.paymentMethod ? `${t('via')} ${t(booking.paymentMethod.toLowerCase() as keyof typeof translations['en'])}` : '-'}
                                        </div>
                                    </td>
                                    <td>
                                        {booking.assignedStaff ? (
                                            <div className={styles.staffBadge}>👤 {booking.assignedStaff}</div>
                                        ) : (
                                            <button
                                                className={styles.staffBtn}
                                                onClick={() => assignStaff(booking.id, "Jamshid - Front Desk")}
                                                style={{ padding: '0.3rem 0.6rem', border: '1px dashed #ffd700', background: 'transparent', color: '#ffd700', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem' }}
                                            >
                                                {t('assignStaff')}
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`${styles.status} ${styles[booking.status]}`}>
                                            {t(booking.status as keyof typeof translations['en']) || booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'confirmed')}
                                                        className={`${styles.btn} ${styles.btnApprove}`}
                                                        title={t('verify')}
                                                    >
                                                        {t('verify')}
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'cancelled')}
                                                        className={`${styles.btn} ${styles.btnReject}`}
                                                        title={t('reject')}
                                                    >
                                                        {t('reject')}
                                                    </button>
                                                </>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'paid')}
                                                    className={`${styles.btn} ${styles.btnApprove}`}
                                                    style={{ background: '#10b981', color: '#fff' }}
                                                >
                                                    {t('finalizeToPaid')}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredBookings.length === 0 && (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: 'center', padding: '5rem', color: '#64748b' }}>
                                        {t('noReservesFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
