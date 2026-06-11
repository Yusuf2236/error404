import type { Metadata, Viewport } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatBot from "./components/AIChatBot";

import RoyalConcierge from "./components/RoyalConcierge";
import ContactWidget from "./components/ContactWidget";
import PWARegister from "./components/PWARegister";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0b0b10',
};

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
  robots: "index, follow",
  manifest: "/manifest.webmanifest",
  applicationName: "VIP UZBE",
  appleWebApp: {
    capable: true,
    title: "VIP UZBE",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <PWARegister />
          <Navbar />
          {children}
          <ContactWidget />
          <AIChatBot />

          <RoyalConcierge />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
