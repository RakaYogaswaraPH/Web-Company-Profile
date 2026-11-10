import Image from "next/image";
import { Container } from "@/components/ui/container";
import { HERO_CONTENT } from "@/content/site-content";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-[90dvh] flex flex-col justify-between overflow-hidden bg-[#1E2335] text-white pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#2D344E]"
    >
      <Container className="grow flex flex-col justify-between">
        {/* Top Ticker / Meta text - Thinking*Room style */}
        <div className="flex items-center justify-between border-b border-[#2D344E] pb-6 text-xs uppercase tracking-widest text-[#94A0B8] font-mono">
          <span>PT Jamparing Masagi — Bandung &amp; Cimahi</span>
          <span className="hidden sm:inline">Enterprise ICT Infrastructure &amp; Systems</span>
          <span>EST. // 01</span>
        </div>

        {/* Big Editorial Headline - directly placed, NO PILLS, NO CARDS, NO DOTS */}
        <div className="my-auto py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white leading-[1.05] text-balance">
                More Than Just ICT Solution.
              </h1>
              <p className="max-w-2xl text-lg sm:text-xl font-light text-[#BAC4D8] leading-relaxed">
                {HERO_CONTENT.subheadline}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end space-y-6">
              <div className="border-l border-[#3E4766] pl-6 space-y-3">
                <p className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono">
                  Approach
                </p>
                <p className="text-sm text-[#D1D8E6] leading-relaxed font-light">
                  Mendampingi BUMN, instansi pemerintah, dan korporasi dari tahap audit arsitektur hingga pemeliharaan SLA tanpa celah.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="#layanan"
                  className="inline-flex items-center justify-center bg-white text-[#1E2335] hover:bg-red-600 hover:text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                >
                  Explore Capabilities
                </a>
                <a
                  href="#kontak"
                  className="inline-flex items-center justify-center border border-[#3E4766] text-white hover:border-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Large Visual Frame - Thinking*Room Project showcase style */}
        <div className="relative w-full aspect-16/9 sm:aspect-21/9 overflow-hidden bg-[#171B2A] mt-6 border border-[#2D344E] group">
          <Image
            src="/images/brands/teams.webp"
            alt="PT Jamparing Masagi Engineering Team"
            fill
            priority
            className="object-cover object-center filter grayscale contrast-110 group-hover:scale-103 group-hover:grayscale-0 transition-all duration-700 ease-out"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-6 sm:p-10">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-red-500">
                Core Engineering Team
              </p>
              <p className="text-xl sm:text-2xl font-light text-white mt-1">
                20+ Certified Engineers &amp; Consultants
              </p>
            </div>
            <span className="text-xs font-mono text-[#888888] tracking-widest">
              Graha DLA &amp; Workshop Cimahi
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
