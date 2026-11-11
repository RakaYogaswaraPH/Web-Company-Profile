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
    // Only register Service Worker in secure context (https or localhost)
    if ("serviceWorker" in navigator && (window.isSecureContext || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
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

    // Capture install prompt for Chromium browsers
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
      {/* Chromium Install Banner - Matched to Studio Light Theme */}
      {showInstallBanner && deferredPrompt && (
        <aside
          aria-label="Pemasangan Aplikasi"
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded border border-[#E2E5DC] bg-white p-5 text-slate-900 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded bg-red-50 text-red-600 border border-red-100">
                <Download className="size-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-950">
                  Pasang Aplikasi Web
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Akses profil PT Jamparing Masagi langsung dari layar utama perangkat Anda secara instan.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowInstallBanner(false)}
              aria-label="Tutup notifikasi pasang aplikasi"
              className="text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-end gap-3 pt-3 border-t border-[#E2E5DC]">
            <button
              type="button"
              onClick={() => setShowInstallBanner(false)}
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              Nanti saja
            </button>
            <button
              type="button"
              onClick={handleInstallClick}
              className="bg-slate-950 hover:bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer"
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
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded border border-[#E2E5DC] bg-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-slate-900 shadow-md hover:bg-slate-50 cursor-pointer"
        >
          <Share className="size-3.5 text-red-600" />
          <span>Pasang di iPhone / iPad</span>
        </button>
      )}

      {isIOS && showIOSHint && (
        <aside
          aria-label="Panduan Pasang di iOS"
          className="fixed bottom-6 right-6 z-50 max-w-xs rounded border border-[#E2E5DC] bg-white p-5 text-xs text-slate-700 shadow-2xl"
        >
          <div className="flex items-center justify-between font-semibold text-slate-950">
            <span>Pasang di Layar Utama:</span>
            <button
              type="button"
              onClick={() => setShowIOSHint(false)}
              aria-label="Tutup petunjuk iOS"
              className="text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
          <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-slate-600 font-light">
            <li>Tekan tombol Bagikan (Share) di Safari</li>
            <li>Pilih menu &quot;Tambah ke Layar Utama&quot;</li>
          </ol>
        </aside>
      )}
    </>
  );
}
