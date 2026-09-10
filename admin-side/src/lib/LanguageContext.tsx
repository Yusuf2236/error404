"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { Language, translations } from './translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations['en']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function subscribe(callback: () => void) {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
}

function getSnapshot(): Language {
    const saved = localStorage.getItem('admin_lang') as Language;
    return (saved === 'uz' || saved === 'ru' || saved === 'en') ? saved : 'uz';
}

function getServerSnapshot(): Language {
    return 'uz';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const storeLang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const [overrideLang, setOverrideLang] = useState<Language | null>(null);

    const language = overrideLang ?? storeLang;

    const handleSetLanguage = (lang: Language) => {
        setOverrideLang(lang);
        localStorage.setItem('admin_lang', lang);
    };

    const t = (key: keyof typeof translations['en']): string => {
        return translations[language][key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}
