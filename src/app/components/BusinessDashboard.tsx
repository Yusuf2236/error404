"use client";

import { useState, useEffect } from "react";
import styles from "./BusinessDashboard.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function BusinessDashboard() {
    const { language } = useLanguage();
    const [amount, setAmount] = useState<number>(100);
    const [rate] = useState<number>(12850); // Mock rate UZS to USD
    const [times, setTimes] = useState({
        tashkent: "",
        london: "",
        newyork: "",
        tokyo: ""
    });

    useEffect(() => {
        const updateClocks = () => {
            const now = new Date();
            const format = (tz: string) =>
                new Intl.DateTimeFormat('en-GB', {
                    timeZone: tz,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).format(now);

            setTimes({
                tashkent: format('Asia/Tashkent'),
                london: format('Europe/London'),
                newyork: format('America/New_York'),
                tokyo: format('Asia/Tokyo')
            });
        };

        updateClocks();
        const interval = setInterval(updateClocks, 1000);
        return () => clearInterval(interval);
    }, []);

    const t = {
        en: {
            title: "Business Executive Toolkit",
            subtitle: "Essential tools for the modern global traveler.",
            currency: "Currency Converter",
            clock: "World Business Hours",
            flights: "Travel Logistics",
            amount: "Amount (USD)",
            result: "Estimated (UZS)",
            airport: "Tashkent International Airport",
            arrivals: "Live Arrivals",
            departures: "Live Departures",
            disclaimer: "Rates are indicative and based on market average."
        },
        uz: {
            title: "Biznes Ekspert Asboblari",
            subtitle: "Zamonaviy global sayohatchi uchun zarur vositalar.",
            currency: "Valyuta Konverteri",
            clock: "Jahon Biznes Vaqti",
            flights: "Sayohat Logistikasi",
            amount: "Miqdor (USD)",
            result: "Taxminan (UZS)",
            airport: "Toshkent xalqaro aeroporti",
            arrivals: "Kelishlar",
            departures: "Ketishlar",
            disclaimer: "Kurslar bozor o'rtacha qiymatiga asoslangan."
        },
        ru: {
            title: "Инструментарий Бизнес-Класса",
            subtitle: "Необходимые инструменты для современного путешественника.",
            currency: "Конвертер Валют",
            clock: "Мировое Бизнес-Время",
            flights: "Логистика Путешествий",
            amount: "Сумма (USD)",
            result: "Оценка (UZS)",
            airport: "Международный аэропорт Ташкента",
            arrivals: "Прилеты",
            departures: "Вылеты",
            disclaimer: "Курсы являются ориентировочными."
        }
    }[language as 'en' | 'uz' | 'ru'] || {
        title: "Business Executive Toolkit",
        subtitle: "Essential tools for the modern global traveler.",
        currency: "Currency Converter",
        clock: "World Business Hours",
        flights: "Travel Logistics",
        amount: "Amount (USD)",
        result: "Estimated (UZS)",
        airport: "Tashkent International Airport",
        arrivals: "Live Arrivals",
        departures: "Live Departures",
        disclaimer: "Rates are indicative and based on market average."
    };

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.goldTitle}>{t.title}</h2>
                <p className={styles.subtitle}>{t.subtitle}</p>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Currency Converter */}
                <div className={styles.card}>
                    <h3><span>💱</span> {t.currency}</h3>
                    <div className={styles.converter}>
                        <div className={styles.inputGroup}>
                            <label>{t.amount}</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.result}>
                            <label>{t.result}</label>
                            <div className={styles.resultValue}>
                                {(amount * rate).toLocaleString()} UZS
                            </div>
                        </div>
                        <p className={styles.helperText}>{t.disclaimer}</p>
                    </div>
                </div>

                {/* World Clock */}
                <div className={styles.card}>
                    <h3><span>🕒</span> {t.clock}</h3>
                    <div className={styles.clockList}>
                        <div className={styles.clockItem}>
                            <span className={styles.clockCity}>Tashkent (UZB)</span>
                            <span className={styles.clockTime}>{times.tashkent}</span>
                        </div>
                        <div className={styles.clockItem}>
                            <span className={styles.clockCity}>London (UK)</span>
                            <span className={styles.clockTime}>{times.london}</span>
                        </div>
                        <div className={styles.clockItem}>
                            <span className={styles.clockCity}>New York (USA)</span>
                            <span className={styles.clockTime}>{times.newyork}</span>
                        </div>
                        <div className={styles.clockItem}>
                            <span className={styles.clockCity}>Tokyo (JPN)</span>
                            <span className={styles.clockTime}>{times.tokyo}</span>
                        </div>
                    </div>
                </div>

                {/* Flight Status */}
                <div className={styles.card}>
                    <h3><span>✈️</span> {t.flights}</h3>
                    <div className={styles.flightLinks}>
                        <p className={styles.helperText} style={{ marginBottom: '10px' }}>{t.airport}</p>
                        <a href="https://www.uzairways.com/en/flight-status" target="_blank" rel="noopener noreferrer" className={styles.flightBtn}>
                            {t.arrivals}
                        </a>
                        <a href="https://www.uzairways.com/en/flight-status" target="_blank" rel="noopener noreferrer" className={styles.flightBtn}>
                            {t.departures}
                        </a>
                        <p className={styles.helperText}>
                            {language === 'uz' ? 'VIP transferni amalga oshirish uchun konsyerj xizmatiga murojaat qiling.' :
                                language === 'ru' ? 'Свяжитесь с консьержем для организации VIP-трансфера.' :
                                    'Contact concierge for VIP airport transfer arrangement.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
