import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CLIENTS, PARTNERS } from "@/content/asset-manifest";
import { CLIENTS_CONTENT, PARTNERS_CONTENT } from "@/content/site-content";

export function ClientsPartnersSection() {
  return (
    <section id="klien-mitra" className="scroll-mt-24 bg-[#0B0F19] py-16 sm:py-24 border-b border-slate-800">
      <Container>
        {/* Klien / Pelanggan */}
        <div>
          <SectionHeader
            tag={CLIENTS_CONTENT.sectionTag}
            title={CLIENTS_CONTENT.heading}
            description={CLIENTS_CONTENT.description}
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {CLIENTS.map((client) => (
              <div
                key={client.file}
                className="group flex h-24 items-center justify-center rounded-xl border border-slate-800 bg-[#111827] p-4 transition-all hover:border-slate-600 hover:bg-[#161F32]"
              >
                <div className="relative h-12 w-full max-w-[120px]">
                  <Image
                    src={client.path}
                    alt={client.name}
                    fill
                    loading="eager"
                    className="object-contain filter grayscale contrast-125 brightness-150 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    sizes="120px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pemisah halus */}
        <hr className="my-16 sm:my-20 border-slate-800" />

        {/* Mitra / Distributor Global */}
        <div>
          <SectionHeader
            tag={PARTNERS_CONTENT.sectionTag}
            title={PARTNERS_CONTENT.heading}
            description={PARTNERS_CONTENT.description}
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {PARTNERS.map((partner) => (
              <div
                key={partner.file}
                className="group flex h-24 items-center justify-center rounded-xl border border-slate-800 bg-[#111827] p-4 transition-all hover:border-red-500/50 hover:bg-[#161F32]"
              >
                <div className="relative h-12 w-full max-w-[120px]">
                  <Image
                    src={partner.path}
                    alt={partner.name}
                    fill
                    loading="eager"
                    className="object-contain filter grayscale contrast-125 brightness-150 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
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
