"use client";

import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/cn";

interface MobileNavProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly onClose: () => void;
}

export function MobileNav({ isOpen, onToggle, onClose }: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
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
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          className="flex min-h-11 min-w-11 items-center justify-center text-white hover:text-red-500 transition-colors cursor-pointer"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {/* Backdrop */}
        {isOpen && (
          <div
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity"
          />
        )}

        {/* Drawer - Thinking*Room fullscreen/bold panel style */}
        <div
          id="mobile-navigation-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-[#FEE777] text-[#111111] transition-transform duration-300 ease-in-out p-6 sm:p-12 justify-between",
            isOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-[#111111]/10 pb-6">
            <span className="font-bold text-xl tracking-tight text-[#111111]">
              PT Jamparing Masagi
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup menu navigasi"
              className="p-2 text-[#111111] hover:opacity-70 cursor-pointer"
            >
              <X className="size-7" />
            </button>
          </div>

          <nav className="my-auto py-8">
            <ul className="flex flex-col gap-4 sm:gap-6">
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
              <li>
                <a
                  href="#kontak"
                  onClick={onClose}
                  className="text-4xl sm:text-6xl font-medium tracking-tight text-[#111111] hover:translate-x-3 transition-transform inline-block"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </nav>

          <div className="border-t border-[#111111]/10 pt-6 flex flex-col sm:flex-row justify-between text-xs tracking-wider uppercase font-mono text-[#111111]/70">
            <div>
              <p>Graha DLA Lt. 3 Suite 6, Bandung</p>
              <p>Jl. Telexina No. 4, Cimahi</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-[#111111] transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}
