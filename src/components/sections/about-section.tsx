import { Container } from "@/components/ui/container";
import { ABOUT_CONTENT } from "@/content/site-content";

export function AboutSection() {
  return (
    <section id="tentang" className="scroll-mt-20 bg-[#1E2335] text-white py-20 sm:py-32 border-b border-[#2D344E]">
      <Container>
        {/* Thinking*Room Statement Layout: Large narrative text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono block">
              Company Statement
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              PT Jamparing Masagi
            </h2>
            <p className="text-xs text-[#BAC4D8] font-mono leading-relaxed pt-2">
              ICT CONSULTING &bull; NETWORK INFRASTRUCTURE &bull; APPLICATION DEVELOPMENT &bull; CYBER SECURITY
            </p>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#FFFFFF] leading-relaxed">
              Kami adalah perusahaan penyedia layanan Teknologi Informasi dan Komunikasi yang berbasis di Bandung dan Cimahi. Kami memberikan pendampingan teknis langsung dari tahap audit awal, implementasi lapangan, hingga pengujian menyeluruh.
            </p>
            <p className="text-base sm:text-lg text-[#BAC4D8] font-light leading-relaxed">
              Dengan dukungan jaringan kemitraan resmi prinsipal teknologi global dan tim engineer berpengalaman, kami memastikan infrastruktur data center, konektivitas kantor cabang, dan sistem aplikasi berjalan stabil dengan jaminan dukungan operasional.
            </p>

            {/* Numbers bar - Thinking*Room clean numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[#2D344E] pt-12">
              {ABOUT_CONTENT.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <span className="text-4xl sm:text-5xl font-light font-mono text-white tracking-tight">
                    {stat.value}
                  </span>
                  <p className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono pt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Working Principles - Thinking*Room Services/Pillars List (columns, not generic AI cards) */}
        <div className="mt-24 sm:mt-32 pt-16 border-t border-[#2D344E]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono block">
                Work Principles
              </span>
              <h3 className="text-3xl font-light text-white tracking-tight mt-2">
                Bagaimana Kami Bekerja
              </h3>
            </div>
            <span className="text-xs font-mono text-[#717E9B]">
              Systematic &bull; Standardized &bull; Accountable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_CONTENT.pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="border-t border-[#2D344E] pt-6 space-y-3 group hover:border-red-500 transition-colors"
              >
                <span className="text-xs font-mono text-[#717E9B] group-hover:text-red-400 transition-colors">
                  0{idx + 1}
                </span>
                <h4 className="text-lg font-normal text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs leading-relaxed text-[#BAC4D8] font-light">
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
