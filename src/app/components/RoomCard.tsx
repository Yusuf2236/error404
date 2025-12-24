"use client";

import Link from "next/link";
import styles from "./RoomCard.module.css";
import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

interface RoomCardProps {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl?: string;
    specs?: {
        area: string;
        bed: string;
        floor: string;
        capacity: string;
    };
}

export default function RoomCard({ id, name, description, price, imageUrl, specs }: RoomCardProps) {
    const { dict } = useLanguage();

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={imageUrl || 'https://images.unsplash.com/photo-1542314844-0731cc8d0959?q=80'}
                    alt={`${name} - VIP UZBE Luxury Suite`}
                    className={styles.image}
                    loading="lazy"
                />
            </div>
            <div className={styles.cardContent}>
                <h3>{name}</h3>
                <div className={styles.descriptionWrapper}>
                    <p className={styles.description}>{description}</p>
                </div>

                {specs && (
                    <div className={styles.specs}>
                        <div className={styles.specItem}>📐 <strong>{specs.area}</strong></div>
                        <div className={styles.specItem}>🛌 <strong>{specs.bed}</strong></div>
                        <div className={styles.specItem}>🏢 <strong>{specs.floor}</strong></div>
                        <div className={styles.specItem}>👥 <strong>{specs.capacity}</strong></div>
                    </div>
                )}

                <div className={styles.footer}>
                    <div className={styles.price}>{price}</div>
                    <Link href={`/rooms/${id}`}>
                        <Button variant="secondary" size="sm" className={styles.boldBtn}>{dict.rooms.details}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
