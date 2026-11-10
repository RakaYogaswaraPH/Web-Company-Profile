# Rules 03 — Keamanan & PWA

## A. Keamanan

Situs statis tidak punya server aplikasi, jadi risikonya ada di tiga tempat: XSS di browser, supply chain npm, dan akun/hosting/DNS. Semuanya harus ditangani.

### A1. Kode

- Dilarang: `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `document.write`, string-ke-kode. Satu-satunya pengecualian: JSON-LD, dibuat dari `JSON.stringify` dan karakter `<` di-escape menjadi `\u003c`.
- Tidak ada secret di repo atau kode. Variabel `NEXT_PUBLIC_*` bersifat **publik**. Sediakan `.env.example`, jangan commit `.env*`.
- Link eksternal dibuat lewat satu komponen `ExternalLink`: wajib `target="_blank"` + `rel="noopener noreferrer"`, dan hanya menerima skema `https:`, `mailto:`, `tel:`.
- Jangan memakai script pihak ketiga (analytics, chat widget, tag manager) tanpa persetujuan user. Jika disetujui: masuk ke CSP, dan pakai SRI jika dimuat dari CDN.
- Iframe (mis. Google Maps): wajib `sandbox` seminimal mungkin, `referrerPolicy="strict-origin-when-cross-origin"`, `loading="lazy"`, dan domainnya masuk `frame-src`.
- Form kontak: tidak ada backend. **Tanyakan user** memilih: `mailto:`, link WhatsApp (`wa.me`), atau layanan form pihak ketiga. Jika ada input: validasi sisi klien, honeypot, rate limit dari layanan form, dan jangan menampilkan input kembali sebagai HTML.
- `poweredByHeader: false`, `productionBrowserSourceMaps: false`, `reactStrictMode: true`.

### A2. Dependency (supply chain)

- Pin versi (`save-exact=true`), commit `package-lock.json`, deploy dengan `npm ci`.
- Sebelum menambah paket: cek nama (waspada typosquatting), maintainer, aktivitas rilis, dan apakah ada `postinstall` script. Hindari paket kecil untuk hal sepele.
- Jalankan `npm audit` sebelum setiap rilis. Tidak boleh ada temuan high/critical.
- Buat `.github/dependabot.yml` (npm, mingguan).
- Jangan `sudo npm`, jangan install global, jangan `curl | sh`.

### A3. Security header (di level hosting)

**Penting:** dengan `output: 'export'`, fungsi `headers()` di `next.config.ts` **tidak berlaku**. Header harus dipasang di hosting. Agent wajib:

1. Membuat `public/_headers` (format Netlify/Cloudflare Pages) sebagai default.
2. Menulis padanan untuk Vercel (`vercel.json`), Nginx, dan Apache di `docs/SECURITY.md`.
3. Menanyakan hosting yang dipakai user, lalu menyisakan konfigurasi yang relevan.

Header minimum:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
X-Frame-Options: DENY
```

Catatan CSP: Next static export memakai inline script untuk hydration dan nonce tidak bisa dipakai di site statis, sehingga `'unsafe-inline'` pada `script-src` masih diperlukan. Jelaskan batasan ini jujur di `docs/SECURITY.md`. Perketat (hash-based) hanya jika terbukti bisa tanpa merusak situs. Tambahkan `preload` ke HSTS hanya setelah user memastikan semua subdomain HTTPS.

Cache:
- `/_next/static/*` → `public, max-age=31536000, immutable`
- `/sw.js` dan file HTML → `no-cache`

### A4. Di luar kode (tulis sebagai checklist di `docs/SECURITY.md`)

2FA di GitHub, hosting, dan registrar domain; branch protection; registrar lock; DNSSEC; CAA record; HTTPS only; `public/.well-known/security.txt`; setelah deploy, tes di securityheaders.com dan Mozilla Observatory.

---

## B. PWA (installable)

Jangan pakai `next-pwa` (tidak terawat). Tulis sendiri agar tidak bergantung pada kompatibilitas bundler.

- **Manifest**: `src/app/manifest.ts` dengan `export const dynamic = "force-static"`. Isi: `name`, `short_name`, `description`, `lang: "id"`, `start_url: "/"`, `scope: "/"`, `display: "standalone"`, `background_color`, `theme_color` (hex biru, sesuai `blue-600`), dan icons.
- **Ikon**: dibuat dari logo di `Assets/Brands` oleh script `sharp`: 192×192, 512×512, **maskable** 512×512 (logo di safe zone ~80%, latar putih), `apple-touch-icon` 180×180, favicon. Output ke `public/icons/`. Logo non-persegi ditaruh di tengah kanvas persegi, jangan diregangkan.
- **Service worker**: `public/sw.js` ditulis tangan, di-generate oleh `scripts/build-sw.mjs` yang berjalan setelah `next build` (membaca `out/` untuk daftar precache + versi cache dari hash build).
  - Precache: app shell, `offline.html`, ikon.
  - `/_next/static/*` dan `/images/*`: cache-first.
  - Navigasi/HTML: network-first, fallback ke cache lalu `offline.html`.
  - Hanya cache request GET same-origin dengan status 200. Jangan cache cross-origin.
  - Hapus cache versi lama saat `activate`.
- **Registrasi**: komponen client `ServiceWorkerRegister`, hanya jalan jika `process.env.NODE_ENV === "production"` dan `"serviceWorker" in navigator`. Update tidak boleh me-reload halaman tiba-tiba.
- **Install prompt**: tombol "Pasang aplikasi" opsional memakai event `beforeinstallprompt` (Chromium). Jangan memunculkan popup otomatis. Untuk iOS, sediakan petunjuk singkat manual (Share → Add to Home Screen).
- **Meta**: `viewport` dan `themeColor` lewat export `viewport`, `appleWebApp` di `metadata`.
- **Verifikasi**: `npm run build && npm run preview`, lalu cek installability di DevTools → Application dan Lighthouse. Service worker **tidak aktif** di `next dev`, jadi PWA hanya bisa dites dari build.
