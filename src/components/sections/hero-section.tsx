"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { HERO_CONTENT } from "@/content/site-content";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-[90dvh] flex flex-col justify-between overflow-hidden bg-[#F6F7F3] text-slate-900 pt-8 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E2E5DC]"
    >
      <Container className="grow flex flex-col justify-between">
        {/* Top Ticker / Meta text - Clean single-line layout on mobile and desktop */}
        <div className="flex items-center justify-between border-b border-[#E2E5DC] pb-3 sm:pb-6 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-mono">
          <span>
            <span className="sm:hidden">PT Jamparing Masagi</span>
            <span className="hidden sm:inline">PT Jamparing Masagi &mdash; Bandung &amp; Cimahi</span>
          </span>
          <span className="hidden md:inline text-slate-400">Infrastruktur TIK &amp; Sistem Skala Enterprise</span>
          <span className="text-slate-400 shrink-0 font-medium">DIDIRIKAN // 01</span>
        </div>

        {/* Big Editorial Headline - Centered on Mobile, Left-aligned on Desktop */}
        <div className="my-auto py-8 sm:py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 space-y-6 sm:space-y-8 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-slate-950 leading-[1.08] text-balance mx-auto lg:mx-0">
                More Than Just ICT Solution.
              </h1>
              <p className="max-w-2xl text-base sm:text-lg lg:text-xl font-light text-slate-600 leading-relaxed mx-auto lg:mx-0">
                {HERO_CONTENT.subheadline}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end space-y-6 text-center lg:text-left">
              <div className="border-l-0 lg:border-l border-slate-300 pl-0 lg:pl-6 space-y-2 sm:space-y-3 mx-auto lg:mx-0 max-w-md lg:max-w-none">
                <p className="text-[11px] sm:text-xs uppercase tracking-widest text-slate-500 font-mono">
                  Pendekatan Kerja
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                  Kami bermitra dengan perusahaan diberbagai bidang teknologi terpercaya untuk menjamin kualitas produk dan layanan yang kami berikan kepada klien.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <a
                  href="#layanan"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("layanan");
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-950 text-white hover:bg-red-600 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                >
                  Jelajahi Layanan
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
          </div>
        </div>

        {/* Featured Visual Frame with Official Company Logo Overlay */}
        <div className="mt-8 mx-auto w-full max-w-4xl border border-[#E2E5DC] bg-white overflow-hidden group shadow-lg">
          <div className="relative w-full aspect-[581/429] max-h-[460px] bg-[#EEF0EA] flex items-center justify-center">
            {/* Transparent Floating Company Logo without background box */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
              <div className="relative h-6 sm:h-8 w-24 sm:w-32">
                <Image
                  src="/images/brands/logo.webp"
                  alt="Logo PT Jamparing Masagi"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 96px, 128px"
                />
              </div>
            </div>

            <Image
              src="/images/brands/teams.webp"
              alt="Tim Tenaga Ahli PT Jamparing Masagi"
              fill
              priority
              className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Metadata bar below photo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E2E5DC] px-6 py-4 bg-[#F2F4ED] text-xs font-mono gap-2">
            <div className="flex items-center gap-3">
              <span className="uppercase tracking-widest text-red-600 font-semibold">
                Tim Rekayasa Inti
              </span>
              <span className="text-slate-400 hidden sm:inline">&bull;</span>
              <span className="text-slate-900 font-medium">
                20+ Tenaga Ahli &amp; Konsultan Bersertifikasi
              </span>
            </div>
            <span className="text-slate-500 tracking-widest">
              Graha DLA &amp; Workshop Cimahi
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
