import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PARTNERS } from "@/content/asset-manifest";

export function BrandStripSection() {
  const featured = PARTNERS.slice(0, 8);

  return (
    <section aria-label="Mitra Utama" className="border-b border-[#2D344E] bg-[#171B2A] py-12 sm:py-16">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#2D344E] pb-6 mb-10 gap-4">
          <p className="text-xs uppercase tracking-widest text-[#94A0B8] font-mono">
            Selected Technology Partners &amp; Deployments
          </p>
          <span className="text-xs font-mono text-[#717E9B]">
            Global Principals / Enterprise Standard
          </span>
        </div>

        <div className="grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-4 lg:grid-cols-8">
          {featured.map((item) => (
            <div
              key={item.file}
              className="flex h-14 w-full items-center justify-center p-2 opacity-40 grayscale contrast-125 brightness-150 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-8 w-28">
                <Image
                  src={item.path}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
