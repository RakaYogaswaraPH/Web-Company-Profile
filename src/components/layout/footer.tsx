import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E2E5DC] bg-[#EEF0EA] text-slate-700">
      <Container className="py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand info with company Logo - no asterisk */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative h-8 sm:h-9 w-44 sm:w-48">
              <Image
                src="/images/brands/logo.webp"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 176px, 192px"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-600 max-w-sm font-normal">
              {SITE_CONFIG.legalName} &mdash; More Than Just ICT Solution.
            </p>
            <div className="pt-1 text-xs text-slate-500 font-mono space-y-1">
              <p>BANDUNG &bull; CIMAHI</p>
              <p>&copy; {currentYear} {SITE_CONFIG.legalName}</p>
            </div>
          </div>

          {/* Lokasi Kantor */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-950 font-mono mb-3 font-semibold">
              Lokasi Kami
            </p>
            <div className="text-xs sm:text-[13px] text-slate-600 space-y-4 leading-relaxed font-normal">
              <div>
                <p className="font-medium text-slate-900 mb-0.5">Kantor</p>
                <p>Graha DLA Lt. 3 Suite 6 Jl. Otto Iskandar Dinata No. 392, Bandung</p>
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-0.5">Workshop</p>
                <p>Jl. Telexina No. 4 Kebonkopi, Cibeureum, Cimahi</p>
              </div>
            </div>
          </div>

          {/* Kontak & Kanal Langsung */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-950 font-mono mb-3 font-semibold">
              Kontak Kami
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px] font-mono">
              <li>
                <ExternalLink
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-slate-600 hover:text-slate-950 hover:underline transition-colors"
                >
                  Email
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  className="text-slate-600 hover:text-slate-950 hover:underline transition-colors"
                >
                  WhatsApp
                </ExternalLink>
              </li>
              {SITE_CONFIG.socials.map((social) => (
                <li key={social.platform}>
                  <ExternalLink
                    href={social.url}
                    className="text-slate-600 hover:text-slate-950 hover:underline transition-colors"
                  >
                    {social.platform}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
