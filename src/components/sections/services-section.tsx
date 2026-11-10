import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { SERVICES_CONTENT } from "@/content/site-content";

export function ServicesSection() {
  return (
    <section
      id="layanan"
      className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16 sm:py-24"
    >
      <Container>
        <FadeIn>
          <SectionHeader
            tag="Layanan Utama"
            title="Solusi TIK Terarah untuk Kebutuhan Operasional Bisnis"
            description="Dari perancangan arsitektur jaringan, instalasi perangkat keras, hingga pembangunan sistem aplikasi kustom, kami menyediakan kapabilitas end-to-end dengan dukungan SLA yang jelas."
            align="center"
            className="mb-12 sm:mb-16"
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_CONTENT.map((service, index) => (
            <FadeIn
              key={service.id}
              delay={index * 0.08}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-2xs transition-all hover:border-blue-400 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    0{index + 1}
                  </span>
                  <span className="size-2 rounded-full bg-blue-600" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {service.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-2xs font-semibold tracking-wider text-slate-500 uppercase">
                  Hasil / Deliverable:
                </p>
                <p className="mt-1 text-xs font-medium text-blue-700">
                  {service.deliverable}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom service banner note */}
        <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50/60 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-slate-900 text-base">
              Membutuhkan spesifikasi pengadaan perangkat atau kajian teknis khusus?
            </h4>
            <p className="mt-1 text-sm text-slate-600">
              Tim konsultan kami siap menyusun Kerangka Acuan Kerja (KAK) dan rincian BoQ (Bill of Quantities).
            </p>
          </div>
          <a
            href="#kontak"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shrink-0"
          >
            <span>Konsultasi Teknis</span>
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
