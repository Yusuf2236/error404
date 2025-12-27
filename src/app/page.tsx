"use client";

import Link from "next/link";
import styles from "./page.module.css";
import Button from "./components/Button";
import RoomCard from "./components/RoomCard";
import LocalExplorer from "./components/LocalExplorer";
import { useLanguage } from "./context/LanguageContext";
import BusinessDashboard from "./components/BusinessDashboard";

export default function Home() {
  const { dict, language } = useLanguage();

  const featuredRooms = [
    {
      id: "vip-platinum-suite",
      name: { en: "Platinum Panorama Suite", uz: "Platina Panorama Lyuksi", ru: "Платиновый Панорамный Люкс" },
      description: { en: "270-degree view of Tashkent City and the Humo Arena.", uz: "Toshkent City va Humo Arena-ga 270 darajali ko'rinish.", ru: "270-градусный вид на Ташкент Сити и Хумо Арену." },
      price: 550,
      imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "samarkand-royal",
      name: { en: "Amir Temur Heritage Suite", uz: "Amir Temur Merosi Lyuksi", ru: "Люкс Наследие Амира Темура" },
      description: { en: "Grand space featuring replicas of Samarkand's architectural wonders.", uz: "Samarqand me'moriy mo'jizalarining nusxalari bilan bezatilgan keng xona.", ru: "Пространство с репликами архитектурных чудес Самарканда." },
      price: 2500,
      imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "minor-white-suite",
      name: { en: "Minor White Suite", uz: "Minor Oq Lyuksi", ru: "Люкс Белый Минор" },
      description: { en: "Pure white marble interiors with views of the Anhor canal.", uz: "Oq marmar interyer va Anhor kanali ko'rinishiga ega.", ru: "Интерьер из белого мрамора с видом на канал Анхор." },
      price: 950,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.glassTitle}>
            <h1 className={styles.title}>{dict.hero.title2}</h1>
            <p className={styles.subtitle}>{dict.hero.subtitle}</p>
          </div>
          <div className={styles.ctaGroup}>
            <Link href="/rooms">
              <Button variant="primary" size="lg">{dict.hero.viewRooms}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">{dict.hero.contactUs}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>{dict.rooms.title}</h2>
          <p>{dict.rooms.subtitle}</p>
        </div>
        <div className={styles.grid}>
          {featuredRooms.map(room => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name[language as keyof typeof room.name] || room.name.en}
              description={room.description[language as keyof typeof room.description] || room.description.en}
              price={`$${room.price} ${dict.rooms.night}`}
              imageUrl={room.imageUrl}
            />
          ))}
        </div>
        <div className={styles.centerBtn}>
          <Link href="/rooms">
            <Button variant="outline" className={styles.darkOutlineBtn}>{dict.rooms.all} {dict.nav.rooms}</Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className={`${styles.section} ${styles.bgWrapper}`}>
        <div className={styles.bgOverlay}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.whiteText}>Tashkent&apos;s Finest Amenities</h2>
            <p className={styles.whiteText}>Traditional hospitality meets 21st-century luxury.</p>
          </div>
          <div className={styles.servicesGrid}>
            <div className={styles.glassServiceItem}>
              <span className={styles.icon}>🍽️</span>
              <h3>Uzbek Fine Dining</h3>
              <p>Experience the legendary flavors of Uzbekistan by Michelin-star chefs.</p>
            </div>
            <div className={styles.glassServiceItem}>
              <span className={styles.icon}>🧖‍♀️</span>
              <h3>Royal Spa & Hammam</h3>
              <p>Relax in authentic marble rituals from ancient Bukhara.</p>
            </div>
            <div className={styles.glassServiceItem}>
              <span className={styles.icon}>🏊‍♂️</span>
              <h3>Infinity Sky Pool</h3>
              <p>Swim across the skyline in our heated rooftop infinity pool.</p>
            </div>
            <div className={styles.glassServiceItem}>
              <span className={styles.icon}>🚗</span>
              <h3>VIP Chauffeur</h3>
              <p>Private luxury fleet available for your city explorations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Dashboard Section */}
      <BusinessDashboard />

      {/* Local Explorer Section */}
      <LocalExplorer />

      {/* Testimonials Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Elite Guest Experiences</h2>
          <p>Voices from the pinnacle of Tashkent hospitality.</p>
        </div>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCardGlass}>
            <div className={styles.stars}>★★★★★</div>
            <p>&quot;VIP UZBE is truly the crown jewel of Central Asia. Unparalleled privacy.&quot;</p>
            <div className={styles.guestInfo}>
              <strong>Rustam Ahmedov</strong>
              <span>CEO, Digital Uzbekistan</span>
            </div>
          </div>
          <div className={styles.testimonialCardGlass}>
            <div className={styles.stars}>★★★★★</div>
            <p>&quot;The Amir Temur suite was a journey through time with all modern comforts.&quot;</p>
            <div className={styles.guestInfo}>
              <strong>Elena Petrova</strong>
              <span>Global Travel Editor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2>Join the Elite Circle</h2>
          <p>Receive exclusive invitations to VIP events in Tashkent.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="concierge@vipuzbe.com" required className={styles.newsletterInput} />
            <Button variant="primary">Subscribe</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
