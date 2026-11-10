import { Mail, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";

export function ContactSection() {
  const cleanPhone = SITE_CONFIG.phone.replace(/[^0-9+]/g, "");

  return (
    <section id="kontak" className="scroll-mt-20 bg-white text-slate-900 py-24 sm:py-36 border-b border-[#E2E5DC]">
      <Container>
        {/* Thinking*Room Contact Big Heading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
              Inquiries &amp; Engagement
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-slate-950 tracking-tight leading-[1.05]">
              Let’s build resilient systems together.
            </h2>
            <p className="max-w-xl text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              Hubungi tim teknis kami untuk evaluasi kebutuhan infrastruktur data, pengadaan perangkat, atau integrasi aplikasi instansi Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ExternalLink
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Halo%20PT%20Jamparing%20Masagi,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20TIK.`}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-red-600 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-950/20"
              >
                <span>WhatsApp Hotline</span>
                <ArrowUpRight className="size-4 shrink-0" />
              </ExternalLink>

              <ExternalLink
                href={`mailto:${SITE_CONFIG.email}?subject=Permintaan%20Informasi%20Layanan%20TIK`}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-slate-400 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-900 hover:border-slate-950 hover:bg-slate-50 transition-colors"
              >
                <Mail className="size-4 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </ExternalLink>
            </div>
          </div>

          {/* Offices List - Thinking*Room Contact Info layout */}
          <div className="lg:col-span-5 space-y-12 lg:border-l lg:border-[#E2E5DC] lg:pl-16">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
                Office Bandung
              </span>
              <div className="text-sm font-light text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-900">{SITE_CONFIG.offices[0].line1}</p>
                <p>{SITE_CONFIG.offices[0].line2}</p>
                <p>{SITE_CONFIG.offices[0].cityPostal}</p>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
                Workshop &amp; Lab Cimahi
              </span>
              <div className="text-sm font-light text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-900">{SITE_CONFIG.offices[1].line1}</p>
                <p>{SITE_CONFIG.offices[1].line2}</p>
                <p>{SITE_CONFIG.offices[1].cityPostal}</p>
              </div>
            </div>

            <div className="border-t border-[#E2E5DC] pt-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
                Direct Line
              </span>
              <p className="text-sm">
                <ExternalLink
                  href={`tel:${cleanPhone}`}
                  className="text-slate-900 hover:text-red-600 font-medium transition-colors"
                >
                  {SITE_CONFIG.phone}
                </ExternalLink>
              </p>
              <p className="text-xs text-slate-500 font-mono pt-2">
                Senin — Jumat / 08.30 — 17.00 WIB
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
