"use client";

import { useState } from "react";
import styles from "./LocalExplorer.module.css";
import { localGuideData, GuideItem } from "../data/amenities";
import { useLanguage } from "../context/LanguageContext";

export default function LocalExplorer() {
    const { language } = useLanguage();
    const [activeId, setActiveId] = useState(1);

    const data: GuideItem[] = localGuideData[language as keyof typeof localGuideData] || localGuideData.en;
    const activeItem: GuideItem = data.find((item: GuideItem) => item.id === activeId) || data[0];

    const currentLang = (['en', 'uz', 'ru'].includes(language) ? language : 'en') as 'en' | 'uz' | 'ru';

    const labels = {
        en: { title: "Elite Tashkent Guide", subtitle: "Curated landmarks for our distinguished guests." },
        uz: { title: "Toshkent Elita Yo'lboshchisi", subtitle: "Aziz mehmonlarimiz uchun saralangan manzillar." },
        ru: { title: "Элитный Гид по Ташкенту", subtitle: "Кураторская подборка достопримечательностей для наших гостей." }
    };

    const t = labels[currentLang];

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.goldTitle}>{t.title}</h2>
                <p className={styles.subtitle}>{t.subtitle}</p>
            </div>

            <div className={styles.explorerContainer}>
                <div className={styles.mapSidebar}>
                    {data.map((item: GuideItem) => (
                        <button
                            key={item.id}
                            className={`${styles.markerBtn} ${activeId === item.id ? styles.active : ""}`}
                            onClick={() => setActiveId(item.id)}
                        >
                            <span className={styles.markerCircle}>{item.id}</span>
                            <span className={styles.markerName}>{item.name}</span>
                        </button>
                    ))}
                </div>

                <div className={styles.detailCard}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={activeItem.img}
                            alt={activeItem.name}
                            className={styles.guideImg}
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60&fm=jpg";
                            }}
                        />
                    </div>
                    <div className={styles.content}>
                        <h3>{activeItem.name}</h3>
                        <p className={styles.desc}>{activeItem.desc}</p>

                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>
                                    {language === "uz" ? "Kutilayotgan harajat" : language === "ru" ? "Примерная цена" : "Estimated Cost"}
                                </span>
                                <span className={styles.infoValue}>{activeItem.price[currentLang]}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>
                                    {language === "uz" ? "Joylashuv" : language === "ru" ? "Местоположение" : "Location"}
                                </span>
                                <a href={activeItem.locationUrl} target="_blank" rel="noopener noreferrer" className={styles.locationLink}>
                                    📍 {language === "uz" ? "Xaritada ochish" : language === "ru" ? "Открыть карту" : "Open in Maps"}
                                </a>
                            </div>
                        </div>

                        <div className={styles.extendedDetails}>
                            <p>{activeItem.details[currentLang]}</p>
                        </div>

                        <button className={styles.conciergeBtn}>
                            {language === "uz" ? "Borishni tashkil qilish" : language === "ru" ? "Заказать трансфер" : "Arrange Visit"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
