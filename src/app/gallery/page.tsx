import type { Metadata } from 'next';
import ClientGallery from "./ClientGallery";

export const metadata: Metadata = {
    title: "Visual Journey Gallery | VIP UZBE",
    description: "Experience the visual splendor of VIP UZBE through our categorized gallery of suites, spa, and culinary delights in Tashkent.",
};

export default function GalleryPage() {
    return <ClientGallery />;
}
