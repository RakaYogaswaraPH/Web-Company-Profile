import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SERVICES_CONTENT } from "@/content/site-content";

export function ServicesSection() {
  return (
    <section
      id="layanan"
      className="scroll-mt-20 border-b border-[#E2E5DC] bg-white text-slate-900 py-20 sm:py-32"
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E5DC] pb-8 mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
              Services &amp; Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-950 tracking-tight mt-3">
              Solusi &amp; Layanan TIK
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
            Perancangan, instalasi fisik, hingga arsitektur perangkat lunak dengan pendekatan berorientasi SLA jangka panjang.
          </p>
        </div>

        {/* Thinking*Room Editorial List / Table Layout: NO AI BOX CARDS */}
        <div className="divide-y divide-[#E2E5DC]">
          {SERVICES_CONTENT.map((service, index) => (
            <div
              key={service.id}
              className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group hover:bg-[#F6F7F3] transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-lg"
            >
              <div className="lg:col-span-2 flex items-center justify-between">
                <span className="text-sm font-mono text-slate-400 group-hover:text-red-600 transition-colors">
                  /{index < 9 ? `0${index + 1}` : index + 1}
                </span>
                <span className="lg:hidden text-xs uppercase tracking-widest text-slate-500 font-mono">
                  ICT Service
                </span>
              </div>

              <div className="lg:col-span-4">
                <h3 className="text-2xl sm:text-3xl font-light text-slate-950 tracking-tight group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {service.summary}
                </p>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-between items-start lg:items-end space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                  Deliverable:
                </span>
                <span className="text-xs text-slate-800 font-mono text-left lg:text-right">
                  {service.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Inquiry bar - sleek minimal banner */}
        <div className="mt-20 border-t border-[#E2E5DC] pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-medium text-slate-950">
              Penyusunan KAK &amp; Spesifikasi BoQ Pengadaan
            </h4>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Konsultasi teknis awal bersama certified network &amp; systems engineer kami.
            </p>
          </div>
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 border border-slate-400 hover:border-slate-950 hover:bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-900 transition-colors"
          >
            <span>Mulai Konsultasi</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
