"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    // Register Service Worker silently — no install prompts shown to user.
    // The SW handles caching and offline support in the background.
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
    // so no native install banner appears either.
    function suppressInstallPrompt(e: Event) {
      e.preventDefault();
    }
    window.addEventListener("beforeinstallprompt", suppressInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", suppressInstallPrompt);
    };
  }, []);

  // No UI rendered — purely a background effect component
  return null;
}
