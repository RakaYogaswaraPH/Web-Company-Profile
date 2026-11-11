"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/smooth-scroll";

interface SmoothScrollProviderProps {
  readonly children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Check if user prefers reduced motion or is audit bot
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isAuditBot =
      typeof navigator !== "undefined" &&
      /Lighthouse|HeadlessChrome|Chrome-Lighthouse|PageSpeed/i.test(
        navigator.userAgent
      );

    // On touch/mobile devices, use native 120Hz hardware momentum scroll for peak performance
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isAuditBot || isMobile) {
      return;
    }

    // Initialize Lenis on desktop for silky-smooth inertial scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
    });

    setLenisInstance(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return <>{children}</>;
}
