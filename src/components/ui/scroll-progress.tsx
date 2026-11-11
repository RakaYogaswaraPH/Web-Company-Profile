"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if CSS animation-timeline is supported natively
    if (
      typeof CSS !== "undefined" &&
      CSS.supports &&
      CSS.supports("animation-timeline", "scroll()")
    ) {
      // Browser handles off-main-thread with zero reflow
      return;
    }

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (barRef.current) {
            const scrollTop = window.scrollY;
            const docHeight =
              document.documentElement.scrollHeight - window.innerHeight;
            const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
            barRef.current.style.transform = `scaleX(${Math.min(
              1,
              Math.max(0, ratio)
            )})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[99999] h-[3px] bg-transparent pointer-events-none"
    >
      <div
        ref={barRef}
        className="scroll-progress-indicator h-full bg-red-600 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
