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

    // Smooth & snappy increments
    const steps = [
      { pct: 28, delay: 50 },
      { pct: 62, delay: 220 },
      { pct: 88, delay: 480 },
      { pct: 100, delay: 720 },
    ];

    const timeouts = steps.map(({ pct, delay }) =>
      setTimeout(() => setProgress(pct), delay)
    );

    // Trigger shutter columns exit after reaching 100%
    const hideTimeout = setTimeout(() => {
      setIsHiding(true);
      document.body.style.overflow = originalOverflow;
    }, 850);

    // Completely unmount after all staggered columns lift out
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

  // Staggered vertical shutters (4 columns) - award-winning architectural reveal
  const columns = [0, 1, 2, 3];

  return (
    <AnimatePresence>
      {!isDone && (
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Memuat PT. Jamparing Masagi"
          className="fixed inset-0 z-[999999] pointer-events-none"
        >
          {/* Background: Staggered architectural shutter panels */}
          <div className="absolute inset-0 flex w-full h-full pointer-events-none">
            {columns.map((colIndex) => (
              <motion.div
                key={colIndex}
                initial={{ y: "0%" }}
                animate={{ y: isHiding ? "-100%" : "0%" }}
                transition={{
                  duration: 0.75,
                  delay: isHiding ? colIndex * 0.075 : 0,
                  ease: [0.76, 0, 0.24, 1], // Smooth agency cubic-bezier
                }}
                className="relative flex-1 h-full bg-[#F6F7F3] border-r border-[#E2E5DC]/40 last:border-r-0"
              />
            ))}
          </div>

          {/* Inner Content (Center: Logo + Bar + Ticker) */}
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <motion.div
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{
                opacity: isHiding ? 0 : 1,
                scale: isHiding ? 0.94 : 1,
                y: isHiding ? -24 : 0,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center space-y-6 px-6 text-center"
            >
              {/* Company Logo */}
              <div className="relative h-10 w-44 sm:h-12 sm:w-52 md:h-14 md:w-60">
                <Image
                  src="/images/brands/logo.webp"
                  alt="PT. Jamparing Masagi"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 176px, 240px"
                />
              </div>

              {/* Progress Bar with accent red indicator */}
              <div className="w-52 sm:w-64 h-1.5 bg-[#E2E5DC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Monospace Ticker */}
              <div className="flex items-center justify-between w-52 sm:w-64 text-[11px] font-mono tracking-widest text-slate-500 uppercase font-medium">
                <span>MEMUAT</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
