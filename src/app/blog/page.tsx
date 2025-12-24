import Link from "next/link";
import styles from "./page.module.css";
import Button from "../components/Button";

const posts = [
    {
        slug: "top-5-luxury-travel-trends-2026",
        title: "Top 5 Luxury Travel Trends for 2026",
        excerpt: "From ultra-exclusive stays to personalized wellness retreats, discover what's shaping the future of luxury travel.",
        date: "Dec 20, 2025",
        author: "James Wilson",
        imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        slug: "michelin-dining-at-grand-hotel",
        title: "Experience Michelin-Starred Dining in the Heart of the City",
        excerpt: "Join us for a culinary journey through our newest tasting menu, crafted by Chef de Cuisine Andre Morel.",
        date: "Dec 15, 2025",
        author: "Elena Rossi",
        imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        slug: "the-art-of-relaxation-spa-guide",
        title: "The Art of Relaxation: A Guide to Our Award-Winning Spa",
        excerpt: "Discover the healing power of our exclusive signature treatments designed to rejuvenate your body and soul.",
        date: "Dec 10, 2025",
        author: "Sarah Brown",
        imageUrl: "https://images.unsplash.com/photo-1544161515-4ae6b908658b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

export default function Blog() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Grand Hotel Stories</h1>
                <p>Insights, updates, and news from our luxury world.</p>
            </header>

            <div className={styles.container}>
                <div className={styles.postGrid}>
                    {posts.map((post) => (
                        <article key={post.slug} className={styles.postCard}>
                            <div
                                className={styles.postImage}
                                style={{ backgroundImage: `url(${post.imageUrl})` }}
                            ></div>
                            <div className={styles.postContent}>
                                <div className={styles.postMeta}>
                                    <span>{post.date}</span> • <span>{post.author}</span>
                                </div>
                                <h2>{post.title}</h2>
                                <p>{post.excerpt}</p>
                                <Link href={`/blog/${post.slug}`}>
                                    <Button variant="outline" size="sm" className={styles.readMoreBtn}>Read More</Button>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
