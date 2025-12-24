"use client";

import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function ClientAbout() {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "The Vision & Legacy of VIP UZBE",
            p1: "Located in the beating heart of Tashkent at 77 Amir Temur Avenue, VIP UZBE is more than a hotel—it is a symbol of Uzbekistan's rising luxury hospitality. Born from a vision to blend ancient Silk Road traditions with 21st-century modernism, we offer an experience that is uniquely Uzbek and globally elite.",
            p2: "Our architecture pays homage to the turquoise domes of Samarkand, while our interiors feature hand-crafted wood from Khiva and silk from Margilan. Every floor tells a story of our heritage.",
            detailedTitle: "Uncompromising Excellence",
            p3: "At VIP UZBE, we believe that true luxury lies in the details that others overlook. We maintain a staff-to-guest ratio of 3:1, ensuring that your needs are anticipated even before you voice them.",
            mission: "Our Mission",
            missionText: "To provide world-class service that makes every guest feel like royalty, while preserving and promoting the rich cultural tapestry of Uzbekistan.",
            approach: "Our Philosophy",
            approachText: "We believe in 'Mehmondo'stlik'—the sacred Uzbek tradition of hospitality where the guest is a blessing."
        },
        uz: {
            title: "VIP UZBE Viziyasi va Merosi",
            p1: "Toshkentning qoq markazida, Amir Temur shoh ko'chasi 77-uyda joylashgan VIP UZBE shunchaki mehmonxona emas — u O'zbekistonning yuksalib borayotgan hashamatli mehmondo'stlik ramzidir.",
            p2: "Bizning arxitektura Samarqandning moviy gumbazlaridan ilhomlangan, interyerimizda esa Xivaning qo'l mehnati bilan ishlangan yog'ochlari va Marg'ilonning shoyi matolari ishlatilgan.",
            detailedTitle: "Murosasiz Mukammallik",
            p3: "VIP UZBE'da biz haqiqiy hashamat boshqalar e'tibordan chetda qoldiradigan tafsilotlarda ekanligiga ishonamiz. Biz xodimlar va mehmonlar nisbatini 3:1 darajasida saqlaymiz.",
            mission: "Bizning maqsadimiz",
            missionText: "Har bir mehmon o'zini qirollardek his qilishi uchun jahon andozalaridagi xizmatni taqdim etish va O'zbekistonning boy madaniy merosini targ'ib qilish.",
            approach: "Bizning falsafamiz",
            approachText: "Biz 'Mehmondo'stlik'ka ishonamiz — bu o'zbek xalqining muqaddas an'anasi."
        },
        ru: {
            title: "Видение и Наследие VIP UZBE",
            p1: "Расположенный в самом сердце Ташкента на проспекте Амира Темура 77, VIP UZBE — это больше, чем отель. Это символ растущего сектора роскошного гостеприимства Узбекистана.",
            p2: "Наша архитектура отдает дань уважения бирюзовым куполам Самарканда, а в интерьерах используется резьба по дереву из Хивы и шелк из Маргилана.",
            detailedTitle: "Бескомпромиссное Совершенство",
            p3: "В VIP UZBE мы верим, что истинная роскошь кроется в деталях, которые другие упускают из виду. Мы поддерживаем соотношение персонала к гостям 3:1.",
            mission: "Наша миссия",
            missionText: "Предоставлять сервис мирового класса, чтобы каждый гость чувствовал себя королем, сохраняя и продвигая богатое культурное наследие Узбекистана.",
            approach: "Наша философия",
            approachText: "Мы верим в 'Mehmondo'stlik' — священную узбекскую традицию гостеприимства."
        }
    };

    const t = content[language as keyof typeof content] || content.en;

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.heroOverlay}>
                    <h1>{t.title}</h1>
                </div>
            </header>
            <div className={styles.container}>
                <section className={styles.content}>
                    <div className={styles.glassCard}>
                        <div className={styles.textSection}>
                            <p className={styles.boldText}>{t.p1}</p>
                            <p className={styles.boldText}>{t.p2}</p>
                        </div>

                        <div className={styles.detailedSection}>
                            <h2 className={styles.goldTitle}>{t.detailedTitle}</h2>
                            <p className={styles.boldText}>{t.p3}</p>
                        </div>

                        <div className={styles.philosophyGrid}>
                            <div className={styles.miniCard}>
                                <h3>{t.mission}</h3>
                                <p className={styles.boldText}>{t.missionText}</p>
                            </div>
                            <div className={styles.miniCard}>
                                <h3>{t.approach}</h3>
                                <p className={styles.boldText}>{t.approachText}</p>
                            </div>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <strong>150+</strong>
                                <span>Elite Rooms</span>
                            </div>
                            <div className={styles.statItem}>
                                <strong>3:1</strong>
                                <span>Staff Ratio</span>
                            </div>
                            <div className={styles.statItem}>
                                <strong>24/7</strong>
                                <span>VIP Security</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
