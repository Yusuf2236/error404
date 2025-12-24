import type { Metadata } from 'next';
import ClientRooms from "./ClientRooms";

export const metadata: Metadata = {
    title: "Elite Rooms & Suites | VIP UZBE",
    description: "Browse our collection of 12+ Tashkent-themed elite rooms. From the Silk Road Suite to the Imperial Penthouse, experience absolute luxury.",
};

export default function RoomsPage() {
    return <ClientRooms />;
}
