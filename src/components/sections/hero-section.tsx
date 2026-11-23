"use client";

import { Container } from "@/components/ui/container";
import { HERO_CONTENT } from "@/content/site-content";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { Logo3DViewer } from "@/components/ui/logo-3d-viewer";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-[90dvh] flex flex-col justify-between overflow-hidden bg-[#F6F7F3] text-slate-900 pt-8 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E2E5DC]"
    >
      <Container className="grow flex flex-col justify-between">
        {/* Top Ticker / Meta text - Responsive single-line layout */}
        <div className="flex items-center justify-between border-b border-[#E2E5DC] pb-3 sm:pb-6 text-[11px] min-[390px]:text-xs sm:text-sm lg:text-md uppercase tracking-wider sm:tracking-widest text-slate-500 font-mono gap-3">
          <span className="shrink-0 whitespace-nowrap">
            <span className="sm:hidden">PT. Jamparing Masagi</span>
            <span className="hidden sm:inline">PT. Jamparing Masagi &mdash; Bandung &amp; Cimahi</span>
          </span>
          <span className="text-slate-400 shrink-0 font-medium whitespace-nowrap text-right">
            Infrastruktur &amp; Solusi TIK
          </span>
        </div>

        {/* Editorial Headline & Interactive 3D Brand Logo */}
        <div className="my-auto py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-slate-950 leading-[1.08] text-balance mx-auto lg:mx-0">
                More Than Just ICT Solution.
              </h1>
              <p className="max-w-2xl text-base sm:text-lg lg:text-xl font-light text-slate-600 leading-relaxed mx-auto lg:mx-0">
                {HERO_CONTENT.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <a
                  href="#layanan"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("layanan");
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-950 text-white hover:bg-red-600 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                >
                  Layanan Kami
                </a>
                <a
                  href="#kontak"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("kontak");
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center border border-slate-400 text-slate-900 hover:border-slate-950 hover:bg-slate-100 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                >
                  Hubungi Kami
                </a>
              </div>
            </div>

            {/* 3D Interactive Brand Logo Asset */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center">
              <Logo3DViewer />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
