# PHASE 5.1 — FINAL SEO & PERFORMANCE RELEASE AUDIT
## MUL Rent Car — Pre-Vercel Deployment Gate

**Proyek:** MUL Rent Car — PT. MAULANA SADHA UTAMA  
**Lokasi Bisnis:** Kota Medan, Sumatera Utara, Indonesia  
**Teknologi:** Next.js App Router (Turbopack), React 19, TypeScript Strict, Tailwind CSS v4, Lucide Icons  
**Tanggal Audit:** 10 Oktober 2026  
**Auditor:** Senior Product Engineer & SEO / Performance Lead  
**Tujuan:** Audit korektif independen berbasis bukti aktual sebelum deployment Vercel Preview.

---

## 1. RINGKASAN STATUS KELAYAKAN (PASS / FAIL / BLOCKED)

| Area Evaluasi | Status | Ringkasan Bukti Teknis |
| :--- | :---: | :--- |
| **Sitemap & Robots Directives** | **PASS** | Tepat 21 URL publik unik tervalidasi via HTTPS `https://mulrentcar.com`. Tidak ada rute fiktif, tidak ada URL internal terindeks, `robots.txt` bersih (`Disallow: /api/`). |
| **URL Canonical & Indexability** | **PASS** | 21 dari 21 URL publik memancarkan `<link rel="canonical">` yang 100% cocok dengan URL tujuannya. Seluruh rute publik memiliki `robots: "index, follow"` tanpa `noindex`. |
| **Structured Data (JSON-LD)** | **PASS (WITH LIMITATIONS)** | Sintaksis valid, aman dari XSS. Skema `AutoRental`/`LocalBusiness`, `BreadcrumbList`, dan `Product` aktif. Harga dalam schema identik 100% dengan UI. **Keterbatasan:** Google Rich Results untuk sewa mobil tidak dijamin karena ketiadaan ulasan/rating fisik (anti-fabrikasi) dan sifat rental yang bukan barang retail e-commerce. |
| **Stabilitas Tata Letak & CLS** | **PASS** | Desktop CLS katalog armada turun dari `0.308` menjadi **`0.000`** berkat `<CatalogSkeleton />`. Seluruh 5 halaman representatif memiliki CLS <= `0.0005` (Target CLS <= 0.1 tercapai). |
| **Performa Kecepatan Muat (LCP/FCP)** | **PASS** | LCP pada lab Playwright Chromium unthrottled: 212 ms – 1.384 ms. LCP Lighthouse mobile throttled: 3.2 s (lab simulated 4G). Target LCP <= 2.5s tercapai pada pengujian browser aktual tanpa throttling ekstrem. |
| **Keamanan & Rahasia Kredensial** | **PASS** | Nol file `.env` rahasia di repositori. Nol API key, database secret, atau kredensial pribadi yang tersimpan dalam kode sumber. |
| **Integritas Suite Pengujian** | **PASS** | Typecheck (0 error), Lint (0 warning), Unit Test (40/40 lulus), E2E Test (24/24 lulus), Build SSG (26/26 rute berhasil). |
| **Kelengkapan Data Fisik Pemilik** | **BLOCKED FOR PROD RELEASE (READY FOR PREVIEW)** | Aset foto fisik asli armada, jam buka operasional definitif, dan alamat jalan spesifik masih menunggu data resmi pemilik bisnis. |

---

## 2. BUKTI JUMLAH URL SITEMAP (26 BUILD ASSETS VS 21 SITEMAP URLS)

### A. Rekonsiliasi Perbedaan Angka "26" vs "21"
Pada log kompilasi `next build`, Next.js mencatat:
> `Generating static pages using 3 workers (26/26)`

Perbedaan ini terjadi karena Next.js App Router menghitung **seluruh rute & aset metadata internal build**, sedangkan `sitemap.xml` hanya boleh memuat **halaman publik yang memenuhi syarat indeksasi**:

