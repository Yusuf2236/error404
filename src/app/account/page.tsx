import styles from "./page.module.css";
import Button from "../components/Button";

export default function Account() {
    const user = {
        name: "John Doe",
        email: "john@example.com",
        memberSince: "Jan 2024",
        loyaltyPoints: 1250,
        status: "Gold Member"
    };

    const bookings = [
        {
            id: "BK-7890",
            room: "Deluxe Suite",
            checkIn: "Dec 28, 2025",
            checkOut: "Jan 02, 2026",
            status: "Upcoming",
            price: "$1,750"
        },
        {
            id: "BK-4562",
            room: "Standard Room",
            checkIn: "Oct 12, 2025",
            checkOut: "Oct 15, 2025",
            status: "Completed",
            price: "$600"
        }
    ];

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <div className={styles.userBrief}>
                        <div className={styles.avatar}>JD</div>
                        <h3>{user.name}</h3>
                        <p className={styles.status}>{user.status}</p>
                    </div>
                    <nav className={styles.nav}>
                        <button className={`${styles.navItem} ${styles.active}`}>My Bookings</button>
                        <button className={styles.navItem}>Personal Details</button>
                        <button className={styles.navItem}>Loyalty Rewards</button>
                        <button className={styles.navItem}>Preferences</button>
                        <button className={`${styles.navItem} ${styles.logout}`}>Sign Out</button>
                    </nav>
                </aside>

                <section className={styles.content}>
                    <header className={styles.contentHeader}>
                        <h1>My Bookings</h1>
                        <p>You have {bookings.filter(b => b.status === "Upcoming").length} upcoming stay.</p>
                    </header>

                    <div className={styles.bookingList}>
                        {bookings.map((booking) => (
                            <div key={booking.id} className={styles.bookingCard}>
                                <div className={styles.bookingHeader}>
                                    <span className={styles.bookingId}>{booking.id}</span>
                                    <span className={`${styles.badge} ${styles[booking.status.toLowerCase()]}`}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div className={styles.bookingBody}>
                                    <div className={styles.roomInfo}>
                                        <h3>{booking.room}</h3>
                                        <p>{booking.checkIn} — {booking.checkOut}</p>
                                    </div>
                                    <div className={styles.priceInfo}>
                                        <p className={styles.label}>Total Price</p>
                                        <p className={styles.price}>{booking.price}</p>
                                    </div>
                                </div>
                                <div className={styles.bookingFooter}>
                                    {booking.status === "Upcoming" ? (
                                        <>
                                            <Button variant="outline" size="sm">Modify</Button>
                                            <Button variant="secondary" size="sm">Manage Stay</Button>
                                        </>
                                    ) : (
                                        <Button variant="outline" size="sm">View Receipt</Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.loyaltyBanner}>
                        <div className={styles.bannerContent}>
                            <h3>Loyalty Rewards</h3>
                            <p>You have <strong>{user.loyaltyPoints} points</strong>. You're only 250 points away from Platinum status!</p>
                        </div>
                        <Button variant="primary" size="sm">Explore Benefits</Button>
                    </div>
                </section>
            </div>
        </main>
    );
}
