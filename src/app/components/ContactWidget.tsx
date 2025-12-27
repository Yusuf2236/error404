"use client";

import React, { useState } from 'react';
import styles from './ContactWidget.module.css';
import { useLanguage } from '../context/LanguageContext';

const ContactWidget = () => {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const t = {
        en: {
            help: "Need help?",
            whatsapp: "Chat on WhatsApp",
            telegram: "Contact on Telegram",
            call: "Call Us"
        },
        uz: {
            help: "Yordam kerakmi?",
            whatsapp: "WhatsApp orqali bog'lanish",
            telegram: "Telegram orqali bog'lanish",
            call: "Qo'ng'iroq qilish"
        },
        ru: {
            help: "Нужна помощь?",
            whatsapp: "Написать в WhatsApp",
            telegram: "Написать в Telegram",
            call: "Позвонить нам"
        }
    }[language as 'en' | 'uz' | 'ru'] || {
        help: "Need help?",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        call: "Call"
    };

    return (
        <div className={styles.container}>
            {isOpen && (
                <div className={styles.menu}>
                    <a
                        href="https://t.me/your_hotel_username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.item}
                    >
                        <span className={styles.tgIcon}>✈️</span>
                        {t.telegram}
                    </a>
                    <a
                        href="https://wa.me/998901234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.item}
                    >
                        <span className={styles.waIcon}>💬</span>
                        {t.whatsapp}
                    </a>
                    <a href="tel:+998901234567" className={styles.item}>
                        <span className={styles.callIcon}>📞</span>
                        {t.call}
                    </a>
                </div>
            )}
            <button
                className={`${styles.mainButton} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Contact support"
            >
                <div className={styles.pulse}></div>
                {isOpen ? '✕' : '💬'}
                {!isOpen && <span className={styles.tooltip}>{t.help}</span>}
            </button>
        </div>
    );
};

export default ContactWidget;
