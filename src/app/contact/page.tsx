"use client";

import Button from "../components/Button";
import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Contact VIP UZBE",
            subtitle: "Experience unparalleled assistance 24/7 in the heart of Tashkent. Our elite concierge team is ready to serve you.",
            addressTitle: "Our Location",
            address: "77 Amir Temur Avenue, Tashkent 100084, Uzbekistan",
            phone: "+998 71 123 45 67 (Central Reception)",
            email: "info@vipuzbe.com",
            formTitle: "Send a Direct Inquiry",
            name: "Your Name",
            subject: "Subject",
            message: "How can we assist you?",
            submit: "Send Message"
        },
        uz: {
            title: "VIP UZBE bilan bog'laning",
            subtitle: "Toshkentning qoq markazida sizga 24/7 xizmat ko'rsatuvchi elita jamoamiz xizmatga tayyor.",
            addressTitle: "Bizning manzil",
            address: "Amir Temur shoh ko'chasi 77, Toshkent 100084, O'zbekiston",
            phone: "+998 71 123 45 67 (Markaziy qabulxona)",
            email: "info@vipuzbe.com",
            formTitle: "To'g'ridan-to'g'ri so'rov yuborish",
            name: "Ismingiz",
            subject: "Mavzu",
            message: "Sizga qanday yordam bera olamiz?",
            submit: "Xabar yuborish"
        },
        ru: {
            title: "Связаться с VIP UZBE",
            subtitle: "Наша элитная команда консьержей готова помочь вам 24/7 в самом сердце Ташкента.",
            addressTitle: "Наш адрес",
            address: "Проспект Амира Темура 77, Ташкент 100084, Узбекистан",
            phone: "+998 71 123 45 67 (Центральный ресепшн)",
            email: "info@vipuzbe.com",
            formTitle: "Отправить запрос",
            name: "Ваше имя",
            subject: "Тема",
            message: "Чем мы можем вам помочь?",
            submit: "Отправить сообщение"
        }
    };

    const t = content[language as keyof typeof content] || content.en;

    return (
        <main className={styles.main}>
            <div className={styles.hero}>
                <div className={styles.heroOverlay}>
                    <h1>{t.title}</h1>
                    <p>{t.subtitle}</p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.glassWrapper}>
                    <div className={styles.info}>
                        <div className={styles.infoItem}>
                            <h3>{t.addressTitle}</h3>
                            <p>{t.address}</p>
                        </div>

                        <div className={styles.infoItem}>
                            <h3>{language === "uz" ? "Telefon" : "Phone"}</h3>
                            <p>{t.phone}</p>
                        </div>

                        <div className={styles.infoItem}>
                            <h3>Email</h3>
                            <p>{t.email}</p>
                            <p>reservations@vipuzbe.com</p>
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        <h2>{t.formTitle}</h2>
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.row}>
                                <div className={styles.group}>
                                    <label htmlFor="name">{t.name}</label>
                                    <input type="text" id="name" name="name" className={styles.input} required />
                                </div>
                                <div className={styles.group}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" className={styles.input} required />
                                </div>
                            </div>

                            <div className={styles.group}>
                                <label htmlFor="subject">{t.subject}</label>
                                <input type="text" id="subject" name="subject" className={styles.input} />
                            </div>

                            <div className={styles.group}>
                                <label htmlFor="message">{t.message}</label>
                                <textarea id="message" name="message" rows={5} className={styles.textarea} required></textarea>
                            </div>

                            <Button size="lg" className={styles.submitBtn}>{t.submit}</Button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
