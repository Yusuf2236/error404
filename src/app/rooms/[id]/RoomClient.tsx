"use client";

import Link from "next/link";
import Button from "../../components/Button";
import styles from "./page.module.css";
import { useLanguage } from "../../context/LanguageContext";

// Room Data with Translations
const roomsData: Record<string, Record<string, any>> = {
    "platinum": {
        en: {
            name: "Platinum Panorama Suite",
            description: "Experience 270-degree views of Tashkent City and the Humo Arena. This suite offers unparalleled luxury with floor-to-ceiling windows, a private bar, and a dedicated butler service.",
            price: "$550 / night",
            amenities: ["270° City View", "Butler Service", "Private Bar", "Smart Glass Technology", "Premium Sound System", "Marble Bathroom"],
            detailsTitle: "Description",
            amenitiesTitle: "Amenities",
            bookBtn: "Book Now",
            contactTitle: "Need Help?",
            contactText: "Contact our concierge at +998 71 234 56 78 for special requests.",
            contactBtn: "Contact Us",
            taxesNote: "* Taxes and fees may apply"
        },
        uz: {
            name: "Platina Panorama Lyuksi",
            description: "Toshkent City va Humo Arena-ga 270 darajali ko'rinishdan bahramand bo'ling. Ushbu lyuks xona panoramik oyna, shaxsiy bar va maxsus batler xizmati bilan beqiyos hashamatni taqdim etadi.",
            price: "$550 / tun",
            amenities: ["270° Shahar manzarasi", "Batler xizmati", "Shaxsiy bar", "Smart oyna texnologiyasi", "Premium ovoz tizimi", "Marmar hammom"],
            detailsTitle: "Tavsif",
            amenitiesTitle: "Qulayliklar",
            bookBtn: "Band Qilish",
            contactTitle: "Yordam Kerakmi?",
            contactText: "Maxsus so'rovlar uchun +998 71 234 56 78 raqami orqali konsyerj bilan bog'laning.",
            contactBtn: "Biz bilan bog'lanish",
            taxesNote: "* Soliqlar va to'lovlar qo'shilishi mumkin"
        },
        ru: {
            name: "Платиновый Панорамный Люкс",
            description: "Насладитесь 270-градусным видом на Ташкент Сити и Хумо Арену. Этот люкс предлагает непревзойденную роскошь с панорамными окнами, частным баром и услугами персонального дворецкого.",
            price: "$550 / ночь",
            amenities: ["270° Вид на город", "Услуги дворецкого", "Частный бар", "Технология Smart Glass", "Премиум аудиосистема", "Мраморная ванная"],
            detailsTitle: "Описание",
            amenitiesTitle: "Удобства",
            bookBtn: "Забронировать",
            contactTitle: "Нужна помощь?",
            contactText: "Свяжитесь с нашим консьержем по номеру +998 71 234 56 78 для особых запросов.",
            contactBtn: "Связаться с нами",
            taxesNote: "* Могут применяться налоги и сборы"
        }
    },
    "heritage": {
        en: {
            name: "Amir Temur Heritage Suite",
            description: "The crown jewel of VIP UZBE. A grand space featuring replicas of Samarkand's architectural wonders, traditional silk carpets, and authentic Uzbek craftsmanship combined with modern luxury.",
            price: "$2500 / night",
            amenities: ["Royal Bed", "Traditional Artifacts", "Silk Carpets", "Jacuzzi", "Library", "Chef on Call"],
            detailsTitle: "Description",
            amenitiesTitle: "Amenities",
            bookBtn: "Book Now",
            contactTitle: "Exclusive Stay",
            contactText: "The Heritage Suite requires special arrangements. Please call us for details.",
            contactBtn: "Contact Us",
            taxesNote: "* Taxes and fees may apply"
        },
        uz: {
            name: "Amir Temur Merosi Lyuksi",
            description: "VIP UZBE ning eng nufuzli xonasi. Samarqand me'moriy boyliklarining nusxalari, an'anaviy ipak gilamlar va haqiqiy o'zbek hunarmandchiligi zamonaviy hashamat bilan uyg'unlashgan.",
            price: "$2500 / tun",
            amenities: ["Qirollik karavoti", "An'anaviy buyumlar", "Ipak gilamlar", "Jakuzi", "Kutubxona", "Maxsus oshpaz"],
            detailsTitle: "Tavsif",
            amenitiesTitle: "Qulayliklar",
            bookBtn: "Band Qilish",
            contactTitle: "Eksklyuziv Turish",
            contactText: "Meros lyuksi maxsus tayyorgarlikni talab qiladi. Ma'lumot uchun bizga qo'ng'iroq qiling.",
            contactBtn: "Biz bilan bog'lanish",
            taxesNote: "* Soliqlar va to'lovlar qo'shilishi mumkin"
        },
        ru: {
            name: "Люкс Наследие Амира Темура",
            description: "Жемчужина VIP UZBE. Грандиозное пространство с репликами архитектурных чудес Самарканда, традиционными шелковыми коврами и аутентичным узбекским мастерством в сочетании с современной роскошью.",
            price: "$2500 / ночь",
            amenities: ["Королевская кровать", "Традиционные артефакты", "Шелковые ковры", "Джакузи", "Библиотека", "Повар по вызову"],
            detailsTitle: "Описание",
            amenitiesTitle: "Удобства",
            bookBtn: "Забронировать",
            contactTitle: "Эксклюзивный отдых",
            contactText: "Люкс Наследие требует специальных условий. Позвоните нам для уточнения деталей.",
            contactBtn: "Связаться с нами",
            taxesNote: "* Могут применяться налоги и сборы"
        }
    },
    "minor": {
        en: {
            name: "Minor White Suite",
            description: "Inspired by the Minor Mosque, this suite features pure white marble interiors and serene views of the Anhor canal. A sanctuary of peace and purity in the heart of the city.",
            price: "$950 / night",
            amenities: ["Canal View", "White Marble Interior", "Meditation Space", "Air Purification", "Organic Linens", "Tea Ceremony Set"],
            detailsTitle: "Description",
            amenitiesTitle: "Amenities",
            bookBtn: "Book Now",
            contactTitle: "Serene Luxury",
            contactText: "The Minor White Suite offers a unique atmosphere. Contact us for personalized wellness options.",
            contactBtn: "Contact Us",
            taxesNote: "* Taxes and fees may apply"
        },
        uz: {
            name: "Minor Oq Lyuksi",
            description: "Minor masjidi uslubida yaratilgan ushbu xona oppoq marmar interyer va Anhor kanalining tinch manzarasini taqdim etadi. Shahar markazidagi osoyishtalik va poklik maskani.",
            price: "$950 / tun",
            amenities: ["Kanal manzarasi", "Oq marmar interyer", "Meditatsiya maydoni", "Havoni tozalash tizimi", "Organik choyshablar", "Choy marosimi to'plami"],
            detailsTitle: "Tavsif",
            amenitiesTitle: "Qulayliklar",
            bookBtn: "Band Qilish",
            contactTitle: "Osoyishta Hashamat",
            contactText: "Minor Oq lyuksi o'ziga xos muhit taklif etadi. Wellness xizmatlari uchun biz bilan bog'laning.",
            contactBtn: "Biz bilan bog'lanish",
            taxesNote: "* Soliqlar va to'lovlar qo'shilishi mumkin"
        },
        ru: {
            name: "Люкс Белый Минор",
            description: "Вдохновленный мечетью Минор, этот люкс отличается интерьером из чистого белого мрамора и спокойным видом на канал Анхор. Оазис спокойствия и чистоты в самом центре города.",
            price: "$950 / ночь",
            amenities: ["Вид на канал", "Белый мраморный интерьер", "Место для медитации", "Очистка воздуха", "Органическое белье", "Набор для чайной церемонии"],
            detailsTitle: "Описание",
            amenitiesTitle: "Удобства",
            bookBtn: "Забронировать",
            contactTitle: "Безмятежная роскошь",
            contactText: "Люкс Белый Минор предлагает уникальную атмосферу. Свяжитесь для велнес-услуг.",
            contactBtn: "Связаться с нами",
            taxesNote: "* Могут применяться налоги и сборы"
        }
    },
    "chorsu": {
        en: {
            name: "Chorsu View Deluxe",
            description: "Experience the vibrant heartbeat of Old Tashkent. This room overlooks the historic Chorsu Bazaar area, combining modern amenities with a traditional locale.",
            price: "$380 / night",
            amenities: ["Bazaar View", "Traditional Textiles", "Balcony", "Coffee Maker", "Work Desk", "Fast Wi-Fi"],
            detailsTitle: "Description",
            amenitiesTitle: "Amenities",
            bookBtn: "Book Now",
            contactTitle: "Need Help?",
            contactText: "Call us at +998 71 234 56 78 for booking assistance.",
            contactBtn: "Contact Us",
            taxesNote: "* Taxes and fees may apply"
        },
        uz: {
            name: "Chorsu Manzarali Deluxe",
            description: "Eski Toshkentning jonli urishini his eting. Ushbu xona tarixiy Chorsu bozori hududiga qaraydi, zamonaviy qulayliklar an'anaviy muhit bilan uyg'unlashgan.",
            price: "$380 / tun",
            amenities: ["Bozor manzarasi", "Milliy tekstil", "Balkon", "Kofe apparati", "Ish stoli", "Tezkor Wi-Fi"],
            detailsTitle: "Tavsif",
            amenitiesTitle: "Qulayliklar",
            bookBtn: "Band Qilish",
            contactTitle: "Yordam Kerakmi?",
            contactText: "Band qilishda yordam uchun +998 71 234 56 78 raqamiga qo'ng'iroq qiling.",
            contactBtn: "Biz bilan bog'lanish",
            taxesNote: "* Soliqlar va to'lovlar qo'shilishi mumkin"
        },
        ru: {
            name: "Делюкс Вид на Чорсу",
            description: "Ощутите живое сердце старого Ташкента. Из этого номера открывается вид на исторический базар Чорсу, сочетая современные удобства с традиционным колоритом.",
            price: "$380 / ночь",
            amenities: ["Вид на Базар", "Традиционный текстиль", "Балкон", "Кофемашина", "Рабочий стол", "Быстрый Wi-Fi"],
            detailsTitle: "Описание",
            amenitiesTitle: "Удобства",
            bookBtn: "Забронировать",
            contactTitle: "Нужна помощь?",
            contactText: "Позвоните нам по телефону +998 71 234 56 78 для помощи.",
            contactBtn: "Связаться с нами",
            taxesNote: "* Могут применяться налоги и сборы"
        }
    },
    "deluxe-suite": {
        en: {
            name: "Deluxe Suite",
            description: "Experience the height of luxury in our Deluxe Suite. Featuring a king-size bed, a private balcony with stunning city views, and a spacious living area, this suite is designed for your ultimate comfort.",
            price: "$350 / night",
            amenities: ["King Size Bed", "City View", "Free Wi-Fi", "Smart TV", "Mini Bar", "Room Service"],
            detailsTitle: "Description",
            amenitiesTitle: "Amenities",
            bookBtn: "Book Now",
            contactTitle: "Need Help?",
            contactText: "Call us at +1 234 567 8900 for assistance with your booking.", // Keeping original phone for this one as per existing code
            contactBtn: "Contact Us",
            taxesNote: "* Taxes and fees may apply"
        },
        uz: {
            name: "Deluxe Lyuks",
            description: "Bizning Deluxe Lyuks xonamizda hashamatning yuqori cho'qqisini his eting. Qirol o'lchamli karavot, shahar manzarasi ochiladigan shaxsiy balkon va keng yashash maydoni bilan jihozlangan ushbu xona sizning to'liq qulayligingiz uchun mo'ljallangan.",
            price: "$350 / tun",
            amenities: ["Qirol O'lchamli Karavot", "Shahar Manzarasi", "Bepul Wi-Fi", "Smart TV", "Mini Bar", "Xona Xizmati"],
            detailsTitle: "Tavsif",
            amenitiesTitle: "Qulayliklar",
            bookBtn: "Band Qilish",
            contactTitle: "Yordam Kerakmi?",
            contactText: "Band qilish bo'yicha yordam uchun +1 234 567 8900 raqamiga qo'ng'iroq qiling.",
            contactBtn: "Biz bilan bog'lanish",
            taxesNote: "* Soliqlar va to'lovlar qo'shilishi mumkin"
        },
        ru: {
            name: "Делюкс Люкс",
            description: "Ощутите вершину роскоши в нашем номере Делюкс Люкс. С кроватью размера 'king-size', частным балконом с потрясающим видом на город и просторной гостиной, этот люкс создан для вашего максимального комфорта.",
            price: "$350 / ночь",
            amenities: ["Кровать King Size", "Вид на город", "Бесплатный Wi-Fi", "Smart TV", "Мини-бар", "Обслуживание номеров"],
            detailsTitle: "Описание",
            amenitiesTitle: "Удобства",
            bookBtn: "Забронировать",
            contactTitle: "Нужна помощь?",
            contactText: "Позвоните нам по телефону +1 234 567 8900 для помощи с бронированием.",
            contactBtn: "Связаться с нами",
            taxesNote: "* Могут применяться налоги и сборы"
        }
    }
};

