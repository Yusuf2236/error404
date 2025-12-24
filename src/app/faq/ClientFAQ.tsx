"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function ClientFAQ() {
    const { language } = useLanguage();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = {
        en: [
            { q: "What defines a VIP stay at your hotel?", a: "A VIP stay includes dedicated 24/7 concierge service, priority check-in/out, and exclusive access to the Royal Lounge and Rooftop Pool." },
            { q: "Do you offer private jet coordination?", a: "Yes, our elite travel desk can coordinate private jet arrivals at Islam Karimov International Airport including VIP terminal transfers." },
            { q: "Is the tap water safe to drink?", a: "We provide unlimited premium Tashkent mineral water in every room. We recommend using bottled water for drinking." },
            { q: "Are all dining options Halal certified?", a: "Absolutely. All meat served at VIP UZBE is 100% Halal certified, and we maintain the highest standards of Islamic dietary requirements." },
            { q: "Can you arrange an armed security detail?", a: "Yes. For our high-profile guests, we coordinate with licensed elite security firms to provide personal protection and armored transport." },
            { q: "What is the dress code for the Royal Lounge?", a: "The Royal Lounge maintains a 'Smart Elegance' dress code. We kindly ask guests to avoid sportswear and flip-flops in this area." },
            { q: "Do you assist with Uzbekistan e-Visa applications?", a: "Our concierge can provide guidance and necessary hotel documentation for your e-Visa or traditional visa application process." },
            { q: "Is there a helipad available?", a: "While we do not have an on-site helipad, we have landing arrangements at nearby secure zones with 5-minute armored transfer to the hotel." },
            { q: "Are pets allowed in the suites?", a: "We maintain a 'No Pets' policy to ensure the highest level of hypoallergenic comfort and silence for all our distinguished guests." },
            { q: "What are the check-in and check-out times?", a: "Standard check-in is at 2:00 PM and check-out is at 12:00 PM. However, VIP guests enjoy flexible timing based on suite availability." },
            { q: "Can I host a private event high above the city?", a: "Yes, our Rooftop Terrace can be reserved for exclusive events, offering 360-degree views of the Tashkent skyline." },
            { q: "Do you offer child-care services?", a: "We provide certified, multilingual professional nannies and a dedicated 'Junior VIP' activity program upon request." },
            { q: "How far is the hotel from the city center?", a: "We are located in the heart of the business and diplomatic district, just 10 minutes from Amir Temur Square." },
            { q: "Are there any hidden service fees?", a: "Transparency is our hallmark. All standard service fees are included in the quoted price. Premium requested services are billed separately." },
            { q: "Can you source rare vintage wines or local spirits?", a: "Our sommelier can source premium international vintages and the finest local aged brandies for your private collection." }
        ],
        uz: [
            { q: "Sizning mehmonxonangizdagi VIP dam olish nimani anglatadi?", a: "VIP dam olish 24/7 konsyerj xizmati, ustuvor kirish/chiqish va Qirollik dam olish xonasi hamda tom ustidagi basseynga eksklyuziv kirishni o'z ichiga oladi." },
            { q: "Shaxsiy samolyot xizmatlarini tashkillashtirasizmi?", a: "Ha, bizning elita sayohat bo'limimiz Islom Karimov nomidagi xalqaro aeroportda shaxsiy samolyotlarning qo'nishi va VIP terminal transferlarini muvofiqlashtirishi mumkin." },
            { q: "Vodoprovod suvi ichish uchun xavfsizmi?", a: "Biz har bir xonada cheksiz miqdorda yuqori sifatli Toshkent mineral suvini taqdim etamiz. Ichish uchun shisha idishdagi suvdan foydalanishni tavsiya qilamiz." },
            { q: "Barcha taomlar Halol sertifikatiga egami?", a: "Albatta. VIP UZBE-da xizmat qilinadigan barcha go'sht mahsulotlari 100% Halol sertifikatiga ega va islomiy parhez talablariga to'liq javob beradi." },
            { q: "Qurollangan xavfsizlik xizmatini tashkil qila olasizmi?", a: "Ha. Yuqori martabali mehmonlarimiz uchun biz litsenziyaga ega elita xavfsizlik kompaniyalari bilan shaxsiy himoya va zirhli transportni muvofiqlashtiramiz." },
            { q: "Qirollik dam olish xonasi uchun kiyinish qoidasi qanday?", a: "Qirollik dam olish xonasida 'Smart Elegance' (aqlli nafosat) kiyinish uslubi amal qiladi. Mehmonlardan ushbu hududda sport kiyimlari va shippaklardan foydalanamaslikni so'raymiz." },
            { q: "O'zbekiston e-Vizasi bo'yicha yordam berasizmi?", a: "Bizning konsyerj xizmati e-Viza yoki an'anaviy viza olish jarayoni uchun zarur bo'lgan yo'riqnomalar va mehmonxona hujjatlarini taqdim etishi mumkin." },
            { q: "Vertolyot maydonchasi bormi?", a: "Mehmonxona hududida vertolyot maydonchasi yo'q, ammo yaqin atrofdagi xavfsiz zonalarda qo'nish kelishuvlarimiz bor, u yerdan zirhli transportda 5 daqiqada yetib kelish mumkin." },
            { q: "Syuitalarda uy hayvonlari bilan qolish mumkinmi?", a: "Barcha mehmonlarimizga gipoallergen qulaylik va sukunatni ta'minlash maqsadida bizda 'Uy hayvonlarisiz' siyosati amal qiladi." },
            { q: "Kirish va chiqish vaqtlari qanday?", a: "Standart kirish vaqti 14:00, chiqish vaqti esa 12:00. Biroq, VIP mehmonlarimiz uchun xona bo'sh bo'lgan taqdirda moslashuvchan vaqtlar taklif etiladi." },
            { q: "Shahar tepasida shaxsiy tadbir o'tkazish mumkinmi?", a: "Ha, bizning tom ustidagi terrasamiz eksklyuziv tadbirlar uchun band qilinishi mumkin va u Toshkentning 360 darajali manzarasini taqdim etadi." },
            { q: "Bolalar uchun enaga xizmati bormi?", a: "Biz so'rov bo'yicha sertifikatlangan, ko'p tilli professional enagalar va maxsus 'Junior VIP' tadbirlar dasturini taqdim etamiz." },
            { q: "Mehmonxona shahar markazidan qanchalik uzoqda?", a: "Biz biznes va diplomatik tuman markazida, Amir Temur xiyobonidan atigi 10 daqiqalik masofada joylashganmiz." },
            { q: "Yashirin xizmat haqlari bormi?", a: "Shaffoflik - bizning ustuvorligimiz. Barcha standart xizmat haqlari ko'rsatilgan narxga kiritilgan. Qo'shimcha so'ralgan premium xizmatlar alohida hisob-kitob qilinadi." },
            { q: "Kamyob ichimliklar yoki mahalliy tilla rangli brendilarni topib bera olasizmi?", a: "Bizning sommelierimiz sizning shaxsiy kolleksiyangiz uchun premium xalqaro ichimliklar va eng yaxshi mahalliy eski brendilarni topib berishi mumkin." }
        ],
        ru: [
            { q: "Что определяет VIP-отдых в вашем отеле?", a: "VIP-отдых включает в себя круглосуточное обслуживание консьержа, приоритетную регистрацию заезда/выезда и эксклюзивный доступ в Royal Lounge и бассейн на крыше." },
            { q: "Организуете ли вы координацию частных самолетов?", a: "Да, наш элитный отдел путешествий может координировать прибытие частных самолетов в международный аэропорт имени Ислама Каримова, включая трансфер в VIP-терминал." },
            { q: "Можно ли пить воду из-под крана?", a: "Мы предоставляем неограниченное количество минеральной воды 'Ташкент' премиум-класса в каждом номере. Мы рекомендуем использовать бутилированную воду для питья." },
            { q: "Все ли блюда сертифицированы Халяль?", a: "Безусловно. Все мясо, подаваемое в VIP UZBE, сертифицировано на 100% как Халяль, и мы соблюдаем строжайшие стандарты исламских диетических требований." },
            { q: "Можете ли вы организовать вооруженную охрану?", a: "Да. Для наших статусных гостей мы сотрудничаем с лицензированными элитными охранными фирмами для обеспечения личной защиты и бронированного транспорта." },
            { q: "Какой дресс-код в Royal Lounge?", a: "В Royal Lounge действует дресс-код 'Smart Elegance'. Мы убедительно просим гостей избегать спортивной одежды и шлепанцев в этой зоне." },
            { q: "Помогаете ли вы с оформлением электронной визы в Узбекистан?", a: "Наш консьерж может предоставить руководство и необходимые документы отеля для оформления электронной или традиционной визы." },
            { q: "Есть ли у вас вертолетная площадка?", a: "Хотя на территории отеля нет вертолетной площадки, у нас есть договоренности о посадке в близлежащих безопасных зонах с 5-минутным бронированным трансфером до отеля." },
            { q: "Разрешено ли проживание с домашними животными?", a: "Мы придерживаемся политики 'Без домашних животных', чтобы обеспечить высочайший уровень гипоаллергенного комфорта и тишины для всех наших гостей." },
            { q: "Какое время заезда и выезда?", a: "Стандартный заезд в 14:00, выезд в 12:00. Однако для VIP-гостей предусмотрено гибкое время в зависимости от наличия свободных номеров." },
            { q: "Можно ли провести частное мероприятие над городом?", a: "Да, наша терраса на крыше может быть забронирована для эксклюзивных мероприятий с панорамным обзором Ташкента на 360 градусов." },
            { q: "Предоставляете ли вы услуги по уходу за детьми?", a: "Мы предоставляем услуги сертифицированных многоязычных профессиональных нянь и специальную программу мероприятий 'Junior VIP' по запросу." },
            { q: "Как далеко отель находится от центра города?", a: "Мы находимся в самом центре делового и дипломатического района, всего в 10 минутах от сквера Амира Темура." },
            { q: "Есть ли скрытые сервисные сборы?", a: "Прозрачность — наш отличительный знак. Все стандартные сервисные сборы включены в указанную стоимость. Премиальные услуги оплачиваются отдельно." },
            { q: "Можете ли вы найти редкие винтажные вина или местные напитки?", a: "Наш сомелье может подобрать премиальные международные винтажи и лучшие местные выдержанные бренди для вашей частной коллекции." }
        ]
    };

    const activeFaqs = faqs[language as keyof typeof faqs] || faqs.en;

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>{language === "uz" ? "Tez-tez so'raladigan savollar" : language === "ru" ? "Часто задаваемые вопросы" : "Frequently Asked Questions"}</h1>
            </header>
            <div className={styles.container}>
                <div className={styles.faqList}>
                    {activeFaqs.map((faq, index) => (
                        <div key={index} className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""}`}>
                            <button className={styles.question} onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                                {faq.q}
                                <span className={styles.icon}>{activeIndex === index ? "−" : "+"}</span>
                            </button>
                            <div className={styles.answer}><p>{faq.a}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
