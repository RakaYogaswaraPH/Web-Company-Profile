import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PARTNERS } from "@/content/asset-manifest";

export function BrandStripSection() {
  const featured = PARTNERS.slice(0, 6);

  return (
    <section aria-label="Mitra Utama" className="border-b border-slate-800 bg-[#0E1322] py-8">
      <Container>
        <p className="text-center text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">
          {"//"} Dipercaya oleh Perusahaan & Lembaga Terkemuka di Indonesia
        </p>
        <div className="mt-6 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((item) => (
            <div
              key={item.file}
              className="flex h-12 w-32 items-center justify-center p-1 grayscale contrast-125 brightness-150 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
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
