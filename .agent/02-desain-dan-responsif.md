# Rules 02 — Desain, Tailwind 4, Responsif

## 1. Tailwind 4: utility only

- `src/app/globals.css` isi satu-satunya: `@import "tailwindcss";`
- Dilarang: file CSS lain, CSS Modules, styled-components, `style={{ }}`, `@apply`, `@layer`, `@utility`/class buatan sendiri, `tailwind.config.js`.
- Satu-satunya pengecualian: jika user memberi hex warna brand yang persis, boleh didefinisikan **sekali** lewat `@theme { --color-brand-...: ... }` di `globals.css`, lalu dipakai sebagai utility biasa (`bg-brand-600`).
- Hindari arbitrary value (`w-[437px]`). Pakai skala bawaan. Jika benar-benar tak ada padanannya, tulis alasannya di komentar.
- Dilarang class dinamis hasil string concat (`bg-${warna}-500`). Tailwind tidak mendeteksinya. Gunakan object map berisi class lengkap.
- Gunakan `cn()` untuk class kondisional. Urutan class dirapikan `prettier-plugin-tailwindcss`.
- Ukuran teks pakai skala responsif (`text-3xl sm:text-4xl lg:text-5xl`), bukan `clamp()` custom.
- Font diterapkan lewat `className` dari `next/font` (tanpa CSS tambahan).

## 2. Palet warna (cerah, ada merah, sekitar biru-hitam)

Gunakan palet bawaan Tailwind saja:

| Peran | Utility |
|---|---|
| Latar utama | `bg-white`, `bg-slate-50`, `bg-sky-50` |
| Warna dominan (biru) | `blue-600` (hover `blue-700`), tint `blue-50`/`blue-100` |
| Teks | `text-slate-900` (judul), `text-slate-700` (isi), `text-slate-500` (pendukung) |
| Aksen merah | `red-600` (hover `red-700`), tint `red-50` |
| Garis/border | `border-slate-200` |

- Biru dominan, merah sebagai aksen sekitar 10% permukaan: CTA utama, penanda kecil, garis aksen. Jangan memenuhi seluruh section dengan merah.
- Boss tidak suka warna gelap: **dilarang** background section atau footer dengan `slate-800` ke atas, `black`, `blue-800` ke atas, atau `gray-900`. Footer pakai `bg-slate-50` + `border-t`. Maksimal satu band `bg-blue-600` untuk CTA.
- Tidak ada dark mode.
- Pasangan teks/background harus lolos kontras AA (teks putih di `blue-600` dan `red-600` aman; hindari teks putih di `blue-400` atau lebih terang).
- Jika user memberi hex merah dari Figma, gunakan pengecualian `@theme` di atas.

## 3. Anti "AI slop"

**Copywriting**
- Tulis kalimat konkret: apa yang dikerjakan, untuk siapa, di mana, dengan bukti.
- Dilarang frasa kosong: "solusi terdepan", "inovatif", "terpercaya", "profesional dan berdedikasi", "melampaui ekspektasi", "one-stop solution", "mewujudkan visi", "era digital", "cutting-edge", "seamless", "unlock", "elevate".
- Dilarang lorem ipsum, statistik karangan, testimoni karangan, tahun berdiri karangan, dan klaim sertifikasi karangan.
- Info yang belum diberikan user ditulis `TODO(isi-konten): ...` di `src/content/`, dan dikumpulkan di laporan akhir. Jangan mengarang fakta perusahaan.

**Icon**
- Dilarang icon di samping setiap heading, item list, tombol, atau kartu.
- Icon hanya untuk fungsi: hamburger/close, panah pada link eksternal atau navigasi slider, social media, dan kontak (telepon, email, lokasi).
- Dilarang emoji di UI.

**Visual**
- Dilarang: hero + 3 kartu ikon berukuran sama sebagai template default, gradient ungu-biru, teks gradient, glassmorphism, blob/orb dekoratif, glow, shadow berlapis, badge "New/✨", `rounded-3xl` di semua elemen.
- Pakai: tipografi tegas, whitespace lega, grid editorial, garis tipis (`border`), satu skala radius (`rounded-lg`), shadow minimal, foto tim asli.
- Ritme section bervariasi (jangan semua pola kartu-grid yang sama).
- Animasi halus saja: fade/slide-up sekali saat masuk viewport, hover state. Tanpa parallax, tanpa autoplay carousel, tanpa animasi dekoratif yang mengganggu baca.

## 4. Penggunaan aset

- Brands: logo perusahaan (header, footer, favicon, ikon PWA) dan foto tim (halaman Tentang). Foto tim pakai rasio seragam: `aspect-4/5 w-full object-cover object-top`.
- Clients dan Partners: grid logo, bukan marquee. Alt text = nama perusahaan (dari nama file, dirapikan). Logo berukuran seragam dengan `object-contain` di dalam kotak berukuran tetap berbasis utility.
- Jangan meregangkan atau mengubah rasio logo.

## 5. Responsif (wajib, mobile-first)

- Tulis class dasar untuk mobile, lalu tambah `sm: md: lg: xl: 2xl:`.
- Tidak boleh ada: scroll horizontal, elemen terpotong, teks bertumpuk, teks tak terbaca, tombol yang sulit ditekan.
- Aturan teknis:
  - Container: `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`.
  - Child flex/grid yang berisi teks: tambahkan `min-w-0`. Teks panjang: `break-words`. Judul: `text-balance`.
  - Hindari lebar/tinggi piksel tetap pada elemen konten. Gunakan `w-full`, `max-w-*`, `aspect-*`, `size-*`.
  - Tinggi layar penuh pakai `min-h-dvh`, bukan `100vh`.
  - Gambar: `h-auto w-full` (+ `object-cover` bila perlu).
  - Target sentuh minimal `min-h-11 min-w-11`.
  - Grid logo: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` (sesuaikan jumlah).
  - Tabel diganti tumpukan kartu di mobile.
  - Header sticky tidak boleh menutupi judul section: beri `scroll-mt-*` pada anchor target.
  - Mobile nav: tombol hamburger yang aksesibel (`aria-expanded`, `aria-controls`), bisa ditutup dengan Esc dan klik link, fokus terkelola.
  - `truncate` dilarang untuk konten penting (nama perusahaan klien, judul).
  - Jangan menyembunyikan bug lebar dengan `overflow-x-hidden` di `body`.
- **Verifikasi wajib** lewat browser agent, di lebar: 320, 360, 390, 768, 1024, 1280, 1536, 1920 px, plus landscape ponsel (844×390) dan zoom 200%. Perbaiki semua temuan sebelum lapor selesai.
