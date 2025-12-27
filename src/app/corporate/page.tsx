"use client";

import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";

interface Benefit {
    icon: string;
    title: string;
    desc: string;
}

interface Content {
    title: string;
    subtitle: string;
    benefits: Benefit[];
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
}

export default function CorporatePage() {
    const { language } = useLanguage();

    const content: Record<string, Content> = {
        en: {
            title: "Corporate Partnership",
            subtitle: "Elevate your enterprise with exclusive hospitality solutions tailored for global business leaders.",
            benefits: [
                {
                    icon: "📉",
                    title: "Preferred Corporate Rates",
                    desc: "Fixed annual pricing and tiered discounts for frequent business travelers."
                },
                {
                    icon: "🛎️",
                    title: "Priority Concierge",
                    desc: "Dedicated account manager for all booking, transport, and event requirements."
                },
                {
                    icon: "🕔",
                    title: "Flexible Scheduling",
                    desc: "Early check-in and late check-out priority to match business flight timings."
                }
            ],
            ctaTitle: "Join the VIP Business Network",
            ctaDesc: "Contact our enterprise relations team to establish a partnership today.",
            ctaBtn: "Inquire for Partnership"
        },
        uz: {
            title: "Korporativ Hamkorlik",
            subtitle: "Global biznes yetakchilari uchun mo'ljallangan eksklyuziv mehmondo'stlik yechimlari bilan korxonangiz darajasini oshiring.",
            benefits: [
                {
                    icon: "📉",
                    title: "Imtiyozli Korporativ Kurslar",
                    desc: "Doimiy biznes sayohatchilari uchun yillik qat'iy narxlar va darajali chegirmalar."
                },
                {
                    icon: "🛎️",
                    title: "Ustuvor Konsyerj",
                    desc: "Barcha band qilish, transport va tadbir talablari uchun maxsus hisob menejeri."
                },
                {
                    icon: "🕔",
                    title: "Moslashuvchan Jadval",
                    desc: "Biznes parvoz vaqtlariga mos kelishi uchun erta kirish va kech chiqish ustuvorligi."
                }
            ],
            ctaTitle: "VIP Biznes tarmog'iga qo'shiling",
            ctaDesc: "Bugun hamkorlikni o'rnatish uchun korporativ aloqalar jamoamiz bilan bog'laning.",
            ctaBtn: "Hamkorlik uchun so'rov"
        },
        ru: {
            title: "Корпоративное Партнерство",
            subtitle: "Повысьте уровень своего предприятия с помощью эксклюзивных решений в области гостеприимства.",
            benefits: [
                {
                    icon: "📉",
                    title: "Льготные тарифы",
                    desc: "Фиксированные годовые цены и многоуровневые скидки для частых деловых поездок."
                },
                {
                    icon: "🛎️",
                    title: "Приоритетный консьерж",
                    desc: "Персональный менеджер для всех вопросов бронирования, транспорта и мероприятий."
                },
                {
                    icon: "🕔",
                    title: "Гибкий график",
                    desc: "Приоритет раннего заезда и позднего выезда в соответствии с бизнес-рейсами."
                }
            ],
            ctaTitle: "Присоединяйтесь к бизнес-сети VIP",
            ctaDesc: "Свяжитесь с нашей командой по работе с предприятиями для установления партнерства.",
            ctaBtn: "Запрос на партнерство"
        }
    };

    const t = content[language] || content.en;

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <h1 className={styles.goldTitle}>{t.title}</h1>
                <p className={styles.subtitle}>{t.subtitle}</p>
            </section>

            <section className={styles.section}>
                <div className={styles.benefitGrid}>
                    {t.benefits.map((benefit: Benefit, index: number) => (
                        <div key={index} className={styles.benefitCard}>
                            <span className={styles.icon}>{benefit.icon}</span>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.desc}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.portalCTA}>
                    <h2>{t.ctaTitle}</h2>
                    <p>{t.ctaDesc}</p>
                    <Link href="/contact" className={styles.applyBtn}>
                        {t.ctaBtn}
                    </Link>
                </div>
            </section>
        </main>
    );
}
