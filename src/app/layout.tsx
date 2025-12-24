import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatBot from "./components/AIChatBot";
import AudioPlayer from "./components/AudioPlayer";
import RoyalConcierge from "./components/RoyalConcierge";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "VIP UZBE | Elite Luxury Hotel in Tashkent",
    template: "%s | VIP UZBE"
  },
  description: "Experience the pinnacle of Tashkent luxury at VIP UZBE. Offering 24/7 VIP concierge services, elite themed suites, and authentic royal hospitality in the heart of Uzbekistan.",
  keywords: ["Tashkent Luxury Hotel", "VIP Uzbekistan", "Elite Accommodation", "Tashkent Business Hotel", "Uzbek Hospitality", "VIP UZBE"],
  authors: [{ name: "VIP UZBE Team" }],
  openGraph: {
    title: "VIP UZBE | Elite Luxury Hotel in Tashkent",
    description: "The ultimate destination for distinguished guests in Tashkent. Experience royal tradition and modern luxury.",
    url: "https://vipuzbe.com",
    siteName: "VIP UZBE",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542314844-0731cc8d0959?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "VIP UZBE Luxury Lobby"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIP UZBE | Elite Luxury Hotel in Tashkent",
    description: "Experience royal hospitality in Tashkent.",
    images: ["https://images.unsplash.com/photo-1542314844-0731cc8d0959?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
          <AIChatBot />
          <AudioPlayer />
          <RoyalConcierge />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
