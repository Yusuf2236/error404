"use client";

import styles from "./page.module.css";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";
import { amenitiesData } from "../../data/amenities";

export default function DiningPage() {
    const { language } = useLanguage();
    const data = amenitiesData.dining[language as "en" | "uz" | "ru"] || amenitiesData.dining.en;

    return (
        <main className={styles.main}>
            <div className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <Link href="/services" className={styles.backBtn}>← {language === "uz" ? "Xizmatlarga qaytish" : language === "ru" ? "Назад к услугам" : "Back to Services"}</Link>
                    <h1>{data.title}</h1>
                    <p>{language === "uz" ? "Ipak yo'lining afsonaviy lazzatlarini his qiling." : language === "ru" ? "Почувствуйте легендарные вкусы Шелкового пути." : "Experience the legendary flavors of the Silk Road."}</p>
                </div>
            </div>

            <div className={styles.content}>
                <section className={styles.intro}>
                    <div className={styles.glassContainer}>
                        <h2>{language === "uz" ? "Pazandachilik Merosi" : language === "ru" ? "Кулинарное наследие" : "A Culinary Legacy"}</h2>
                        <p className={styles.boldText}>{data.intro}</p>
                    </div>
                </section>

                <div className={styles.menuGrid}>
                    {data.categories.map((cat, idx) => (
                        <div key={idx} className={styles.categoryBlock}>
                            <h2 className={styles.catTitle}>{cat.name}</h2>
                            <div className={styles.itemsWrapper}>
                                {cat.items.map((item, i) => (
                                    <div key={i} className={styles.menuItem}>
                                        <img src={item.img} alt={item.name} className={styles.itemImg} />
                                        <div className={styles.itemDetails}>
                                            <div className={styles.itemHeader}>
                                                <span className={styles.itemName}>{item.name}</span>
                                                <span className={styles.itemPrice}>{item.price}</span>
                                            </div>
                                            <p className={styles.itemDesc}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

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
