import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-10 w-44">
              <Image
                src="/images/brands/logo.webp"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain object-left"
                sizes="176px"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-600 max-w-sm">
              {SITE_CONFIG.tagline} — {SITE_CONFIG.description}
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Kontak Resmi:</p>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-blue-600 shrink-0" />
                  <ExternalLink
                    href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-blue-700"
                  >
                    {SITE_CONFIG.phone}
                  </ExternalLink>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-blue-600 shrink-0" />
                  <ExternalLink
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-blue-700"
                  >
                    {SITE_CONFIG.email}
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Lokasi Kantor */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-900 uppercase flex items-center gap-1.5">
              <MapPin className="size-4 text-red-600 shrink-0" />
              <span>{SITE_CONFIG.offices[0].title}</span>
            </h3>
            <address className="mt-4 not-italic text-sm leading-relaxed text-slate-600">
              <p className="font-medium text-slate-800">{SITE_CONFIG.offices[0].line1}</p>
              <p>{SITE_CONFIG.offices[0].line2}</p>
              {SITE_CONFIG.offices[0].cityPostal && (
                <p>{SITE_CONFIG.offices[0].cityPostal}</p>
              )}
            </address>
          </div>

          {/* Lokasi Workshop */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-900 uppercase flex items-center gap-1.5">
              <MapPin className="size-4 text-red-600 shrink-0" />
              <span>{SITE_CONFIG.offices[1].title}</span>
            </h3>
            <address className="mt-4 not-italic text-sm leading-relaxed text-slate-600">
              <p className="font-medium text-slate-800">{SITE_CONFIG.offices[1].line1}</p>
              <p>{SITE_CONFIG.offices[1].line2}</p>
              {SITE_CONFIG.offices[1].cityPostal && (
                <p>{SITE_CONFIG.offices[1].cityPostal}</p>
              )}
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row text-xs text-slate-500">
          <p>
            &copy; {currentYear} {SITE_CONFIG.legalName}. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-4">
            {SITE_CONFIG.socials.map((social) => (
              <ExternalLink
                key={social.platform}
                href={social.url}
                className="text-slate-500 hover:text-blue-600 transition-colors"
              >
                {social.platform}
              </ExternalLink>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
