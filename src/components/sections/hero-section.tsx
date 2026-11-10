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

        {/* Featured Visual Frame - Clean fit so all faces and team members are clearly visible */}
        <div className="mt-8 border border-[#2D344E] bg-[#171B2A] overflow-hidden group">
          <div className="relative w-full aspect-[547/364] max-h-[580px] bg-[#141824] flex items-center justify-center">
            <Image
              src="/images/brands/teams.webp"
              alt="PT Jamparing Masagi Engineering Team"
              fill
              priority
              className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>
          {/* Metadata bar below photo - no overlapping text blocking faces */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#2D344E] px-6 py-4 bg-[#1A1F30] text-xs font-mono gap-2">
            <div className="flex items-center gap-3">
              <span className="uppercase tracking-widest text-red-500 font-semibold">
                Core Engineering Team
              </span>
              <span className="text-[#94A0B8] hidden sm:inline">&bull;</span>
              <span className="text-white">
                20+ Certified Engineers &amp; Consultants
              </span>
            </div>
            <span className="text-[#94A0B8] tracking-widest">
              Graha DLA &amp; Workshop Cimahi
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
