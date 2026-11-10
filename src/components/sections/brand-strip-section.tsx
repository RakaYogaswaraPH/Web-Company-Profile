import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PARTNERS } from "@/content/asset-manifest";

export function BrandStripSection() {
  // Duplicate partner logos for seamless infinite horizontal marquee
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <section aria-label="Mitra Utama" className="border-b border-[#2D344E] bg-[#171B2A] py-10 sm:py-14 overflow-hidden">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#2D344E] pb-5 mb-8 gap-4">
          <p className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono">
            Selected Technology Partners &amp; Deployments
          </p>
          <span className="text-xs font-mono text-[#717E9B]">
            Global Principals / Enterprise Standard
          </span>
        </div>
      </Container>

      {/* Infinite Auto-scrolling Carousel Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Masks for smooth entry/exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#171B2A] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#171B2A] to-transparent z-10" />

        <div className="animate-marquee flex items-center gap-4 py-2">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.file}-${index}`}
              className="flex h-20 sm:h-24 w-44 sm:w-56 shrink-0 items-center justify-center px-4 rounded-lg bg-[#1E2335]/70 hover:bg-[#252B42] border border-[#2D344E]/80 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-10 sm:h-12 w-32 sm:w-40">
                <Image
                  src={item.path}
                  alt={item.name}
                  fill
                  loading="lazy"
                  className="object-contain transition-transform duration-300 group-hover:scale-108"
                  sizes="160px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
