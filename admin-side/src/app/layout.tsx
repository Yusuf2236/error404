"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./admin.module.css";

import { LanguageProvider, useTranslation } from "@/lib/LanguageContext";

function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { t, language, setLanguage } = useTranslation();

    const navItems = [
        { name: t('dashboard'), path: "/", icon: "📊" },
        { name: t('bookings'), path: "/bookings", icon: "📅" },
        { name: t('payments'), path: "/payments", icon: "💳" },
        { name: t('settings'), path: "/settings", icon: "⚙️" },
    ];

    return (
        <body className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    VIP UZBE
                </div>

                <div className={styles.langSwitcher}>
                    <button
                        onClick={() => setLanguage('uz')}
                        className={language === 'uz' ? styles.activeLang : ''}
                    >UZ</button>
                    <button
                        onClick={() => setLanguage('ru')}
                        className={language === 'ru' ? styles.activeLang : ''}
                    >RU</button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={language === 'en' ? styles.activeLang : ''}
                    >EN</button>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.navItem} ${pathname === item.path ? styles.active : ""}`}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}

                    <Link href="http://localhost:3000" className={styles.navItem} style={{ marginTop: 'auto' }}>
                        <span>🏠</span>
                        {t('backToSite')}
                    </Link>
                </nav>

                <div className={styles.userProfile}>
                    <div className={styles.avatar}>A</div>
                    <div className={styles.userInfo}>
                        <h4>{t('adminUser')}</h4>
                        <p>{t('superAdmin')}</p>
                    </div>
                </div>
            </aside>

            <main className={styles.mainContent}>
                {children}
            </main>
        </body>
    );
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <LanguageProvider>
                <AdminLayout>{children}</AdminLayout>
            </LanguageProvider>
        </html>
    );
}
