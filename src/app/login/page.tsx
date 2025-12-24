"use client";

import Link from "next/link";
import styles from "./page.module.css";
import Button from "../components/Button";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {
    const { dict } = useLanguage();

    return (
        <main className={styles.main}>
            <div className={styles.authWrapper}>
                <div className={styles.glassCard}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{dict.nav.login}</h1>
                        <p className={styles.subtitle}>Welcome back to the pinnacle of Tashkent luxury.</p>
                    </div>

                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input type="email" placeholder="email@vipuzbe.com" className={styles.input} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" className={styles.input} required />
                        </div>

                        <Button variant="primary" size="lg" className={styles.submitBtn}>
                            {dict.nav.login}
                        </Button>
                    </form>

                    <div className={styles.divider}>
                        <span>Or continue with</span>
                    </div>

                    <div className={styles.socialAuth}>
                        <button className={styles.socialBtn}>
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                            Google
                        </button>
                        <button className={styles.socialBtn}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                            Apple
                        </button>
                    </div>

                    <p className={styles.switchAuth}>
                        Don't have an account? <Link href="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
