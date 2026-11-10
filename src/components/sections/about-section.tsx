import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_CONTENT } from "@/content/site-content";

export function AboutSection() {
  return (
    <section id="tentang" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Text & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeader
              tag={ABOUT_CONTENT.sectionTag}
              title={ABOUT_CONTENT.heading}
            />

            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              {ABOUT_CONTENT.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>

            {/* 4 Pillars Grid */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-semibold tracking-wider text-slate-900 uppercase mb-6">
                Prinsip Pengerjaan Kami
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {ABOUT_CONTENT.pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 transition-colors hover:border-blue-300 hover:bg-blue-50/30"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="size-1.5 rounded-full bg-red-600 shrink-0" />
                      <h4 className="font-semibold text-slate-900 text-sm">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Secondary Photo View */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
                Kapasitas Operasional
              </h3>
              <div className="mt-6 space-y-6 divide-y divide-slate-200">
                {ABOUT_CONTENT.stats.map((stat, idx) => (
                  <div key={stat.label} className={idx > 0 ? "pt-6" : ""}>
                    <p className="text-3xl font-bold tracking-tight text-blue-600">
                      {stat.value}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 text-sm">
                      {stat.label}
                    </p>
                    {stat.description && (
                      <p className="mt-1 text-xs text-slate-500">
                        {stat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="aspect-4/3 relative w-full">
                <Image
                  src="/images/brands/teams.webp"
                  alt="Keluarga Besar PT Jamparing Masagi"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
              <div className="bg-slate-100 px-4 py-3 text-xs text-slate-600">
                Dukungan teknisi standby di kantor Graha DLA & Workshop Cimahi.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
