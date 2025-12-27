"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import AuthService from "../services/AuthService";

export default function Login() {
    const { dict } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const auth = AuthService.getInstance();
            await auth.loginWithEmail(email, password);
            router.push("/profile");
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const auth = AuthService.getInstance();
            await auth.loginWithGoogle();
            router.push("/profile");
        } catch (err) {
            setError("Google login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleAppleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const auth = AuthService.getInstance();
            await auth.loginWithApple();
            router.push("/profile");
        } catch (err) {
            setError("Apple login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.authWrapper}>
                <div className={styles.glassCard}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{dict.nav.login}</h1>
                        <p className={styles.subtitle}>Welcome back to the pinnacle of Tashkent luxury.</p>
                    </div>

                    {error && (
                        <div className={styles.errorBox}>
                            {error}
                        </div>
                    )}

                    <form className={styles.form} onSubmit={handleEmailLogin}>
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

                        <Button
                            variant="primary"
                            size="lg"
                            className={styles.submitBtn}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : dict.nav.login}
                        </Button>
                    </form>

                    <div className={styles.divider}>
                        <span>Or continue with</span>
                    </div>

                    <div className={styles.socialAuth}>
                        <button
                            className={styles.socialBtn}
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            type="button"
                        >
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                            Google
                        </button>
                        <button
                            className={styles.socialBtn}
                            onClick={handleAppleLogin}
                            disabled={loading}
                            type="button"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                            Apple
                        </button>
                    </div>

                    <p className={styles.switchAuth}>
                        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