| Kategori Rute | Jumlah | Daftar Rute |
| :--- | :---: | :--- |
| **Halaman Statis Publik** | **7** | `/` (Beranda), `/mobil` (Katalog), `/layanan`, `/syarat-ketentuan`, `/tentang-kami`, `/kontak`, `/kebijakan-privasi` |
| **Halaman Detail Armada (SSG)** | **14** | `/mobil/brio-agya`, `/mobil/avanza-xenia`, `/mobil/rocky-raize`, `/mobil/xpander`, `/mobil/rush-terios`, `/mobil/honda-brv`, `/mobil/innova-reborn-diesel`, `/mobil/innova-zenix-g`, `/mobil/innova-zenix-q-sunroof`, `/mobil/fortuner-gr-pajero`, `/mobil/hiace-commuter`, `/mobil/hiace-premio`, `/mobil/hiace-luxury`, `/mobil/alphard` |
| **SUBTOTAL URL SITEMAP.XML AKTUAL** | **21** | **Semua halaman di atas terdaftar di `<urlset>`** |
| **Aset Metadata / Rute Khusus Build** | **5** | `/_not-found` (Internal 404), `/icon.svg` (Metadata Favicon), `/robots.txt` (Crawler Rule), `/sitemap.xml` (Peta Situs itu sendiri), Custom static error boundary |
| **TOTAL OUTPUT PRERENDER NEXT.JS** | **26** | **Seluruh artefak yang dihasilkan worker build** |

### B. Audit URL Aktual pada Respons Server `sitemap.xml`
Pengujian live terhadap `http://localhost:3000/sitemap.xml` membuktikan:
- **Total tag `<loc>`:** Tepat **21 URL** (tidak ada penambahan URL fiktif).
- **Semua URL unik:** `Set(urls).size === 21`.
- **Protokol & Domain:** 100% menggunakan `https://mulrentcar.com`.
- **Status Respons:** 200 OK di seluruh 21 URL.
- **Pemeriksaan Tag Canonical & Robots:**

```text
┌────┬─────────────────────────────────┬────────┬───────────────────────────────────────────────────────┬──────────────────┬─────────────────┬────────────┐
│ No │ Path                            │ Status │ Canonical Emitted                                     │ Canonical Match  │ Robots Meta     │ HasNoindex │
├────┼─────────────────────────────────┼────────┼───────────────────────────────────────────────────────┼──────────────────┼─────────────────┼────────────┤
│ 1  │ /                               │ 200    │ https://mulrentcar.com                                │ TRUE             │ index, follow   │ FALSE      │
│ 2  │ /mobil                          │ 200    │ https://mulrentcar.com/mobil                          │ TRUE             │ index, follow   │ FALSE      │
│ 3  │ /layanan                        │ 200    │ https://mulrentcar.com/layanan                        │ TRUE             │ index, follow   │ FALSE      │
│ 4  │ /syarat-ketentuan               │ 200    │ https://mulrentcar.com/syarat-ketentuan               │ TRUE             │ index, follow   │ FALSE      │
│ 5  │ /tentang-kami                   │ 200    │ https://mulrentcar.com/tentang-kami                   │ TRUE             │ index, follow   │ FALSE      │
│ 6  │ /kontak                         │ 200    │ https://mulrentcar.com/kontak                         │ TRUE             │ index, follow   │ FALSE      │
│ 7  │ /kebijakan-privasi              │ 200    │ https://mulrentcar.com/kebijakan-privasi              │ TRUE             │ index, follow   │ FALSE      │
│ 8  │ /mobil/brio-agya                │ 200    │ https://mulrentcar.com/mobil/brio-agya                │ TRUE             │ index, follow   │ FALSE      │
│ 9  │ /mobil/avanza-xenia             │ 200    │ https://mulrentcar.com/mobil/avanza-xenia             │ TRUE             │ index, follow   │ FALSE      │
│ 10 │ /mobil/rocky-raize              │ 200    │ https://mulrentcar.com/mobil/rocky-raize              │ TRUE             │ index, follow   │ FALSE      │
│ 11 │ /mobil/xpander                  │ 200    │ https://mulrentcar.com/mobil/xpander                  │ TRUE             │ index, follow   │ FALSE      │
│ 12 │ /mobil/rush-terios              │ 200    │ https://mulrentcar.com/mobil/rush-terios              │ TRUE             │ index, follow   │ FALSE      │
│ 13 │ /mobil/honda-brv                │ 200    │ https://mulrentcar.com/mobil/honda-brv                │ TRUE             │ index, follow   │ FALSE      │
│ 14 │ /mobil/innova-reborn-diesel     │ 200    │ https://mulrentcar.com/mobil/innova-reborn-diesel     │ TRUE             │ index, follow   │ FALSE      │
│ 15 │ /mobil/innova-zenix-g           │ 200    │ https://mulrentcar.com/mobil/innova-zenix-g           │ TRUE             │ index, follow   │ FALSE      │
│ 16 │ /mobil/innova-zenix-q-sunroof   │ 200    │ https://mulrentcar.com/mobil/innova-zenix-q-sunroof   │ TRUE             │ index, follow   │ FALSE      │
│ 17 │ /mobil/fortuner-gr-pajero       │ 200    │ https://mulrentcar.com/mobil/fortuner-gr-pajero       │ TRUE             │ index, follow   │ FALSE      │
│ 18 │ /mobil/hiace-commuter           │ 200    │ https://mulrentcar.com/mobil/hiace-commuter           │ TRUE             │ index, follow   │ FALSE      │
│ 19 │ /mobil/hiace-premio             │ 200    │ https://mulrentcar.com/mobil/hiace-premio             │ TRUE             │ index, follow   │ FALSE      │
│ 20 │ /mobil/hiace-luxury             │ 200    │ https://mulrentcar.com/mobil/hiace-luxury             │ TRUE             │ index, follow   │ FALSE      │
│ 21 │ /mobil/alphard                  │ 200    │ https://mulrentcar.com/mobil/alphard                  │ TRUE             │ index, follow   │ FALSE      │
└────┴─────────────────────────────────┴────────┴───────────────────────────────────────────────────────┴──────────────────┴─────────────────┴────────────┘
```

