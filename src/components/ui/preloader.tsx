"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isHiding, setIsHiding] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock body scroll while preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress increments deliberately paced (~2 seconds) so it's clearly visible
    const steps = [
      { pct: 18, delay: 150 },
      { pct: 42, delay: 450 },
      { pct: 68, delay: 850 },
      { pct: 88, delay: 1300 },
      { pct: 100, delay: 1750 },
    ];

    const timeouts = steps.map(({ pct, delay }) =>
      setTimeout(() => setProgress(pct), delay)
    );

    // Trigger smooth exit transition after reaching 100%
    const hideTimeout = setTimeout(() => {
      setIsHiding(true);
      document.body.style.overflow = originalOverflow;
    }, 2050);

    // Completely remove from DOM after fade-out transition finishes
    const removeTimeout = setTimeout(() => {
      setIsDone(true);
    }, 2850);

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
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#F6F7F3] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHiding
          ? "opacity-0 scale-[1.02] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Company Logo */}
        <div className="relative h-9 w-44 sm:h-11 sm:w-52 transition-transform duration-500 ease-out">
          <Image
            src="/images/brands/logo.webp"
            alt="PT Jamparing Masagi"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 176px, 208px"
          />
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 sm:w-56 h-[3px] bg-[#E2E5DC] rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Monospace percentage ticker */}
        <div className="flex items-center justify-between w-48 sm:w-56 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          <span>MEMUAT // 01</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
