# LAPORAN AUDIT KESIAPAN DEPLOYMENT VERCEL — FASE 5.5A
## MUL Rent Car | PT. MAULANA SADHA UTAMA
**Target Platform:** Vercel (Preview Deployment)  
**Direktori Proyek:** `D:\mobilrentel`  
**Waktu Audit:** 11 Oktober 2026  
**Peran Auditor:** Senior Next.js Deployment Engineer & DevOps Auditor  
**Status Evaluasi Global:** `READY WITH WARNINGS`  

---

## 1. Ringkasan Eksekutif & Status Audit

Audit kesiapan deployment ke platform **Vercel** telah selesai dilaksanakan secara komprehensif pada proyek Next.js MUL Rent Car. Seluruh pengujian build, typecheck, linting, unit test, dan E2E test dijalankan langsung pada repositori lokal `D:\mobilrentel`.

### Verdict: `READY WITH WARNINGS`

- **Kelayakan Arsitektur (READY):**  
  Aplikasi 100% siap dijalankan di Vercel. Seluruh 26 rute berhasil diprerender secara deterministik saat build (`npm run build`, exit code `0`). Tidak ada ketergantungan pada database backend, API route handlers, Server Actions, atau middleware runtime Node.js. Seluruh 41 unit test dan 30 Playwright E2E test lulus 100%.
- **Peringatan Keamanan Kritis (WARNING 1):**  
  Ditemukan berkas `opencode.json` yang memuat Context7 API Bearer Token (`Bearer ctx7sk-***`) dalam riwayat commit Git (`commit e15a330f47b6e89cebb6dabb8e97a6d28714814c`). Berkas ini **wajib dimasukkan ke `.gitignore`** dan token harus dirotasi sebelum repositori dihubungkan ke GitHub/Vercel.
- **Peringatan Kompilasi Tooling (WARNING 2):**  
  Next.js 16.4.0 secara default menjalankan Turbopack yang saat ini mengalami kegagalan pada resolusi Google Font multi-weight. Build command di Vercel **wajib secara eksplisit memanggil Webpack**: `npm run build` (atau `npx next build --webpack`), bukan perintah default `next build`.
- **Peringatan Portabilitas Konfigurasi Header (WARNING 3):**  
  File `public/.htaccess` (Apache) dan `public/_headers` (Cloudflare) **diabaikan secara total oleh Vercel**. Untuk menerapkan header keamanan (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) pada Vercel, disiapkan rekomendasi file `vercel.json`.
- **Status Domain (BLOCKED):**  
  Domain produksi `https://mulrentcar.com` belum dikonfirmasi resmi oleh pemilik proyek. Tidak ada modifikasi DNS atau domain yang dilakukan selama audit.

---

## 2. Temuan Berdasarkan Inspeksi Aktual

### 2.1. Dependensi, Versi Runtime, & Lockfile
- **Versi Next.js:** `16.4.0`
- **Versi React:** `19.3.0` (`react` & `react-dom`)
- **Versi Node.js Lokal:** `v24.13.0` (npm `11.6.2`)
- **Kebutuhan Node.js Vercel:** Next.js 16 mensyaratkan Node.js ≥ 18.18.0. Vercel mendukung Node.js 18.x, 20.x, dan 22.x. Direkomendasikan menyetel **Node.js 20.x LTS** pada pengaturan project Vercel.
- **Lockfile Integrity:** `package-lock.json` sinkron dengan `package.json` (format lockfileVersion 3).

