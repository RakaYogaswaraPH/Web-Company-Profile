import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { HERO_CONTENT } from "@/content/site-content";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative scroll-mt-24 overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Text Column */}
          <FadeIn className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
              <span className="size-2 rounded-full bg-red-600" />
              <span>{HERO_CONTENT.badge}</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl text-balance">
              {HERO_CONTENT.headline}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {HERO_CONTENT.subheadline}
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Button
                href={HERO_CONTENT.ctaPrimary.href}
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
              >
                <span>{HERO_CONTENT.ctaPrimary.label}</span>
                <ArrowUpRight className="size-5" />
              </Button>
              <Button
                href={HERO_CONTENT.ctaSecondary.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {HERO_CONTENT.ctaSecondary.label}
              </Button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              <div>
                <p className="text-2xl font-bold text-slate-900 sm:text-3xl">20+</p>
                <p className="text-xs text-slate-500 font-medium">Tenaga Ahli TIK</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 sm:text-3xl">15+</p>
                <p className="text-xs text-slate-500 font-medium">Prinsipal Global</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 sm:text-3xl">100%</p>
                <p className="text-xs text-slate-500 font-medium">Komitmen SLA</p>
              </div>
            </div>
          </FadeIn>

          {/* Image Column */}
          <FadeIn delay={0.2} className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm sm:max-w-lg lg:max-w-none">
              <div className="aspect-4/3 w-full sm:aspect-16/11 relative">
                <Image
                  src="/images/brands/teams.webp"
                  alt="Tim Profesional PT Jamparing Masagi"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                />
              </div>
              <div className="border-t border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-800">
                  Tim Perekayasa & Konsultan Teknis
                </p>
                <p className="text-xs text-slate-500">
                  PT Jamparing Masagi siap mendampingi kebutuhan TIK instansi Anda.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
