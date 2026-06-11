"use client";

import { useEffect } from "react";

// Registers the service worker once the page has loaded. Renders nothing.
export default function PWARegister() {
    useEffect(() => {
        if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

        const register = () => {
            navigator.serviceWorker
                .register("/sw.js", { scope: "/" })
                .catch((err) => console.error("SW registration failed:", err));
        };

        if (document.readyState === "complete") {
            register();
        } else {
            window.addEventListener("load", register);
            return () => window.removeEventListener("load", register);
        }
    }, []);

    return null;
}
