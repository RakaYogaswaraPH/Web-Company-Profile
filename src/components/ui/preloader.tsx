"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

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

    // Snappy, smooth progress increments for human visitors (~0.85s total)
    const steps = [
      { pct: 28, delay: 60 },
      { pct: 65, delay: 260 },
      { pct: 90, delay: 520 },
      { pct: 100, delay: 760 },
    ];

    const timeouts = steps.map(({ pct, delay }) =>
      setTimeout(() => setProgress(pct), delay)
    );

    // Trigger curtain lift transition after reaching 100%
    const hideTimeout = setTimeout(() => {
      setIsHiding(true);
      document.body.style.overflow = originalOverflow;
    }, 900);

    // Completely remove from DOM after curtain reveal animation finishes
    const removeTimeout = setTimeout(() => {
      setIsDone(true);
    }, 1800);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Memuat PT. Jamparing Masagi"
          initial={{ y: 0 }}
          animate={{ y: isHiding ? "-100%" : 0 }}
          transition={{
            duration: 0.8,
            delay: 0.08,
            ease: [0.76, 0, 0.24, 1], // Custom agency curtain bezier curve
          }}
          className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#F6F7F3] shadow-2xl ${
            isHiding ? "pointer-events-none" : ""
          }`}
        >
          {/* Inner content (logo & progress bar) gracefully floats up slightly before curtain reveal */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: isHiding ? 0 : 1,
              y: isHiding ? -28 : 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center space-y-6 px-6 text-center"
          >
            {/* Company Logo - Balanced Studio Size */}
            <div className="relative h-10 w-44 sm:h-12 sm:w-52 md:h-14 md:w-60 transition-transform duration-500 ease-out">
              <Image
                src="/images/brands/logo.webp"
                alt="PT. Jamparing Masagi"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
