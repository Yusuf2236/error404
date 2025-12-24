"use client";

import styles from "../dining/page.module.css";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";
import { amenitiesData } from "../../data/amenities";

export default function SpaPage() {
    const { language } = useLanguage();
    const data = amenitiesData.spa[language as "en" | "uz" | "ru"] || amenitiesData.spa.en;

    return (
        <main className={styles.main}>
            <div className={styles.hero} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
                <div className={styles.heroOverlay}>
                    <Link href="/services" className={styles.backBtn}>← {language === "uz" ? "Xizmatlarga qaytish" : language === "ru" ? "Назад к услугам" : "Back to Services"}</Link>
                    <h1>{data.title}</h1>
                    <p>{data.intro}</p>
                </div>
            </div>

            <div className={styles.content}>
                <section className={styles.intro}>
                    <div className={styles.glassContainer}>
                        <h2>{language === "uz" ? "Haqiqiy Sharq Salomatligi" : language === "ru" ? "Истинное восточное велнес" : "Authentic Oriental Wellness"}</h2>
                        <p className={styles.boldText}>{data.intro}</p>
                    </div>
                </section>

                <div className={styles.menuGrid}>
                    <div className={styles.categoryBlock}>
                        <h2 className={styles.catTitle}>{data.ritualsTitle}</h2>
                        <div className={styles.itemsWrapper}>
                            {data.rituals.map((r, i) => (
                                <div key={i} className={styles.menuItem}>
                                    <img src={r.img} alt={r.name} className={styles.itemImg} />
                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemHeader}>
                                            <span className={styles.itemName}>{r.name}</span>
                                            <span className={styles.itemPrice}>{r.duration}</span>
                                        </div>
                                        <p className={styles.itemDesc}>{r.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <section className={styles.rules}>
                    <div className={styles.glassContainer}>
                        <h2>{data.etiquetteTitle}</h2>
                        <ul className={styles.ruleList}>
                            {data.etiquette.map((rule, i) => (
                                <li key={i}>{rule}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
}
