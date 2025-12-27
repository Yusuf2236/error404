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

                    <div className={styles.section}>
                        <h2>Welcome to VIP UZBE</h2>
                        <p>Your account has been successfully created. You can now enjoy exclusive access to our premium services.</p>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.icon}>🏨</span>
                            <h3>Room Booking</h3>
                            <p>Access to all luxury suites</p>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.icon}>🎯</span>
                            <h3>VIP Concierge</h3>
                            <p>24/7 personal assistance</p>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.icon}>✨</span>
                            <h3>Exclusive Offers</h3>
                            <p>Special member discounts</p>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button variant="primary" size="lg" onClick={() => router.push("/rooms")}>
                            Browse Rooms
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
