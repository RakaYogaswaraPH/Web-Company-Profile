import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E2E5DC] bg-[#EEF0EA] text-slate-700">
      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand info with company Logo - no asterisk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-10 sm:h-11 w-52 sm:w-56">
              <Image
                src="/images/brands/logo.webp"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 208px, 224px"
              />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 max-w-sm font-normal">
              {SITE_CONFIG.legalName} &mdash; More Than Just ICT Solution.
            </p>
            <div className="pt-2 text-xs sm:text-sm text-slate-500 font-mono space-y-1.5">
              <p>BANDUNG &bull; CIMAHI</p>
              <p>&copy; {currentYear} {SITE_CONFIG.legalName}</p>
            </div>
          </div>

          {/* Lokasi Kantor */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-950 font-mono mb-4 font-semibold">
              Lokasi Kami
            </p>
            <div className="text-sm text-slate-700 space-y-5 leading-relaxed font-normal">
              <div>
                <p className="font-semibold text-slate-900 mb-1">Kantor</p>
                <p>Graha DLA Lt. 3 Suite 6 Jl. Otto Iskandar Dinata No. 392, Bandung</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Workshop</p>
                <p>Jl. Telexina No. 4 Kebonkopi, Cibeureum, Cimahi</p>
              </div>
            </div>
          </div>

          {/* Kontak & Kanal Langsung */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-950 font-mono mb-4 font-semibold">
              Kontak Kami
            </p>
            <ul className="space-y-3 text-sm font-mono">
              <li>
                <ExternalLink
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-slate-700 hover:text-slate-950 hover:underline transition-colors"
                >
                  Email
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  className="text-slate-700 hover:text-slate-950 hover:underline transition-colors"
                >
                  WhatsApp
                </ExternalLink>
              </li>
              {SITE_CONFIG.socials.map((social) => (
                <li key={social.platform}>
                  <ExternalLink
                    href={social.url}
                    className="text-slate-700 hover:text-slate-950 hover:underline transition-colors"
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
