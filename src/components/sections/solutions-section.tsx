"use client";

import { useState } from "react";
import {
  Archive,
  Droplets,
  ShoppingBag,
  CircleDollarSign,
  Users,
  CheckCircle2,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SOLUTIONS_CONTENT } from "@/content/site-content";
import type { SolutionItem } from "@/types/content";

const SOLUTION_ICONS: Record<string, typeof ShoppingBag> = {
  digiars: Archive,
  "water-tracking": Droplets,
  pesandong: ShoppingBag,
  "finance-system": CircleDollarSign,
  "hr-management": Users,
};

export function SolutionsSection() {
  const [activeTabId, setActiveTabId] = useState<string>("pesandong");

  const activeSolution: SolutionItem =
    SOLUTIONS_CONTENT.find((item) => item.id === activeTabId) ??
    SOLUTIONS_CONTENT[2]; // Default to PESANDONG

  const ActiveIcon = SOLUTION_ICONS[activeSolution.id] || ShoppingBag;

  return (
    <section
      id="solusi"
      className="scroll-mt-20 border-t border-[#E2E5DC] bg-[#F6F7F3] py-20 sm:py-28"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E5DC] pb-8 mb-10 sm:mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
              Solusi &amp; Portofolio Produk
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-950 tracking-tight mt-3">
              Solusi Sistem Terintegrasi
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Platform aplikasi dan sistem informasi siap pakai yang dirancang untuk
            efisiensi operasional bisnis, instansi, dan enterprise.
          </p>
        </div>

        {/* 5-Column Navigation Tabs (matching visual reference) */}
        <div className="border border-[#E2E5DC] bg-white rounded-t overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E5DC]">
            {SOLUTIONS_CONTENT.map((solution) => {
              const isActive = solution.id === activeSolution.id;
              return (
                <button
                  key={solution.id}
                  type="button"
                  onClick={() => setActiveTabId(solution.id)}
                  className={`text-left p-4 sm:p-5 transition-all cursor-pointer relative group ${
                    isActive
                      ? "bg-[#2f2e2d] text-white"
                      : "bg-[#F6F7F3] hover:bg-white text-slate-700"
                  }`}
                >
                  <span
                    className={`block font-mono text-xs font-semibold tracking-wider mb-1.5 ${
                      isActive ? "text-red-500" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {solution.num}
                  </span>
                  <span
                    className={`block font-heading font-bold text-sm tracking-wide uppercase truncate ${
                      isActive ? "text-white" : "text-slate-900 group-hover:text-red-600"
                    }`}
                  >
                    {solution.title}
                  </span>
                  <span
                    className={`block text-[11px] truncate mt-0.5 ${
                      isActive ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {solution.shortTag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Solution Details & Browser Window Wireframe Mockup */}
        <div className="border-x border-b border-[#E2E5DC] bg-white rounded-b p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Solution Detail Information */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded bg-[#2f2e2d] text-white shrink-0">
                  <ActiveIcon className="size-5" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase">
                  {activeSolution.title}
                </h3>
              </div>

              <h4 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                {activeSolution.subtitle}
              </h4>

              <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                {activeSolution.description}
              </p>

              {/* Fitur Utama List */}
              <div className="space-y-3 pt-2 border-t border-[#E2E5DC]">
                <span className="text-xs uppercase font-mono tracking-widest font-bold text-slate-800 block">
                  Fitur Utama:
                </span>
                <ul className="space-y-2.5">
                  {activeSolution.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-normal"
                    >
                      <CheckCircle2 className="size-4 text-slate-800 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Browser Window Mockup with Single Clean X Wireframe Placeholder */}
            <div className="lg:col-span-6">
              <div className="rounded border border-[#D5D9CE] bg-[#F1F3ED] overflow-hidden shadow-sm">
                {/* Browser Window Header Chrome */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#E6E8E1] border-b border-[#D5D9CE] text-xs font-mono select-none">
                  {/* Browser Window 3 Dots */}
                  <div className="flex items-center gap-1.5 w-14 shrink-0">
                    <span className="size-2 rounded-full bg-[#B8BDB0]" />
                    <span className="size-2 rounded-full bg-[#B8BDB0]" />
                    <span className="size-2 rounded-full bg-[#B8BDB0]" />
                  </div>

                  {/* Browser URL Input Bar with Security Icon and Slug */}
                  <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-white/90 rounded text-[11px] text-slate-600 border border-[#D5D9CE] max-w-xs sm:max-w-sm w-full truncate">
                    <Lock className="size-3 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-700 font-mono text-[11px]">
                      {activeSolution.url}
                    </span>
                  </div>

                  {/* Security Verified Shield */}
                  <div className="flex items-center justify-end w-14 shrink-0">
                    <ShieldCheck className="size-4 text-slate-500" />
                  </div>
                </div>

                {/* Browser Content Area: Single Clean Wireframe Box with 'X' Placeholder */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#ECEEE8] p-4 sm:p-6 flex items-center justify-center">
                  <div className="relative w-full h-full border border-[#CBD0C4] bg-[#F4F5F1] rounded overflow-hidden">
                    {/* Clean diagonal cross wireframe placeholder (X) */}
                    <svg
                      className="absolute inset-0 w-full h-full text-[#CBD0C4]"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="100"
                        stroke="currentColor"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                      <line
                        x1="100"
                        y1="0"
                        x2="0"
                        y2="100"
                        stroke="currentColor"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
