import type { Metadata } from 'next';
import ClientAbout from "./ClientAbout";

export const metadata: Metadata = {
    title: "About | VIP UZBE",
    description: "Learn about the heritage and mission of VIP UZBE, the premier destination for elite hospitality and royal traditions in Tashkent.",
};

export default function AboutPage() {
    return <ClientAbout />;
}
