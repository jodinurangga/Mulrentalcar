# Independent Audit & Readiness Gate — Phase 1

> **Proyek:** PT. MAULANA SADHA UTAMA — MUL Rent Car  
> **Auditor:** Senior Full-Stack Engineer, QA Engineer, & Security Reviewer (Independen)  
> **Tanggal Audit:** 9 Oktober 2026  
> **Workspace:** `D:\mobilrentel`  
> **Status Akhir:** `PASS WITH CONDITIONS — READY AFTER LISTED CONDITIONS`

---

## 1. Ringkasan Eksekutif

Audit independen ini dilakukan untuk memverifikasi secara langsung dan mendalam implementasi **Phase 1 (Foundation Implementation)** dari proyek website MUL Rent Car (PT. MAULANA SADHA UTAMA) sebelum melangkah ke **Phase 2 (Public Pages & Catalog)**.

Semua pengujian dan pemeriksaan dilakukan secara langsung terhadap kode sumber aktual dan proses runtime, tanpa mengandalkan asumsi atau klaim sepihak dari laporan sebelumnya.

### Kesimpulan Utama:
1. **Integritas Dokumen & Aturan Proyek:** Kedua salinan PRD ([`PRD-MUL-RENT-CAR.md`](file:///d:/mobilrentel/PRD-MUL-RENT-CAR.md) dan [`docs/PRD-MUL-RENT-CAR.md`](file:///d:/mobilrentel/docs/PRD-MUL-RENT-CAR.md)) diverifikasi memiliki hash SHA-256 yang identik (`2B409F43CA995529E08634F7F2C500862B2DA04A867783772F3579B8A728A50F`).
2. **Kepatuhan Data Armada:** Tepat 14 kelompok armada terdaftar di [`src/data/vehicles.ts`](file:///d:/mobilrentel/src/data/vehicles.ts) dengan harga rental dengan sopir per hari Kota Medan dan sekitarnya sesuai PRD Section 14.3. Tidak ditemukan data spesifikasi buatan (kursi, transmisi, fitur) dan tidak ada foto stok palsu (`images: []` dengan fallback aman).
3. **Single Source of Truth:** Nomor WhatsApp `6281262679533` (display `0812 6267 9533`) hanya didefinisikan satu kali di [`src/config/site.ts`](file:///d:/mobilrentel/src/config/site.ts) dengan penandaan verifikasi pending (`isTemporaryVerificationPending: true`). Akses data kendaraan dibatasi ketat melalui [`src/lib/vehicles.ts`](file:///d:/mobilrentel/src/lib/vehicles.ts).
4. **Reproduksi Quality Gates:** Seluruh 4 tahapan quality gate (`typecheck`, `lint`, `test`, `build`) berhasil dieksekusi ulang dengan **0 error** dan **32/32 unit tests lulus**.
5. **Perbaikan Temuan Fondasi:** 3 temuan UX/a11y/styling dan 1 warning konfigurasi pengujian telah diperbaiki langsung dan diverifikasi ulang tanpa mengubah lingkup Phase 1.

---

## 2. Hasil Eksekusi Ulang Quality Gates

Seluruh pengujian dijalankan ulang secara mandiri pada environment lokal:

| Quality Gate | Perintah | Target Cakupan | Exit Code | Hasil Aktual |
|---|---|---|---|---|
| **TypeScript Check** | `npm run typecheck` (`tsc --noEmit`) | Seluruh file `.ts` dan `.tsx` | `0` | **0 errors**. Type safety strict terpenuhi. |
| **ESLint** | `npm run lint` (`eslint .`) | Root, `src/`, `tests/` | `0` | **0 errors, 0 warnings**. ESLint 9 Flat Config bersih. |
| **Unit Tests (Vitest)** | `npm run test` (`vitest run`) | 4 suites di `tests/unit/` | `0` | **4 passed (4), 32 passed (32)** dalam 20.10s. |
| **Production Build** | `npm run build` (`next build`) | Next.js App Router (Turbopack) | `0` | **Compiled successfully in 6.5s**, static prerender `/` & `/_not-found` in 896ms. |

### Rincian Eksekusi Unit Test:
- `tests/unit/format.test.ts` (5 tests): Format `formatIdr()` untuk Rp550.000 s/d Rp2.500.000, nilai nol `Rp0`, penanganan `null`/`undefined` ("Harga berdasarkan penawaran"), dan `formatPhone()`.
- `tests/unit/filters.test.ts` (12 tests): Pencarian teks case-insensitive ("avanza", "AVANZA"), alias model gabungan ("xenia", "rush"), spasi ekstra, filter kategori ("van" -> 3 Hiace, "premium" -> 1 Alphard), batas harga maksimum, dan 4 mode sorting.
- `tests/unit/whatsapp.test.ts` (8 tests): Konstruksi URL WhatsApp dengan nomor resmi, validasi ketiadaan teks `undefined`/`null`, template armada dengan klausul "(unit sesuai ketersediaan)" untuk model gabungan, konsultasi layanan, korporat, request order, dan formulir penawaran.
- `tests/unit/vehicles.test.ts` (7 tests): Validasi skema Zod, jumlah 14 armada, validasi regex slug unik, verifikasi 100% harga indikatif, verifikasi ketiadaan spesifikasi palsu, dan fungsi featured vehicles.

---

## 3. Daftar Temuan Audit Berdasarkan Severity

| ID | Kategori | Severity | File & Baris | Deskripsi Masalah |
|---|---|---|---|---|
| **SEC-01** | Keamanan / Data | **Info / Low** | [`src/config/site.ts:16-20`](file:///d:/mobilrentel/src/config/site.ts#L16-L20) | Nomor WhatsApp `6281262679533` berstatus sementara ([OQ-03]). Sudah ditandai `isTemporaryVerificationPending: true`. Perlu konfirmasi pemilik sebelum launch. |
| **A11Y-01** | Aksesibilitas | **Medium** | [`src/components/catalog/vehicle-card.tsx:50-55`](file:///d:/mobilrentel/src/components/catalog/vehicle-card.tsx#L50-L55) | Tautan nama armada menggunakan `focus:outline-hidden` yang menyembunyikan indikator fokus bagi pengguna navigasi keyboard (melanggar `docs/DESIGN.md` Section 10). |
| **DS-01** | Desain / Kontras | **Low** | [`src/app/page.tsx:112`](file:///d:/mobilrentel/src/app/page.tsx#L112) | CTA WhatsApp pada section penutup meng-override class dengan `bg-white text-[#0B2A4A]`, bertentangan dengan standar warna hijau resmi WhatsApp (`#128C7E`) pada `docs/DESIGN.md` Section 9.1. |
| **UX-01** | Interaksi | **Low** | [`src/components/layout/site-header.tsx:16-24`](file:///d:/mobilrentel/src/components/layout/site-header.tsx#L16-L24) | Menu navigasi mobile belum menutup saat pengguna mengklik area luar header (hanya menutup via Escape dan klik tautan). |
| **CFG-01** | Tooling / Build | **Low** | `vitest.config.ts` | Konfigurasi Vitest menggunakan ekstensi `.ts` dengan sintaks ESM dan `__dirname` yang memicu peringatan deprecated/native loader pada Node.js modern. |
| **E2E-01** | QA Scope | **Info** | [`playwright.config.ts`](file:///d:/mobilrentel/playwright.config.ts) | Test runner Playwright terpasang, namun direktori `tests/e2e/` belum berisi file spec karena halaman publik katalog baru dibangun pada Phase 2. |

---

## 4. Perbaikan yang Dilakukan (Bug Fixes & Hardening)

Seluruh perbaikan yang dilakukan bersifat aman, tepat sasaran, dan berada dalam batas fondasi Phase 1:

### 1. Perbaikan Visibilitas Keyboard Focus pada Kartu Armada ([`vehicle-card.tsx`](file:///d:/mobilrentel/src/components/catalog/vehicle-card.tsx))
- **Sebelum:** `className="focus:outline-hidden after:absolute after:inset-0"`
- **Sesudah:** `className="focus-visible:outline-2 focus-visible:outline-[#0B2A4A] focus-visible:outline-offset-2 rounded-xs after:absolute after:inset-0"`
- **Dampak:** Pengguna keyboard sekarang dapat melihat ring fokus berwarna biru tua saat menavigasi kartu armada dengan tombol `Tab`.

### 2. Penyelarasan Warna Tombol WhatsApp Resmi ([`page.tsx`](file:///d:/mobilrentel/src/app/page.tsx))
- **Sebelum:** Override `className="bg-white text-[#0B2A4A] hover:bg-neutral-100"` pada `<WhatsAppButton>`
- **Sesudah:** Menghapus override warna agar menggunakan warna standar hijau WhatsApp `--color-wa` (`#128C7E`) dengan teks putih dan ikon pesan.
- **Dampak:** Konsistensi identitas visual tombol WhatsApp sesuai aturan `docs/DESIGN.md` Section 9.1.

### 3. Penambahan Event Click-Outside pada Mobile Menu ([`site-header.tsx`](file:///d:/mobilrentel/src/components/layout/site-header.tsx))
- **Sebelum:** Menu hanya menutup melalui penekanan tombol Escape atau klik link menu.
- **Sesudah:** Menambahkan `headerRef` dan event listener `mousedown` untuk menutup dropdown jika pengguna mengklik area luar header.
- **Dampak:** UX navigasi mobile lebih intuitif dan mematuhi PRD Section 13 / `docs/DESIGN.md` Section 9.3 ("close on Esc/click outside").

### 4. Optimalisasi Konfigurasi Vitest ([`vitest.config.mts`](file:///d:/mobilrentel/vitest.config.mts))
- **Sebelum:** `vitest.config.ts` dengan `__dirname` yang menimbulkan warning loader.
- **Sesudah:** Migrasi ke `vitest.config.mts` dengan `import.meta.dirname` dan pembaruan ignores pada [`eslint.config.mjs`](file:///d:/mobilrentel/eslint.config.mjs).
- **Dampak:** Eksekusi unit test berjalan 100% bersih tanpa peringatan apapun.

---

## 5. Hal yang Belum Dapat Diuji & Alasannya

1. **Pengujian End-to-End (E2E) Browser:**
   - *Status:* Belum dijalankan.
   - *Alasan:* Halaman katalog lengkap (`/mobil`), detail armada (`/mobil/[slug]`), profil (`/tentang-kami`), dan form kontak (`/kontak`) merupakan deliverable Phase 2 & Phase 3. Infrastruktur runner (`@playwright/test` dan `playwright.config.ts`) sudah siap.
2. **Pengujian Responsivitas Lintas Perangkat Nyata (Real Device Lab):**
   - *Status:* Diuji via viewport CSS/layout code review.
   - *Alasan:* Testing visual pada perangkat fisik (iPhone Safari, Android Chrome) baru dijadwalkan pada QA Phase 5.
3. **Validasi Keterbacaan dan Konversi Pesan WhatsApp Aktual:**
   - *Status:* Diuji via unit test URL encoding.
   - *Alasan:* Pengiriman pesan ke nomor tujuan sebenarnya belum dilakukan demi mencegah spam ke nomor operasional sebelum peluncuran resmi.

---

## 6. Daftar Blocker Bisnis yang Masih Menunggu Konfirmasi

Sebelum peluncuran produksi (Launch Gate), hal-hal berikut harus disetujui/diberikan oleh pemilik proyek:

1. **[OQ-03] Konfirmasi Nomor WhatsApp Final:**
   - Nomor saat ini: `0812 6267 9533` (`6281262679533`).
   - Wajib konfirmasi aktif dan didedikasikan untuk CS/admin MUL Rent Car.
2. **[OQ-04] File Logo Resmi Perusahaan:**
   - Diperlukan file logo vector (SVG) atau PNG transparan resolusi tinggi untuk menggantikan logo berbasis teks saat ini.
3. **[OQ-06] Konfirmasi Pengelompokan Kategori Armada:**
   - Kategori saat ini (City Car, MPV, SUV, Van/Minibus, Premium) merupakan klasifikasi editorial penyusun PRD.
4. **[OQ-08] Jam Operasional Resmi:**
   - Jam layanan operasional dan CS untuk dicantumkan di kontak dan footer.
5. **Aset Foto Armada Asli:**
   - Foto lanskap (rasio 4:3) untuk ke-14 kelompok armada guna menggantikan fallback "Foto segera tersedia".

---

## 7. Status Akhir Kesiapan

# `PASS WITH CONDITIONS — READY AFTER LISTED CONDITIONS`

### Kondisi Menuju Phase 2:
1. **Persetujuan Pemilik Proyek:** Menyetujui hasil fondasi Phase 1 dan konfirmasi sementara kategori armada serta nomor WhatsApp operasional.
2. **Disiplin Scope Phase 2:** Tetap membatasi Phase 2 pada halaman publik dan katalog statis/SSG tanpa memperluas ke fitur admin, database, pembayaran, atau booking online.
3. **Mempertahankan Integritas Data:** Seluruh halaman katalog dan detail di Phase 2 harus mengonsumsi data secara eksklusif dari [`src/lib/vehicles.ts`](file:///d:/mobilrentel/src/lib/vehicles.ts) tanpa fabrikasi spesifikasi.