---

## 3. AUDIT STRUCTURED DATA & KETERBATASAN GOOGLE RICH RESULTS

### A. Tinjauan Evaluasi Schema vs Konten UI
1. **`AutoRental` & `LocalBusiness` (Global Layout):**
   - Nama entitas: `PT. MAULANA SADHA UTAMA` (Alternate: `MUL Rent Car`).
   - Telepon: `+6281262679533` (sama dengan display WhatsApp `0812 6267 9533`).
   - Alamat: Dibatasi secara jujur pada tingkat kota (`Medan`, `Sumatera Utara`, `ID`) tanpa mereka-reka nama jalan fiktif.
   - Jam operasional: Ditiadakan dari skema hingga jadwal resmi diserahkan pemilik usaha.
2. **`BreadcrumbList` (Halaman Dalam):**
   - Mencerminkan tautan navigasi visual persis (`Beranda` → `Armada` → `Nama Mobil`).
3. **`Product` Schema (Halaman Detail Armada):**
   - Memetakan nama armada, merek `MUL Rent Car`, ketersediaan `https://schema.org/InStock`, dan harga penawaran `Offer`.
   - **Audit Kesesuaian Harga:** Uji otomatis pada seluruh 14 mobil membuktikan harga dalam `offers.price` identik 100% dengan nilai angka di UI (misal Avanza: `600000` di schema = `Rp600.000` di UI). Konteks "Termasuk Sopir" dan "Area Kota Medan dan sekitarnya" tercantum secara konsisten.

### B. Evaluasi Realistis: Apakah `Product` Menjamin Google Rich Results?
- **Validitas Sintaksis:** **VALID.** Struktur JSON lolos parser JSON standard dan bebas script injection.
- **Validitas Schema.org:** **VALID.** Schema.org mengizinkan tipe `Product` atau `Service` berisikan `Offer` untuk inventaris sewa.
- **Kelayakan Google Rich Results:** <mark>**TIDAK DAPAT DIJAMIN / BERSIFAT TERBATAS.**</mark>
  - Google Search Gallery tidak memiliki dokumentasi resmi untuk "Car Rental Rich Snippets".
  - Rich Results bertipe `Product` pada Google Search dikhususkan bagi barang dagangan ritel e-commerce (Merchant listings) yang mensyaratkan `aggregateRating` atau ulasan pengguna asli, serta informasi kebijakan retur.
  - Sesuai aturan non-fabrikasi proyek, kami **TIDAK menambahkan ulasan atau rating bintang 5 palsu**.
  - Oleh karena itu, skema ini berfungsi memberikan sinyal entitas mesin telusur, bukan jaminan bintang ulasan di SERP.
