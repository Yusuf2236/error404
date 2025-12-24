import type { Metadata } from 'next';
import ClientServices from "./ClientServices";

export const metadata: Metadata = {
    title: "Exclusive Services | VIP UZBE",
    description: "Explore our VIP services including fine dining, royal spa, infinity pool, and elite chauffeur services in Tashkent.",
};

export default function ServicesPage() {
    return <ClientServices />;
}
