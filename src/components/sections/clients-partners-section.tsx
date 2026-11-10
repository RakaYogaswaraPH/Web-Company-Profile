import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CLIENTS, PARTNERS } from "@/content/asset-manifest";

export function ClientsPartnersSection() {
  return (
    <section id="klien-mitra" className="scroll-mt-20 bg-[#111111] text-white py-20 sm:py-32 border-b border-[#222222]">
      <Container>
        {/* Klien Pelanggan - Thinking*Room Works / Client Roster */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#222222] pb-6 mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#777777] font-mono block">
                Selected Client Deployments
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight mt-2">
                Klien &amp; Instansi
              </h2>
            </div>
            <span className="text-xs font-mono text-[#555555]">
              State-Owned Enterprises &bull; Government &bull; Private
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#222222] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border border-[#222222]">
            {CLIENTS.map((client) => (
              <div
                key={client.file}
                className="group flex h-28 items-center justify-center bg-[#111111] p-6 hover:bg-[#161616] transition-colors"
              >
                <div className="relative h-10 w-full max-w-[120px]">
                  <Image
                    src={client.path}
                    alt={client.name}
                    fill
                    loading="eager"
                    className="object-contain filter grayscale contrast-125 brightness-150 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    sizes="120px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mitra Teknologi Global */}
        <div className="mt-24 sm:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#222222] pb-6 mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#777777] font-mono block">
                Technology Principals
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight mt-2">
                Mitra Perangkat &amp; Lisensi
              </h2>
            </div>
            <span className="text-xs font-mono text-[#555555]">
              Authorized Integrations &bull; Tier-1 Hardware
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#222222] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border border-[#222222]">
            {PARTNERS.map((partner) => (
              <div
                key={partner.file}
                className="group flex h-28 items-center justify-center bg-[#111111] p-6 hover:bg-[#161616] transition-colors"
              >
                <div className="relative h-10 w-full max-w-[120px]">
                  <Image
                    src={partner.path}
                    alt={partner.name}
                    fill
                    loading="eager"
                    className="object-contain filter grayscale contrast-125 brightness-150 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    sizes="120px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
