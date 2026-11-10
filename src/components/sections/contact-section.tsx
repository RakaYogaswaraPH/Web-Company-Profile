import { Mail, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";

export function ContactSection() {
  const cleanPhone = SITE_CONFIG.phone.replace(/[^0-9+]/g, "");

  return (
    <section id="kontak" className="scroll-mt-20 bg-[#1E2335] text-white py-24 sm:py-36 border-b border-[#2D344E]">
      <Container>
        {/* Thinking*Room Contact Big Heading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono block">
              Inquiries &amp; Engagement
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.05]">
              Let’s build resilient systems together.
            </h2>
            <p className="max-w-xl text-base sm:text-lg text-[#BAC4D8] font-light leading-relaxed">
              Hubungi tim teknis kami untuk evaluasi kebutuhan infrastruktur data, pengadaan perangkat, atau integrasi aplikasi instansi Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ExternalLink
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Halo%20PT%20Jamparing%20Masagi,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20TIK.`}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-red-600 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-950/40"
              >
                <span>WhatsApp Hotline</span>
                <ArrowUpRight className="size-4 shrink-0" />
              </ExternalLink>

              <ExternalLink
                href={`mailto:${SITE_CONFIG.email}?subject=Permintaan%20Informasi%20Layanan%20TIK`}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#3E4766] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:border-white transition-colors"
              >
                <Mail className="size-4 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </ExternalLink>
            </div>
          </div>

          {/* Offices List - Thinking*Room Contact Info layout */}
          <div className="lg:col-span-5 space-y-12 lg:border-l lg:border-[#2D344E] lg:pl-16">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono block">
                Office Bandung
              </span>
              <div className="text-sm font-light text-[#BAC4D8] leading-relaxed">
                <p className="font-normal text-white">{SITE_CONFIG.offices[0].line1}</p>
                <p>{SITE_CONFIG.offices[0].line2}</p>
                <p>{SITE_CONFIG.offices[0].cityPostal}</p>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono block">
                Workshop &amp; Lab Cimahi
              </span>
              <div className="text-sm font-light text-[#BAC4D8] leading-relaxed">
                <p className="font-normal text-white">{SITE_CONFIG.offices[1].line1}</p>
                <p>{SITE_CONFIG.offices[1].line2}</p>
                <p>{SITE_CONFIG.offices[1].cityPostal}</p>
              </div>
            </div>

            <div className="border-t border-[#2D344E] pt-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono block">
                Direct Line
              </span>
              <p className="text-sm text-[#BAC4D8]">
                <ExternalLink
                  href={`tel:${cleanPhone}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </ExternalLink>
              </p>
              <p className="text-xs text-[#717E9B] font-mono pt-2">
                Senin — Jumat / 08.30 — 17.00 WIB
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
