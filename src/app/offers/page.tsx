import styles from "./page.module.css";
import Button from "../components/Button";
import Link from "next/link";

const offers = [
    {
        id: "honeymoon-special",
        title: "Honeymoon Enchantment",
        description: "Celebrate your love with a romantic 3-night stay in our Deluxe Suite. Includes a candlelit dinner, rose petal turndown, and daily champagne breakfast.",
        discount: "25% OFF",
        price: "From $850",
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "business-efficiency",
        title: "Business Elite Package",
        description: "Designed for the modern professional. Includes high-speed premium Wi-Fi, 24/7 lounge access, laundry service, and early check-in.",
        discount: "FREE UPGRADE",
        price: "From $250",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "weekend-escape",
        title: "Weekend Escape",
        description: "Recharge with our special weekend rate. Stay Friday & Saturday and get Sunday at 50% off. Includes complimentary spa access.",
        discount: "SUNDAY 50% OFF",
        price: "From $400",
        imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

export default function Offers() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Special Offers</h1>
                <p>Curated packages and seasonal deals for an unforgettable stay.</p>
            </header>

            <div className={styles.container}>
                <div className={styles.offersGrid}>
                    {offers.map((offer) => (
                        <div key={offer.id} className={styles.offerCard}>
                            <div
                                className={styles.image}
                                style={{ backgroundImage: `url(${offer.imageUrl})` }}
                            >
                                <div className={styles.badge}>{offer.discount}</div>
                            </div>
                            <div className={styles.content}>
                                <h2>{offer.title}</h2>
                                <p>{offer.description}</p>
                                <div className={styles.footer}>
                                    <div className={styles.priceInfo}>
                                        <p className={styles.label}>Starting At</p>
                                        <p className={styles.price}>{offer.price}</p>
                                    </div>
                                    <Link href={`/booking?offer=${offer.id}`}>
                                        <Button>Claim Offer</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
