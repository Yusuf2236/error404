"use client";

import styles from "../dining/page.module.css";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";
import { amenitiesData } from "../../data/amenities";

export default function PoolPage() {
    const { language } = useLanguage();
    const data = amenitiesData.pool[language as "en" | "uz" | "ru"] || amenitiesData.pool.en;

    return (
        <main className={styles.main}>
            <div className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
                <div className={styles.heroOverlay}>
                    <Link href="/services" className={styles.backBtn}>← {language === "uz" ? "Xizmatlarga qaytish" : language === "ru" ? "Назад к услугам" : "Back to Services"}</Link>
                    <h1>{data.title}</h1>
                    <p>{data.intro}</p>
                </div>
            </div>

            <div className={styles.content}>
                <section className={styles.intro}>
                    <div className={styles.glassContainer}>
                        <h2>{data.specsTitle}</h2>
                        <div className={styles.statsGrid}>
                            {data.specs.map((s, i) => (
                                <div key={i} className={styles.statItem}>
                                    <span className={styles.statVal}>{s.val}</span>
                                    <span className={styles.statLabel}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                        <p className={styles.boldText}>{data.intro}</p>
                    </div>
                </section>

                <section className={styles.kidsSection}>
                    <div className={styles.glassContainer}>
                        <h2>{data.kidsTitle}</h2>
                        <p className={styles.boldText}>{data.kidsDesc}</p>
                        <ul className={styles.ruleList}>
                            {data.kidsSpecs.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className={styles.rules}>
                    <div className={styles.glassContainer}>
                        <h2>{data.rulesTitle}</h2>
                        <ul className={styles.ruleList}>
                            {data.rules.map((rule, i) => (
                                <li key={i}>{rule}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
}
