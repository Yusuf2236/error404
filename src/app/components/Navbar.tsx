"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, setLanguage, dict } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    VIP UZBE
                </Link>
                <ul className={styles.links}>
                    <li><Link href="/">{dict.nav.home}</Link></li>
                    <li><Link href="/rooms">{dict.nav.rooms}</Link></li>
                    <li><Link href="/offers">{dict.nav.offers}</Link></li>
                    <li><Link href="/services">{dict.nav.services}</Link></li>
                    <li><Link href="/gallery">{dict.nav.gallery}</Link></li>
                    <li><Link href="/blog">{dict.nav.blog}</Link></li>
                </ul>
                <div className={styles.navActions}>
                    <div className={styles.langSwitcher}>
                        <button
                            className={language === "uz" ? styles.activeLang : ""}
                            onClick={() => setLanguage("uz")}
                        >UZ</button>
                        <button
                            className={language === "ru" ? styles.activeLang : ""}
                            onClick={() => setLanguage("ru")}
                        >RU</button>
                        <button
                            className={language === "en" ? styles.activeLang : ""}
                            onClick={() => setLanguage("en")}
                        >EN</button>
                    </div>
                    <Link href="/login" className={styles.loginBtn}>{dict.nav.login}</Link>
                    <Link href="/booking" className={styles.bookBtn}>
                        {dict.nav.bookNow}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
