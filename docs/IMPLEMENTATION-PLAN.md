# Implementation Plan — MUL Rent Car MVP

> Roadmap teknis berdasarkan [PRD Section 24](file:///d:/mobilrentel/PRD-MUL-RENT-CAR.md).
> Dashboard admin **tidak masuk MVP** (OQ-01 asumsi sementara).

---

## Phase 0 — Discovery & Finalisasi Kebutuhan

**Status:** ⏳ Sedang berjalan (PRD v0.1 tersedia, menunggu persetujuan)

**Tujuan:** Menutup blocker lingkup dan konten.

**Task:**
- [x] PRD v0.1 ditulis
- [ ] Konfirmasi OQ-01 (dashboard admin tidak masuk MVP)
- [ ] Konfirmasi OQ-03 (nomor WhatsApp 0812 6267 9533 final & aktif)
- [ ] Konfirmasi OQ-04 (logo resmi & pedoman warna)
- [ ] Konfirmasi OQ-05 (harga publik hanya untuk dengan sopir + Hiace)
- [ ] Konfirmasi OQ-06 (kategori kendaraan disetujui)
- [ ] Konfirmasi OQ-07 (persyaratan sewa & deposit benar)
- [ ] Konfirmasi OQ-08 (jam operasional)
- [ ] Konfirmasi OQ-09 (domain & hosting)
- [ ] Konfirmasi OQ-12 (URL media sosial lengkap)
- [ ] Kumpulkan foto asli armada
- [ ] Kumpulkan logo resmi

**Blocker:** Persetujuan pemilik proyek.

**Lulus bila:** Semua blocker terjawab atau punya asumsi tertulis disetujui.

---

## Phase 1 — Design System & Fondasi

**Status:** ✅ Selesai (Fondasi terimplementasi, 32 unit test pass, build & typecheck 0 error)

**Tujuan:** Proyek siap dikembangkan.

**Task:**
1. Inisialisasi Next.js + TypeScript + Tailwind CSS
2. Setup ESLint + TypeScript strict
3. Setup struktur folder sesuai PRD Section 15.1
4. Implementasi token desain di Tailwind config (dari `docs/DESIGN.md`)
5. Self-host font Plus Jakarta Sans via `next/font`
6. Buat komponen dasar:
   - `Button` (primary, secondary, tertiary, WhatsApp)
   - `Input`, `Select`, `Textarea`
   - `Card` (vehicle card)
   - `Badge` (kategori, harga indikatif)
   - `Navbar` (responsive, hamburger mobile, focus trap)
   - `Footer`
   - `WhatsAppFloat` (floating button)
7. Buat `src/config/site.ts` (siteConfig)
8. Buat `src/data/vehicles.ts` (14 entri dari PRD 14.3)
9. Buat `src/lib/`:
   - `vehicles.ts` (akses data, filter, sort)
   - `whatsapp.ts` (template pesan, URL builder)
   - `format.ts` (formatIdr, formatPhone)
   - `filters.ts` (logika filter/search)
10. Setup Vitest (unit test)
11. Setup Playwright (E2E)
12. Unit test fondasi: formatIdr, buildWhatsAppUrl, filterVehicles, sortVehicles, slug validation

**Dependency:**
- `next` (latest stable)
- `typescript`
- `tailwindcss`, `postcss`, `autoprefixer`
- `lucide-react`
- `zod` (validasi data + formulir)
- `vitest`, `@testing-library/react`
- `playwright`, `@axe-core/playwright`

**Lulus bila:** `next build`, `tsc --noEmit`, `eslint`, dan unit test fondasi lulus.

**Testing:**
- `tsc --noEmit` — zero errors
- `eslint` — zero errors
- `next build` — sukses tanpa error
- Unit test formatIdr, whatsapp URL, filter/sort — all pass

---

## Phase 2 — Halaman Publik & Katalog Interaktif

**Status:** ✅ Selesai (Seluruh halaman publik tayang, 25 static pages compiled SSG, 40 unit test pass, 24 Playwright E2E test pass)

**Tujuan:** Situs publik fungsional production-ready.

**Task:**
1. [x] `app/layout.tsx` — root layout + metadata + font Plus Jakarta Sans + Floating WhatsApp button
2. [x] `app/page.tsx` — Beranda:
   - Hero (layanan Medan, dengan sopir & lepas kunci, tanpa foto stok)
   - ServiceGrid (7 layanan → anchor `/layanan#...`)
   - FeaturedVehicles (6 entri `featured` dari sumber data resmi)
   - WhyUs (hanya klaim resmi: 5+ tahun, 38 provinsi, 2022+)
   - HowToOrder (3 langkah pemesanan via WA)
   - PriceNotice (disclaimer harga indikatif per hari dengan sopir)
   - ContactStrip & Footer
3. [x] `app/mobil/page.tsx` — Katalog Interaktif:
   - Pencarian nama dan alias kendaraan (real-time/debounced)
   - Filter kategori (pill buttons & accessible select)
   - Filter batas maksimal harga
   - Sorting (default urutan tampil, harga terendah, harga tertinggi, nama A-Z)
   - URL sync (`?q=&kategori=&maxHarga=&urut=`) single source of truth
   - Counter jumlah hasil akurat ("Menampilkan N dari 14 armada")
   - Empty state + Reset filter + Request Order via WhatsApp
4. [x] `app/mobil/[slug]/page.tsx` — Detail kendaraan (SSG 14 slug):
   - Galeri foto fallback `VehicleImage` (bebas foto stok palsu)
   - Harga indikatif harian + badge cakupan wilayah + badge dengan sopir
   - CTA WhatsApp dengan pre-filled message dinamis
   - Ketentuan layanan sewa transparan
   - Rekomendasi armada lain sejenis (`getRelatedVehicles`)
   - Validasi slug via `notFound()` (slug tidak dikenal → 404)
5. [x] `app/tentang-kami/page.tsx` — Profil resmi PT. MAULANA SADHA UTAMA, visi & misi verbatim dari PRD Section 4
6. [x] `app/kontak/page.tsx` — Kontak resmi (NAP terpusat dari `siteConfig`), tautan sosmed terverifikasi, jam konsultasi chat, dan `QuoteForm` interaktif
7. [x] `app/layanan/page.tsx` — 7 bagian layanan ber-anchor lengkap dengan CTA WhatsApp masing-masing
8. [x] `app/syarat-ketentuan/page.tsx` — Persyaratan dengan sopir, lepas kunci, korporat, dan peringatan privasi larangan unggah dokumen
9. [x] `app/kebijakan-privasi/page.tsx` — Penjelasan zero-server-storage & privasi pelanggan
10. [x] `app/not-found.tsx` — 404 kustom dengan jalan kembali ke Beranda, Katalog, dan WA
11. [x] `app/error.tsx` — Client error boundary dengan tombol "Coba Lagi" & tautan Beranda
12. [x] `app/sitemap.ts` & `app/robots.ts` — Dynamic sitemap (8 static routes + 14 vehicles) dan robots crawler directives

**Lulus bila:** AC-PUB-01..04, AC-CAT-01..07, AC-DET-01..06, AC-SYS-01 terpenuhi.

**Testing:**
- `tsc --noEmit`: 0 errors
- `eslint .`: 0 errors, 0 warnings
- `vitest run`: 5 test files, 40 passed tests
- `next build`: 25 static pages compiled successfully
- `playwright test`: 24 passed tests across Chromium desktop & Mobile Chrome viewport

---

## Phase 2.5 — UI/UX Redesign & Editorial Luxury Experience Refinement

**Status:** ✅ Selesai (Editorial Luxury Design System diimplementasikan di seluruh halaman, zero-radius geometry, 70/20/10 color system, Playfair Display + Plus Jakarta Sans typography, 3D card perspective hover, 40 unit test pass, 24 Playwright E2E pass)

**Tujuan:** Mentransformasikan pengalaman visual situs MUL Rent Car dari layout korporat generik menjadi standar premium automotive editorial luxury khas VVIP mobility, dengan tetap menjaga integritas data dan seluruh alur bisnis yang sudah berfungsi.

**Task:**
1. [x] **Design Tokens & Geometry Refinement:** Penyesuaian `tokens.ts` & `globals.css` ke palet 70% Putih/Ivory (`#FFFFFF`, `#F7F4EC`), 20% Charcoal (`#20252B`), 10% Champagne Gold (`#C49A3A`), WhatsApp Green (`#25D366`), serta zero-radius geometry (`rounded-none`).
2. [x] **Typography Upgrade:** Pemuatan `Playfair Display` (editorial headlines) & `Plus Jakarta Sans` (body/UI) via Next.js Google Fonts.
3. [x] **Editorial Components:** Redesain `SiteHeader` (editorial masthead & gold hairline), `SiteFooter`, `Container`, `Button`, `Badge`, `VehicleCard` (3D perspective hover), `VehicleImage` (emblem luxury monogram).
4. [x] **Halaman Beranda (`/`):** Hero editorial asimetris 12 kolom, vignette armada eksekutif, highlight 7 layanan dengan aksen emas, featured fleet, penjaminan kredibilitas resmi, 3 langkah pemesanan bernomor Playfair.
5. [x] **Katalog Armada (`/mobil`):** Filter kontrol tajam, kategori pills luxury, selector harga responsif, layout grid konsisten, zero horizontal overflow.
6. [x] **Detail Kendaraan (`/mobil/[slug]`):** Presentasi otomotif premium, box harga bergaris emas, ketentuan sewa terstruktur, CTA WhatsApp penuh konteks.
7. [x] **Halaman Layanan (`/layanan`):** Masthead editorial, tab navigasi horizontal tajam, 7 seksi layanan beraksen emas dan kartu perbandingan.
8. [x] **Halaman Tentang Kami (`/tentang-kami`):** Profil korporat, visi dan 3 misi resmi verbatim, segmen layanan dalam kartu zero-radius.
9. [x] **Kontak & Formulir (`/kontak`):** NAP resmi terstruktur, `QuoteForm` dengan input tajam, validasi klien Zod, dialog privasi identitas, dan konfirmasi WhatsApp jujur.
10. [x] **Halaman Legal & Error (`/syarat-ketentuan`, `/kebijakan-privasi`, `not-found`, `error`):** Standar visual editorial yang seragam.
11. [x] **Automated Testing & Browser QA:** `tsc --noEmit` pass (0 error), `eslint` pass (0 error), Vitest pass (40/40), Next.js SSG build pass (25/25 halaman), Playwright E2E pass (24/24 skenario desktop & mobile).

---

## Phase 3 — WhatsApp, Formulir, & Layanan

**Status:** ⏳ Transisi (Fitur inti terintegrasi di Phase 2 & 2.5, evaluasi lanjutan konversi)

**Tujuan:** Jalur konversi lengkap.

**Task:**
1. Modul template pesan WA (per konteks: kendaraan, layanan, korporat, Request Order, umum, formulir)
2. Integrasi CTA WhatsApp di seluruh halaman
3. `app/layanan/page.tsx` — 7 layanan dengan anchor (#dengan-sopir, #lepas-kunci, dll)
4. `app/syarat-ketentuan/page.tsx` — 3 bagian persyaratan + disclaimer
5. Formulir penawaran di `/kontak`:
   - Field: nama, WA pengguna, layanan, kendaraan (opsional), tanggal mulai, durasi, lokasi/rute, catatan
   - Validasi klien (Zod)
   - Submit → WhatsApp URL
   - Pesan info (bukan "booking berhasil")
6. `app/kebijakan-privasi/page.tsx`
7. WhatsApp fallback: tombol "Salin pesan", nomor + email alternatif

**Lulus bila:** AC-SVC-01..03, AC-REQ-01, AC-FRM-01..03, AC-WA-01..03 terpenuhi.

**Testing:**
- WA URL format: `wa.me/6281262679533?text=...`
- Pesan memuat nama kendaraan + harga yang benar
- Lepas kunci: TIDAK ada harga angka
- Wedding Car, Bus: TIDAK ada daftar armada/harga
- Formulir: validasi error per field, tanggal lampau ditolak, submit valid → WA URL
- Tidak ada "undefined"/"null" di pesan

---

## Phase 4 — Dashboard Admin

**⛔ TIDAK MASUK MVP** (OQ-01 asumsi sementara)

Diaktifkan hanya jika pemilik proyek mengkonfirmasi kebutuhan dashboard.

---

## Phase 5 — SEO, Optimasi, & Hardening

**Status:** 🔜 Menunggu Phase 2–3

**Tujuan:** Kesiapan mesin pencari, performa, aksesibilitas, keamanan.

**Task:**
1. Metadata unik per halaman (Next.js Metadata API)
2. Open Graph + Twitter Card
3. `sitemap.xml` otomatis (8 halaman + 14 kendaraan published)
4. `robots.txt` (izinkan publik, blokir staging)
5. JSON-LD `AutoRental`/`LocalBusiness` (hanya data terverifikasi)
6. Canonical URL absolut
7. Optimasi gambar (WebP/AVIF, sizes, priority)
8. Audit Lighthouse (Performance ≥ 90, SEO ≥ 90)
9. Audit axe (zero critical/serious violations)
10. Header keamanan (X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy)
11. CSP dasar
12. `npm audit`

**Lulus bila:** AC-SEO-01..03, target NFR dicatat.

**Testing:**
- Metadata unik tiap halaman
- sitemap: 8 + 14 entries, tanpa URL ber-query
- robots.txt valid
- Lighthouse mobile ≥ 90 Performance (dicatat, bukan dijamin)
- axe: zero critical/serious
- Header keamanan terpasang
- npm audit: zero critical

---

## Phase 6 — Testing, Deployment, & Handover

**Status:** 🔜 Menunggu Phase 5

**Tujuan:** Rilis dan serah terima.

**Task:**
1. Jalankan seluruh test plan (Section 19.2)
2. UAT dengan pemilik proyek
3. Deployment produksi
4. DNS + HTTPS
5. Google Search Console (opsional)
6. README: cara ubah harga, tambah kendaraan, ganti nomor WA
7. Pelatihan singkat pemilik

**Lulus bila:** Definition of Done (PRD Section 25) terpenuhi.

---

## Dependency Summary

| Package | Alasan | Phase |
|---|---|---|
| `next` | Framework utama, SSG, App Router | 1 |
| `react`, `react-dom` | Peer dependency Next.js | 1 |
| `typescript`, `@types/react`, `@types/node` | Type safety | 1 |
| `tailwindcss`, `postcss`, `autoprefixer` | Styling | 1 |
| `lucide-react` | Ikon (SVG, tree-shakeable) | 1 |
| `zod` | Validasi data kendaraan + formulir | 1 |
| `vitest`, `@testing-library/react`, `jsdom` | Unit testing | 1 |
| `playwright`, `@axe-core/playwright` | E2E + aksesibilitas | 1 |
| `eslint`, `eslint-config-next` | Linting | 1 |

**TIDAK dipasang di MVP:** database ORM, auth library, CMS, payment gateway, chat widget, analytics (opsional diputuskan kemudian).
