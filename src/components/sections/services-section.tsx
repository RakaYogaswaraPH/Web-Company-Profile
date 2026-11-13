"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SERVICES_CONTENT } from "@/content/site-content";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const SERVICE_TAGS: Record<string, readonly string[]> = {
  "konsultan-tik": ["Perencanaan Pembangunan", "Tata Kelola TIK", "Kebutuhan Layanan"],
  "infrastruktur-jaringan": ["Perencanaan Topologi Jaringan", "Instalasi PerangkatJaringan", "Jaringan Fiber Optik"],
  "pembangunan-aplikasi": ["Aplikasi Web & Mobile", "Perangkat IOT", "Digitalisasi Alur Kerja"],
  "integrasi-sistem": ["Sinkronisasi Basis Data", "Konektivitas Antar Sistem", "Konsultan Informasi"],
  "multimedia-surveillance": ["Instalasi CCTV", "Sistem Video Recording CCTV"],
  "keamanan-tik": ["Firewall Generasi Baru (NGFW)", "Manajemen VPN"],
};

export function ServicesSection() {
  // Default first item active on desktop, or changes on hover/tap
  const [activeId, setActiveId] = useState<string | null>("konsultan-tik");

  return (
    <section
      id="layanan"
      className="scroll-mt-20 border-b border-[#E2E5DC] bg-white text-slate-900 py-20 sm:py-32"
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E5DC] pb-8 mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
              Yang Dapat Kami Berikan
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-950 tracking-tight mt-3">
              Solusi &amp; Layanan TIK
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Perancangan, instalasi, hingga arsitektur perangkat keras dan lunak dengan bantuan layanan teknis kami.
          </p>
        </div>

        {/* Editorial Accordion List: Clean Thinking*Room style with smooth reveal */}
        <div className="divide-y divide-[#E2E5DC]">
          {SERVICES_CONTENT.map((service, index) => {
            const isActive = activeId === service.id;
            const tags = SERVICE_TAGS[service.id] ?? [];

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onClick={() => setActiveId(isActive ? null : service.id)}
                className={`py-8 sm:py-10 transition-colors duration-300 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-lg cursor-pointer ${
                  isActive ? "bg-[#F6F7F3]" : "hover:bg-[#FAFBF8]"
                }`}
              >
                {/* Header row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  <div className="lg:col-span-2 flex items-center justify-between">
                    <span
                      className={`text-sm font-mono transition-colors duration-200 ${
                        isActive ? "text-red-600 font-semibold" : "text-slate-400"
                      }`}
                    >
                      /{index < 9 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className="lg:hidden text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                      Layanan TIK
                    </span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3
                      className={`text-2xl sm:text-3xl font-light tracking-tight transition-colors duration-200 ${
                        isActive ? "text-red-600 font-normal" : "text-slate-950"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                      {service.summary}
                    </p>
                  </div>
                </div>

                {/* Smooth Expandable Image Preview Drawer (without overlapping content) */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-[#E2E5DC]/80"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Image preview frame */}
                      <div className="md:col-span-7 relative w-full h-56 sm:h-72 rounded bg-slate-200 overflow-hidden shadow-sm group">
                        <Image
                          src={`/images/services/${service.id}.webp`}
                          alt={`${service.title} Jamparing Masagi`}
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 640px"
                          className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                          <span className="tracking-widest uppercase font-semibold text-white/90">
                            {service.title}
                          </span>
                        </div>
                      </div>

                      {/* Capabilities & Highlights info beside image */}
                      <div className="md:col-span-5 flex flex-col justify-between h-full py-2 space-y-4">
                        <div className="space-y-3">
                          <span className="text-[11px] uppercase tracking-widest text-slate-500 font-mono block">
                            Kompetensi Utama
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 text-xs font-mono bg-white border border-[#E2E5DC] text-slate-800 px-3 py-1 rounded"
                              >
                                <CheckCircle2 className="size-3 text-red-600 shrink-0" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#E2E5DC] flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-mono">
                            Siap implementasi skala perusahaan &amp; BUMN
                          </span>
                          <a
                            href="#kontak"
                            onClick={(e) => {
                              e.preventDefault();
                              smoothScrollTo("kontak");
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <span>Konsultasi</span>
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Inquiry bar - sleek minimal banner */}
        <div className="mt-20 border-t border-[#E2E5DC] pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-semibold sm:font-medium tracking-tight text-slate-950">
              Konsultasi Kebutuhan Layanan TIK
            </h4>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Bersama membangun awal yang baik bersama tenaga ahli bersama kami.
            </p>
          </div>
          <a
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("kontak");
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-400 hover:border-slate-950 hover:bg-slate-50 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-900 transition-colors cursor-pointer shrink-0"
          >
            <span>Mulai Konsultasi</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
