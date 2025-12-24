"use client";

import { useState, useMemo, useEffect } from "react";
import RoomCard from "../components/RoomCard";
import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";

interface Room {
    id: string;
    type: string;
    name: {
        en: string;
        uz: string;
        ru: string;
    };
    description: {
        en: string;
        uz: string;
        ru: string;
    };
    price: number;
    imageUrl: string;
}

export default function ClientRooms() {
    const { dict, language } = useLanguage();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const dummyData: Room[] = [
                    {
                        id: "vip-platinum-suite",
                        type: "suite",
                        name: { en: "Platinum Panorama Suite", uz: "Platina Panorama Lyuksi", ru: "Платиновый Панорамный Люкс" },
                        description: { en: "Located on the 15th floor with a 270-degree view of Tashkent City.", uz: "15-qavatda joylashgan, Tashkent City-ga 270 darajali ko'rinishga ega.", ru: "Расположен на 15-м этаже с 270-градусным видом на Tashkent City." },
                        price: 550,
                        imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        id: "imperial-silk-room",
                        type: "room",
                        name: { en: "Imperial Silk Room", uz: "Imperial Shoyi Xonasi", ru: "Императорский Шелковый Номер" },
                        description: { en: "Decorated with authentic Margilan silk and hand-carved walnut furniture.", uz: "Haqiqiy Marg'ilon shoyisi va yong'oq daraxtidan ishlangan mebellar bilan bezatilgan.", ru: "Декорирован подлинным маргиланским шелком и мебелью из грецкого ореха ручной работы." },
                        price: 450,
                        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        id: "samarkand-royal",
                        type: "suite",
                        name: { en: "Amir Temur Heritage Suite", uz: "Amir Temur Merosi Lyuksi", ru: "Люкс Наследие Амира Темура" },
                        description: { en: "A grand space featuring replicas of Samarkand's architectural wonders.", uz: "Samarqand me'moriy mo'jizalarining nusxalari bilan bezatilgan keng xona.", ru: "Роскошное пространство с репликами архитектурных чудес Самарканда." },
                        price: 2500,
                        imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        id: "chorsu-deluxe",
                        type: "room",
                        name: { en: "Chorsu View Deluxe", uz: "Chorsu Ko'rinishidagi Deluks", ru: "Делюкс Вид на Чорсу" },
                        description: { en: "Overlooking the vibrant Chorsu Bazaar. Soundproof windows ensure privacy.", uz: "Gavjum Chorsu bozoriga qaragan xona. Ovoz o'tkazmaydigan derazalar tinchlikni ta'minlaydi.", ru: "С видом на оживленный базар Чорсу. Звукоизолированные окна гарантируют покой." },
                        price: 380,
                        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        id: "tashkent-city-executive",
                        type: "suite",
                        name: { en: "Tashkent City Executive", uz: "Tashkent City Ekzekyutiv", ru: "Ташкент Сити Эксклюзив" },
                        description: { en: "Modern executive suite with floor-to-ceiling windows in the business district.", uz: "Zamonaviy biznes-lyuks panaramali derazalar bilan biznes-tumanda.", ru: "Современный представительский люкс с панорамными окнами в деловом районе." },
                        price: 850,
                        imageUrl: "https://images.unsplash.com/photo-1590490360182-f33fb0e201b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        id: "broadway-garden",
                        type: "room",
                        name: { en: "Broadway Garden Studio", uz: "Broadway Bog' Studiyasi", ru: "Студия Сад Бродвея" },
                        description: { en: "Located near the famous Broadway street. Features a private green patio.", uz: "Mashhur Broadway ko'chasi yaqinida joyhazigan. Shaxsiy yashil hovliga ega.", ru: "Находится рядом со знаменитым Бродвеем. Включает частный зеленый дворик." },
                        price: 320,
                        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        id: "mountain-breeze",
                        type: "room",
                        name: { en: "Mountain Breeze Room", uz: "Tog' Shabadasi Xonasi", ru: "Номер Горный Бриз" },
                        description: { en: "North-facing room with views of the Tien Shan mountains in the distance.", uz: "Shimolga qaragan xona, uzoqdan Tyanshan tog'lari ko'rinib turadi.", ru: "Номер на северной стороне с видом на Тянь-Шаньские горы вдали." },
                        price: 410,
                        imageUrl: "https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        id: "oriental-elite",
                        type: "suite",
                        name: { en: "Oriental Elite Suite", uz: "Sharqona Elita Lyuksi", ru: "Люкс Восточная Элита" },
                        description: { en: "A masterpiece of Islamic design with hand-painted ceilings and a marble hammam.", uz: "Islomiy dizayn durdonasi, shiftlari qo'lda naqshlangan va marmar hammomli.", ru: "Шедевр исламского дизайна с расписными потолками и мраморным хаммамом." },
                        price: 1200,
                        imageUrl: "https://images.unsplash.com/photo-1616594111360-63028373308d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    }
                ];
                setRooms(dummyData);
            } catch (e) {
                console.error("Failed to fetch rooms", e);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const filteredRooms = useMemo(() => {
        return rooms
            .filter((room) => {
                const matchesType = filterType === "all" || room.type === filterType;
                const currentName = room.name[language as keyof typeof room.name] || room.name.en;
                const matchesSearch = currentName.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesType && matchesSearch;
            })
            .sort((a, b) => {
                if (sortOrder === "price-low") return a.price - b.price;
                if (sortOrder === "price-high") return b.price - a.price;
                return 0;
            });
    }, [rooms, filterType, searchQuery, sortOrder, language]);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.overlay}>
                    <h1>{dict.rooms.title}</h1>
                    <p>{dict.rooms.subtitle}</p>
                </div>
            </header>

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarContent}>
                        <div className={styles.filterSection}>
                            <h3>{dict.rooms.search.replace("...", "")}</h3>
                            <input
                                type="text"
                                placeholder={dict.rooms.search}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.filterInput}
                            />
                        </div>

                        <div className={styles.filterSection}>
                            <h3>{dict.rooms.category}</h3>
                            <div className={styles.filterOptions}>
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="all"
                                        checked={filterType === "all"}
                                        onChange={() => setFilterType("all")}
                                    />
                                    {dict.rooms.all}
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="room"
                                        checked={filterType === "room"}
                                        onChange={() => setFilterType("room")}
                                    />
                                    {dict.rooms.onlyRooms}
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="suite"
                                        checked={filterType === "suite"}
                                        onChange={() => setFilterType("suite")}
                                    />
                                    {dict.rooms.suites}
                                </label>
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <h3>{dict.rooms.sortBy}</h3>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="default">{dict.rooms.all}</option>
                                <option value="price-low">{dict.rooms.priceLow}</option>
                                <option value="price-high">{dict.rooms.priceHigh}</option>
                            </select>
                        </div>
                    </div>
                </aside>

                <section className={styles.roomsArea}>
                    {loading ? (
                        <div className={styles.loading}>Loading exclusive rooms...</div>
                    ) : (
                        <>
                            <div className={styles.resultsCount}>
                                Showing {filteredRooms.length} {filteredRooms.length === 1 ? "result" : "results"}
                            </div>
                            <div className={styles.grid}>
                                {filteredRooms.map((room) => (
                                    <RoomCard
                                        key={room.id}
                                        id={room.id}
                                        name={room.name[language as keyof typeof room.name] || room.name.en}
                                        description={room.description[language as keyof typeof room.description] || room.description.en}
                                        price={`$${room.price} ${dict.rooms.night}`}
                                        imageUrl={room.imageUrl}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    {!loading && filteredRooms.length === 0 && (
                        <div className={styles.noResults}>
                            <p>No rooms found matching your criteria.</p>
                            <button
                                onClick={() => { setFilterType("all"); setSearchQuery(""); }}
                                className={styles.resetBtn}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
