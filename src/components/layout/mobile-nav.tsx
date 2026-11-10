"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface MobileNavProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly onClose: () => void;
}

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function MobileNav({ isOpen, onToggle, onClose }: MobileNavProps) {
  const isMounted = useMounted();

  // Close on Escape key and lock body scroll
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className="lg:hidden">
      {/* Hamburger button - always clean, visible, and high z-index */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        className="relative z-40 flex size-11 items-center justify-center rounded text-white hover:text-red-500 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Drawer mounted directly to body to avoid header overflow/backdrop-filter bugs */}
      {isMounted && isOpen && createPortal(
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#FEE777] text-[#111111] p-6 sm:p-12 overflow-y-auto"
        >
          {/* Header inside drawer */}
          <div className="flex items-center justify-between border-b border-[#111111]/15 pb-6">
            <span className="font-bold text-xl tracking-tight text-[#111111]">
              PT Jamparing Masagi
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup menu navigasi"
              className="flex size-11 items-center justify-center rounded text-[#111111] hover:opacity-70 transition-opacity cursor-pointer"
            >
              <X className="size-7" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="my-auto py-10">
            <ul className="flex flex-col gap-5 sm:gap-7">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="text-4xl sm:text-6xl font-medium tracking-tight text-[#111111] hover:translate-x-3 transition-transform inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer metadata inside drawer */}
          <div className="border-t border-[#111111]/15 pt-6 flex flex-col sm:flex-row justify-between text-xs tracking-wider uppercase font-mono text-[#111111]/80 gap-4">
            <div>
              <p className="font-semibold text-[#111111]">Kantor &amp; Workshop:</p>
              <p>Graha DLA Lt. 3 Suite 6, Bandung</p>
              <p>Jl. Telexina No. 4, Cimahi</p>
            </div>
            <div>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="font-semibold text-[#111111] hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
              <p className="mt-1">{SITE_CONFIG.phone}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
