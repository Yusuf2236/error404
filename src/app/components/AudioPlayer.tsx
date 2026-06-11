"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./AudioPlayer.module.css";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2;
            if (isPlaying) {
                // Silently handle browser autoplay restrictions
                audioRef.current.play().catch(() => {
                    // Audio play blocked by browser - this is expected behavior
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);


    return (
        <div className={styles.container}>
            <audio
                ref={audioRef}
                loop
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3"
            />
            <button
                className={`${styles.audioToggle} ${isPlaying ? styles.active : ""}`}
                onClick={() => setIsPlaying(!isPlaying)}
            >
                <div className={styles.iconWrapper}>
                    {isPlaying ? (
                        <div className={styles.soundwaves}>
                            <span className={styles.wave}></span>
                            <span className={styles.wave}></span>
                            <span className={styles.wave}></span>
                        </div>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                    )}
                </div>
                <span className={styles.label}>{isPlaying ? "Ambient Harmony" : "Muted"}</span>
            </button>
        </div>
    );
}
