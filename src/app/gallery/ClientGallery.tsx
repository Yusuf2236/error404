"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";

interface GalleryItem {
    src: string;
    cat: string;
}

export default function ClientGallery() {
    const { language } = useLanguage();

    const content = {
        en: { title: "Visual Journey", subtitle: "Glimpses of Tashkent's most exclusive hospitality.", all: "All", rooms: "Suites", spa: "Spa & Wellness", dining: "Culinary" },
        uz: { title: "Vizual Sayohat", subtitle: "Toshkentning eng eksklyuziv mehmondo'stligidan namunalar.", all: "Barchasi", rooms: "Lyukslar", spa: "Spa va Salomatlik", dining: "Pazandalik" },
        ru: { title: "Визуальное Путешествие", subtitle: "Взгляд на самое эксклюзивное гостеприимство Ташкента.", all: "Все", rooms: "Номера", spa: "Спа и Велнес", dining: "Кулинария" }
    };

    const t = content[language as keyof typeof content] || content.en;
    const [filter, setFilter] = useState("all");

    const images: GalleryItem[] = [
        { src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "spa" },
        { src: "https://images.unsplash.com/photo-1578991624414-276ef23a534f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "dining" },
        { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "dining" },
        { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "rooms" },
        { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "rooms" },
        { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "rooms" },
        { src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "spa" },
        { src: "https://images.unsplash.com/photo-1596386461350-326ccb383e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "dining" },
        { src: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", cat: "rooms" }
    ];

    const filteredImages: GalleryItem[] = filter === "all" ? images : images.filter((img: GalleryItem) => img.cat === filter);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.overlay}>
                    <h1>{t.title}</h1>
                    <p>{t.subtitle}</p>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.filterBar}>
                    <button onClick={() => setFilter("all")} className={filter === "all" ? styles.active : ""}>{t.all}</button>
                    <button onClick={() => setFilter("rooms")} className={filter === "rooms" ? styles.active : ""}>{t.rooms}</button>
                    <button onClick={() => setFilter("spa")} className={filter === "spa" ? styles.active : ""}>{t.spa}</button>
                    <button onClick={() => setFilter("dining")} className={filter === "dining" ? styles.active : ""}>{t.dining}</button>
                </div>

                <div className={styles.glassGrid}>
                    {filteredImages.map((img, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <img src={img.src} alt={`VIP UZBE ${img.cat} experience ${index + 1}`} className={styles.image} loading="lazy" />
                            <div className={styles.imgOverlay}>
                                <span>VIP UZBE Experience</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
