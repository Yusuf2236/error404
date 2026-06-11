"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useLanguage } from "../context/LanguageContext";
import AuthService, { User } from "../services/AuthService";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const { language, setLanguage, dict } = useLanguage();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const handleAuthChange = () => {
            const currentUser = AuthService.getInstance().getUser();
            setUser(currentUser);
        };

        handleAuthChange();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("vip_auth_change", handleAuthChange);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("vip_auth_change", handleAuthChange);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMenuOpen]);

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/" ? styles.activeLink : "";
        }
        return pathname.startsWith(path) ? styles.activeLink : "";
    };

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menuOpen : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo} onClick={closeMenu}>
                    VIP UZBE
                </Link>

                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
                    <div className={`${styles.bar} ${isMenuOpen ? styles.bar1 : ""}`}></div>
                    <div className={`${styles.bar} ${isMenuOpen ? styles.bar2 : ""}`}></div>
                    <div className={`${styles.bar} ${isMenuOpen ? styles.bar3 : ""}`}></div>
                </button>

                <ul className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ""}`}>
                    <li><Link href="/" className={isActive("/")} onClick={closeMenu}>{dict.nav.home}</Link></li>
                    <li><Link href="/rooms" className={isActive("/rooms")} onClick={closeMenu}>{dict.nav.rooms}</Link></li>
                    <li><Link href="/offers" className={isActive("/offers")} onClick={closeMenu}>{dict.nav.offers}</Link></li>
                    <li><Link href="/services" className={isActive("/services")} onClick={closeMenu}>{dict.nav.services}</Link></li>
                    <li><Link href="/services/events" className={isActive("/services/events")} onClick={closeMenu}>{dict.nav.events}</Link></li>
                    <li><Link href="/corporate" className={isActive("/corporate")} onClick={closeMenu}>{dict.nav.corporate}</Link></li>
                    <li><Link href="/gallery" className={isActive("/gallery")} onClick={closeMenu}>{dict.nav.gallery}</Link></li>
                    <li><Link href="/blog" className={isActive("/blog")} onClick={closeMenu}>{dict.nav.blog}</Link></li>
                </ul>

                <div className={`${styles.navActions} ${isMenuOpen ? styles.actionsOpen : ""}`}>
                    <div className={styles.langSwitcher}>
                        <button
                            className={language === "uz" ? styles.activeLang : ""}
                            onClick={() => { setLanguage("uz"); closeMenu(); }}
                        >UZ</button>
                        <button
                            className={language === "ru" ? styles.activeLang : ""}
                            onClick={() => { setLanguage("ru"); closeMenu(); }}
                        >RU</button>
                        <button
                            className={language === "en" ? styles.activeLang : ""}
                            onClick={() => { setLanguage("en"); closeMenu(); }}
                        >EN</button>
                    </div>

                    {user ? (
                        <Link href="/profile" className={styles.loginBtn} onClick={closeMenu}>
                            <span style={{ marginRight: '5px' }}>👤</span>
                            {user.name}
                        </Link>
                    ) : (
                        <Link href="/login" className={styles.loginBtn} onClick={closeMenu}>{dict.nav.login}</Link>
                    )}

                    <Link href="/booking" className={styles.bookBtn} onClick={closeMenu}>
                        {dict.nav.bookNow}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
