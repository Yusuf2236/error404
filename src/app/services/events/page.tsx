"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useLanguage } from "../../context/LanguageContext";

interface Hall {
    name: string;
    desc: string;
    capacity: string;
    img: string;
    features: string[];
}

interface Amenity {
    icon: string;
    name: string;
}

interface Content {
    title: string;
    subtitle: string;
    halls: Hall[];
    amenitiesTitle: string;
    amenities: Amenity[];
    book: string;
}

export default function EventsPage() {
    const { language } = useLanguage();

    const content: Record<string, Content> = {
        en: {
            title: "Conference & Events",
            subtitle: "Where Business Innovation Meets Luxury Hospitality",
            halls: [
                {
                    name: "The Silk Road Ballroom",
                    desc: "Our largest space, perfect for international summits and grand corporate galas.",
                    capacity: "Up to 500 guests",
                    img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    features: ["Fiber-optic Internet", "HD Video Walls", "Simultaneous Translation", "Private VIP Entrance"]
                },
                {
                    name: "Executive Strategy Room",
                    desc: "High-privacy environment designed for board meetings and strategic decisions.",
                    capacity: "Up to 20 guests",
                    img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    features: ["Interactive Smart Screen", "Digital Whiteboard", "Secure Video Link", "Gourmet Coffee Station"]
                }
            ],
            amenitiesTitle: "World-Class Business Support",
            amenities: [
                { icon: "💻", name: "High-Speed Tech" },
                { icon: "🥗", name: "Elite Catering" },
                { icon: "🚗", name: "VIP Transfer" },
                { icon: "🍷", name: "Gala Service" }
            ],
            book: "Inquire Now"
        },
        uz: {
            title: "Konferensiya va Tadbirlar",
            subtitle: "Biznes innovatsiyalari lyuks mehmondo'stlik bilan uchrashadigan joy",
            halls: [
                {
                    name: "Ipak Yo'li Ball zali",
                    desc: "Xalqaro sammitlar va yirik korporativ tantanalar uchun mos bo'lgan eng katta zalimiz.",
                    capacity: "500 nafargacha mehmon",
                    img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    features: ["Optik tolali internet", "HD video devorlar", "Sinxron tarjima tizimi", "Maxsus VIP kirish yo'li"]
                },
                {
                    name: "Ijroiya Strategiya Xonasi",
                    desc: "Boshqaruv kengashi yig'ilishlari va strategik qarorlar uchun mo'ljallangan yuqori maxfiylik muhiti.",
                    capacity: "20 nafargacha mehmon",
                    img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    features: ["Interaktiv aqlli ekran", "Raqamli oq doska", "Xavfsiz video aloqa", "Gourmet kofe stansiyasi"]
                }
            ],
            amenitiesTitle: "Jahon darajasidagi biznes ko'mak",
            amenities: [
                { icon: "💻", name: "Yuqori texnologiya" },
                { icon: "🥗", name: "Elita Catering" },
                { icon: "🚗", name: "VIP Transfer" },
                { icon: "🍷", name: "Gala xizmati" }
            ],
            book: "So'rov yuborish"
        },
        ru: {
            title: "Конференции и Мероприятия",
            subtitle: "Где бизнес-инновации встречаются с роскошью",
            halls: [
                {
                    name: "Балльный зал Шёлковый путь",
                    desc: "Наше самое большое пространство, идеально подходящее для международных саммитов и грандиозных корпоративных гала-вечеров.",
                    capacity: "До 500 гостей",
                    img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    features: ["Оптоволоконный интернет", "HD видеостены", "Синхронный перевод", "Частный VIP вход"]
                },
                {
                    name: "Зал исполнительной стратегии",
                    desc: "Среда с высокой степенью конфиденциальности, предназначенная для заседаний совета директоров и принятия стратегических решений.",
                    capacity: "До 20 гостей",
                    img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    features: ["Интерактивный экран", "Цифровая доска", "Защищенная видеосвязь", "Гурман кофейная станция"]
                }
            ],
            amenitiesTitle: "Бизнес-поддержка мирового уровня",
            amenities: [
                { icon: "💻", name: "Техпомощь" },
                { icon: "🥗", name: "Элитный кейтеринг" },
                { icon: "🚗", name: "VIP трансфер" },
                { icon: "🍷", name: "Гала сервис" }
            ],
            book: "Узнать больше"
        }
    };

    const t = content[language] || content.en;

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{t.title}</h1>
                    <p className={styles.subtitle}>{t.subtitle}</p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.grid}>
                    {t.halls.map((hall: Hall, index: number) => (
                        <div key={index} className={styles.eventCard}>
                            <img src={hall.img} alt={hall.name} className={styles.cardImage} />
                            <div className={styles.cardContent}>
                                <h3>{hall.name}</h3>
                                <p>{hall.desc}</p>
                                <ul className={styles.features}>
                                    {hall.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
                                    <li><strong>{hall.capacity}</strong></li>
                                </ul>
                                <Link href="/contact" className={styles.bookBtn}>
                                    {t.book}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.amenities}>
                    <h2>{t.amenitiesTitle}</h2>
                    <div className={styles.amenitiesGrid}>
                        {t.amenities.map((item: Amenity, index: number) => (
                            <div key={index} className={styles.amenityItem}>
                                <span>{item.icon}</span>
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
