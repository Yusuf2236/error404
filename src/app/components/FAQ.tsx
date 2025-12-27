"use client";

import React from 'react';
import styles from './FAQ.module.css';
import { useLanguage } from '../context/LanguageContext';

const FAQ = () => {
    const { dict } = useLanguage();
    const faq = dict.faq;

    if (!faq) return null;

    const questions = [
        { q: faq.q1, a: faq.a1 },
        { q: faq.q2, a: faq.a2 },
        { q: faq.q3, a: faq.a3 },
        { q: faq.q4, a: faq.a4 },
        { q: faq.q5, a: faq.a5 },
        { q: faq.q6, a: faq.a6 },
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>{faq.title}</h2>
                <p className={styles.subtitle}>{faq.subtitle}</p>

                <div className={styles.grid}>
                    {questions.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <h3 className={styles.question}>{item.q}</h3>
                            <p className={styles.answer}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
