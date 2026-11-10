import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/content/site-content";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative scroll-mt-24 overflow-hidden bg-[#0B0F19] py-16 sm:py-20 lg:py-28 border-b border-slate-800"
    >
      {/* Subtle modern cyber/grid background glow (Citcom inspired) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Text Column - NO AI SLOP PILL BADGE */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-red-500 uppercase">
              <span className="size-2 rounded-full bg-red-500 animate-pulse" />
              <span>{HERO_CONTENT.badge}</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-tight">
              {HERO_CONTENT.headline}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {HERO_CONTENT.subheadline}
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Button
                href={HERO_CONTENT.ctaPrimary.href}
                variant="accent"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-red-900/30"
              >
                <span>{HERO_CONTENT.ctaPrimary.label}</span>
                <ArrowUpRight className="size-5" />
              </Button>
              <Button
                href={HERO_CONTENT.ctaSecondary.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:text-white"
              >
                {HERO_CONTENT.ctaSecondary.label}
              </Button>
            </div>

            {/* Metrics bar with crisp editorial typography */}
            <div className="grid grid-cols-3 gap-6 border-t border-slate-800/80 pt-8">
              <div>
                <p className="text-2xl font-bold font-mono text-white sm:text-4xl">20+</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Tenaga Ahli TIK</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white sm:text-4xl">15+</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Prinsipal Global</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-red-400 sm:text-4xl">100%</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Komitmen SLA</p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl sm:max-w-lg lg:max-w-none group">
              <div className="aspect-4/3 w-full sm:aspect-16/11 relative">
                <Image
                  src="/images/brands/teams.webp"
                  alt="Tim Profesional PT Jamparing Masagi"
                  fill
                  priority
                  className="object-cover object-top filter brightness-95 group-hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                />
              </div>
              <div className="border-t border-slate-800 bg-[#111827]/90 backdrop-blur-sm p-4">
                <p className="text-xs font-semibold text-slate-200">
                  Tim Perekayasa & Konsultan Teknis
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  PT Jamparing Masagi siap mendampingi kebutuhan TIK instansi Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