### 2.2. Konfigurasi `next.config.ts` & Build Script
Berkas konfigurasi saat ini:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```
- **`output: "export"`:** Mengarahkan kompilasi Next.js untuk menghasilkan berkas HTML statis di folder `out/`.
- **Build Script di `package.json`:** `"build": "next build --webpack"`. Penggunaan `--webpack` adalah keputusan yang tepat dan wajib dipertahankan karena Turbopack pada Next.js 16.4.0 mengalami bug saat menyelesaikan impor `next/font/google`.

### 2.3. Struktur App Router & Halaman Dinamis `/mobil/[slug]`
- **Rute Statis Utama (7 Halaman):** `/`, `/mobil`, `/layanan`, `/kontak`, `/tentang-kami`, `/syarat-ketentuan`, `/kebijakan-privasi`.
- **Rute Dinamis Armada (14 Halaman SSG):** Seluruh 14 slug didefinisikan secara eksplisit via `generateStaticParams()` pada [`src/app/mobil/[slug]/page.tsx`](file:///d:/mobilrentel/src/app/mobil/%5Bslug%5D/page.tsx).
- **Penanganan Dynamic Params:** Baris `export const dynamicParams = false;` telah diterapkan. Ini mencegah Next.js mencoba merender halaman on-demand untuk slug kendaraan yang tidak valid.

### 2.4. Aset Gambar, Font, & Metadata
- **Gambar Kendaraan:** 13 unit armada menggunakan foto WebP teroptimasi lokal (`public/images/vehicles/*.webp`, ukuran 82–234 KB). Hiace Luxury menggunakan fallback visual editorial. Komponen `<Image>` menggunakan `unoptimized: true` sehingga tag `<img>` merujuk langsung ke path lokal tanpa memanggil endpoint server `/_next/image`.
- **Tipografi:** Google Fonts `Plus_Jakarta_Sans` dan `Playfair_Display` diinjeksikan via CSS variable di `src/app/layout.tsx`.
- **Metadata SEO:** Tag `<link rel="canonical">`, `<title>`, `<meta name="description">`, Open Graph, dan skema JSON-LD terinjeksi permanen pada tag `<head>` masing-masing halaman HTML.
- **Sitemap & Robots:** `src/app/sitemap.ts` (21 URL) dan `src/app/robots.ts` memiliki `export const dynamic = "force-static";` dan diekspor ke `out/sitemap.xml` dan `out/robots.txt`.
- **Custom 404:** `src/app/not-found.tsx` diekspor menjadi `out/404.html` dan `out/_not-found.html` (44 KB) dengan styling editorial emas, pesan informatif, dan tombol navigasi balik.

### 2.5. Environment Variables
- **Pemeriksaan Kode Sumber:** Dilakukan pemindaian terhadap seluruh folder `src/`. Ditemukan **0 pemanggilan `process.env.*`** pada kode aplikasi runtime.
- **Konfigurasi Bisnis:** Seluruh identitas perusahaan, nomor WhatsApp resmi (`6281262679533`), email, dan URL basis didefinisikan secara terpusat pada [`src/config/site.ts`](file:///d:/mobilrentel/src/config/site.ts).
- **Kesimpulan DevOps:** Proyek ini **tidak membutuhkan environment variable apa pun** untuk proses build maupun runtime di Vercel.

### 2.6. Status Git, Branch, & Remote
- **Branch Aktif:** `master`
- **Git Remote:** Belum ada remote repository yang dikonfigurasi (`git remote -v` kosong).
- **Status Perubahan:** File-file uncommitted dari fase sebelumnya tersimpan rapi tanpa ada yang ditimpa atau dihapus.

### 2.7. Status File Konfigurasi Khusus Hosting Lain (`.htaccess` & `_headers`)
- **`public/.htaccess`:** Konfigurasi Apache 2.4 untuk hosting cPanel Rumahweb. Vercel **tidak membaca file ini sama sekali**.
- **`public/_headers`:** Konfigurasi Cloudflare Pages untuk menyisipkan HTTP header di edge network Cloudflare. Vercel **tidak mengeksekusi file ini** dan hanya akan memperlakukannya sebagai file teks biasa jika diminta melalui URL.
- **Solusi Vercel:** Untuk mengaktifkan header keamanan yang identik pada Vercel, konfigurasi harus dituangkan ke dalam `vercel.json`.

---

## 3. Pemeriksaan Risiko & Keamanan (Security Audit)

| Aspek Keamanan | Kondisi Aktual | Level Risiko | Rekomendasi & Mitigasi |
|---|---|:---:|---|
| **Kredensial di `opencode.json`** | Berkas `opencode.json` memuat header `"Authorization": "Bearer ctx7sk-***"` dan tercatat dalam riwayat Git (`commit e15a330f`). | **TINGGI (CRITICAL)** | 1. Tambahkan `opencode.json` ke `.gitignore`.<br>2. Hapus berkas dari Git index via `git rm --cached opencode.json`.<br>3. Lakukan rotasi/revoke terhadap token Context7 tersebut sebelum repositori diunggah ke GitHub publik. |
| **Berkas `.env*`** | Tidak ada file `.env`, `.env.local`, atau `.env.production` di direktori proyek. `.gitignore` telah memblokir seluruh pola `.env*`. | **AMAN (PASS)** | Tidak ada risiko kebocoran file environment. |
| **Ketergantungan Server Lokal** | Aplikasi bebas dari panggilan `localhost` atau dependensi server backend. Interaksi formulir kontak langsung membuka protokol `https://wa.me/...`. | **AMAN (PASS)** | Tidak ada risiko broken link atau port binding di Vercel. |
| **Aksesibilitas Halaman Mobil** | Seluruh 14 slug kendaraan (`/mobil/[slug]`) terbukti menghasilkan file HTML statis mandiri di `out/mobil/`. | **AMAN (PASS)** | Direct access dan refresh halaman detail aman 100%. |
| **Status Domain Produksi** | Nilai `https://mulrentcar.com` pada `src/config/site.ts` masih berstatus `[OQ-09: domain konfirmasi pending]`. | **SEDANG (PENDING)** | Jangan daftarkan domain ke DNS Vercel sebelum konfirmasi tertulis dari klien. Gunakan domain preview bawaan Vercel (`*.vercel.app`) untuk validasi awal. |

---

## 4. Hasil Validasi Build dan Test Aktual

Seluruh pengujian dijalankan langsung pada sistem lokal `D:\mobilrentel` dan dicatat hasil aktualnya:

| No | Perintah Pengujian | Lingkup Validasi | Durasi | Exit Code | Hasil Aktual | Status |
|:---:|---|---|:---:|:---:|---|:---:|
| 1 | `npm run build` | Next.js Static Export (`next build --webpack`) | ~25s | **0** | **26 rute berhasil diprerender statis ke `out/`**:<br>• 7 halaman utama statis<br>• 14 halaman armada SSG (`generateStaticParams`)<br>• `sitemap.xml`, `robots.txt`, `icon.svg`<br>• `404.html` kustom<br>• 0 error, 0 panggilan ke `/_next/image` | **PASS** |
| 2 | `npm run typecheck` | TypeScript Strict Check (`tsc --noEmit`) | ~12s | **0** | **0 type errors**. Seluruh deklarasi tipe, interface, dan schema valid. | **PASS** |
| 3 | `npm run lint` | ESLint (Next.js flat config) | ~11s | **0** | **0 warnings, 0 errors**. Kode bersih sesuai standar linting. | **PASS** |
| 4 | `npm test` | Vitest Unit Test Suite | ~16s | **0** | **5 test files, 41 tests passed (100%)**:<br>• `tests/unit/format.test.ts` (5 passed)<br>• `tests/unit/filters.test.ts` (12 passed)<br>• `tests/unit/whatsapp.test.ts` (8 passed)<br>• `tests/unit/vehicles.test.ts` (8 passed)<br>• `tests/unit/catalog.test.ts` (8 passed) | **PASS** |
| 5 | `node tests/verify-static-export.mjs` | Integritas File Fisik `out/` | ~3s | **0** | 13 file inti ada, 14 halaman mobil ada, canonical valid, sitemap 21 URL, robots.txt valid. | **PASS** |
| 6 | `node tests/verify-cloudflare-routes.mjs` | Audit Perutean 13 Endpoint & 28 Aset | ~3s | **0** | 13/13 rute lulus direct navigation & refresh (200 OK & 404). 28/28 file aset (CSS, JS, WebP, SVG) berstatus 200 OK. | **PASS** |
| 7 | `npm run test:e2e:static` | Playwright E2E Suite (Chromium & Mobile Chrome) | ~73s | **0** | **30 tests passed, 0 failed (100% lulus)**:<br>• Chromium: 15/15 passed (termasuk Test 8 custom 404)<br>• Mobile Chrome: 15/15 passed (termasuk Test 8 custom 404) | **PASS** |

---

## 5. Rekomendasi Konfigurasi Deployment Vercel

### 5.1. Analisis Strategi Build: Static Export (`output: "export"`) vs Standard Next.js Build

Sebagai Senior Next.js Deployment Engineer, kami membandingkan dua pendekatan ini untuk deployment Vercel:

| Aspek Evaluasi | Opsi A: Pertahankan Static Export (`output: "export"`) *(REKOMENDASI)* | Opsi B: Revert ke Standard Next.js Serverless Build |
|---|---|---|
| **Beban Server / Biaya Vercel** | **Nol Serverless Functions.** Situs disajikan 100% dari Vercel Global Edge Network (CDN). Tidak memakan kuota execution time function. | Membutuhkan Serverless Function untuk menangani request, berpotensi memakan kuota execution time. |
| **Portabilitas Multi-Hosting** | **100% Portabel.** Artefak `out/` yang sama dapat di-deploy tanpa modifikasi kode ke Vercel, Cloudflare Pages, atau Rumahweb cPanel. | Terikat pada arsitektur Vercel / server Node.js. Membutuhkan konfigurasi ulang jika beralih ke hosting statis lain. |
| **Pengelolaan Gambar** | Menggunakan 13 file WebP lokal yang sudah dipra-optimasi di Fase 5.2. Nol kuota Vercel Image Optimization yang terpakai. | Menggunakan Vercel Image Optimization on-the-fly (memakan kuota 1,000 source images pada paket Hobby). |
| **Waktu Respon (TTFB)** | Instan dari CDN edge cache terdekat, tanpa *cold start* serverless. | Berpotensi mengalami *cold start* jika fungsi serverless belum hangat. |
| **Penyesuaian Vercel yang Dibutuhkan** | Menyetel **Output Directory: `out`** di Dashboard Vercel. | Zero-config di Dashboard Vercel. |

> **Rekomendasi Final:**  
> **Pertahankan Static Export (`output: "export"`).**  
> Pendekatan ini memberikan performa terbaik, biaya $0, zero cold start, serta menjamin kode tidak mengalami divergensi (*no platform lock-in*) antara Vercel, Cloudflare Pages, dan Rumahweb.

---

### 5.2. Spesifikasi Pengaturan Project di Dashboard Vercel

Saat menghubungkan repositori ke Vercel (menu *New Project*):

1. **Framework Preset:** `Next.js`
2. **Root Directory:** `./` *(default)*
3. **Build Command:** Aktifkan *Override*, isi:
   ```bash
   npm run build
   ```
   *(Atau `next build --webpack`)*
4. **Output Directory:** Aktifkan *Override*, isi:
   ```bash
   out
   ```
5. **Install Command:** `npm install` *(default)*
6. **Node.js Version:** Pilih **`20.x`** pada menu *Settings > General > Node.js Version*.
7. **Environment Variables:** Kosongkan (tidak ada env yang dibutuhkan).

---

### 5.3. Konfigurasi Header Keamanan Vercel (`vercel.json`)

Agar Vercel menerapkan HTTP security headers yang setara dengan `public/_headers` (Cloudflare) dan `.htaccess` (Apache), rekomendasikan penambahan berkas `vercel.json` pada root proyek:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
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
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2592000"
        }
      ]
    }
  ]
}
```

---

## 6. Prosedur Pengujian Preview Deployment (`*.vercel.app`)

Sebelum menghubungkan domain produksi `mulrentcar.com`, lakukan validasi menyeluruh pada URL preview bawaan Vercel:

1. **Akses Beranda:** Buka `https://[project-name].vercel.app/` — pastikan tata letak, styling Tailwind, dan tipografi Plus Jakarta Sans / Playfair Display termuat sempurna.
2. **Akses Katalog:** Buka `https://[project-name].vercel.app/mobil` — uji pencarian teks real-time dan filter kategori.
3. **Uji Direct Navigation & Refresh Halaman Mobil:** Buka langsung `https://[project-name].vercel.app/mobil/alphard` dan lakukan Hard Refresh (Ctrl+F5). Pastikan halaman terbuka langsung tanpa HTTP 404.
4. **Uji Halaman 404 Kustom:** Buka `https://[project-name].vercel.app/halaman-fiktif-123` dan `https://[project-name].vercel.app/mobil/kendaraan-fiktif`. Pastikan muncul halaman 404 kustom MUL Rent Car dengan status HTTP 404.
5. **Uji Integrasi WhatsApp:** Klik tombol CTA pemesanan pada halaman detail Alphard dan Xpander. Pastikan tautan mengarah ke `https://wa.me/6281262679533` dengan parameter pesan URL-encoded yang memuat nama armada dan tarif indikatif.
6. **Inspeksi Network & Security Headers:** Buka Chrome DevTools > Network Tab:
   - Pastikan tidak ada request berstatus 404 untuk file CSS/JS.
   - Pastikan seluruh foto kendaraan dilayani langsung dari `/images/vehicles/*.webp` dengan HTTP 200.
   - Periksa Response Header dokumen utama: pastikan memuat `X-Content-Type-Options: nosniff`.
7. **Verifikasi SEO Assets:** Buka `https://[project-name].vercel.app/sitemap.xml` dan `https://[project-name].vercel.app/robots.txt`.

---

## 7. Checklist Manual untuk Deployment Preview

### Tahap A: Sanitasi Keamanan & Git (Wajib Diselesaikan Sebelum Push)
- [ ] Tambahkan `opencode.json` ke `.gitignore`.
- [ ] Hapus `opencode.json` dari Git tracking (`git rm --cached opencode.json`).
- [ ] Lakukan rotasi/revoke API key Context7 yang sempat tersimpan di Git commit lama.
- [ ] Minta persetujuan pengguna untuk melakukan commit Git atas perubahan Fase 5.4B dan 5.5A.

### Tahap B: Setup GitHub Remote Repository
- [ ] Buat repositori baru di GitHub (disarankan Private untuk keamanan awal).
- [ ] Hubungkan remote: `git remote add origin https://github.com/[username]/mulrentcar.git`.
- [ ] Push branch utama: `git push -u origin master` (atau `main`).

### Tahap C: Konfigurasi Proyek di Vercel Dashboard
- [ ] Login ke [vercel.com](https://vercel.com).
- [ ] Klik **Add New > Project**, lalu pilih repositori GitHub `mulrentcar`.
- [ ] Atur Build Settings:
  - Framework Preset: `Next.js`
  - Build Command: Override → `npm run build`
  - Output Directory: Override → `out`
- [ ] Pastikan Node.js Version disetel ke `20.x`.
- [ ] Klik **Deploy**.

### Tahap D: Validasi Pascadeploy & Domain Kustom
- [ ] Jalankan skenario pengujian Bagian 6 pada URL preview `https://[project].vercel.app`.
- [ ] Dapatkan konfirmasi resmi nama domain dari pemilik proyek.
- [ ] Jika domain resmi terkonfirmasi (misal `mulrentcar.com`), perbarui `src/config/site.ts` jika ada perubahan, lalu tambahkan domain di menu *Vercel Project Settings > Domains*.
- [ ] Atur DNS A Record (`76.76.21.21`) atau CNAME (`cname.vercel-dns.com`) sesuai instruksi Vercel.

---

## 8. Ringkasan & Rekomendasi Tindakan

Proyek MUL Rent Car telah diaudit secara mendalam dan dinyatakan **`READY WITH WARNINGS`** untuk deployment ke Vercel. 

Seluruh aspek teknis kode, build statis, typecheck, linting, dan pengujian Playwright E2E telah berstatus **100% PASS**. Langkah berikutnya yang memerlukan persetujuan pengguna adalah sanitasi keamanan token `opencode.json` dan pembuatan repositori remote GitHub.
