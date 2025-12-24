"use client";

import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";

export default function ClientServices() {
    const { language } = useLanguage();

    const services = [
        {
            slug: "dining",
            icon: "🍽️",
            en: { title: "Uzbek Fine Dining", desc: "A culinary journey through Central Asian flavors by Michelin-star chefs. 50+ traditional and modern dishes." },
            uz: { title: "O'zbek Oliy Oshxonasi", desc: "Mishel yulduzli oshpazlar tomonidan tayyorlangan 50 dan ortiq milliy va zamonaviy taomlar to'plami." },
            ru: { title: "Узбекская Высокая Кухня", desc: "Кулинарное путешествие по вкусам Центральной Азии от шеф-поваров Мишлен. Более 50 блюд." }
        },
        {
            slug: "spa",
            icon: "🧖‍♀️",
            en: { title: "Royal Spa & Hammam", desc: "Traditional Bukhara-style rituals and luxury holistic treatments with Tashkent City views." },
            uz: { title: "Qirollik Spa va Hammomi", desc: "An'anaviy Buxorocha rituallar va Toshkent City ko'rinishidagi hashamatli muolajalar." },
            ru: { title: "Королевский Спа и Хаммам", desc: "Традиционные бухарские ритуалы и роскошные процедуры с видом на Ташкент Сити." }
        },
        {
            slug: "pool",
            icon: "🏊‍♂️",
            en: { title: "Infinity Sky Pool", desc: "Swim across the skyline in our heated rooftop infinity pool with technical precision." },
            uz: { title: "Infinity Skyhovuzi", desc: "Toshkent osmoni uzra isitiladigan va texnik mukammal hovuzda suzish zavqi." },
            ru: { title: "Небесный Инфинити Бассейн", desc: "Плавайте на фоне горизонта в нашем подогреваемом панорамном бассейне." }
        },
        {
            slug: "chauffeur",
            icon: "🚗",
            en: { title: "VIP Chauffeur", desc: "Private luxury fleet including Rolls Royce and Maybach for your city explorations." },
            uz: { title: "VIP Shofyor", desc: "Sizning shahar sayohatlaringiz uchun Rolls Royce va Maybach avtomobillari floti." },
            ru: { title: "VIP Шофер", desc: "Частный парк роскошных автомобилей, включая Rolls Royce и Maybach." }
        }
    ];

    const t_title = { en: "Elite Services Portfolio", uz: "Elita Xizmatlar Portfeli", ru: "Портфель Элитных Услуг" }[language as "en" | "uz" | "ru"] || "Elite Services";
    const t_subtitle = { en: "Operating with absolute precision to serve the world's most discerning guests.", uz: "Dunyoning eng talabchan mehmonlariga xizmat ko'rsatish uchun mutlaq aniqlik bilan ishlaymiz.", ru: "Работаем с абсолютной точностью для обслуживания самых взыскательных гостей мира." }[language as "en" | "uz" | "ru"] || "";

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.overlay}>
                    <h1>{t_title}</h1>
                    <p className={styles.boldText}>{t_subtitle}</p>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.glassGrid}>
                    {services.map((item, index) => {
                        const t = item[language as "en" | "uz" | "ru"] || item.en;
                        return (
                            <Link key={index} href={`/services/${item.slug}`} className={styles.card}>
                                <span className={styles.icon}>{item.icon}</span>
                                <h3>{t.title}</h3>
                                <p className={styles.boldText}>{t.desc}</p>
                                <span className={styles.exploreBtn}>Explore Details →</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
