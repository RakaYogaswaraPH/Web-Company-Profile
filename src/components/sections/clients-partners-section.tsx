import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CLIENTS, PARTNERS } from "@/content/asset-manifest";
import { CLIENTS_CONTENT, PARTNERS_CONTENT } from "@/content/site-content";

export function ClientsPartnersSection() {
  return (
    <section id="klien-mitra" className="scroll-mt-24 bg-white py-16 sm:py-24">
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
                className="group flex h-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-400 hover:shadow-xs"
              >
                <div className="relative h-12 w-full max-w-[120px]">
                  <Image
                    src={client.path}
                    alt={client.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    sizes="120px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pemisah halus */}
        <hr className="my-16 sm:my-20 border-slate-200" />

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
                className="group flex h-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-red-400 hover:shadow-xs"
              >
                <div className="relative h-12 w-full max-w-[120px]">
                  <Image
                    src={partner.path}
                    alt={partner.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
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
