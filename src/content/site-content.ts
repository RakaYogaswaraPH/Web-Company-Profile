import type { CompanyStat, ServiceItem, ValuePillar } from "@/types/content";

export const HERO_CONTENT = {
  badge: "Penyedia Solusi TIK Terintegrasi",
  headline: "Infrastruktur & Sistem Informasi untuk Skala Perusahaan",
  subheadline:
    "PT Jamparing Masagi membangun kerja sama dengan BUMN, instansi pemerintah, dan perusahaan swasta dalam merencanakan dan membangun infrastruktur jaringan dan juga layanan operasional.",
  ctaPrimary: {
    label: "Hubungi Tim Kami",
    href: "#kontak",
  },
  ctaSecondary: {
    label: "Lihat Layanan",
    href: "#layanan",
  },
} as const;

export const ABOUT_CONTENT = {
  sectionTag: "Profil Perusahaan",
  heading: "Mitra Pendamping TIK dari Rancangan hingga Pemeliharaan",
  paragraphs: [
    "PT Jamparing Masagi adalah perusahaan penyedia layanan Teknologi Informasi dan Komunikasi (TIK) yang berbasis di Bandung dan Cimahi. Kami memberikan pendampingan teknis langsung dari tahap audit awal, implementasi lapangan, hingga pengujian menyeluruh.",
    "Dengan dukungan jaringan kemitraan resmi prinsipal teknologi global dan tim engineer berpengalaman, kami memastikan infrastruktur data center, konektivitas kantor cabang, dan sistem aplikasi berjalan stabil dengan jaminan dukungan operasional.",
  ],
  stats: [
    {
      value: "20+",
      label: "Tenaga Ahli",
      description: "Tenaga ahli jaringan, sistem, dan pengembang aplikasi bersertifikasi",
    },
    {
      value: "15+",
      label: "Prinsipal Global",
      description: "Kemitraan perangkat keras dan lisensi enterprise terdaftar",
    },
    {
      value: "10+",
      label: "Sektor Industri",
      description: "Implementasi di BUMN, pendidikan tinggi, pertahanan, dan manufaktur",
    },
  ] as readonly CompanyStat[],
  pillars: [
    {
      title: "Solutif & Tepat Sasaran",
      description:
        "Rekomendasi teknis disusun berdasarkan evaluasi kondisi eksisting dan kebutuhan beban kerja nyata organisasi.",
    },
    {
      title: "Standar Industri",
      description:
        "Setiap tahapan penggelaran kabel, pemasangan rak, dan implementasi server mengikuti standar sertifikasi vendor.",
    },
    {
      title: "Dukungan Berkelanjutan",
      description:
        "Pendampingan pasca-instalasi mencakup transfer wawasan bagi tim internal, dokumentasi rancang-bangun (as-built), dan pemeliharaan SLA.",
    },
    {
      title: "Kepatuhan Keamanan",
      description:
        "Konfigurasi perimeter jaringan mengutamakan isolasi data kritis dan proteksi akses bertingkat.",
    },
  ] as readonly ValuePillar[],
} as const;

export const SERVICES_CONTENT: readonly ServiceItem[] = [
  {
    id: "konsultan-tik",
    title: "Konsultan TIK",
    summary:
      "Penyusunan blueprint arsitektur informasi, audit kelayakan infrastruktur eksisting, serta perencanaan belanja teknologi yang terarah.",
    deliverable: "Dokumen Masterplan TIK & Rekomendasi Kapasitas",
  },
  {
    id: "infrastruktur-jaringan",
    title: "Infrastruktur Jaringan",
    summary:
      "Pemasangan kabel fiber optic dan UTP terstruktur, instalasi switch, core router, wireless controller, dan penataan rack server.",
    deliverable: "Penggelaran Jaringan Data Center & Kantor Cabang",
  },
  {
    id: "pembangunan-aplikasi",
    title: "Pembangunan Aplikasi",
    summary:
      "Rancang bangun aplikasi web dan mobile kustom untuk digitalisasi alur kerja, otomasi administrasi, dan pelaporan internal.",
    deliverable: "Aplikasi Khusus Siap Pakai & Dokumentasi API",
  },
  {
    id: "integrasi-sistem",
    title: "Integrasi Sistem",
    summary:
      "Penyambungan beberapa aplikasi terpisah menggunakan API gateway, sinkronisasi basis data, dan konsolidasi data operasional.",
    deliverable: "Interkoneksi Antar Sistem Tanpa Redundansi Data",
  },
  {
    id: "multimedia-surveillance",
    title: "Multimedia & Surveillance",
    summary:
      "Penyediaan sistem video conference ruang rapat, command center, dan kamera CCTV enterprise terpusat dengan perekaman aman.",
    deliverable: "Instalasi Command Center & Kamera Pengawas Terpusat",
  },
  {
    id: "keamanan-tik",
    title: "Keamanan TIK",
    summary:
      "Konfigurasi Next-Generation Firewall (NGFW), perlindungan endpoint, manajemen VPN aman, dan pemindaian kerentanan sistem.",
    deliverable: "Perlindungan Perimeter & Pengamanan Akses Jaringan",
  },
] as const;

export const CLIENTS_CONTENT = {
  sectionTag: "Portfolio Klien",
  heading: "Instansi & Perusahaan yang Telah Bekerja Sama",
  description:
    "Kami dipercaya oleh lembaga pemerintahan, universitas, BUMN terkemuka, dan perusahaan swasta untuk kebutuhan TIK mereka.",
} as const;

export const PARTNERS_CONTENT = {
  sectionTag: "Kemitraan Resmi",
  heading: "Didukung oleh Prinsipal Teknologi Terpercaya",
  description:
    "Kami bekerja sama dengan vendor perangkat keras, jaringan, dan perangkat lunak global untuk menjamin orisinalitas produk serta garansi resmi.",
} as const;

export const CONTACT_CONTENT = {
  sectionTag: "Mulai Diskusi",
  heading: "Konsultasikan Kebutuhan Infrastruktur TIK Anda",
  description:
    "Tim teknis kami siap meninjau rencana proyek Anda, mulai dari assessment kebutuhan lapangan, estimasi spesifikasi, hingga timeline implementasi.",
  ctaWhatsApp: "Hubungi via WhatsApp",
  ctaEmail: "Kirim Email Penawaran",
  formNotice:
    "Kami merespons setiap pertanyaan teknis dalam waktu maksimal 1x24 jam kerja.",
} as const;
