"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
      {/* Toggle button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 transition-colors cursor-pointer"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi mobile"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-xs flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header inside drawer */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="relative h-8 w-28">
            <Image
              src="/images/brands/logo.webp"
              alt={SITE_CONFIG.name}
              fill
              className="object-contain object-left"
              sizes="112px"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu navigasi"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 cursor-pointer"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-2">
            {SITE_CONFIG.navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center rounded-lg px-4 text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Kontak Cepat
            </p>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              <span>Hubungi Kami</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
