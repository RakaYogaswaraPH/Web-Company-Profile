"use client";

import type { ReactNode } from "react";
import * as m from "motion/react";
import { cn } from "@/lib/cn";

interface FadeInProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly y?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
}: FadeInProps) {
  return (
    <m.motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </m.motion.div>
  );
}
