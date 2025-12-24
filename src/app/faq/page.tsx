import type { Metadata } from 'next';
import ClientFAQ from "./ClientFAQ";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | VIP UZBE",
    description: "Find answers to common questions about VIP UZBE services, room features, local customs, and elite concierge offerings in Tashkent.",
};

export default function FAQPage() {
    return <ClientFAQ />;
}
