import type { CompanyStat, ServiceItem, ValuePillar } from "@/types/content";

export const HERO_CONTENT = {
  badge: "Penyedia Solusi TIK Terintegrasi",
  headline: "Infrastruktur & Sistem Informasi untuk Skala Perusahaan",
  subheadline:
    "PT Jamparing Masagi membangun kerja sama dengan BUMN, instansi pemerintah, dan perusahaan swasta dalam membangun infrastruktur dan juga layanan dalam bidang TIK.",
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
  heading: "Mitra spesialis dalam bidang TIK untuk solusi tepat dan tepercaya",
  paragraphs: [
    "PT Jamparing Masagi adalah perusahaan penyedia layanan Teknologi Informasi dan Komunikasi (TIK) yang berbasis di Bandung dan Cimahi. Kami memberikan pelayanan untuk klien dari berbagai kebutuhan bidang TIK.",
    "Dengan dukungan mitra resmi dan tim teknis berpengalaman, kami memastikan layanan yang kami berikan bisa tercapai sesuai harapan dan berjalan stabil dengan jaminan dukungan operasional oleh kami.",
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
        "Kami memberikan solusi yang disusun berdasarkan evaluasi kondisi dan kebutuhan klien.",
    },
    {
      title: "Standar Industri",
      description:
        "Setiap tahapan direncanakan dan dilaksanakan mengikuti standar operasional yang berlaku.",
    },
    {
      title: "Dukungan Berkelanjutan",
      description:
        "Mendampingi dan melayani klien yang seperti memberikan bantuan berupa solusi dan bantuan dari tim internal kami.",
    },
    {
      title: "Kepatuhan Keamanan",
      description:
        "Mengutamakan keamanan data serta mengisolasi data kritis pada layanan TIK untuk menghindari kebocoran data.",
    },
  ] as readonly ValuePillar[],
} as const;

export const SERVICES_CONTENT: readonly ServiceItem[] = [
  {
    id: "konsultan-tik",
    title: "Konsultan TIK",
    summary:
      "Penyusunan kebutuhan, audit, serta perencanaan implementasi teknologi TIK.",
    deliverable: "Dokumen Masterplan TIK & Rekomendasi Kapasitas",
  },
  {
    id: "infrastruktur-jaringan",
    title: "Infrastruktur Jaringan",
    summary:
      "Pemasangan dan perbaikan jaringan komputer serta pengembangan infrastruktur TIK.",
    deliverable: "Penggelaran Jaringan Data Center & Kantor Cabang",
  },
  {
    id: "pembangunan-aplikasi",
    title: "Pembangunan Aplikasi",
    summary:
      "Rancang bangun aplikasi web dan mobile untuk digitalisasi alur kerja.",
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
  heading: "Didukung oleh Perusahaan Teknologi Tepercaya",
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
