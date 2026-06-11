"use client";

import { useState } from "react";
import styles from "./RoyalConcierge.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function RoyalConcierge() {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const content = {
        en: {
            btn: "Royal Concierge",
            title: "Private Assistance",
            desc: "Our dedicated concierge is ready to fulfill your every request, from private jets to the rarest of delicacies.",
            options: ["Book Private Jet", "Luxury Event Planning", "Rare Gift Sourcing", "Armed Escort Request"],
            contact: "Direct Line: +998 90 123 45 67"
        },
        uz: {
            btn: "Qirollik Konsyerji",
            title: "Shaxsiy Yordam",
            desc: "Bizning malakali konsyerjimiz shaxsiy samolyotlardan tortib eng noyob ne'matlargacha bo'lgan barcha istaklaringizni bajarishga tayyor.",
            options: ["Xususiy Jet Buyurtmasi", "Lyuks Tadbirlar Tashkil Etish", "Noyob Sovg'alar Qidirish", "Qurolli Qo'riqchi So'rovi"],
            contact: "To'g'ridan-to'g'ri bog'lanish: +998 90 123 45 67"
        },
        ru: {
            btn: "Королевский Консьерж",
            title: "Частная Помощь",
            desc: "Наш преданный консьерж готов выполнить любой ваш запрос, от частных самолетов до редчайших деликатесов.",
            options: ["Заказ частного джета", "Организация люкс-мероприятий", "Поиск редких подарков", "Запрос вооруженного сопровождения"],
            contact: "Прямая линия: +998 90 123 45 67"
        }
    };

    const t = content[language as keyof typeof content] || content.en;

    return (
        <div className={styles.wrapper}>
            <button className={styles.mainBtn} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.icon}>🛎️</span>
                <span className={styles.label}>{t.btn}</span>
            </button>

            {isOpen && (
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>&times;</button>
                    <h3 className={styles.goldTitle}>{t.title}</h3>
                    <p className={styles.desc}>{t.desc}</p>
                    <ul className={styles.optionsList}>
                        {t.options.map((opt, i) => (
                            <li key={i} className={styles.optionItem}>{opt}</li>
                        ))}
                    </ul>
                    <div className={styles.contactInfo}>
                        <strong>{t.contact}</strong>
                    </div>
                    <button className={styles.actionBtn}>
                        {language === "uz" ? "Hozir Bog'lanish" : language === "ru" ? "Связаться Сейчас" : "Connect Now"}
                    </button>
                </div>
            )}
        </div>
    );
}
