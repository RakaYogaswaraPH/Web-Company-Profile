import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#222222] bg-[#0A0A0A] text-[#888888]">
      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-8 w-44">
              <Image
                src="/images/brands/logo-white.webp"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain object-left"
                sizes="176px"
              />
            </div>
            <p className="text-sm leading-relaxed text-[#777777] max-w-sm font-light">
              {SITE_CONFIG.legalName} &mdash; Perusahaan solusi infrastruktur, jaringan enterprise, dan rekayasa perangkat lunak.
            </p>
            <div className="pt-2 text-xs text-[#666666] font-mono space-y-1">
              <p>BANDUNG &bull; CIMAHI &bull; INDONESIA</p>
              <p>&copy; {currentYear} {SITE_CONFIG.legalName}. All rights reserved.</p>
            </div>
          </div>

          {/* Navigasi */}
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-widest text-white font-mono mb-4">
              Navigation
            </p>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-mono">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#888888] hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#kontak"
                  className="text-[#888888] hover:text-white transition-colors"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-widest text-white font-mono mb-4">
              Locations
            </p>
            <div className="text-xs font-light text-[#888888] space-y-4">
              <div>
                <p className="font-normal text-white">Graha DLA Lt. 3 Suite 6</p>
                <p>Jl. Otto Iskandar Dinata No. 392, Bandung</p>
              </div>
              <div>
                <p className="font-normal text-white">Workshop &amp; Lab</p>
                <p>Jl. Telexina No. 4 Kebonkopi, Cibeureum, Cimahi</p>
              </div>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-widest text-white font-mono mb-4">
              Connect
            </p>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <ExternalLink
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  Email Inquiry
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </ExternalLink>
              </li>
              {SITE_CONFIG.socials.map((social) => (
                <li key={social.platform}>
                  <ExternalLink
                    href={social.url}
                    className="hover:text-white transition-colors"
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
