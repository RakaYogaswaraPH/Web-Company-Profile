import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { ABOUT_CONTENT } from "@/content/site-content";

export function AboutSection() {
  return (
    <section id="tentang" className="scroll-mt-24 bg-[#0B0F19] py-16 sm:py-24 border-b border-slate-800">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Text & Pillars */}
          <FadeIn className="lg:col-span-7 space-y-8">
            <SectionHeader
              tag={ABOUT_CONTENT.sectionTag}
              title={ABOUT_CONTENT.heading}
            />

            <div className="space-y-4 text-base leading-relaxed text-slate-300">
              {ABOUT_CONTENT.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            {/* 4 Pillars Grid - Citcom-style cards with red accent */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-6">
                {"//"} Prinsip Pengerjaan Kami
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {ABOUT_CONTENT.pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="group rounded-xl border border-slate-800 bg-[#111827] p-5 transition-all hover:border-red-500/50 hover:bg-[#161F32]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="size-1.5 rounded-full bg-red-500 shrink-0 group-hover:scale-125 transition-transform" />
                      <h4 className="font-semibold text-white text-sm">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Stats & Secondary Photo View */}
          <FadeIn delay={0.15} className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8">
              <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                {"//"} Kapasitas Operasional
              </h3>
              <div className="mt-6 space-y-6 divide-y divide-slate-800">
                {ABOUT_CONTENT.stats.map((stat, idx) => (
                  <div key={stat.label} className={idx > 0 ? "pt-6" : ""}>
                    <p className="text-3xl font-mono font-bold tracking-tight text-red-500 sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-semibold text-white text-sm">
                      {stat.label}
                    </p>
                    {stat.description && (
                      <p className="mt-1 text-xs text-slate-400">
                        {stat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
              <div className="aspect-4/3 relative w-full">
                <Image
                  src="/images/brands/teams.webp"
                  alt="Keluarga Besar PT Jamparing Masagi"
                  fill
                  className="object-cover object-center filter brightness-95"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="bg-[#111827] px-4 py-3 text-xs text-slate-400 border-t border-slate-800">
                Dukungan teknisi standby di kantor Graha DLA & Workshop Cimahi.
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
