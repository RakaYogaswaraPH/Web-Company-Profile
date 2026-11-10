# Kebijakan & Konfigurasi Keamanan (SECURITY.md)

Dokumen ini menjelaskan postur keamanan website statis PT Jamparing Masagi, implementasi security headers untuk berbagai provider hosting, serta checklist operasional di luar kode.

---

## 1. Postur Keamanan Situs Statis

Website ini dibangun menggunakan model **Static Export (`output: 'export'`)**. Karena tidak ada server Node.js runtime atau database di sisi server, vektor serangan umum seperti SQL Injection, Remote Code Execution (RCE), dan Server-Side Request Forgery (SSRF) tidak ada pada level aplikasi.

Fokus perlindungan dialihkan ke:
1. **Perlindungan Browser & Klien (XSS, Clickjacking, MIME sniffing)**
2. **Keamanan Rantai Pasok (Supply Chain Dependencies)**
3. **Konfigurasi Hosting & Domain (HTTPS, DNSSEC, 2FA)**

---

## 2. Penjelasan Content Security Policy (CSP)

File `public/_headers` memuat header CSP berikut:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
```

### Catatan Penting Batasan `'unsafe-inline'` pada Static Export:
Next.js static export menyematkan skrip inline kecil untuk keperluan hidrasi klien awal (`self.__next_f.push(...)`). Karena file HTML digenerate statis saat proses build dan tidak ada server dinamis per-request untuk menghasilkan cryptographic `nonce`, maka directive `'unsafe-inline'` masih diperlukan untuk script dan style.
Untuk memitigasi hal ini:
- Tidak ada data user yang dirender kembali sebagai HTML mentah (`dangerouslySetInnerHTML` dihindari kecuali JSON-LD ter-escape).
- Semua tautan eksternal dilewatkan melalui komponen `ExternalLink` dengan atribut `rel="noopener noreferrer"`.
- `object-src 'none'` mematikan plugin lawas (Flash, Java).
- `frame-ancestors 'none'` dan `X-Frame-Options: DENY` mencegah website di-embed ke dalam iframe situs lain (anti-clickjacking).

---

## 3. Konfigurasi Security Headers per Provider Hosting

Pilih konfigurasi yang sesuai dengan hosting yang Anda gunakan:

### A. Netlify & Cloudflare Pages
Gunakan file `public/_headers` bawaan proyek ini. Saat dideploy ke Netlify atau Cloudflare Pages, file ini secara otomatis dibaca dan diterapkan ke seluruh rute.

### B. Vercel (`vercel.json`)
Jika menggunakan Vercel, buat file `vercel.json` di root proyek:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        },
        {
          "key": "Cross-Origin-Resource-Policy",
          "value": "same-origin"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(sw.js|.*\\.html)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

### C. Nginx Web Server
Tambahkan blok ini pada blok `server { ... }`:

```nginx
# Security Headers
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Cross-Origin-Resource-Policy "same-origin" always;
add_header X-Frame-Options "DENY" always;

# Static Cache
location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location ~* \.(?:html|json)$ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}

location = /sw.js {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### D. Apache Web Server (`.htaccess`)
Tambahkan ke dalam `.htaccess`:

```apache
<IfModule mod_headers.c>
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
  Header set Strict-Transport-Security "max-age=63072000; includeSubDomains"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  Header set Cross-Origin-Opener-Policy "same-origin"
  Header set Cross-Origin-Resource-Policy "same-origin"
  Header set X-Frame-Options "DENY"
</IfModule>
```

---

## 4. Checklist Keamanan di Luar Kode (Operasional)

- [ ] **2FA Wajib**: Aktifkan autentikasi dua faktor (2FA / MFA) di akun GitHub, provider hosting, dan registrar domain (Cloudflare/Namecheap/Niagahoster dll).
- [ ] **Branch Protection**: Aktifkan aturan branch protection pada branch `main` di GitHub (wajib lolos PR dan review sebelum merge).
- [ ] **DNSSEC**: Aktifkan DNSSEC di penyedia DNS untuk mencegah DNS spoofing / cache poisoning.
- [ ] **CAA Record**: Pasang DNS CAA record yang hanya mengizinkan Certificate Authority resmi (misal Let's Encrypt / DigiCert) menerbitkan sertifikat SSL untuk domain Anda.
- [ ] **Registrar Lock**: Kunci transfer domain untuk mencegah pembajakan nama domain.
- [ ] **Validasi Header Pasca-Deploy**:
  - Uji di [SecurityHeaders.com](https://securityheaders.com) (Target rating: A/A+)
  - Uji di [Mozilla Observatory](https://observatory.mozilla.org)
