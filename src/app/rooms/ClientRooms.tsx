"use client";

import { useState, useMemo, useEffect } from "react";
import RoomCard from "../components/RoomCard";
import styles from "./page.module.css";
import { useLanguage } from "../context/LanguageContext";
import ScrollReveal from "../components/ScrollReveal";
import { ROOMS, Room } from "@/lib/rooms";

export default function ClientRooms() {
    const { dict, language } = useLanguage();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [occupiedRoomIds, setOccupiedRoomIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => {
        // `silent` re-fetches triggered by live updates skip the loading spinner
        // so the grid doesn't flash while the user is browsing.
        const fetchData = async (silent = false) => {
            try {
                if (!silent) setLoading(true);
                const res = await fetch('/api/rooms/availability', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setOccupiedRoomIds(data.occupied || []);
                }
                setRooms(ROOMS);
            } catch (e) {
                setRooms(ROOMS);
            } finally {
                if (!silent) setLoading(false);
            }
        };
        fetchData();

        // Live availability: the admin confirms/cancels a booking → SSE pushes an
        // "update" → we silently re-pull occupied rooms so "Booked" badges stay in sync.
        const events = new EventSource('/api/events');
        events.addEventListener('update', () => fetchData(true));

        return () => events.close();
    }, []);

    const filteredRooms = useMemo(() => {
        return rooms
            .filter((room: Room) => {
                const matchesType = filterType === "all" || room.type === filterType;
                const currentName = room.name[language as keyof typeof room.name] || room.name.en;
                const matchesSearch = currentName.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesType && matchesSearch;
            })
            .sort((a: Room, b: Room) => {
                if (sortOrder === "price-low") return a.price - b.price;
                if (sortOrder === "price-high") return b.price - a.price;
                return 0;
            });
    }, [rooms, filterType, searchQuery, sortOrder, language]);

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <ScrollReveal animation="zoomIn" className={styles.overlay}>
                    <h1>{dict.rooms.title}</h1>
                    <p>{dict.rooms.subtitle}</p>
                </ScrollReveal>
            </header>

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <ScrollReveal animation="slideRight" className={styles.sidebarContent}>
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
                    </ScrollReveal>
                </aside>

                <section className={styles.roomsArea}>
                    {loading ? (
                        <div className={styles.loading}>{dict.general.loading}</div>
                    ) : (
                        <>
                            <ScrollReveal animation="fadeUp" className={styles.resultsCount}>
                                {dict.general.showing} {filteredRooms.length} {filteredRooms.length === 1 ? dict.general.result : dict.general.results}
                            </ScrollReveal>
                            <div className={styles.grid}>
                                {filteredRooms.map((room, index) => (
                                    <ScrollReveal key={room.id} animation="fadeUp" delay={index * 0.1}>
                                        <RoomCard
                                            id={room.id}
                                            name={room.name[language as keyof typeof room.name] || room.name.en}
                                            description={room.description[language as keyof typeof room.description] || room.description.en}
                                            price={`$${room.price} ${dict.rooms.night}`}
                                            imageUrl={room.imageUrl}
                                            isBooked={occupiedRoomIds.includes(room.id)}
                                        />
                                    </ScrollReveal>
                                ))}
                            </div>
                        </>
                    )}
                    {!loading && filteredRooms.length === 0 && (
                        <ScrollReveal animation="fadeUp" className={styles.noResults}>
                            <p>{dict.general.noResults}</p>
                            <button
                                onClick={() => { setFilterType("all"); setSearchQuery(""); }}
                                className={styles.resetBtn}
                            >
                                {dict.general.reset}
                            </button>
                        </ScrollReveal>
                    )}
                </section>
            </div>
        </main>
    );
}
