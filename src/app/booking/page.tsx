"use client";

import { useState } from "react";
import Button from "../components/Button";
import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function Booking() {
    const { dict, language } = useLanguage();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        guests: "2",
        roomType: "deluxe-suite",
        name: "",
        email: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsConfirmed(true);
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
                    <p className={styles.subtitle}>Secure your exclusive VIP UZBE experience today.</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label htmlFor="checkIn">Check-In</label>
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
                                <label htmlFor="checkOut">Check-Out</label>
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
                                <label htmlFor="guests">{language === "uz" ? "Mehmonlar" : "Guests"}</label>
                                <select
                                    id="guests"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className={styles.input}
                                >
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="roomType">{language === "uz" ? "Xona turi" : "Room Type"}</label>
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

                        <h2 className={styles.sectionTitle}>Guest Details</h2>

                        <div className={styles.field}>
                            <label htmlFor="name">{language === "uz" ? "To'liq ism" : "Full Name"}</label>
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
                                <label htmlFor="phone">{language === "uz" ? "Telefon" : "Phone"}</label>
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

                        <div className={styles.submitArea}>
                            <Button type="submit" size="lg" className={styles.fullWidthBtn}>{dict.nav.bookNow}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
