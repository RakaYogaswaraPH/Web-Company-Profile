import type { CompanyStat, ServiceItem, SolutionItem, ValuePillar } from "@/types/content";

export const HERO_CONTENT = {
  badge: "Penyedia Solusi TIK Terintegrasi",
  headline: "Infrastruktur & Sistem Informasi untuk Skala Perusahaan",
  subheadline:
    "PT. Jamparing Masagi membangun kerja sama dengan BUMN, instansi pemerintah, dan perusahaan swasta dalam membangun infrastruktur dan layanan dalam bidang TIK.",
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
    "PT. Jamparing Masagi adalah perusahaan penyedia layanan Teknologi Informasi dan Komunikasi (TIK) yang berbasis di Bandung dan Cimahi. Kami memberikan pelayanan untuk klien dari berbagai kebutuhan bidang TIK.",
    "Dengan dukungan mitra resmi dan tim teknis berpengalaman, kami memastikan layanan yang kami berikan bisa tercapai dan berjalan dengan jaminan dukungan operasional oleh kami.",
  ],
  stats: [
    {
      value: "20+",
      label: "Tenaga Ahli",
      description: "Tenaga ahli jaringan, sistem, dan pengembang aplikasi bersertifikasi",
    },
    {
      value: "15+",
      label: "Mitra Perangkat",
      description: "Kemitraan perangkat keras dan lisensi enterprise terdaftar",
    },
    {
      value: "10+",
      label: "Mitra Perusahaan",
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
        "Mendampingi dan melayani klien dengan memberikan bantuan berupa solusi dan bantuan dari tim internal kami.",
    },
    {
      title: "Kepatuhan Keamanan",
      description:
        "Mengutamakan keamanan data serta mengisolasi data penting pada layanan TIK untuk menghindari kebocoran data.",
    },
  ] as readonly ValuePillar[],
} as const;

export const SERVICES_CONTENT: readonly ServiceItem[] = [
  {
    id: "konsultan-tik",
    title: "Konsultan TIK",
    summary:
      "Penyusunan kebutuhan, audit, serta perencanaan implementasi teknologi TIK.",
  },
  {
    id: "infrastruktur-jaringan",
    title: "Infrastruktur Jaringan",
    summary:
      "Pemasangan dan perbaikan jaringan serta pengembangan infrastruktur TIK.",
  },
  {
    id: "pembangunan-aplikasi",
    title: "Pembangunan Aplikasi",
    summary:
      "Rancang bangun aplikasi web dan mobile untuk digitalisasi alur kerja.",
  },
  {
    id: "integrasi-sistem",
    title: "Integrasi Sistem",
    summary:
      "Mengintegrasikan dan mengelola data pelayanan dan fasilitas TIK.",
  },
  {
    id: "multimedia-surveillance",
    title: "Multimedia & Surveillance",
    summary:
      "Menyediakan sistem video keamnan menggunakan kamera CCTV.",
  },
  {
    id: "keamanan-tik",
    title: "Keamanan TIK",
    summary:
      "Konfigurasi Firewall untuk mengamankan data serta memindai celah sistem.",
  },
] as const;

