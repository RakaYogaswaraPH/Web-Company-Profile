"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SITE_CONFIG } from "@/config/site";
import { smoothScrollTo, getLenisInstance } from "@/lib/smooth-scroll";

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

// ── Component ────────────────────────────────────────────────────────────
export function MobileNav({ isOpen, onToggle, onClose }: MobileNavProps) {
  const isMounted = useMounted();

  // Open / close body scroll-lock + Lenis pause/resume
  useEffect(() => {
    if (isOpen) {
      getLenisInstance()?.stop();
    } else {
      getLenisInstance()?.start();
    }

    return () => {
      getLenisInstance()?.start();
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Smooth item click: close drawer and smoothly glide to section
  const handleNavClick = (href: string) => {
    onClose();
    getLenisInstance()?.start();
    setTimeout(() => {
      smoothScrollTo(href);
    }, 200);
  };

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
          className="absolute transition-all duration-500 ease-in-out"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "rotate(90deg) scale(0.6)" : "rotate(0deg) scale(1)",
          }}
          aria-hidden="true"
        >
          <Menu className="size-6" />
        </span>
        <span
          className="absolute transition-all duration-500 ease-in-out"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.6)",
          }}
          aria-hidden="true"
        >
          <X className="size-6" />
        </span>
      </button>

      {/* Drawer Portal with AnimatePresence */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Subtle Backdrop Dim */}
                <motion.div
                  key="mobile-nav-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  onClick={onClose}
                  className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm lg:hidden"
                  aria-hidden="true"
                />

                {/* Drawer Container Panel */}
                <motion.div
                  key="mobile-nav-panel"
                  id="mobile-navigation-drawer"
                  data-lenis-prevent
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu navigasi mobile"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#F6F7F3] text-slate-900 p-6 sm:p-12 overflow-y-auto overscroll-contain"
                >
                  {/* Top Bar Header with Centered Logo */}
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex items-center justify-between border-b border-slate-200 pb-6 shrink-0"
                  >
                    {/* Centered logo */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                      <a
                        href="#beranda"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick("beranda");
                        }}
                        className="flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-slate-900"
                      >
                        <div className="relative h-8 w-36 sm:w-40">
                          <Image
                            src="/images/brands/logo.webp"
                            alt={SITE_CONFIG.name}
                            fill
                            className="object-contain object-center"
                            sizes="160px"
                          />
                        </div>
                      </a>
                    </div>

                    {/* Close button with subtle spin hover */}
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Tutup menu navigasi"
                      className="ml-auto flex size-11 items-center justify-center rounded text-slate-900 hover:text-red-600 hover:rotate-90 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-slate-900"
                    >
                      <X className="size-7" />
                    </button>
                  </motion.div>

                  {/* Staggered Navigation Links */}
                  <nav className="my-auto py-8">
                    <ul className="flex flex-col gap-4 sm:gap-6">
                      {SITE_CONFIG.navItems.map((item, index) => (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: 50, y: 15 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          transition={{
                            duration: 0.55,
                            delay: 0.18 + index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.href);
                            }}
                            className="group flex items-center justify-between font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-900 hover:text-red-600 hover:translate-x-3 transition-all duration-300 cursor-pointer py-1.5"
                          >
                            <span className="flex items-baseline gap-3">
                              <span className="text-xs sm:text-sm font-mono text-slate-400 group-hover:text-red-500 transition-colors">
                                0{index + 1}
                              </span>
                              <span>{item.label}</span>
                            </span>
                            <span className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-red-600 text-2xl font-light">
                              &rarr;
                            </span>
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Footer with animated fade in */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between text-xs tracking-wider uppercase font-mono text-slate-500 gap-4 shrink-0"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">Kantor:</p>
                      <p>Graha DLA Lt. 3 Suite 6, Bandung</p>
                      <p>Jl. Telexina No. 4, Cimahi</p>
                    </div>
                    <div>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="font-semibold text-slate-900 hover:underline hover:text-red-600 transition-colors"
                      >
                        {SITE_CONFIG.email}
                      </a>
                      <p className="mt-1">{SITE_CONFIG.phone}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
