# LAPORAN AUDIT STATIC EXPORT — MUL RENT CAR
## Kesiapan Migrasi Hosting ke Shared Hosting Rumahweb (Paket Unlimited M)

**Proyek:** PT. MAULANA SADHA UTAMA (MUL Rent Car)  
**Tipe Audit:** Read-Only Static Export & Shared Hosting Compatibility Assessment  
**Tanggal Pelaksanaan:** 10 Oktober 2026  
**Target Lingkungan:** Rumahweb Shared Hosting (cPanel, Apache / LiteSpeed, CloudLinux OS, tanpa Node.js Daemon)  
**Status Evaluasi (Verdict):** `CONDITIONAL PASS`  

---

## 1. Ringkasan Eksekutif & Verdict

Berdasarkan audit menyeluruh terhadap arsitektur kode, routing, dependensi, penanganan aset, dan konfigurasi saat ini:

### **Vonis: CONDITIONAL PASS**

* **Alasan Kelayakan (Mengapa Lolos Arsitektur):**
  Kode aplikasi MUL Rent Car secara fundamental **100% kompatibel dengan arsitektur static HTML**. Seluruh 14 halaman detail armada telah memiliki `generateStaticParams()`. Proyek ini **sama sekali tidak memiliki** Server Actions, Route Handlers (API backend), middleware, dependensi database runtime, cookie/session server, atau autentikasi dinamis. Seluruh interaksi (formulir permintaan penawaran dan filter katalog) beroperasi murni di sisi peramban (client-side) dengan integrasi langsung ke WhatsApp API URL.

