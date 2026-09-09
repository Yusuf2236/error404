"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Booking } from "@/lib/db";

export default function AdminPayments() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings');
            if (response.ok) {
                const data = await response.json();
                // Filter only 'confirmed' or 'pending' bookings that need payment
                // We show 'confirmed' ones as ready for payment
                setBookings(data.filter((b: Booking) => b.status === 'confirmed'));
            }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const processPayment = async (id: string) => {
        if (!confirm("Confirm payment receipt?")) return;

        try {
            const response = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'paid' }),
            });

            if (response.ok) {
                fetchBookings(); // Refresh list to remove the paid item
                alert("Payment processed successfully!");
            }
        } catch (error) {
            console.error("Failed to process payment", error);
        }
    };

    if (loading) return <div>Loading payments...</div>;

    return (
        <div>
            <div className={styles.header}>
                <h1>Process Payments</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.paymentGrid}>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.amount}>
                                        ${booking.totalPrice?.toLocaleString()}
                                    </div>
                                    <span className={styles.bookingId}>{booking.id}</span>
                                </div>

                                <div className={styles.details}>
                                    <strong>{booking.customerName}</strong>
                                    <span>{booking.roomType.replace('-', ' ')}</span>
                                    <span>{booking.checkIn} - {booking.checkOut}</span>
                                    <span>{booking.guests} Guests</span>
                                </div>

                                <button
                                    className={styles.btnProcess}
                                    onClick={() => processPayment(booking.id)}
                                >
                                    💳 Mark as Paid
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <h3>No pending payments</h3>
                            <p>All confirmed bookings have been settled.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
