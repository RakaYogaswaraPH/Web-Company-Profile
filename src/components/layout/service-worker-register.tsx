"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download, X, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function subscribeToMedia(callback: () => void) {
  const media = window.matchMedia("(display-mode: standalone)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getIsIOSStandalone() {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  return isIosDevice && !isStandalone;
}

export function ServiceWorkerRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  const isIOS = useSyncExternalStore(
    subscribeToMedia,
    getIsIOSStandalone,
    () => false
  );

  useEffect(() => {
    // Only register service worker in production
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registered successfully:", registration.scope);
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });
    }

    // Capture install prompt for Chromium
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    }
  }

  return (
    <>
      {/* Chromium Install Banner */}
      {showInstallBanner && deferredPrompt && (
        <aside
          aria-label="Pemasangan Aplikasi"
          className="fixed bottom-4 right-4 z-40 max-w-sm rounded-xl border border-blue-200 bg-white p-4 shadow-xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Download className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Pasang Aplikasi Web
                </p>
                <p className="mt-0.5 text-xs text-slate-600">
                  Akses profil PT Jamparing Masagi langsung dari layar utama perangkat Anda.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowInstallBanner(false)}
              aria-label="Tutup notifikasi pasang aplikasi"
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowInstallBanner(false)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Nanti saja
            </button>
            <button
              type="button"
              onClick={handleInstallClick}
              className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 cursor-pointer shadow-2xs"
            >
              Pasang Sekarang
            </button>
          </div>
        </aside>
      )}

      {/* iOS Add to Home Screen Hint Toggle */}
      {isIOS && !showIOSHint && (
        <button
          type="button"
          onClick={() => setShowIOSHint(true)}
          className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-md hover:bg-slate-50 cursor-pointer"
        >
          <Share className="size-3.5 text-blue-600" />
          <span>Pasang di iPhone / iPad</span>
        </button>
      )}

      {isIOS && showIOSHint && (
        <aside
          aria-label="Panduan Pasang di iOS"
          className="fixed bottom-4 right-4 z-40 max-w-xs rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700 shadow-xl"
        >
          <div className="flex items-center justify-between font-semibold text-slate-900">
            <span>Pasang di Layar Utama iOS:</span>
            <button
              type="button"
              onClick={() => setShowIOSHint(false)}
              aria-label="Tutup petunjuk iOS"
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
          <ol className="mt-2.5 list-decimal space-y-1 pl-4 text-slate-600">
            <li>Tekan tombol Bagikan (Share) di Safari</li>
            <li>Gulir ke bawah dan pilih &quot;Tambah ke Layar Utama&quot;</li>
          </ol>
        </aside>
      )}
    </>
  );
}
