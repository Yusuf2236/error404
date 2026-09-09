"use client";

import { useState } from "react";
import Button from "../components/Button";
import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";

// Room nightly prices in USD (rooms are priced in USD; the converter shows them
// in the guest's chosen currency).
const ROOM_PRICES_USD: Record<string, number> = {
    platinum: 550,
    heritage: 2500,
    minor: 950,
    chorsu: 380,
};

// FX rates relative to 1 USD. UZS is a sane default; EUR a stable cross-rate.
const FX: Record<string, number> = { USD: 1, UZS: 12850, EUR: 0.92 };

function formatMoney(usd: number, currency: string): string {
    const v = Math.round(usd * (FX[currency] ?? 1));
    if (currency === "UZS") return `${v.toLocaleString("ru-RU").replace(/,/g, " ")} so'm`;
    if (currency === "EUR") return `€${v.toLocaleString("en-US")}`;
    return `$${v.toLocaleString("en-US")}`;
}

export default function Booking() {
    const { dict, language } = useLanguage();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [currency, setCurrency] = useState("USD");
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        guests: "2",
        roomType: "platinum",
        name: "",
        email: "",
        phone: "",
        paymentMethod: "click"
    });

    // Nights between the selected dates (min 1 once both are set).
    const nights = (() => {
        if (!formData.checkIn || !formData.checkOut) return 0;
        const ms = new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime();
        const n = Math.round(ms / 86400000);
        return n > 0 ? n : 0;
    })();

    const nightlyUsd = ROOM_PRICES_USD[formData.roomType] ?? 0;
    const totalUsd = nightlyUsd * (nights > 0 ? nights : 1);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Basic Validation
        const today = new Date().toISOString().split('T')[0];
        if (formData.checkIn < today) {
            setError(language === "uz" ? "O'tmishdagi sanani tanlab bo'lmaydi" : "Cannot select a date in the past");
            setIsLoading(false);
            return;
        }

        if (formData.checkOut <= formData.checkIn) {
            setError(language === "uz" ? "Ketish sanasi kelish sanasidan keyin bo'lishi kerak" : "Check-out must be after check-in");
            setIsLoading(false);
            return;
        }

        const phoneRegex = /^\+?[0-9]{7,15}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
            setError(language === "uz" ? "Telefon raqami noto'g'ri" : "Invalid phone number");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Booking failed');
            }

            // Simulate payment processing delay for premium feel
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsConfirmed(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    if (isConfirmed) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.successCard}>
                        <span className={styles.successIcon}>✨</span>
                        <h2>{language === "uz" ? "Muvaffaqiyatli band qilindi!" : language === "ru" ? "Успешно забронировано!" : "Booking Successful!"}</h2>
                        <p>{language === "uz" ? "VIP UZBE ni tanlaganingiz uchun rahmat. Tez orada siz bilan bog'lanamiz." : language === "ru" ? "Спасибо за выбор VIP UZBE. Мы свяжемся с вами в ближайшее время." : "Thank you for choosing VIP UZBE. We will contact you shortly."}</p>
                        <Button onClick={() => window.location.href = "/"} variant="primary">
                            {language === "uz" ? "Bosh sahifaga qaytish" : language === "ru" ? "Вернуться на главную" : "Back to Home"}
                        </Button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>{dict.nav.bookNow}</h1>
                    <p className={styles.subtitle}>{language === "uz" ? "Bugun o'zingizning eksklyuziv VIP UZBE tajribangizni bron qiling." : language === "ru" ? "Забронируйте свой эксклюзивный отдых в VIP UZBE уже сегодня." : "Secure your exclusive VIP UZBE experience today."}</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label htmlFor="checkIn">{language === "uz" ? "Kelish sanasi" : language === "ru" ? "Дата заезда" : "Check-In"}</label>
                                <input
                                    type="date"
                                    id="checkIn"
                                    name="checkIn"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="checkOut">{language === "uz" ? "Ketish sanasi" : language === "ru" ? "Дата выезда" : "Check-Out"}</label>
                                <input
                                    type="date"
                                    id="checkOut"
                                    name="checkOut"
                                    value={formData.checkOut}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label htmlFor="guests">{language === "uz" ? "Mehmonlar" : language === "ru" ? "Гости" : "Guests"}</label>
                                <select
                                    id="guests"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className={styles.input}
                                >
                                    <option value="1">1 {language === "uz" ? "Mehmon" : language === "ru" ? "Гость" : "Guest"}</option>
                                    <option value="2">2 {language === "uz" ? "Mehmon" : language === "ru" ? "Гостя" : "Guests"}</option>
                                    <option value="3">3 {language === "uz" ? "Mehmon" : language === "ru" ? "Гостя" : "Guests"}</option>
                                    <option value="4">4 {language === "uz" ? "Mehmon" : language === "ru" ? "Гостя" : "Guests"}</option>
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="roomType">{language === "uz" ? "Xona turi" : language === "ru" ? "Тип номера" : "Room Type"}</label>
                                <select
                                    id="roomType"
                                    name="roomType"
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    className={styles.input}
                                >
                                    <option value="platinum">Platinum Panorama Suite ($550)</option>
                                    <option value="heritage">Amir Temur Heritage Suite ($2500)</option>
                                    <option value="minor">Minor White Suite ($950)</option>
                                    <option value="chorsu">Chorsu View Deluxe ($380)</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.divider}></div>

                        <h2 className={styles.sectionTitle}>{language === "uz" ? "Mehmon ma'lumotlari" : language === "ru" ? "Данные гостя" : "Guest Details"}</h2>

                        <div className={styles.field}>
                            <label htmlFor="name">{language === "uz" ? "To'liq ism" : language === "ru" ? "Полное имя" : "Full Name"}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="..."
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="concierge@vipuzbe.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="phone">{language === "uz" ? "Telefon" : language === "ru" ? "Телефон" : "Phone"}</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+998"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.paymentSection}>
                            <h2 className={styles.sectionTitle}>{dict.general.selectPayment}</h2>
                            <div className={styles.paymentMethods}>
                                {[
                                    { id: 'click', label: dict.general.click, icon: '🖱️', desc: 'Click.uz' },
                                    { id: 'payme', label: dict.general.payme, icon: '💳', desc: 'Payme' },
                                    { id: 'visa', label: dict.general.visa, icon: '🌐', desc: 'Visa Card' },
                                    { id: 'mastercard', label: dict.general.mastercard, icon: '💎', desc: 'Mastercard' },
                                    { id: 'crypto', label: dict.general.crypto, icon: '⛓️', desc: 'Binance / USDT' },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        className={`${styles.paymentBtn} ${formData.paymentMethod === method.id ? styles.activePayment : ''}`}
                                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                                    >
                                        <span className={styles.paymentIcon}>{method.icon}</span>
                                        <span>{method.label}</span>
                                        <p className={styles.paymentDesc}>{method.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.paymentSection}>
                            <h2 className={styles.sectionTitle}>{language === "uz" ? "Valyuta" : language === "ru" ? "Валюта" : "Currency"}</h2>
                            <div className={styles.currencyRow}>
                                {["USD", "UZS", "EUR"].map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        className={`${styles.currencyBtn} ${currency === c ? styles.activeCurrency : ''}`}
                                        onClick={() => setCurrency(c)}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.summaryCard}>
                            <div className={styles.summaryRow}>
                                <span>{nights > 0 ? `${nights} ${language === "uz" ? "tun" : language === "ru" ? "ночей" : "nights"} × ${formatMoney(nightlyUsd, currency)}` : formatMoney(nightlyUsd, currency)}</span>
                            </div>
                            <div className={styles.summaryTotal}>
                                <span>{language === "uz" ? "Jami" : language === "ru" ? "Итого" : "Total"}</span>
                                <strong>{formatMoney(totalUsd, currency)}</strong>
                            </div>
                        </div>
                        {error && (
                            <div className={styles.error}>
                                {error}
                            </div>
                        )}

                        <div className={styles.submitArea}>
                            <Button
                                type="submit"
                                size="lg"
                                className={styles.fullWidthBtn}
                                disabled={isLoading}
                            >
                                {isLoading ? (language === "uz" ? "Yuborilmoqda..." : "Processing...") : dict.nav.bookNow}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
