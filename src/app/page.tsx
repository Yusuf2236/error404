"use client";

import Link from "next/link";
import styles from "./page.module.css";
import Button from "./components/Button";
import RoomCard from "./components/RoomCard";
import LocalExplorer from "./components/LocalExplorer";
import FAQ from "./components/FAQ";
import { useLanguage } from "./context/LanguageContext";
import BusinessDashboard from "./components/BusinessDashboard";
import ScrollReveal from "./components/ScrollReveal";
import { ROOMS, Room } from "@/lib/rooms";
import { useEffect, useState } from "react";

export default function Home() {
  const { dict, language } = useLanguage();
  const [occupiedRoomIds, setOccupiedRoomIds] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/rooms/availability')
      .then(res => res.json())
      .then(data => setOccupiedRoomIds(data.occupied || []))
      .catch(() => { });
  }, []);

  const featuredRooms = ROOMS.slice(0, 3);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <ScrollReveal animation="zoomIn" duration={0.8} className={styles.glassTitle}>
            <h1 className={styles.title}>{dict.hero.title2}</h1>
            <p className={styles.subtitle}>{dict.hero.subtitle}</p>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.3} className={styles.ctaGroup}>
            <Link href="/rooms">
              <Button variant="primary" size="lg">{dict.hero.viewRooms}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">{dict.hero.contactUs}</Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className={styles.section}>
        <ScrollReveal animation="fadeUp" className={styles.sectionHeader}>
          <h2>{dict.rooms.title}</h2>
          <p>{dict.rooms.subtitle}</p>
        </ScrollReveal>
        <div className={styles.grid}>
          {featuredRooms.map((room: Room, index: number) => (
            <ScrollReveal key={`${room.id}-${index}`} animation="fadeUp" delay={index * 0.1}>
              <RoomCard
                id={room.id}
                name={room.name[language as keyof typeof room.name] || room.name.en}
                description={room.description[language as keyof typeof room.description] || room.description.en}
                price={`$${room.price} ${dict.rooms.night}`}
                imageUrl={room.imageUrl}
                isBooked={occupiedRoomIds.includes(room.id)}
              />
            </ScrollReveal>
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
          <ScrollReveal animation="slideLeft" className={styles.sectionHeader}>
            <h2 className={styles.whiteText}>{dict.servicesHome.title}</h2>
            <p className={styles.whiteText}>{dict.servicesHome.subtitle}</p>
          </ScrollReveal>
          <div className={styles.servicesGrid}>
            <ScrollReveal animation="zoomIn" delay={0.1} className={styles.glassServiceItem}>
              <span className={styles.icon}>🍽️</span>
              <h3>{dict.servicesHome.diningTitle}</h3>
              <p>{dict.servicesHome.diningDesc}</p>
            </ScrollReveal>
            <ScrollReveal animation="zoomIn" delay={0.2} className={styles.glassServiceItem}>
              <span className={styles.icon}>🧖‍♀️</span>
              <h3>{dict.servicesHome.spaTitle}</h3>
              <p>{dict.servicesHome.spaDesc}</p>
            </ScrollReveal>
            <ScrollReveal animation="zoomIn" delay={0.3} className={styles.glassServiceItem}>
              <span className={styles.icon}>🏊‍♂️</span>
              <h3>{dict.servicesHome.poolTitle}</h3>
              <p>{dict.servicesHome.poolDesc}</p>
            </ScrollReveal>
            <ScrollReveal animation="zoomIn" delay={0.4} className={styles.glassServiceItem}>
              <span className={styles.icon}>🚗</span>
              <h3>{dict.servicesHome.chauffeurTitle}</h3>
              <p>{dict.servicesHome.chauffeurDesc}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Business Dashboard Section */}
      <ScrollReveal animation="fadeUp">
        <BusinessDashboard />
      </ScrollReveal>

      {/* Local Explorer Section */}
      <ScrollReveal animation="fadeUp">
        <LocalExplorer />
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal animation="fadeUp">
        <FAQ />
      </ScrollReveal>

      {/* Testimonials Section */}
      <section className={styles.section}>
        <ScrollReveal animation="slideRight" className={styles.sectionHeader}>
          <h2>{dict.testimonialsHome.title}</h2>
          <p>{dict.testimonialsHome.subtitle}</p>
        </ScrollReveal>
        <div className={styles.testimonialsGrid}>
          <ScrollReveal animation="slideLeft" delay={0.2} className={styles.testimonialCardGlass}>
            <div className={styles.stars}>★★★★★</div>
            <p>&quot;{dict.testimonials.guest1.text}&quot;</p>
            <div className={styles.guestInfo}>
              <strong>{dict.testimonials.guest1.name}</strong>
              <span>{dict.testimonials.guest1.location}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slideRight" delay={0.2} className={styles.testimonialCardGlass}>
            <div className={styles.stars}>★★★★★</div>
            <p>&quot;{dict.testimonials.guest2.text}&quot;</p>
            <div className={styles.guestInfo}>
              <strong>{dict.testimonials.guest2.name}</strong>
              <span>{dict.testimonials.guest2.location}</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <ScrollReveal animation="zoomIn" className={styles.newsletterContent}>
          <h2>{dict.newsletter.title}</h2>
          <p>{dict.newsletter.subtitle}</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={dict.newsletter.placeholder}
              required
              className={styles.newsletterInput}
            />
            <Button variant="primary">{dict.newsletter.button}</Button>
          </form>
        </ScrollReveal>
      </section>
    </main>
  );
}