* **Alasan Persyaratan Khusus (Kondisi yang Wajib Dipenuhi Sebelum Export):**
  Konfigurasi proyek saat ini ([`next.config.ts`](file:///d:/mobilrentel/next.config.ts)) belum mengaktifkan `output: "export"` dan belum mengaktifkan `images: { unoptimized: true }`. Jika `next build` dijalankan dengan konfigurasi sekarang, Next.js menghasilkan artefak runtime server Node.js (`.next/`), bukan folder statis siap pakai (`out/`). Selain itu, hosting Apache di cPanel Rumahweb memerlukan konfigurasi berkas `.htaccess` untuk mencegah galat HTTP 404 saat pengguna me-refresh halaman detail kendaraan secara langsung.

---

## 2. Hasil Audit Berdasarkan 9 Parameter Wajib

### 2.1. Versi Next.js, Struktur App Router, & Konfigurasi Build
* **Versi Next.js:** `16.4.0` (Didukung React `19.3.0`, TypeScript Strict `6.0.3` pada [`package.json`](file:///d:/mobilrentel/package.json#L18)).
* **Arsitektur Direktori:** Menggunakan App Router (`src/app/`) dengan pola Server Components sebagai standar utama.
* **Konfigurasi Saat Ini ([`next.config.ts`](file:///d:/mobilrentel/next.config.ts#L1-L10)):**
  ```typescript
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
      formats: ["image/avif", "image/webp"],
    },
  };

  export default nextConfig;
  ```
* **Temuan:**
  * Opsi `output: "export"` belum dideklarasikan.
  * Perintah `npm run build` saat ini mengompilasi proyek menjadi format server Node.js di dalam direktori `.next/` (meskipun secara internal ke-26 rute telah diprerender sebagai SSG HTML statis).
  * Folder `out/` belum dihasilkan pada konfigurasi saat ini.

---

### 2.2. Pemetaan Rute Statis & Dinamis (26 Total Rute)
Berdasarkan pemeriksaan struktur `src/app/` dan manifes prerender (`.next/prerender-manifest.json`), seluruh halaman telah berhasil diprerender saat build:

1. **Rute Statis Utama (7 Rute):**
   * `/` — [`src/app/page.tsx`](file:///d:/mobilrentel/src/app/page.tsx)
   * `/mobil` — [`src/app/mobil/page.tsx`](file:///d:/mobilrentel/src/app/mobil/page.tsx)
   * `/layanan` — [`src/app/layanan/page.tsx`](file:///d:/mobilrentel/src/app/layanan/page.tsx)
   * `/kontak` — [`src/app/kontak/page.tsx`](file:///d:/mobilrentel/src/app/kontak/page.tsx)
   * `/tentang-kami` — [`src/app/tentang-kami/page.tsx`](file:///d:/mobilrentel/src/app/tentang-kami/page.tsx)
   * `/syarat-ketentuan` — [`src/app/syarat-ketentuan/page.tsx`](file:///d:/mobilrentel/src/app/syarat-ketentuan/page.tsx)
   * `/kebijakan-privasi` — [`src/app/kebijakan-privasi/page.tsx`](file:///d:/mobilrentel/src/app/kebijakan-privasi/page.tsx)

2. **Rute Dinamis Armada (14 Rute SSG):**
   * Pola rute: `/mobil/[slug]` — [`src/app/mobil/[slug]/page.tsx`](file:///d:/mobilrentel/src/app/mobil/%5Bslug%5D/page.tsx)
   * Implementasi `generateStaticParams()` (baris 26–29):
     ```typescript
     export async function generateStaticParams() {
       const slugs = getAllVehicleSlugs();
       return slugs.map((slug) => ({ slug }));
     }
     ```
   * 14 slug terdaftar: `brio-agya`, `avanza-xenia`, `rocky-raize`, `xpander`, `rush-terios`, `honda-brv`, `innova-reborn-diesel`, `innova-zenix-g`, `innova-zenix-q-sunroof`, `fortuner-gr-pajero`, `hiace-commuter`, `hiace-premio`, `hiace-luxury`, `alphard`.

3. **Rute Metadata & Aset Spesial (3 Rute):**
   * `/sitemap.xml` — [`src/app/sitemap.ts`](file:///d:/mobilrentel/src/app/sitemap.ts) (Menghasilkan berkas XML statis)
   * `/robots.txt` — [`src/app/robots.ts`](file:///d:/mobilrentel/src/app/robots.ts) (Menghasilkan berkas teks statis)
   * `/icon.svg` — [`src/app/icon.svg`](file:///d:/mobilrentel/src/app/icon.svg) (Favicon SVG statis)

4. **Halaman Khusus (2 Rute):**
   * `/_not-found` — [`src/app/not-found.tsx`](file:///d:/mobilrentel/src/app/not-found.tsx) (Menghasilkan `_not-found.html`)
   * `/_global-error` — [`src/app/error.tsx`](file:///d:/mobilrentel/src/app/error.tsx)

* **Temuan:** Seluruh rute (100%) berstatus SSG (`● (SSG)`). Tidak ada rute SSR atau runtime dinamis (`ƒ (Dynamic)`).

---

### 2.3. Analisis Ketergantungan Fitur Sisi Server (Server-Side Features)
* **Server Actions (`'use server'`):** **Nihil.** Tidak ditemukan satu pun Server Action dalam repositori.
* **Route Handlers / API Routes (`route.ts`):** **Nihil.** Tidak ada endpoint API lokal.
* **Middleware (`middleware.ts`):** **Nihil.** Tidak ada berkas middleware di `src/` maupun root.
* **Server Headers / Cookies (`next/headers`):** **Nihil.** Tidak ada pemanggilan fungsi `cookies()` atau `headers()`.
* **Server Redirects / Rewrites:** **Nihil.** Tidak ada aturan redirect dinamis pada sisi server.
* **Temuan:** Nol ketergantungan terhadap fitur server Node.js.

---

### 2.4. Penggunaan `next/image` & Kebutuhan Image Loader
* **Lokasi Penggunaan:** Hanya digunakan pada satu komponen: [`src/components/catalog/vehicle-image.tsx`](file:///d:/mobilrentel/src/components/catalog/vehicle-image.tsx#L26-L33).
* **Mekanisme Default Next.js:**
  Pada mode standar, `<Image>` memanggil endpoint server `/_next/image?url=...&w=...&q=...` untuk melakukan konversi gambar *on-the-fly* menggunakan Node.js runtime.
* **Keterbatasan Static Export:**
  Next.js melarang penggunaan default image optimization pada mode `output: "export"` karena tidak ada proses Node.js yang berjalan di hosting statis. Build akan memunculkan error fatal jika `images.unoptimized` tidak disetel.
* **Solusi & Kesiapan Proyek Saat Ini:**
  Pada Fase 5.2, seluruh 13 foto kendaraan telah dipra-optimasi (*pre-optimized*) secara permanen menjadi format **WebP kualitas 82** dengan ukuran sangat ringan (82–229 KB) dan disimpan langsung di `public/images/vehicles/`.
  Jika `images: { unoptimized: true }` ditambahkan ke `next.config.ts`, komponen `<Image>` akan menghasilkan tag `<img>` murni yang merujuk langsung ke berkas WebP lokal tersebut. Hal ini mempertahankan kecepatan tinggi, ketajaman gambar, rasio `aspect-[4/3]`, dan skor performa tanpa membutuhkan proses server sama sekali.

---

### 2.5. Interaksi Klien, Form, Filter, dan Tombol WhatsApp
* **Katalog & Filter ([`src/components/catalog/catalog-view.tsx`](file:///d:/mobilrentel/src/components/catalog/catalog-view.tsx)):**
  * Beroperasi murni pada memori browser via React `useState` & `useMemo`.
  * Menggunakan `useSearchParams()` untuk menyinkronkan URL query string (`?kategori=suv`).
  * Pada [`src/app/mobil/page.tsx`](file:///d:/mobilrentel/src/app/mobil/page.tsx#L78), komponen ini **telah dibungkus dalam `<Suspense>`**, sehingga tidak merusak proses prerendering statis Next.js.
* **Formulir Kontak & Permintaan Penawaran ([`src/components/contact/quote-form.tsx`](file:///d:/mobilrentel/src/components/contact/quote-form.tsx)):**
  * Validasi input dieksekusi 100% di browser (`validate()`).
  * Tidak melakukan HTTP POST atau pengiriman email melalui backend server.
  * Mengonversi data form menjadi pesan teks terstruktur lalu membuka tautan `https://wa.me/6281262679533?text=...` melalui `window.open()` (baris 102).
* **Navigasi ([`src/components/layout/site-header.tsx`](file:///d:/mobilrentel/src/components/layout/site-header.tsx)):**
  * Deteksi rute aktif dan menu mobile beroperasi sepenuhnya di client-side.
* **Temuan:** Seluruh fungsionalitas interaktif tetap bekerja 100% normal pada hosting HTML statis.

---

### 2.6. Metadata SEO, Canonical URL, Sitemap, Robots.txt, & JSON-LD
* **Metadata & Canonical:** Dihasilkan secara statis saat build dan disisipkan langsung ke dalam tag `<head>` HTML masing-masing halaman.
* **Canonical URL:** Mengarah ke format HTTPS absolut tanpa trailing slash (contoh: `https://mulrentcar.com/mobil/avanza-xenia`).
* **Sitemap XML:** Berkas `sitemap.xml` digenerate sebagai berkas statis di root direktori output, memuat 21 URL publik yang valid.
* **Robots.txt:** Berkas `robots.txt` digenerate sebagai berkas teks statis di root direktori output.
* **JSON-LD Structured Data:** Komponen Server Component (`JsonLd`) menginjeksikan skrip `<script type="application/ld+json">` langsung ke dalam HTML mentah. Mesin pencari (Googlebot, Bingbot) dapat langsung merayapi schema tanpa memerlukan rendering JavaScript sisi klien.
* **Temuan:** Kualitas SEO teknis, indeksasi, dan keterbacaan bot sepenuhnya identik antara hosting server maupun hosting statis.

---

### 2.7. Dependensi Database, Autentikasi, & API Runtime
* **Penyimpanan Data:** Seluruh data armada bersumber dari berkas TypeScript statis ([`src/data/vehicles.ts`](file:///d:/mobilrentel/src/data/vehicles.ts)).
* **Database / ORM:** Nihil (tidak ada PostgreSQL, MySQL, Prisma, Supabase, dll.).
* **Autentikasi:** Nihil (tidak ada login, session cookie, JWT, atau middleware auth).
* **Secrets / Environment Variables:** Tidak ada API key berbayar atau credentials privat yang dibutuhkan saat runtime peramban.
* **Temuan:** Tidak ada ketergantungan data eksternal saat aplikasi dijalankan.

---

### 2.8. Akses URL Langsung & Perilaku Refresh pada Hosting Statis
Ini merupakan **poin teknis paling krusial** pada migrasi ke web server Apache di cPanel Rumahweb:

1. **Perilaku Default Export Next.js:**
   Secara default, jika `trailingSlash` bernilai `false`, Next.js menghasilkan berkas:
   * `/mobil.html` untuk URL `/mobil`
   * `/mobil/avanza-xenia.html` untuk URL `/mobil/avanza-xenia`
2. **Masalah Tanpa Konfigurasi Server:**
   * Jika pengguna mengklik tautan dari beranda, navigasi dikelola oleh JavaScript peramban (Next.js Link) dan bekerja lancar.
   * **Namun**, jika pengunjung menekan **F5 (Refresh)** atau membuka tautan `https://mulrentcar.com/mobil/avanza-xenia` secara langsung dari WhatsApp/Google:
     * Web server Apache pada Rumahweb akan mencari folder bernama `avanza-xenia/` atau berkas bernama persis `avanza-xenia`.
     * Karena yang ada adalah `avanza-xenia.html`, server Apache secara default akan memunculkan **HTTP 404 Not Found bawaan server cPanel**.
3. **Solusi Wajib:**
   Web server Apache di Rumahweb **wajib dipasangi berkas `.htaccess`** dengan aturan *URL rewriting* yang memetakan permintaan URL bersih (*clean URLs*) ke berkas `.html` yang sesuai tanpa mengubah URL di address bar.

---

### 2.9. Analisis Risiko Shared Hosting Rumahweb (Paket Unlimited M)
Berdasarkan batasan teknis shared hosting cPanel Rumahweb:

| Aspek Teknis | Kondisi di Rumahweb Unlimited M | Dampak & Solusi pada MUL Rent Car |
| :--- | :--- | :--- |
| **Node.js Daemon (`next start`)** | Tidak didukung untuk proses latar belakang terus-menerus. CloudLinux LVE membatasi memori (1 GB RAM) dan CPU. Proses rawan mati (*crash 503*). | **Solusi Terbaik:** Menjalankan website sebagai **Static HTML/CSS/JS export murni**. Tidak ada proses Node.js yang berjalan di server, menghilangkan risiko crash 100%. |
| **Web Server** | Apache 2.4 / LiteSpeed Enterprise dengan dukungan `mod_rewrite`. | **Wajib:** Mengunggah berkas `.htaccess` di dalam `public_html/`. |
| **Custom 404 Page** | Server shared hosting menampilkan halaman 404 cPanel polos jika terjadi rute tidak dikenal. | **Solusi:** Konfigurasi `ErrorDocument 404 /_not-found.html` pada berkas `.htaccess`. |
| **Kompresi & Caching** | Next.js server caching headers tidak aktif pada file statis murni. | **Solusi:** Aktifkan modul `mod_deflate` (Gzip) dan `mod_expires` (Browser Cache) via `.htaccess` agar kecepatan loading tetap optimal. |
| **SSL / HTTPS** | Didukung penuh via AutoSSL / cPanel Let's Encrypt. | **Wajib:** Aturan redirect HTTPS di `.htaccess` untuk memaksa koneksi aman. |

---

## 3. Matriks Kompatibilitas Fitur

| Fitur / Komponen | Status Kompatibilitas | Catatan Teknis |
| :--- | :---: | :--- |
| Halaman Beranda (`/`) | **KOMPATIBEL** | Prerender HTML murni, hero, editorial grid |
| 14 Halaman Detail Armada (`/mobil/[slug]`) | **KOMPATIBEL** | Didukung `generateStaticParams()`, 14 berkas HTML dihasilkan |
| Filter & Pencarian Katalog | **KOMPATIBEL** | Filter berjalan di memori browser, query sync via `useSearchParams` |
| Form Permintaan Penawaran (`QuoteForm`) | **KOMPATIBEL** | Validasi client-side, redirect ke WhatsApp resmi |
| Tombol WhatsApp Floating | **KOMPATIBEL** | Komponen client-side tautan eksternal |
| SEO Head & JSON-LD Structured Data | **KOMPATIBEL** | Terinjeksi permanen di HTML mentah |
| Peta Situs (`sitemap.xml`) & `robots.txt` | **KOMPATIBEL** | Diekspor sebagai berkas statis di root |
| Gambar Armada (`next/image`) | **KONDISIONAL** | Butuh `images: { unoptimized: true }` di `next.config.ts` |
| URL Bersih pada Refresh Browser | **KONDISIONAL** | Butuh aturan rewrite pada berkas `.htaccess` di `public_html/` |
| Halaman 404 Kustom | **KONDISIONAL** | Butuh `ErrorDocument 404` pada berkas `.htaccess` |

---

## 4. Perubahan Minimum yang Diperlukan untuk Migrasi

Jika migrasi ke static hosting Rumahweb disetujui, hanya terdapat **dua berkas** yang perlu dikonfigurasi:

### 1. Penyesuaian `next.config.ts`
Menambahkan baris `output: "export"` dan `unoptimized: true`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Mengaktifkan ekspor statis ke folder out/
  reactStrictMode: true,
  images: {
    unoptimized: true, // Menonaktifkan optimasi on-the-fly server Node.js
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

### 2. Pembuatan Berkas `public/.htaccess`
Berkas ini diletakkan di dalam folder `public/` agar otomatis disalin ke dalam folder output `out/` saat proses build, dan selanjutnya diunggah ke `public_html/` Rumahweb:
```apache
# MUL Rent Car — Apache Configuration for Rumahweb cPanel
RewriteEngine On
RewriteBase /

# 1. Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 2. Clean URLs (Memetakan request tanpa ekstensi ke file .html yang ada)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# 3. Custom 404 Error Page
ErrorDocument 404 /_not-found.html

# 4. Gzip Compression (mod_deflate)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json image/svg+xml
</IfModule>

# 5. Browser Caching (mod_expires)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

---

## 5. Rencana Pengujian & Kriteria Keberhasilan (Acceptance Criteria)

Sebelum berkas diunggah ke hosting produksi Rumahweb, rencana pengujian berikut wajib dijalankan:

### Tahap 1: Verifikasi Build Lokal
1. Jalankan `npm run build` dengan opsi export aktif.
2. Pastikan direktori `out/` terbentuk dengan sukses tanpa pesan galat.
3. Verifikasi keberadaan berkas kunci di dalam `out/`:
   - `out/index.html`
   - `out/mobil.html`
   - `out/mobil/brio-agya.html` (hingga seluruh 14 file HTML mobil)
   - `out/sitemap.xml`
   - `out/robots.txt`
   - `out/images/vehicles/*.webp`
   - `out/.htaccess`

### Tahap 2: Simulasi Web Server Statis Lokal
Jalankan server statis lokal (contoh: `npx serve out`) untuk memverifikasi:
- Semua 26 halaman dapat dibuka secara langsung.
- Navigasi katalog, filter harga, filter kategori, dan pencarian berfungsi responsif.
- Tombol WhatsApp pada halaman detail membuka aplikasi/web WhatsApp dengan format pesan yang tepat.
- Formulir kontak memvalidasi data dan menyusun pesan WhatsApp penawaran resmi.

### Tahap 3: Uji Pascamigrasi di Rumahweb
1. Akses langsung URL detail mobil melalui peramban: `https://mulrentcar.com/mobil/innova-zenix-g`.
2. Lakukan **Refresh (F5)** dan **Hard Refresh (Ctrl+F5)** pada peramban. Halaman **wajib tetap terbuka sempurna** tanpa memunculkan galat 404 cPanel.
3. Masukkan URL acak yang tidak ada: `https://mulrentcar.com/mobil/tidak-ada`. Pastikan halaman kustom `_not-found.html` bertema editorial emas MUL Rent Car muncul dengan benar.
4. Periksa berkas `https://mulrentcar.com/sitemap.xml` dan pastikan dapat dibaca oleh Google Search Console.

---

## 6. Kesimpulan Audit

Arsitektur aplikasi Next.js MUL Rent Car **sangat ideal dan siap** untuk dijalankan sebagai static export di shared hosting Rumahweb Unlimited M. Keputusan menggunakan arsitektur static export justru akan **menguntungkan operasional perusahaan**:
1. Menghilangkan risiko server down akibat batasan memori Node.js CloudLinux di shared hosting.
2. Biaya hosting tetap sangat hemat dengan paket Rumahweb Unlimited M tanpa perlu menyewa VPS.
3. Kecepatan akses (*Time to First Byte / TTFB*) menjadi instan karena web server LiteSpeed/Apache hanya menyajikan berkas statis siap saji.

Pekerjaan migrasi hanya membutuhkan modifikasi minor pada `next.config.ts` dan penyediaan berkas `.htaccess`. Sesuai instruksi audit, tidak ada modifikasi berkas yang dilakukan pada tahap ini sebelum adanya persetujuan resmi.
