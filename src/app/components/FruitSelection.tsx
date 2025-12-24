"use client";

import { useState } from "react";
import styles from "./FruitSelection.module.css";
import { useLanguage } from "../context/LanguageContext";
import Button from "./Button";

interface FruitOption {
    id: string;
    name: string;
    desc: string;
    image: string;
}

export default function FruitSelection({ onConfirm }: { onConfirm: (selection: string) => void }) {
    const { dict } = useLanguage();
    const [selected, setSelected] = useState<string | null>(null);

    const options: FruitOption[] = [
        {
            id: "fergana",
            name: dict.bonus.option1,
            desc: dict.bonus.option1Desc,
            image: "https://images.unsplash.com/photo-1611080626919-7cf5a969fc8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "samarkand",
            name: dict.bonus.option2,
            desc: dict.bonus.option2Desc,
            image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "global",
            name: dict.bonus.option3,
            desc: dict.bonus.option3Desc,
            image: "https://images.unsplash.com/photo-1540331034867-52997dcab074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span className={styles.crownIcon}>👑</span>
                    <h2>{dict.bonus.title}</h2>
                    <p>{dict.bonus.subtitle}</p>
                </div>

                <div className={styles.grid}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`${styles.card} ${selected === option.id ? styles.active : ""}`}
                            onClick={() => setSelected(option.id)}
                        >
                            <div className={styles.imageWrapper}>
                                <img src={option.image} alt={option.name} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3>{option.name}</h3>
                                <p>{option.desc}</p>
                            </div>
                            {selected === option.id && <div className={styles.checkMark}>✓</div>}
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <Button
                        variant="primary"
                        size="lg"
                        disabled={!selected}
                        onClick={() => selected && onConfirm(selected)}
                    >
                        {dict.bonus.confirm}
                    </Button>
                </div>
            </div>
        </div>
    );
}
