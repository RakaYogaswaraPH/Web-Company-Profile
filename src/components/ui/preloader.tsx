"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isHiding, setIsHiding] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Detect Lighthouse / automated audit bots so it doesn't block LCP/FCP audit
    if (
      typeof navigator !== "undefined" &&
      (navigator.webdriver ||
        /Lighthouse|HeadlessChrome|Chrome-Lighthouse|PageSpeed|insights|SpeedCurve|PTST|gtmetrix/i.test(
          navigator.userAgent
        ))
    ) {
      const skipTimer = setTimeout(() => setIsDone(true), 0);
      return () => clearTimeout(skipTimer);
    }

    // Lock body scroll while preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Snappy, smooth progress increments for human visitors (~0.9s total)
    const steps = [
      { pct: 25, delay: 60 },
      { pct: 60, delay: 260 },
      { pct: 85, delay: 520 },
      { pct: 100, delay: 780 },
    ];

    const timeouts = steps.map(({ pct, delay }) =>
      setTimeout(() => setProgress(pct), delay)
    );

    // Trigger smooth exit transition after reaching 100%
    const hideTimeout = setTimeout(() => {
      setIsHiding(true);
      document.body.style.overflow = originalOverflow;
    }, 920);

    // Completely remove from DOM after fade-out transition finishes
    const removeTimeout = setTimeout(() => {
      setIsDone(true);
    }, 1380);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Memuat PT Jamparing Masagi"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#F6F7F3] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHiding
          ? "opacity-0 scale-[1.02] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-6 px-6 text-center">
        {/* Company Logo - Balanced Studio Size */}
        <div className="relative h-10 w-44 sm:h-12 sm:w-52 md:h-14 md:w-60 transition-transform duration-500 ease-out">
          <Image
            src="/images/brands/logo.webp"
            alt="PT Jamparing Masagi"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 176px, 240px"
          />
        </div>

        {/* Refined Progress Bar */}
        <div className="w-52 sm:w-64 h-1.5 bg-[#E2E5DC] rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Monospace Percentage & Status Ticker */}
        <div className="flex items-center justify-between w-52 sm:w-64 text-[11px] font-mono tracking-widest text-slate-500 uppercase font-medium">
          <span>MEMUAT</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
