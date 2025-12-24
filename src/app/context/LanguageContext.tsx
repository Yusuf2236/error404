"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../dictionaries/en.json";
import uz from "../dictionaries/uz.json";
import ru from "../dictionaries/ru.json";

type Language = "en" | "uz" | "ru";
type Dictionary = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    dict: Dictionary;
}

const dictionaries: Record<Language, any> = { en, uz, ru };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        const saved = localStorage.getItem("vipuzbe_lang") as Language;
        if (saved && (saved === "en" || saved === "uz" || saved === "ru")) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("vipuzbe_lang", lang);
    };

    const dict = dictionaries[language] || en;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, dict }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
