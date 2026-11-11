import { Container } from "@/components/ui/container";
import { ABOUT_CONTENT } from "@/content/site-content";

export function AboutSection() {
  return (
    <section
      id="tentang-kami"
      className="scroll-mt-20 border-b border-[#E2E5DC] bg-[#F6F7F3] text-slate-900 py-20 sm:py-32 relative"
    >
      <div id="tentang" className="sr-only" aria-hidden="true" />
      <Container>
        {/* Thinking*Room Style: Big editorial headline + 2-column manifest layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
              {ABOUT_CONTENT.sectionTag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-950 tracking-tight leading-tight mt-3">
              {ABOUT_CONTENT.heading}
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-base sm:text-lg font-light text-slate-700 leading-relaxed">
              {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Numbers bar - Thinking*Room clean numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[#E2E5DC] pt-12">
              {ABOUT_CONTENT.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <span className="text-4xl sm:text-5xl font-light font-mono text-slate-950 tracking-tight">
                    {stat.value}
                  </span>
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-mono pt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Working Principles - Bold hoverable border lines */}
        <div className="mt-24 sm:mt-32 pt-16 border-t border-[#E2E5DC]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
                Prinsip Kerja
              </span>
              <h3 className="text-3xl font-light text-slate-950 tracking-tight mt-2">
                Bagaimana Kami Bekerja
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Sistematis &bull; Terstandar &bull; Akuntabel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_CONTENT.pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="border-t-4 border-[#E2E5DC] pt-6 space-y-3 group hover:border-red-600 transition-colors duration-300 cursor-default"
              >
                <span className="text-xs font-mono text-slate-400 group-hover:text-red-600 font-medium transition-colors">
                  0{idx + 1}
                </span>
                <h4 className="text-lg font-medium text-slate-900 group-hover:text-slate-950 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
