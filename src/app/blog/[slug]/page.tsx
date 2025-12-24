import styles from "./page.module.css";
import Link from "next/link";
import Button from "../../components/Button";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <main className={styles.main}>
            <article className={styles.post}>
                <header className={styles.postHeader}>
                    <div className={styles.container}>
                        <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
                        <h1>{slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h1>
                        <div className={styles.meta}>
                            Published on Dec 20, 2025 by James Wilson
                        </div>
                    </div>
                </header>

                <div className={styles.content}>
                    <div className={styles.featuredImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)' }}></div>
                    <div className={styles.container}>
                        <p className={styles.lead}>
                            In an era where travelers seek more than just a place to stay, the definition of luxury is rapidly evolving.
                            From ultra-exclusive experiences to highly personalized services, here is what the future holds.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <h2>1. Personalized Everything</h2>
                        <p>
                            Modern luxury travelers expect services that are tailored specifically to their needs and preferences.
                            This goes beyond just knowing their name; it's about anticipating their requirements before they even ask.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <blockquote className={styles.quote}>
                            "True luxury is not about what you have, but how you feel when you are there."
                        </blockquote>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>
                </div>
            </article>

            <section className={styles.related}>
                <div className={styles.container}>
                    <h3>Continue Reading</h3>
                    <div className={styles.relatedGrid}>
                        <div className={styles.relatedItem}>
                            <h4>The Art of Relaxation</h4>
                            <Link href="/blog/the-art-of-relaxation-spa-guide">Read More</Link>
                        </div>
                        <div className={styles.relatedItem}>
                            <h4>Michelin Dining Experience</h4>
                            <Link href="/blog/michelin-dining-at-grand-hotel">Read More</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
