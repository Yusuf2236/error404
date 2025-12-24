"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./AIChatBot.module.css";
import { useLanguage } from "../context/LanguageContext";

interface Message {
    role: "bot" | "user";
    text: string;
}

export default function AIChatBot() {
    const { language, dict } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const knowledgeBase: Record<string, Record<string, string>> = {
        en: {
            "greeting": "Hello! I am your VIP UZBE virtual concierge. How can I assist you today?",
            "rooms": "We offer 150+ elite rooms, including the Platinum Panorama Suite, Amir Temur Heritage Suite, and Minor White Suite. Prices start at $380/night.",
            "location": "We are located at 77 Amir Temur Avenue, in the prestigious center of Tashkent, Uzbekistan.",
            "services": "Our luxury services include Silk Road Dining, Royal Spa & Hammam, Elite Security Detail, and VIP Helicopter transfers.",
            "booking": "You can book directly through our 'Rooms' page or contact our reservations desk at reservations@vipuzbe.com.",
            "default": "I'm sorry, I don't have information on that. Would you like me to connect you with our 24/7 human concierge?"
        },
        uz: {
            "greeting": "Assalomu alaykum! Men VIP UZBE virtual konsyerji yordamchisiman. Sizga qanday yordam bera olaman?",
            "rooms": "Bizda 150 dan ortiq elita xonalar mavjud, jumladan Platina Panorama, Amir Temur Merosi va Minor Oq lyukslari. Narxlar kechasiga $380 dan boshlanadi.",
            "location": "Biz Toshkentning nufuzli markazida, Amir Temur shoh ko'chasi 77-uyda joylashganmiz.",
            "services": "Bizning hashamatli xizmatlarimizga Buyuk Ipak Yo'li taomlari, Qirollik Hammomi, Elita xavfsizlik va VIP vertolyot transferlari kiradi.",
            "booking": "Siz to'g'ridan-to'g'ri 'Xonalar' sahifasidan yoki reservations@vipuzbe.com orqali band qilishingiz mumkin.",
            "default": "Uzr, bu haqda ma'lumotga ega emasman. Sizni 24/7 ishlaydigan xodimimiz bilan bog'lashimni xohlaysizmi?"
        },
        ru: {
            "greeting": "Здравствуйте! Я ваш виртуальный консьерж VIP UZBE. Чем я могу вам помочь сегодня?",
            "rooms": "Мы предлагаем более 150 элитных номеров, включая Платиновый Панорамный Люкс и Люкс Наследие Амира Темура. Цены начинаются от $380 за ночь.",
            "location": "Мы находимся по адресу Проспект Амира Темура 77, в престижном центре Ташкента.",
            "services": "Наши услуги включают кухню Шелкового пути, Королевский Хаммам и Спа, элитную охрану и VIP-вертолетные трансферы.",
            "booking": "Вы можете забронировать номер на странице 'Номера' или по адресу reservations@vipuzbe.com.",
            "default": "Извините, у меня нет информации по этому вопросу. Хотите, чтобы я соединил вас с нашим круглосуточным живым консьержем?"
        }
    };

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ role: "bot", text: knowledgeBase[language as keyof typeof knowledgeBase]?.greeting || knowledgeBase.en.greeting }]);
        }
    }, [language]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input.toLowerCase();
        const newMessages: Message[] = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        setTimeout(() => {
            let botResponse = knowledgeBase[language as keyof typeof knowledgeBase]?.default || knowledgeBase.en.default;

            if (userMsg.includes("room") || userMsg.includes("price") || userMsg.includes("xona") || userMsg.includes("narx") || userMsg.includes("номер")) {
                botResponse = knowledgeBase[language as keyof typeof knowledgeBase]?.rooms || knowledgeBase.en.rooms;
            } else if (userMsg.includes("location") || userMsg.includes("where") || userMsg.includes("manzil") || userMsg.includes("qayerda") || userMsg.includes("адрес")) {
                botResponse = knowledgeBase[language as keyof typeof knowledgeBase]?.location || knowledgeBase.en.location;
            } else if (userMsg.includes("service") || userMsg.includes("spa") || userMsg.includes("food") || userMsg.includes("xizmat") || userMsg.includes("taom") || userMsg.includes("услуги")) {
                botResponse = knowledgeBase[language as keyof typeof knowledgeBase]?.services || knowledgeBase.en.services;
            } else if (userMsg.includes("book") || userMsg.includes("reserve") || userMsg.includes("band") || userMsg.includes("bron") || userMsg.includes("забронировать")) {
                botResponse = knowledgeBase[language as keyof typeof knowledgeBase]?.booking || knowledgeBase.en.booking;
            }

            setMessages([...newMessages, { role: "bot", text: botResponse }]);
        }, 600);
    };

    return (
        <>
            <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><circle cx="9" cy="9" r="1.5"></circle><circle cx="15" cy="9" r="1.5"></circle><path d="M9 13c1.5 1 4.5 1 6 0"></path></svg>
                )}
            </button>

            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <h3>VIP UZBE Assistant</h3>
                        <div className={styles.statusBadge}>
                            <span className={styles.pulse}></span>
                            Online 24/7
                        </div>
                    </div>
                    <div className={styles.messages}>
                        {messages.map((m, i) => (
                            <div key={i} className={m.role === "bot" ? styles.botMsg : styles.userMsg}>
                                {m.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSend} className={styles.sendBtn}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
