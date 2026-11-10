import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { CONTACT_CONTENT } from "@/content/site-content";

export function ContactSection() {
  const cleanPhone = SITE_CONFIG.phone.replace(/[^0-9+]/g, "");

  return (
    <section id="kontak" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
      <Container>
        {/* Single Primary CTA Band (bg-blue-600) permitted by Rule 02 §2 */}
        <div className="rounded-2xl bg-blue-600 p-8 sm:p-12 lg:p-16 text-white shadow-md">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100">
              <span className="size-2 rounded-full bg-white" />
              <span>{CONTACT_CONTENT.sectionTag}</span>
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl text-balance">
              {CONTACT_CONTENT.heading}
            </h2>

            <p className="text-base text-blue-100 leading-relaxed sm:text-lg">
              {CONTACT_CONTENT.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ExternalLink
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Halo%20PT%20Jamparing%20Masagi,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20TIK.`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-xs hover:bg-red-700 active:bg-red-800 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="size-5 shrink-0" />
                <span>{CONTACT_CONTENT.ctaWhatsApp}</span>
                <ArrowUpRight className="size-4 shrink-0" />
              </ExternalLink>

              <ExternalLink
                href={`mailto:${SITE_CONFIG.email}?subject=Permintaan%20Informasi%20Layanan%20TIK`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-900 shadow-xs hover:bg-blue-50 active:bg-blue-100 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-colors cursor-pointer"
              >
                <Mail className="size-5 shrink-0 text-blue-600" />
                <span>{CONTACT_CONTENT.ctaEmail}</span>
              </ExternalLink>
            </div>

            <p className="text-xs text-blue-200 pt-2">
              {CONTACT_CONTENT.formNotice}
            </p>
          </div>
        </div>

        {/* Office & Workshop Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SITE_CONFIG.offices.map((office) => (
            <div
              key={office.title}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                  <MapPin className="size-5 text-red-600 shrink-0" />
                  <span>{office.title}</span>
                </div>

                <address className="mt-3 not-italic text-sm leading-relaxed text-slate-600">
                  <p className="font-medium text-slate-800">{office.line1}</p>
                  <p>{office.line2}</p>
                  {office.cityPostal && <p>{office.cityPostal}</p>}
                </address>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">Dukungan Jam Kerja</span>
                <span>Senin - Jumat (08.30 - 17.00 WIB)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contact direct bar */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-700">
          <div className="flex items-center gap-3">
            <Phone className="size-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Telepon Kantor</p>
              <ExternalLink
                href={`tel:${cleanPhone}`}
                className="font-semibold text-slate-900 hover:text-blue-600"
              >
                {SITE_CONFIG.phone}
              </ExternalLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="size-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Email Informasi</p>
              <ExternalLink
                href={`mailto:${SITE_CONFIG.email}`}
                className="font-semibold text-slate-900 hover:text-blue-600"
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
