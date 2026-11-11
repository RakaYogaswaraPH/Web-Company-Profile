import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CLIENTS, PARTNERS } from "@/content/asset-manifest";

export function ClientsPartnersSection() {
  return (
    <section id="klien-mitra" className="scroll-mt-20 bg-[#F6F7F3] text-slate-900 py-20 sm:py-32 border-b border-[#E2E5DC]">
      <Container>
        {/* Mitra Perangkat & Lisensi */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E5DC] pb-6 mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
                Kemitraan Perangkat &amp; Prinsipal
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-950 tracking-tight mt-2">
                Mitra Perangkat &amp; Lisensi
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Integrasi Resmi &bull; Perangkat Keras Tier-1
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#E2E5DC] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border border-[#E2E5DC]">
            {CLIENTS.map((client) => {
              const fileLower = client.file.toLowerCase();
              const isFurukawa = fileLower.includes("furukawa");
              const isAlliedTelesis = fileLower.includes("allied");
              const isApc = fileLower.includes("apc");

              let sizeClass = "relative h-14 sm:h-16 w-full max-w-[150px] sm:max-w-[175px]";
              if (isFurukawa) {
                sizeClass = "relative h-11 sm:h-13 w-full max-w-[130px] sm:max-w-[145px] scale-90 sm:scale-95";
              } else if (isAlliedTelesis) {
                sizeClass = "relative h-11 sm:h-12 w-full max-w-[135px] sm:max-w-[155px]";
              } else if (isApc) {
                sizeClass = "relative h-16 sm:h-18 w-full max-w-[160px] sm:max-w-[185px] scale-125 sm:scale-135";
              }

              return (
                <div
                  key={client.file}
                  className="group flex h-32 sm:h-36 items-center justify-center bg-white p-6 hover:bg-[#EEF0EA] transition-colors"
                >
                  <div className={sizeClass}>
                    <Image
                      src={client.path}
                      alt={client.name}
                      fill
                      loading="lazy"
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 150px, 175px"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portofolio Kerja Sama: Klien & Instansi */}
        <div className="mt-24 sm:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E2E5DC] pb-6 mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono block font-medium">
                Portofolio Kerja Sama
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-950 tracking-tight mt-2">
                Klien &amp; Instansi
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              BUMN &bull; Instansi Pemerintah &bull; Perusahaan Swasta
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#E2E5DC] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border border-[#E2E5DC]">
            {PARTNERS.map((partner) => (
              <div
                key={partner.file}
                className="group flex h-32 sm:h-36 items-center justify-center bg-white p-6 hover:bg-[#EEF0EA] transition-colors"
              >
                <div className="relative h-14 sm:h-16 w-full max-w-[150px] sm:max-w-[175px]">
                  <Image
                    src={partner.path}
                    alt={partner.name}
                    fill
                    loading="lazy"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 150px, 175px"
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