export const SOLUTIONS_CONTENT: readonly SolutionItem[] = [
  {
    id: "digiars",
    slug: "digiars",
    num: "01",
    title: "DIGIARS",
    shortTag: "Sistem Manajemen Dokumen",
    subtitle: "Digitalisasi arsip, tata kelola dokumen, dan persuratan elektronik.",
    description:
      "Platform manajemen arsip digital terpusat yang mempermudah penyimpanan, pencarian kilat, dan kontrol retensi berkas resmi untuk instansi pemerintah maupun korporasi.",
    features: [
      "Digitalisasi & pengindeksan dokumen otomatis dengan metadata dinamis",
      "Pencarian cepat berbasis kata kunci, nomor surat, dan tanggal berkas",
      "Pengaturan hak akses bertingkat dan enkripsi dokumen rahasia",
      "Audit trail lengkap untuk pencatatan riwayat disposisi & unduhan",
    ],
    url: "https://app.jamparingmasagi.id/digiars",
  },
  {
    id: "water-tracking",
    slug: "water-tracking",
    num: "02",
    title: "WATER TRACKING",
    shortTag: "Sistem Manajemen Pajak Air",
    subtitle: "Pemantauan debit air tanah & pelaporan pajak air berbasis IoT.",
    description:
      "Sistem cerdas pemantauan penggunaan air tanah secara real-time melalui integrasi sensor IoT, otomatisasi penghitungan volume pemakaian, dan pelaporan pajak daerah yang akurat.",
    features: [
      "Telemetri pemantauan volume debit air tanah secara real-time via IoT",
      "Kalkulasi otomatis ketetapan pajak air tanah sesuai regulasi daerah",
      "Peringatan dini (early warning) atas anomali kuota pemakaian",
      "Dasbor analitik monitoring terpusat untuk rekonsiliasi penerimaan pajak",
    ],
    url: "https://app.jamparingmasagi.id/water-tracking",
  },
  {
    id: "pesandong",
    slug: "pesandong",
    num: "03",
    title: "PESANDONG",
    shortTag: "Sistem Manajemen Transaksi",
    subtitle: "Pencatatan transaksi kasir, manajemen pesanan, dan inventori barang.",
    description:
      "Aplikasi kasir (POS) modern untuk gerai, ritel, dan operasional resto/bisnis yang mempermudah proses pemesanan cepat, menerima berbagai metode transaksi, pencetakan struk penjualan, hingga pemantauan stok produk.",
    features: [
      "Pencatatan transaksi kasir cepat dengan efisien",
      "Multi-metode pembayaran (Tunai, QRIS, & Transfer Bank)",
      "Manajemen katalog produk, varian harga, & stok real-time",
      "Laporan penjualan harian/bulanan & rekapitulasi omzet berkala",
    ],
    url: "https://app.jamparingmasagi.id/pesandong",
  },
  {
    id: "finance-system",
    slug: "finance-system",
    num: "04",
    title: "FINANCE SYSTEM",
    shortTag: "Sistem Manajemen Kas",
    subtitle: "Pengelolaan arus kas, buku besar, dan laporan keuangan komprehensif.",
    description:
      "Sistem akuntansi dan manajemen keuangan enterprise yang memudahkan pemantauan arus kas harian, pencatatan biaya operasional, serta penyusunan laporan keuangan otomatis.",
    features: [
      "Pencatatan kas masuk dan keluar dengan kategorisasi akun terstandar",
      "Pembuatan otomatis laporan laba rugi, neraca, dan arus kas",
      "Manajemen faktur, tagihan piutang, dan konfirmasi pembayaran",
      "Otorisasi anggaran berjenjang guna memastikan kepatuhan tata kelola kas",
    ],
    url: "https://app.jamparingmasagi.id/finance-system",
  },
  {
    id: "hr-management",
    slug: "hr-management",
    num: "05",
    title: "HR MANAGEMENT",
    shortTag: "Sistem Manajemen SDM",
    subtitle: "Pengelolaan data karyawan, absensi terintegrasi, dan penggajian otomatis.",
    description:
      "Aplikasi Human Resource Information System (HRIS) terintegrasi untuk menyederhanakan manajemen kepegawaian mulai dari rekapitulasi kehadiran, administrasi cuti, hingga slip gaji karyawan.",
    features: [
      "Manajemen absensi digital berbasis lokasi/geofencing dan selfie",
      "Pengajuan dan persetujuan cuti, izin, serta lembur secara online",
      "Perhitungan payroll otomatis mencakup komponen tunjangan dan potongan",
      "Manajemen basis data kepegawaian dan riwayat penilaian kinerja KPI",
    ],
    url: "https://app.jamparingmasagi.id/hr-management",
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