const defaultRoom = {
    en: {
        name: "Luxury Room",
        description: "Experience the height of luxury at Grand Hotel. This room features premium amenities and a comfortable atmosphere for your stay.",
        price: "Check for pricing",
        amenities: ["Queen/King Bed", "View", "Free Wi-Fi", "Smart TV", "Room Service"],
        detailsTitle: "Description",
        amenitiesTitle: "Amenities",
        bookBtn: "Book Now",
        contactTitle: "Need Help?",
        contactText: "Call us at +1 234 567 8900 assistance.",
        contactBtn: "Contact Us",
        taxesNote: "* Taxes and fees may apply"
    },
    uz: {
        name: "Hashamatli Xona",
        description: "Grand Hotelda hashamatning yuqori cho'qqisini his eting. Ushbu xona yuqori darajadagi qulayliklar va qulay muhitni taklif etadi.",
        price: "Narxni tekshiring",
        amenities: ["Queen/King Karavot", "Manzara", "Bepul Wi-Fi", "Smart TV", "Xona Xizmati"],
        detailsTitle: "Tavsif",
        amenitiesTitle: "Qulayliklar",
        bookBtn: "Band Qilish",
        contactTitle: "Yordam Kerakmi?",
        contactText: "Yordam uchun +1 234 567 8900 ga qo'ng'iroq qiling.",
        contactBtn: "Biz bilan bog'lanish",
        taxesNote: "* Soliqlar va to'lovlar qo'shilishi mumkin"
    },
    ru: {
        name: "Роскошный Номер",
        description: "Ощутите вершину роскоши в Гранд Отеле. Этот номер оснащен первоклассными удобствами и создает уютную атмосферу для вашего пребывания.",
        price: "Уточняйте цену",
        amenities: ["Кровать Queen/King", "Вид", "Бесплатный Wi-Fi", "Smart TV", "Обслуживание номеров"],
        detailsTitle: "Описание",
        amenitiesTitle: "Удобства",
        bookBtn: "Забронировать",
        contactTitle: "Нужна помощь?",
        contactText: "Позвоните нам по телефону +1 234 567 8900 для помощи.",
        contactBtn: "Связаться с нами",
        taxesNote: "* Могут применяться налоги и сборы"
    }
};

