import Link from "next/link";
import Button from "../../components/Button";
import styles from "./page.module.css";

// This would typically fetch data from an API or database
const getRoomData = (id: string) => {
    const rooms: Record<string, any> = {
        "deluxe-suite": {
            name: "Deluxe Suite",
            description: "Experience the height of luxury in our Deluxe Suite. Featuring a king-size bed, a private balcony with stunning city views, and a spacious living area, this suite is designed for your ultimate comfort.",
            price: "$350 / night",
            amenities: ["King Size Bed", "City View", "Free Wi-Fi", "Smart TV", "Mini Bar", "Room Service"],
            imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        },
        // Add other rooms here or fetch dynamically. 
        // For prototype, we'll return a default structure if not found or handle it better.
    };

    return rooms[id] || {
        name: "Luxury Room",
        description: "Experience the height of luxury at Grand Hotel. This room features premium amenities and a comfortable atmosphere for your stay.",
        price: "Check for pricing",
        amenities: ["Queen/King Bed", "View", "Free Wi-Fi", "Smart TV", "Room Service"],
        imageUrl: "https://images.unsplash.com/photo-1590490360182-f33fb0e201b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };
};

export default async function RoomDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const room = getRoomData(id);

    return (
        <main className={styles.main}>
            <div
                className={styles.hero}
                style={{ backgroundImage: `url(${room.imageUrl})` }}
            >
                <div className={styles.overlay}>
                    <h1>{room.name}</h1>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.details}>
                        <h2>Description</h2>
                        <p>{room.description}</p>

                        <h3>Amenities</h3>
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
                                <Button size="lg" className={styles.fullWidthBtn}>Book Now</Button>
                            </Link>
                            <p className={styles.note}>* Taxes and fees may apply</p>
                        </div>

                        <div className={styles.contactCard}>
                            <h3>Need Help?</h3>
                            <p>Call us at +1 234 567 8900 for assistance with your booking.</p>
                            <Link href="/contact">
                                <Button variant="outline" size="sm" className={styles.fullWidthBtn}>Contact Us</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