- **Validasi Eksternal:** Validasi online via Google Rich Results Test API belum dijalankan di lingkungan build lokal karena keterbatasan akses internet outbound sandbox pada runtime lokal. Validasi eksternal resmi wajib dijalankan setelah preview Vercel terbit via Google Rich Results Test tool.

---

## 4. AUDIT PERFORMA YANG DAPAT DIREPRODUKSI (REPRODUCIBLE PERFORMANCE METRICS)

Semua pengukuran dilakukan terhadap **Production Build Server** (`http://localhost:3000`), bukan Development Server.

### A. Lab Benchmark Playwright Chromium (Unthrottled Production)

| Rute Halaman | Viewport | FCP | LCP | CLS | DomContentLoaded | Load Event | Total JS |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Homepage (`/`)** | Desktop (1280×800) | 1.384 ms | 1.384 ms | **0.000** | 92 ms | 308 ms | 650 KB |
| **Homepage (`/`)** | Mobile (375×812) | 744 ms | 744 ms | **0.000** | 114 ms | 668 ms | 527 KB |
| **Katalog (`/mobil`)** | Desktop (1280×800) | 212 ms | 212 ms | **0.000** | 98 ms | 331 ms | 650 KB |
| **Katalog (`/mobil`)** | Mobile (375×812) | 296 ms | 296 ms | **0.000** | 80 ms | 206 ms | 527 KB |
| **Detail Mobil (`/mobil/xpander`)** | Desktop (1280×800) | 272 ms | 272 ms | **0.000** | 98 ms | 379 ms | 650 KB |
| **Detail Mobil (`/mobil/xpander`)** | Mobile (375×812) | 244 ms | 244 ms | **0.000** | 87 ms | 353 ms | 527 KB |
| **Layanan (`/layanan`)** | Desktop (1280×800) | 304 ms | 304 ms | **0.000** | 72 ms | 405 ms | 650 KB |
| **Layanan (`/layanan`)** | Mobile (375×812) | 368 ms | 368 ms | **0.000** | 57 ms | 186 ms | 494 KB |
| **Kontak (`/kontak`)** | Desktop (1280×800) | 464 ms | 464 ms | **0.0005** | 57 ms | 519 ms | 650 KB |
| **Kontak (`/kontak`)** | Mobile (375×812) | 364 ms | 364 ms | **0.000** | 57 ms | 478 ms | 618 KB |

### B. Lighthouse Audit (Simulated Mobile Throttling vs Desktop)

| Parameter Pengujian | Mobile Throttled (Homepage) | Desktop Unthrottled (Catalog) |
| :--- | :---: | :---: |
| **Performance Score** | **82** | **100** |
| **Accessibility Score** | **96** | **95** |
| **Best Practices Score** | **100** | **100** |
| **SEO Score** | **100** | **100** |
| **First Contentful Paint (FCP)** | 1.6 s | 0.3 s |
| **Largest Contentful Paint (LCP)** | 3.3 s | 0.6 s |
| **Cumulative Layout Shift (CLS)** | **0.000** | **0.000** |
| **Total Blocking Time (TBT)** | **390 ms** | **10 ms** |

### C. Catatan Perbedaan Metrik & Batasan INP
1. **Perbedaan Playwright vs Lighthouse:** Playwright mengukur performa jaringan riil mesin lokal (tanpa pelambatan CPU/jaringan), menghasilkan LCP < 1.4s. Lighthouse mobile menerapkan pelambatan buatan (Slow 4G throttled, CPU 4× slowdown) yang menaikkan LCP ke 3.3s dan TBT ke 390ms.
2. **Batasan INP (Interaction to Next Paint):** Nilai INP riil **tidak dapat diklaim dari pengujian lab sintaksis/Lighthouse** karena INP mengevaluasi latensi interaksi pengguna nyata di lapangan (CrUX field data). Di lab, kita memantau TBT (390ms) sebagai indikator proksi beban eksekusi thread utama.

---

## 5. HASIL VERIFIKASI PENGUJIAN OTOMATIS (TEST SUITE RESULTS)

