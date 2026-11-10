import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { FadeIn } from "@/components/ui/fade-in";
import { CONTACT_CONTENT } from "@/content/site-content";

export function ContactSection() {
  const cleanPhone = SITE_CONFIG.phone.replace(/[^0-9+]/g, "");

  return (
    <section id="kontak" className="scroll-mt-24 bg-[#0B0F19] py-16 sm:py-24 border-b border-slate-800">
      <Container>
        {/* Modern Citcom-inspired CTA Card */}
        <FadeIn className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-[#111827] via-[#161F32] to-[#0E1524] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-red-600/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-blue-600/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-red-400">
              <span className="size-1.5 rounded-full bg-red-500" />
              <span>{CONTACT_CONTENT.sectionTag}</span>
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              {CONTACT_CONTENT.heading}
            </h2>

            <p className="text-base text-slate-300 leading-relaxed sm:text-lg">
              {CONTACT_CONTENT.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ExternalLink
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Halo%20PT%20Jamparing%20Masagi,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20TIK.`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-900/30 hover:bg-red-700 active:bg-red-800 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="size-5 shrink-0" />
                <span>{CONTACT_CONTENT.ctaWhatsApp}</span>
                <ArrowUpRight className="size-4 shrink-0" />
              </ExternalLink>

              <ExternalLink
                href={`mailto:${SITE_CONFIG.email}?subject=Permintaan%20Informasi%20Layanan%20TIK`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3 text-base font-semibold text-white shadow-xs hover:bg-slate-800 active:bg-slate-700 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-colors cursor-pointer"
              >
                <Mail className="size-5 shrink-0 text-slate-300" />
                <span>{CONTACT_CONTENT.ctaEmail}</span>
              </ExternalLink>
            </div>

            <p className="text-xs text-slate-400 pt-2 font-mono">
              {"//"} {CONTACT_CONTENT.formNotice}
            </p>
          </div>
        </FadeIn>

        {/* Office & Workshop Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SITE_CONFIG.offices.map((office) => (
            <div
              key={office.title}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#111827] p-6 text-slate-200"
            >
              <div>
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <MapPin className="size-5 text-red-500 shrink-0" />
                  <span>{office.title}</span>
                </div>

                <address className="mt-3 not-italic text-sm leading-relaxed text-slate-400">
                  <p className="font-medium text-slate-200">{office.line1}</p>
                  <p>{office.line2}</p>
                  {office.cityPostal && <p>{office.cityPostal}</p>}
                </address>
              </div>

              <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-slate-300">Dukungan Jam Kerja</span>
                <span>Senin - Jumat (08.30 - 17.00 WIB)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contact direct bar */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-[#111827] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <Phone className="size-5 text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-mono">Telepon Kantor</p>
              <ExternalLink
                href={`tel:${cleanPhone}`}
                className="font-semibold text-white hover:text-red-400 transition-colors"
              >
                {SITE_CONFIG.phone}
              </ExternalLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="size-5 text-red-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-mono">Email Resmi</p>
              <ExternalLink
                href={`mailto:${SITE_CONFIG.email}`}
                className="font-semibold text-white hover:text-red-400 transition-colors"
              >
                {SITE_CONFIG.email}
              </ExternalLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
