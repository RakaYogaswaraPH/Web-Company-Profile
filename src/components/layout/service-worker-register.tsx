"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    // In development mode (npm run dev), active Service Workers cache older JS chunks
    // and cause "Hydration failed: server rendered text didn't match client" errors.
    // We immediately unregister any existing service worker and purge all caches.
    if (process.env.NODE_ENV !== "production") {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }
      if ("caches" in window) {
        caches.keys().then((cacheNames) => {
          for (const name of cacheNames) {
            caches.delete(name);
          }
        });
      }
      return;
    }

    // Production mode: Register Service Worker silently in the background
    if (
      "serviceWorker" in navigator &&
      (window.isSecureContext ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1")
    ) {
      const registerSW = () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .catch(() => {
            // SW registration silently handled
          });
      };

      if (document.readyState === "complete") {
        registerSW();
      } else {
        window.addEventListener("load", registerSW);
        return () => window.removeEventListener("load", registerSW);
      }
    }

    // Suppress the browser's built-in install prompt (beforeinstallprompt)
    function suppressInstallPrompt(e: Event) {
      e.preventDefault();
    }
    window.addEventListener("beforeinstallprompt", suppressInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", suppressInstallPrompt);
    };
  }, []);

  return null;
}
