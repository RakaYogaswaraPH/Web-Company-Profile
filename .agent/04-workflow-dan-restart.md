# Rules 04 — Workflow, Restart Server, Definition of Done

## 1. Script `package.json` (wajib ada)

| Script | Fungsi |
|---|---|
| `dev` | development server |
| `build` | `next build` lalu `node scripts/build-sw.mjs` |
| `preview` | serve folder `out/` (untuk tes PWA dan produksi) |
| `lint` | ESLint |
| `typecheck` | `tsc --noEmit` |
| `format` | Prettier |
| `assets:optimize` | `node scripts/optimize-assets.mjs` |
| `audit:deps` | `npm audit --audit-level=high` |

## 2. Wajib lapor "perlu restart atau tidak"

Setiap kali agent mengubah sesuatu, di ringkasan akhir langkah itu tulis: **Perlu restart: ya/tidak**, alasannya, dan perintah persisnya.

| Perubahan | Restart dev server? | Catatan |
|---|---|---|
| Edit komponen, page, content, class Tailwind | Tidak | HMR otomatis |
| Tambah halaman/route baru di `src/app` | Biasanya tidak | Jika route tak muncul, restart |
| Edit `globals.css` | Biasanya tidak | Jika perubahan tak terbaca, restart |
| Edit `next.config.ts` | **Ya** | Stop, lalu `npm run dev` lagi |
| Edit `.env*` | **Ya** | |
| Edit `postcss.config.mjs`, `tsconfig.json` (paths) | **Ya** | |
| `npm install` / hapus paket | **Ya** | Stop server dulu sebelum install |
| Ganti versi Node | **Ya** | Tutup dan buka terminal baru |
| Tambah/ubah file di `public/` | Tidak | Hard refresh (Ctrl+Shift+R) |
| Jalankan `assets:optimize` | Tidak | Hard refresh |
| Edit `manifest.ts` | Tidak | Uninstall lalu install ulang PWA untuk melihat perubahan |
| Edit service worker (`scripts/build-sw.mjs`) | Tidak untuk dev | Tes lewat `build` + `preview`; di DevTools → Application → Service Workers klik Unregister, lalu hard reload |
| Cache aneh atau error tak masuk akal | **Ya + hapus cache** | Stop server, hapus `.next` (Windows: `rmdir /s /q .next`), start lagi |

## 3. Aturan kerja agent

- Baca semua file di `.agent/rules/` sebelum mulai. Jangan mengubah file rules.
- Buat Implementation Plan dulu. Kerjakan per fase dan commit per fase (Conventional Commits, contoh: `feat(layout): add responsive header`).
- Jika informasi kurang (isi konten, hosting, hex warna), **tanya atau tandai `TODO(isi-konten)`**. Jangan mengarang.
- Dilarang tanpa izin eksplisit: `rm -rf` di luar `.next`, `out`, `node_modules`; `git push --force`; `sudo`; install paket global; mengubah atau menghapus `Assets/`.
- Jangan membiarkan dev server menggantung. Sebutkan port yang dipakai, dan matikan jika sudah tidak perlu.
- Kerjakan tepat sesuai permintaan. Jangan menambah halaman, fitur, atau library di luar scope tanpa bertanya.

## 4. Definition of Done (per fase dan akhir)

Sebuah fase dianggap selesai hanya jika:

1. `npm run lint` dan `npm run typecheck`: 0 error, 0 warning.
2. `npm run build`: sukses, `out/` terbentuk.
3. Tidak ada error atau warning di console browser.
4. Responsif lolos di semua lebar pada rules 02 (dibuktikan lewat browser agent, sertakan screenshot di artifact).
5. `npm run audit:deps`: tidak ada high/critical.
6. Pada fase akhir: Lighthouse mobile ≥ 95 di empat kategori, PWA installable, security header terpasang di config hosting.

## 5. Laporan akhir (format)

1. Yang dibuat (ringkas, per area).
2. Daftar `TODO(isi-konten)` yang masih harus diisi user, lengkap dengan nama file.
3. Daftar dependency + alasan.
4. Status restart/perintah yang perlu dijalankan user.
5. Risiko atau keterbatasan yang tersisa (mis. batasan CSP `'unsafe-inline'`).
