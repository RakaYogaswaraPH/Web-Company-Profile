import type { SiteConfig } from "@/types/content";

export const SITE_CONFIG: SiteConfig = {
  name: "PT. Jamparing Masagi",
  legalName: "PT. Jamparing Masagi",
  tagline: "More Than Just ICT Solution",
  description:
    "Penyedia layanan solusi teknologi informasi dan komunikasi: konsultan TIK, infrastruktur jaringan, pembangunan aplikasi, integrasi sistem, dan keamanan TIK.",
  url: "https://jamparingmasagi.co.id", // TODO(isi-konten): konfirmasi domain produksi
  phone: "+62 22 0000000", // TODO(isi-konten): nomor telepon kantor
  email: "kontak@jamparingmasagi.co.id", // TODO(isi-konten): email resmi perusahaan
  whatsapp: "628000000000", // TODO(isi-konten): nomor WhatsApp resmi
  offices: [
    {
      title: "Kantor",
      line1: "Graha DLA Lantai 3 Suite 6",
      line2: "Jl. Otto Iskandar Dinata No. 392",
      cityPostal: "Bandung",
    },
    {
      title: "Workshop",
      line1: "Jl. Telexina No. 4 Kebonkopi",
      line2: "Cibeureum",
      cityPostal: "Cimahi 40535",
    },
  ],
  socials: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/company/jamparing-masagi", // TODO(isi-konten): link LinkedIn perusahaan
      label: "LinkedIn Jamparing Masagi",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/jamparingmasagi", // TODO(isi-konten): link Instagram perusahaan
      label: "Instagram Jamparing Masagi",
    },
  ],
  navItems: [
    { label: "Beranda", href: "#beranda" },
    { label: "Tentang Kami", href: "#tentang-kami" },
    { label: "Layanan", href: "#layanan" },
    { label: "Klien & Mitra", href: "#klien-mitra" },
    { label: "Kontak", href: "#kontak" },
  ],
} as const;
