"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
    const { dict } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>VIP UZBE</h3>
                    <p>{dict.footer.description}</p>
                </div>
                <div className={styles.column}>
                    <h4>{dict.footer.links}</h4>
                    <ul>
                        <li><Link href="/rooms">{dict.nav.rooms}</Link></li>
                        <li><Link href="/services">{dict.nav.services}</Link></li>
                        <li><Link href="/gallery">{dict.nav.gallery}</Link></li>
                        <li><Link href="/blog">{dict.nav.blog}</Link></li>
                        <li><Link href="/faq">{dict.nav.faq}</Link></li>
                        <li><Link href="/contact">{dict.nav.contact}</Link></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h4>{dict.footer.contact}</h4>
                    <p>77 Amir Temur Ave, Tashkent, Uzbekistan</p>
                    <p>+998 71 123 45 67</p>
                    <p>info@vipuzbe.com</p>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} VIP UZBE. {dict.footer.rights}</p>
            </div>
        </footer>
    );
}
