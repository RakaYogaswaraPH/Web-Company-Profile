"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface MobileNavProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly onClose: () => void;
}

// ── External store: isMounted (SSR → false, client → true) ──────────────
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

// ── External store: shouldRender (controls drawer DOM presence) ──────────
type Listener = () => void;
const renderSubs = new Set<Listener>();
let _shouldRender = false;

function subscribeDrawer(cb: Listener) {
  renderSubs.add(cb);
  return () => renderSubs.delete(cb);
}
function getDrawerSnapshot() {
  return _shouldRender;
}
function setDrawerVisible(v: boolean) {
  if (_shouldRender !== v) {
    _shouldRender = v;
    renderSubs.forEach((cb) => cb());
  }
}

function useDrawerVisible() {
  return useSyncExternalStore(subscribeDrawer, getDrawerSnapshot, () => false);
}

// ── Component ────────────────────────────────────────────────────────────
export function MobileNav({ isOpen, onToggle, onClose }: MobileNavProps) {
  const isMounted = useMounted();
  const drawerVisible = useDrawerVisible();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Open / close animation + body scroll-lock + scrollbar-jump fix
  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      setDrawerVisible(true);

      // Compensate scrollbar width to prevent layout shift
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = sbw > 0 ? `${sbw}px` : "";
      document.body.style.overflow = "hidden";

      // Two rAF frames: ensure drawer is painted before transition starts
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (drawerRef.current) {
            drawerRef.current.style.opacity = "1";
            drawerRef.current.style.transform = "translateX(0)";
          }
        })
      );
      return () => cancelAnimationFrame(raf);
    } else {
      // Restore scroll immediately (prevents layout jump during close)
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      if (drawerRef.current) {
        drawerRef.current.style.opacity = "0";
        drawerRef.current.style.transform = "translateX(100%)";
      }

      // Remove from DOM after transition ends
      closeTimerRef.current = setTimeout(() => {
        setDrawerVisible(false);
        closeTimerRef.current = null;
      }, 360);

      return () => {
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
          closeTimerRef.current = null;
        }
      };
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="lg:hidden">
      {/* Hamburger / X button with cross-fade rotation animation */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        className="relative z-40 flex size-11 items-center justify-center rounded text-slate-900 hover:text-red-600 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-slate-900"
      >
        <span
          className="absolute transition-all duration-300 ease-in-out"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)",
          }}
          aria-hidden="true"
        >
          <Menu className="size-6" />
        </span>
        <span
          className="absolute transition-all duration-300 ease-in-out"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
          }}
          aria-hidden="true"
        >
          <X className="size-6" />
        </span>
      </button>

      {/* Drawer — stays in DOM during close animation via drawerVisible */}
      {isMounted &&
        drawerVisible &&
        createPortal(
          <div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi mobile"
            ref={drawerRef}
            style={{
              opacity: 0,
              transform: "translateX(100%)",
              transition:
                "opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#F6F7F3] text-slate-900 p-6 sm:p-12"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                PT Jamparing Masagi
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup menu navigasi"
                className="flex size-11 items-center justify-center rounded text-slate-900 hover:text-red-600 transition-colors cursor-pointer"
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
                      className="text-4xl sm:text-6xl font-medium tracking-tight text-slate-900 hover:text-red-600 hover:translate-x-3 transition-all inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between text-xs tracking-wider uppercase font-mono text-slate-500 gap-4">
              <div>
                <p className="font-semibold text-slate-900">
                  Kantor &amp; Workshop:
                </p>
                <p>Graha DLA Lt. 3 Suite 6, Bandung</p>
                <p>Jl. Telexina No. 4, Cimahi</p>
              </div>
              <div>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="font-semibold text-slate-900 hover:underline"
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
