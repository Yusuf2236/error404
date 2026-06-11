"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import AuthService from "../services/AuthService";

export default function Signup() {
    const { dict } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await AuthService.getInstance().signup(name, email, password);
            router.push("/profile");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.authWrapper}>
                <div className={styles.glassCard}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{dict.nav.signup || "Sign Up"}</h1>
                        <p className={styles.subtitle}>Join our elite circle of global luxury travelers.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSignup}>
                        <div className={styles.inputGroup}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Iskandar Ahmedov"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="email@vipuzbe.com"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <Button variant="primary" size="lg" className={styles.submitBtn} disabled={loading}>
                            {loading ? "Creating Account..." : (dict.nav.signup || "Create Account")}
                        </Button>
                    </form>

                    <div className={styles.divider}>
                        <span>Or join via</span>
                    </div>

                    <div className={styles.socialAuth}>
                        <button type="button" className={styles.socialBtn}>
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                            Google
                        </button>
                        <button type="button" className={styles.socialBtn}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                            Apple
                        </button>
                    </div>

                    <p className={styles.switchAuth}>
                        Already a member? <Link href="/login">Login</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