const roomImages: Record<string, string> = {
    "platinum": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "heritage": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "minor": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "chorsu": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "deluxe-suite": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
};

export default function RoomClient({ id }: { id: string }) {
    const { language } = useLanguage();
    const safeLang = (['en', 'uz', 'ru'].includes(language) ? language : 'en') as 'en' | 'uz' | 'ru';

    // @ts-ignore
    const room = (roomsData[id] && roomsData[id][safeLang]) || defaultRoom[safeLang];
    const imageUrl = roomImages[id] || "https://images.unsplash.com/photo-1590490360182-f33fb0e201b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

    const backLabels = {
        en: "← Back to Rooms",
        uz: "← Xonalarga qaytish",
        ru: "← Назад к номерам"
    };

    return (
        <main className={styles.main}>
            <div
                className={styles.hero}
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className={styles.overlay}>
                    <h1>{room.name}</h1>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.backLinkWrapper}>
                        <Link href="/rooms" className={styles.backLink}>
                            {backLabels[safeLang]}
                        </Link>
                    </div>

                    <div className={styles.mainContent}>
                        <div className={styles.details}>
                            <h2>{room.detailsTitle}</h2>
                            <p>{room.description}</p>

                            <h3>{room.amenitiesTitle}</h3>
                            <ul className={styles.amenities}>
                                {room.amenities.map((item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.sidebar}>
                            <div className={styles.bookingCard}>
                                <div className={styles.price}>{room.price}</div>
                                <Link href="/booking">
                                    <Button size="lg" className={styles.fullWidthBtn}>{room.bookBtn}</Button>
                                </Link>
                                <p className={styles.note}>{room.taxesNote}</p>
                            </div>

                            <div className={styles.contactCard}>
                                <h3>{room.contactTitle}</h3>
                                <p>{room.contactText}</p>
                                <Link href="/contact">
                                    <Button variant="outline" size="sm" className={styles.fullWidthBtn}>{room.contactBtn}</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
