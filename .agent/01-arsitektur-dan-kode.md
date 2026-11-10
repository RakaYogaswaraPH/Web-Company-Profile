# Rules 01 — Arsitektur & Kualitas Kode

Proyek: website company profile **statis**. Root proyek: `Web_Company/`.
Folder `Assets/` (Brands, Clients, Partners) adalah **sumber asli**. Jangan diubah, dipindah, atau dihapus. Hasil optimasi ditaruh di `public/images/`.

## 1. Stack (wajib)

- Next.js versi stable terbaru, **App Router**, TypeScript `strict`.
- `output: 'export'` di `next.config.ts` (hasil build = folder `out/`).
- Tailwind CSS v4 (CSS-first, lewat `@tailwindcss/postcss`). Tidak ada `tailwind.config.js`.
- Animasi: package `motion` (`import { ... } from "motion/react"`).
- Icon: `lucide-react`, dengan batasan di rules 02.
- Util: `clsx` + `tailwind-merge` (dibungkus helper `cn()` di `src/lib/cn.ts`).
- Dev tools: ESLint, Prettier + `prettier-plugin-tailwindcss`, `sharp` (devDependency untuk script aset).
- Cek versi paket dengan `npm view <paket> version`. Jangan memakai nomor versi dari ingatan.
- Setiap dependency tambahan harus punya alasan jelas dan disebutkan di laporan.

### Dilarang karena site statis

Pages Router, API route, Server Actions, `getServerSideProps`, middleware/proxy, `cookies()`/`headers()` runtime, `next/image` dengan loader bawaan, ISR/revalidate, dan apa pun yang butuh Node runtime saat production.

## 2. Setup awal (proyek masih kosong)

1. Pastikan Node.js LTS yang memenuhi syarat Next.js terbaru (`node -v`, cek di docs resmi). Jika kurang, hentikan dan minta user upgrade.
2. Nama folder `Web_Company` mengandung huruf kapital dan underscore, sehingga `create-next-app` bisa menolak nama package. Jika itu terjadi: scaffold di folder sementara bernama `web-company` di luar `Web_Company`, pindahkan isinya ke `Web_Company/` (jangan menimpa `Assets/`), lalu set `"name": "web-company"` di `package.json`.
3. Jalankan `npx create-next-app@latest` dengan opsi: TypeScript, ESLint, Tailwind, App Router, `src/` directory, alias `@/*`. Tolak opsi apa pun yang di luar daftar ini.
4. Install dependency tambahan, lalu catat versi akhirnya.
5. Atur `.npmrc` berisi `save-exact=true`. Commit `package-lock.json`.
6. Buat `.gitignore` (minimal `node_modules`, `.next`, `out`, `.env*`, kecuali `.env.example`).

## 3. Struktur folder

```
Web_Company/
├─ Assets/                    # sumber asli, read-only
├─ docs/                      # SECURITY.md, DEPLOY.md
├─ public/
│  ├─ images/{brands,clients,partners}/   # hasil optimasi
│  ├─ icons/                  # ikon PWA
│  ├─ sw.js                   # service worker (di-generate script)
│  ├─ _headers                # security header (jika hosting mendukung)
│  └─ .well-known/security.txt
├─ scripts/
│  ├─ optimize-assets.mjs
│  └─ build-sw.mjs
├─ src/
│  ├─ app/                    # route, layout, manifest.ts, sitemap.ts, robots.ts
│  ├─ components/
│  │  ├─ layout/              # header, footer, mobile-nav
│  │  ├─ sections/            # blok halaman (hero, services, clients, ...)
│  │  └─ ui/                  # primitif kecil (button, container, heading, ...)
│  ├─ content/                # SEMUA teks & data, bertipe
│  ├─ config/                 # site.ts (nama, url, kontak, nav)
│  ├─ lib/                    # cn.ts, helper murni
│  └─ types/
└─ next.config.ts
```

## 4. Penamaan & gaya kode

- File dan folder: `kebab-case`. Komponen: file `kebab-case.tsx`, export `PascalCase` bernama (named export).
- Default export hanya untuk file yang diwajibkan Next (`page`, `layout`, `not-found`, dll.).
- Hook: `use-nama.ts`. Konstanta global: `UPPER_SNAKE_CASE`. Type/interface: `PascalCase`. Boolean: awalan `is/has/can`.
- Nama harus menjelaskan isi. Dilarang singkatan membingungkan (`btn2`, `tmp`, `data1`).
- Satu komponen per file. Komponen maksimal sekitar 150 baris, fungsi maksimal sekitar 40 baris. Jika lebih, pecah.
- Dilarang `any`, `@ts-ignore`, `console.log`, kode yang dikomentari, dan dead code.
- Komentar hanya menjelaskan **kenapa**, bukan **apa**.
- Server Component adalah default. `"use client"` hanya di komponen daun yang butuh state, event, atau animasi.
- **Pisahkan konten dari tampilan**: semua teks dan data ada di `src/content/*.ts` dengan type eksplisit. Komponen tidak boleh hardcode teks marketing.
- Urutan import: React/Next → library → `@/` alias → relatif → type.
- Props diberi `type` eksplisit. Tidak ada prop drilling lebih dari 2 level.

## 5. Performa

- Karena `images.unoptimized: true` wajib (static export), optimasi gambar dilakukan di `scripts/optimize-assets.mjs` dengan `sharp`:
  - Foto → WebP (atau AVIF), lebar maksimal sesuai pemakaian, kualitas wajar.
  - Logo SVG dibiarkan SVG. Logo raster → WebP/PNG yang dikecilkan.
  - Nama output `kebab-case`, tanpa spasi.
  - Menghasilkan `src/content/asset-manifest.ts` berisi path, `width`, dan `height` tiap file.
- `<Image>` selalu punya `width`, `height`, `alt` bermakna, dan `sizes`. `priority` hanya untuk gambar LCP di hero. Sisanya lazy.
- Font lewat `next/font` (self-host), maksimal 2 family, `display: "swap"`.
- Animasi hanya `transform` dan `opacity`. Bungkus dengan `MotionConfig reducedMotion="user"`. Animasi masuk viewport cukup sekali.
- Target mobile: Lighthouse ≥ 95 di Performance, Accessibility, Best Practices, SEO. LCP < 2,5 s, CLS < 0,1.
- SEO: `metadata` per halaman, `sitemap.ts`, `robots.ts`, OG image, `<html lang="id">`, JSON-LD `Organization`.
- Aksesibilitas: HTML semantik, satu `<h1>` per halaman, skip link, `focus-visible` jelas, kontras minimal AA.
