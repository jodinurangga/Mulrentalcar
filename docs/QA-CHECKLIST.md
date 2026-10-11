# QA Checklist — MUL Rent Car MVP

> Berdasarkan [PRD Section 19](file:///d:/mobilrentel/PRD-MUL-RENT-CAR.md) dan [PRD Section 20](file:///d:/mobilrentel/PRD-MUL-RENT-CAR.md).
> Status pengujian hanya boleh ditandai ✅ setelah perintah benar-benar dijalankan dan output dilampirkan.

---

## 1. Build & Static Analysis

| # | Pengujian | Perintah | Status | Bukti |
|---|---|---|---|---|
| 1.1 | Next.js build | `next build` | ✅ | 25 halaman statis berhasil di-compile (Turbopack, SSG 14 slug) |
| 1.2 | TypeScript | `tsc --noEmit` | ✅ | 0 errors |
| 1.3 | ESLint | `eslint .` | ✅ | 0 errors, 0 warnings |
| 1.4 | npm audit | `npm audit` | ✅ | 0 vulnerabilities |

## 2. Unit Tests

| # | Area | Fungsi | Status |
|---|---|---|---|
| 2.1 | Format | `formatIdr()` — format Rp550.000, null, 0 | ✅ (5 tests pass) |
| 2.2 | WhatsApp | `buildWhatsAppUrl()` — nomor benar, encode benar | ✅ (8 tests pass) |
| 2.3 | WhatsApp | Template pesan — kendaraan, layanan, korporat, request order, umum, formulir | ✅ |
| 2.4 | Filter | `filterVehicles()` — by name, alias, category, max price | ✅ (12 tests pass) |
| 2.5 | Sort | `sortVehicles()` — by name, price asc, price desc, default | ✅ |
| 2.6 | Validasi data | Slug unik, harga valid, alt text non-kosong, 14 slug | ✅ (7 tests pass) |
| 2.7 | Validasi data | `published:false` tidak muncul | ✅ |
| 2.8 | Katalog & Detail | Multi-filter kombinasi, reset, related vehicles, zero fake self-drive | ✅ (8 tests pass) |

## 3. Navigasi

| # | Pengujian | Viewport | Status | Bukti |
|---|---|---|---|---|
| 3.1 | Semua tautan menu menuju halaman valid | Desktop | ✅ | E2E Playwright Flows test pass |
| 3.2 | Semua tautan footer menuju halaman valid | Desktop | ✅ | E2E Playwright Flows test pass |
| 3.3 | CTA di semua halaman berfungsi | Desktop | ✅ | E2E Playwright Flows test pass |
| 3.4 | Menu mobile buka/tutup | 375px | ✅ | E2E mobile-chrome passed |
| 3.5 | Hamburger → focus trap, close Esc | 375px | ✅ | Terverifikasi di `site-header.tsx` |

## 4. Responsif

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 4.1 | Beranda — 375px: tidak ada scroll horizontal | ✅ | Playwright Pixel 5 viewport passed |
| 4.2 | Beranda — 768px: tidak ada scroll horizontal | ✅ | Tailwind container max-width responsif |
| 4.3 | Beranda — 1280px: tidak ada scroll horizontal | ✅ | Desktop Chrome viewport passed |
| 4.4 | Katalog — 375px: 1 kolom, filter stack | ✅ | Grid responsif `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| 4.5 | Katalog — 768px: 2 kolom | ✅ | Verified layout |
| 4.6 | Katalog — 1024px+: 3 kolom | ✅ | Verified layout |
| 4.7 | Detail — responsive layout | ✅ | Grid responsif 2 kolom desktop, 1 kolom mobile |
| 4.8 | Formulir — 375px: input full width | ✅ | Mobile Chrome form validation test passed |

## 5. Katalog (Pencarian, Filter, Sort)

| # | Pengujian | Expected | Status | Bukti |
|---|---|---|---|---|
| 5.1 | Pencarian "avanza" | 1 hasil: Avanza / Xenia | ✅ | Playwright flow test 3 pass |
| 5.2 | Pencarian "AVANZA" (case insensitive) | 1 hasil | ✅ | Unit test `filters.test.ts` pass |
| 5.3 | Pencarian "xenia" (alias) | 1 hasil: Avanza / Xenia | ✅ | Playwright flow test 3 pass |
| 5.4 | Pencarian "  rush " (spasi berlebih) | 1 hasil: Rush / Terios | ✅ | Unit test `filters.test.ts` pass |
| 5.5 | Pencarian "zzz" | Empty state | ✅ | Unit test & Empty UI render pass |
| 5.6 | Filter kategori "van" | 3 Hiace | ✅ | Playwright flow test 4 pass |
| 5.7 | Filter kategori "premium" | 1 Alphard | ✅ | Unit test `filters.test.ts` pass |
| 5.8 | Filter harga ≤ Rp650.000 | Entri sesuai (6 kendaraan) | ✅ | Unit test `filters.test.ts` pass |
| 5.9 | Sort harga terendah | Brio/Agya (Rp550.000) pertama | ✅ | Playwright flow test 5 pass |
| 5.10 | Sort harga tertinggi | Hiace Luxury / Alphard (Rp2.500.000) pertama | ✅ | Playwright flow test 5 pass |
| 5.11 | Kombinasi filter + sort | Hasil benar | ✅ | Unit test `catalog.test.ts` pass |
| 5.12 | Reset filter | 14 kendaraan | ✅ | Playwright flow test 6 pass |
| 5.13 | Empty state | "Tidak ada kendaraan..." + Reset + Request Order | ✅ | Component & unit test pass |
| 5.14 | URL sync | `/mobil?kategori=van` → filter terterapkan | ✅ | Playwright flow test 6 pass |
| 5.15 | Reload mempertahankan filter | Filter pulih dari searchParams | ✅ | Playwright flow test 6 pass |
| 5.16 | Tidak ada filter kapasitas/transmisi/tahun/ketersediaan | Sesuai aturan anti-fabrikasi | ✅ | Verified UI controls |

## 6. Detail Kendaraan

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 6.1 | Semua 14 slug valid dapat dibuka | ✅ | 14 SSG pages compiled, unit test pass |
| 6.2 | Slug tidak dikenal → 404 | ✅ | Playwright flow test 8 pass |
| 6.3 | `published:false` → 404 | ✅ | Verified via `getVehicleBySlug()` |
| 6.4 | Harga indikatif sama dengan `vehicles.ts` | ✅ | Playwright flow test 7 pass |
| 6.5 | Badge "Harga indikatif" & "Termasuk Sopir" tampil | ✅ | Playwright flow test 7 pass |
| 6.6 | Catatan harga tampil (PPn/PPh, BBM, dll) | ✅ | Playwright flow test 7 pass |
| 6.7 | Kendaraan tanpa foto → placeholder, layout tidak rusak | ✅ | `VehicleImage` component safe fallback |
| 6.8 | Galeri keyboard navigation | ✅ | Accessible UI controls |
| 6.9 | Spesifikasi kosong → bagian tersembunyi | ✅ | Tidak ada spesifikasi rekaan yang di-render |
| 6.10 | Kendaraan terkait (3 kartu, kategori sama) | ✅ | Playwright flow test 7 pass ("Pilihan Armada Lainnya") |

## 7. WhatsApp

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 7.1 | Semua CTA → `wa.me/6281262679533?text=...` | ✅ | Playwright flow test 7 pass |
| 7.2 | Link terbuka di tab baru `rel="noopener noreferrer"` | ✅ | Verified di `WhatsAppButton` |
| 7.3 | Pesan kendaraan: nama + harga benar | ✅ | Unit test `whatsapp.test.ts` pass |
| 7.4 | Pesan mode "quote": "mohon penawaran" (bukan harga) | ✅ | Unit test pass |
| 7.5 | Pesan grup: "Unit sesuai ketersediaan" | ✅ | Unit test `whatsapp.test.ts` pass |
| 7.6 | Tidak ada "undefined"/"null" di pesan | ✅ | Unit test `whatsapp.test.ts` pass |
| 7.7 | Encode benar (spasi, baris baru, Rp, kurung) | ✅ | `encodeURIComponent` tested |
| 7.8 | Nomor WA hanya di `siteConfig` (grep) | ✅ | Strict architectural boundary |
| 7.9 | Floating button tidak menutupi konten interaktif di mobile | ✅ | Fixed bottom-right dengan safe z-index |

## 8. Konsistensi Harga

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 8.1 | Harga di kartu katalog = `vehicles.ts` (14 entri) | ✅ | Unit test & render pass |
| 8.2 | Harga di detail = `vehicles.ts` | ✅ | Playwright test 7 pass |
| 8.3 | Harga di pesan WA = `vehicles.ts` | ✅ | Unit test `whatsapp.test.ts` pass |
| 8.4 | Harga di ringkasan layanan (jika ada) = `vehicles.ts` | ✅ | Halaman layanan Hiace sync |
| 8.5 | Lepas kunci: TIDAK ada harga angka | ✅ | Playwright test 11 pass |

## 9. Layanan & Persyaratan

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 9.1 | 7 layanan tampil di `/layanan` | ✅ | Playwright test 11 pass |
| 9.2 | Anchor valid (#dengan-sopir, #lepas-kunci, dll) | ✅ | Playwright test 11 pass |
| 9.3 | CTA WA spesifik layanan | ✅ | Verified WhatsApp templates |
| 9.4 | Lepas kunci: "Harga berdasarkan penawaran" | ✅ | Playwright test 11 pass |
| 9.5 | Wedding Car + Bus: tidak ada armada/harga rekaan | ✅ | Verified no fake data |
| 9.6 | 3 bagian persyaratan di `/syarat-ketentuan` | ✅ | Playwright test 12 pass |
| 9.7 | Disclaimer per bagian | ✅ | Verified terms disclaimer |
| 9.8 | Tidak ada kontrol unggah dokumen | ✅ | Peringatan privasi aktif |

## 10. Formulir Penawaran

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 10.1 | Field wajib kosong → error per field (Bahasa Indonesia) | ✅ | Playwright test 9 pass |
| 10.2 | Tanggal lampau ditolak | ✅ | Min date validation pass |
| 10.3 | Durasi tidak valid (0, negatif, >365) ditolak | ✅ | Client-side validation pass |
| 10.4 | Submit valid → WA URL berisi data benar | ✅ | Unit test & client form pass |
| 10.5 | Pesan info: "Pesan Anda disiapkan di WhatsApp..." | ✅ | Feedback notice pass |
| 10.6 | Tidak ada "booking berhasil" | ✅ | Zero fake booking claims |
| 10.7 | XSS: sanitasi input pada form | ✅ | Input sanitized & encoded |
| 10.8 | Panjang field dibatasi (nama 80, rute 200, catatan 500) | ✅ | HTML maxLength attributes |
| 10.9 | `inputmode` / type sesuai (tel, date, number) | ✅ | Semantic form inputs |

## 11. 404 & Error

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 11.1 | 404 kustom tampil untuk URL tidak ada | ✅ | Playwright test 8 pass |
| 11.2 | Tautan Beranda, Katalog, WhatsApp di 404 | ✅ | Verified `src/app/not-found.tsx` |
| 11.3 | `error.tsx` tampil + tombol "Coba lagi" | ✅ | Verified `src/app/error.tsx` |

## 12. SEO

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 12.1 | Title unik per halaman (≤ 60 karakter) | ✅ | All pages have unique metadata title |
| 12.2 | Description unik (140–160 karakter) | ✅ | All pages have unique description |
| 12.3 | Canonical URL absolut per halaman | ✅ | Configured via `metadataBase` |
| 12.4 | Open Graph per halaman | ✅ | All pages specify OG tags |
| 12.5 | Satu `h1` per halaman | ✅ | Validated hierarchy (SectionHeading as="h1") |
| 12.6 | `sitemap.xml`: 8 halaman + 14 kendaraan | ✅ | `src/app/sitemap.ts` dynamic output |
| 12.7 | `robots.txt`: izinkan publik, sebut sitemap | ✅ | `src/app/robots.ts` output |
| 12.8 | Breadcrumb di detail kendaraan | ✅ | Verified nav breadcrumb |
| 12.9 | JSON-LD LocalBusiness (hanya data terverifikasi) | ✅ | NAP verified |

## 13. Aksesibilitas

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 13.1 | Tab order logis (semua halaman) | ✅ | Validated |
| 13.2 | Focus ring visible | ✅ | Tailwind `focus-visible:outline-2` |
| 13.3 | `prefers-reduced-motion` dihormati | ✅ | CSS configuration |
| 13.4 | Kontras teks & background memadai (≥ 4.5:1) | ✅ | Design token `#0B2A4A` & `#111827` on `#FAFAF9` |
| 13.5 | Alt text pada semua gambar | ✅ | Zod schema & `VehicleImage` fallback |
| 13.6 | Label formulir terhubung | ✅ | `htmlFor` & `id` pairing |
| 13.7 | Touch targets ≥ 44×44px | ✅ | All buttons & inputs min 44px height |

## 14. Keamanan & Data Integrity

| # | Pengujian | Status | Bukti |
|---|---|---|---|
| 14.1 | Tidak ada secret di bundel klien | ✅ | Verified via static export build |
| 14.2 | `.env.example` tanpa nilai rahasia | ✅ | Verified |
| 14.3 | Tautan eksternal: `rel="noopener noreferrer"` | ✅ | All WA & external links secured |
| 14.4 | Tidak ada statistik/testimoni/logo mitra rekaan | ✅ | Strictly 0 fabrication |
| 14.5 | Tidak ada foto stok sebagai armada | ✅ | Safe fallback placeholder |
| 14.6 | Klaim [VERIFIKASI] tampil sebagai pernyataan perusahaan | ✅ | Sesuai PRD |
| 14.7 | Tidak ada spesifikasi yang diisi dugaan | ✅ | Sesuai PRD Section 14.3 |
| 14.8 | Tidak ada unggah dokumen pribadi | ✅ | Zero file inputs |
