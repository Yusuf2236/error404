"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Button from "../components/Button";
import AuthService, { User } from "../services/AuthService";

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [copiedCoupon, setCopiedCoupon] = useState(false);

    useEffect(() => {
        const auth = AuthService.getInstance();
        const currentUser = auth.getUser();

        if (!currentUser) {
            router.push("/login");
        } else {
            setUser(currentUser);
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        const auth = AuthService.getInstance();
        auth.logout();
        router.push("/");
    };

    const copyCouponCode = () => {
        navigator.clipboard.writeText("WELCOME30");
        setCopiedCoupon(true);
        setTimeout(() => setCopiedCoupon(false), 2000);
    };

    if (loading) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.profileCard}>
                    <div className={styles.header}>
                        <img src={user.avatar} alt={user.name} className={styles.avatar} />
                        <h1 className={styles.name}>{user.name}</h1>
                        <p className={styles.email}>{user.email}</p>
                        <span className={styles.badge}>
                            {user.provider === 'google' && '🔵 Google'}
                            {user.provider === 'apple' && '🍎 Apple'}
                            {user.provider === 'email' && '📧 Email'}
                        </span>
                    </div>

                    {/* Welcome Discount Banner */}
                    <div className={styles.discountBanner}>
                        <div className={styles.discountContent}>
                            <span className={styles.discountIcon}>🎉</span>
                            <div className={styles.discountText}>
                                <h3>Welcome Gift: 30% OFF</h3>
                                <p>Your exclusive first booking discount</p>
                            </div>
                        </div>
                        <div className={styles.couponBox}>
                            <code className={styles.couponCode}>WELCOME30</code>
                            <button
                                className={styles.copyBtn}
                                onClick={copyCouponCode}
                            >
                                {copiedCoupon ? '✓ Copied!' : '📋 Copy'}
                            </button>
                        </div>
                    </div>

                    {/* Personal Dashboard */}
                    <div className={styles.dashboard}>
                        <h2 className={styles.sectionTitle}>Your Dashboard</h2>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <span className={styles.statIcon}>🏨</span>
                                <div className={styles.statInfo}>
                                    <h4>Total Bookings</h4>
                                    <p className={styles.statValue}>0</p>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statIcon}>💰</span>
                                <div className={styles.statInfo}>
                                    <h4>Total Spent</h4>
                                    <p className={styles.statValue}>$0</p>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statIcon}>⭐</span>
                                <div className={styles.statInfo}>
                                    <h4>VIP Points</h4>
                                    <p className={styles.statValue}>100</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VIP Benefits */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>VIP Member Benefits</h2>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span className={styles.icon}>🏨</span>
                                <h3>Priority Booking</h3>
                                <p>Access to all luxury suites</p>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.icon}>🎯</span>
                                <h3>24/7 Concierge</h3>
                                <p>Personal assistance anytime</p>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.icon}>✨</span>
                                <h3>Exclusive Offers</h3>
                                <p>Special member discounts</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={styles.actions}>
                        <Button variant="primary" size="lg" onClick={() => router.push("/rooms")}>
                            Browse Rooms
                        </Button>
                        <Button variant="secondary" size="lg" onClick={() => router.push("/booking")}>
                            Book Now
                        </Button>
                        <Button variant="secondary" size="lg" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