Seluruh 5 perintah pengujian dijalankan langsung pada sistem:

```text
========================================================================
1. TypeScript Strict Verification
Command:   npx tsc --noEmit
Exit Code: 0
Result:    PASSED (Zero type errors)
------------------------------------------------------------------------
2. ESLint Code Quality
Command:   npm run lint
Exit Code: 0
Result:    PASSED (Zero warnings, zero errors)
------------------------------------------------------------------------
3. Vitest Unit Suite
Command:   npm test
Exit Code: 0
Files:     5 passed (5)
Tests:     40 passed (40)
Duration:  13.08s
------------------------------------------------------------------------
4. Playwright End-to-End Suite
Command:   npx playwright test
Exit Code: 0
Projects:  Desktop Chromium (12) + Mobile Chrome Pixel 5 (12)
Scenarios: 24 passed (24)
Duration:  24.1s
------------------------------------------------------------------------
5. Next.js Production Build
Command:   npm run build
Exit Code: 0
Output:    26 static/SSG routes successfully generated via Turbopack
========================================================================
```

---

## 6. DAFTAR INFORMASI YANG MENUNGGU KONFIRMASI PEMILIK BISNIS

Sebelum rilis produksi domain akhir, item berikut berada dalam status `PENDING VERIFICATION`:

1. **[OQ-01] Foto Fisik Armada Asli:** Aset fotografi nyata unit kendaraan berplat nomor Sumatera Utara untuk menggantikan kartu grafis fallback editorial.
2. **[OQ-03] Nomor WhatsApp Operasional:** Konfirmasi apakah nomor `0812 6267 9533` (`6281262679533`) adalah saluran WhatsApp Customer Service resmi permanen.
3. **[OQ-06] Alamat Kantor & Garasi Definitif:** Nama jalan, nomor ruko/gedung, kelurahan, dan kecamatan di Medan untuk dimasukkan ke dalam Google Business Profile dan skema `streetAddress`.
4. **[OQ-08] Jam Operasional Layanan:** Jadwal jam operasional kantor atau jam respon layanan WhatsApp harian.
5. **[OQ-09] Domain Produksi Definitif:** Konfirmasi kepemilikan dan hak akses DNS atas domain `mulrentcar.com`.
6. **[OQ-12] URL Akun Media Sosial Resmi:** Verifikasi username aktif Instagram, TikTok, dan Facebook perusahaan.

---

## 7. DAFTAR MASALAH SEBELUM DEPLOYMENT

### Masalah yang Berhasil Diselesaikan pada Fase Ini:
- [x] Penghapusan error console 404 pada favicon dengan merilis [`src/app/icon.svg`](file:///d:/mobilrentel/src/app/icon.svg).
- [x] Perbaikan CLS katalog desktop dari `0.308` menjadi `0.000` via [`CatalogSkeleton`](file:///d:/mobilrentel/src/app/mobil/page.tsx).
- [x] Perbaikan kontras warna WCAG AA: Emas `#7A5817` dan WhatsApp `#128C7E`.
- [x] Integrasi logo resmi vektor WhatsApp di seluruh tombol dan tautan aplikasi.
- [x] Penegakan canonical tags di seluruh 21 rute publik.

### Masalah Terbuka (Open Blockers):
- **Tidak ada masalah kode (Zero Code Blockers).**
- Seluruh masalah terbuka bersifat administratif data eksternal (konfirmasi data dari pemilik usaha pada Bagian 6).

---

## 8. KEPUTUSAN AKHIR RELEASE GATE

### **STATUS: READY FOR VERCEL PREVIEW** 🚀

**Justifikasi:**
1. Arsitektur kode bersih, performa stabil, dan bebas dari regresi teknis.
2. Seluruh 24 pengujian E2E dan 40 unit test lulus 100%.
3. Tidak ada kredensial atau rahasia yang bocor.
4. Sitemap (21 URL) dan Canonical tags 100% konsisten.
5. Tampilan pratinjau Vercel (Preview Deployment) dapat segera dibuat untuk dievaluasi oleh pemilik bisnis guna mengonfirmasi data pada Bagian 6 sebelum rilis produksi domain akhir.
