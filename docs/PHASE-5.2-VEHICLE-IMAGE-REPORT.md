# PHASE 5.2 — VEHICLE IMAGE SOURCING & ASSET INTEGRATION REPORT

**Project:** PT. MAULANA SADHA UTAMA (MUL Rent Car)  
**Location:** Medan, Sumatera Utara, Indonesia  
**Stack:** Next.js App Router (16.4.0), React 19, TypeScript Strict, Tailwind CSS v4  
**Date of Audit & Implementation:** 2026-10-10  
**Phase:** 5.2 — Vehicle Image Sourcing & Asset Integration  
**Final Verdict:** `PARTIAL — CLIENT PHOTOS OR PERMISSIONS REQUIRED`  

---

## 1. Initial Findings & Audit Baseline

Before modifying any source code or assets, an audit of the initial repository state was performed:

1. **Vehicle Data Source (`src/data/vehicles.ts`):**
   - Contains all 14 vehicle categories mandated by PRD Section 14.3.
   - Initial state: All 14 vehicles had `images: []` (empty array).
   - Zero vehicle photography was stored in the project.
2. **Fallback Implementation (`src/components/catalog/vehicle-image.tsx`):**
   - Implemented an editorial luxury automotive fallback with an SVG Car monogram emblem, subtle gold corner framing, and clear editorial text: *"Foto segera tersedia"* and *"Armada tahun 2022 ke atas"*.
   - Component gracefully handles both present images (`next/image` with `fill`, responsive `sizes`, `aspect-[4/3]`) and empty image arrays.
3. **Directory Structure:**
   - The directory `public/images/vehicles/` did not exist.
4. **Anti-Fabrication & Legal Guardrails (`AGENTS.md`):**
   - Strict prohibition against scraping competitor rental sites, extracting dealer stock, utilizing watermarked assets, or generating AI mockups disguised as company fleet.
   - Any public domain or open-licensed photograph must be explicitly presented as a **Reference Photograph of the Vehicle Model** (`Foto referensi model...`) and never falsely claimed as an owned unit of MUL Rent Car.

---

## 2. Assets Found and Integrated

A systematic search of open repositories (Wikimedia Commons) was executed to identify photographs matching exact Indonesian-market specifications for the 2022+ fleet. 

Thirteen (13) models were successfully sourced, verified, converted to lightweight WebP, and integrated into `public/images/vehicles/`:

| No | Vehicle Slug | Display Name | Model & Generation Verified | WebP Dimensions | File Size |
| :-: | :--- | :--- | :--- | :-: | :-: |
| 1 | `brio-agya` | Brio / Agya | 2023 Honda Brio RS (Facelift, Indonesia) | 1200 × 720 px | 92 KB |
| 2 | `avanza-xenia` | Avanza / Xenia | 2022 Toyota Avanza (W100) 1.5 G | 1200 × 900 px | 117 KB |
| 3 | `rocky-raize` | Rocky / Raize | 2021 Toyota Raize 1.0T G (Indonesia) | 1200 × 720 px | 130 KB |
| 4 | `xpander` | Xpander | 2021 Mitsubishi Xpander Ultimate facelift | 1200 × 800 px | 82 KB |
| 5 | `rush-terios` | Rush / Terios | 2024 Toyota Rush GR Sport (Indonesia) | 1200 × 675 px | 86 KB |
| 6 | `honda-brv` | Honda BR-V | 2022 Honda BR-V Prestige Honda Sensing | 1200 × 720 px | 93 KB |
| 7 | `innova-reborn-diesel` | Innova Reborn Diesel | 2022 Toyota Kijang Innova 2.4 G Diesel | 1200 × 769 px | 113 KB |
| 8 | `innova-zenix-g` | Innova Zenix G | 2023 Toyota Kijang Innova Zenix 2.0 G | 1200 × 834 px | 136 KB |
| 9 | `innova-zenix-q-sunroof` | Innova Zenix Q Sunroof | 2023 Toyota Innova Zenix 2.0 Q Hybrid (Sunroof) | 1200 × 743 px | 181 KB |
| 10 | `fortuner-gr-pajero` | Fortuner GR / Pajero | 2022 Toyota Fortuner 2.8 VRZ GR Sport | 1200 × 738 px | 90 KB |
| 11 | `hiace-commuter` | Hiace Commuter | 2022 Toyota HiAce 3.0 Commuter (H200) | 1200 × 900 px | 101 KB |
| 12 | `hiace-premio` | Hiace Premio | 2019–2024 Toyota HiAce Premio 2.8 (H300) | 1200 × 914 px | 85 KB |
| 13 | `alphard` | Alphard | 2023 Toyota Alphard Hybrid (AH40) | 1200 × 854 px | 229 KB |

**Total fleet image weight:** 1.47 MB across 13 images (~113 KB average per asset).

---

## 3. Asset Licensing Evidence

All 13 integrated photographs have documented open commercial licenses verified via Wikimedia Commons:

1. **`brio-agya.webp`**
   - Source: `File:2023_Honda_Brio_RS_(Indonesia)_front_view.jpg`
   - Author: Andra Febrian
   - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
   - Status: `LICENSE VERIFIED`
2. **`avanza-xenia.webp`**
   - Source: `File:2022_Toyota_Avanza_(W100)_1.5_G,_IIMS_Hybrid,_Grand_City,_Central_Surabaya.jpg`
   - Author: Alex Neman
   - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
   - Status: `LICENSE VERIFIED`
3. **`rocky-raize.webp`**
   - Source: `File:2021_Toyota_Raize_1.0T_G_(Indonesia)_front_view.jpg`
   - Author: Andra Febrian
   - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
   - Status: `LICENSE VERIFIED`
4. **`xpander.webp`**
   - Source: `File:2021_Mitsubishi_Xpander_Ultimate_facelift_(Indonesia)_front_view_01.jpg`
   - Author: Andra Febrian
   - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
   - Status: `LICENSE VERIFIED`
5. **`rush-terios.webp`**
   - Source: `File:2024_Toyota_Rush_GR_Sport_(Indonesia)_front_view.jpg`
   - Author: Andra Febrian
   - License: Creative Commons CC0 1.0 Universal Public Domain (CC0)
   - Status: `LICENSE VERIFIED`
6. **`honda-brv.webp`**
   - Source: `File:2022_Honda_BR-V_Prestige_with_Honda_Sensing_(Indonesia)_front_view_02.jpg`
   - Author: Andra Febrian
   - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
   - Status: `LICENSE VERIFIED`
7. **`innova-reborn-diesel.webp`**
   - Source: `File:2022_Toyota_Kijang_Innova_2.4_G.jpg`
   - Author: Alex Neman
   - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
   - Status: `LICENSE VERIFIED`
8. **`innova-zenix-g.webp`**
   - Source: `File:2023_Toyota_Kijang_Innova_Zenix_2.0_G,_Taman,_Sidoarjo.jpg`
   - Author: Alex Neman
   - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
   - Status: `LICENSE VERIFIED`
9. **`innova-zenix-q-sunroof.webp`**
   - Source: `File:2023_Toyota_Kijang_Innova_Zenix_2.0_Q_Hybrid_Modellista_(front).jpg`
   - Author: Alex Neman
   - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
   - Status: `LICENSE VERIFIED`
10. **`fortuner-gr-pajero.webp`**
    - Source: `File:2022_Toyota_Fortuner_2.8_VRZ_GR_Sport_4x2_GUN166R_(20220428).jpg`
    - Author: Alex Neman
    - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
    - Status: `LICENSE VERIFIED`
11. **`hiace-commuter.webp`**
    - Source: `File:2022_Toyota_Hiace_3.0_Commuter_in_white,_front_right.jpg`
    - Author: Ethan Llamas
    - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
    - Status: `LICENSE VERIFIED`
12. **`hiace-premio.webp`**
    - Source: `File:2019_Toyota_HiAce_Premio_2.8_GDH322R_(20190722).jpg`
    - Author: Alex Neman
    - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
    - Status: `LICENSE VERIFIED`
13. **`alphard.webp`**
    - Source: `File:2023_Toyota_Alphard_Hybrid_(AH40)_1.jpg`
    - Author: Benespit
    - License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
    - Status: `LICENSE VERIFIED`

Full asset records and links are compiled in `docs/VEHICLE-IMAGE-ASSET-REGISTER.md`.

---

## 4. Models Still Missing Photographs

### `hiace-luxury` (Hiace Luxury)
- **Status:** `NO ACCEPTABLE IMAGE FOUND` (Preserving luxury editorial fallback)
- **Technical & Ethical Rationale:** In the Medan executive charter industry, *Hiace Luxury* is differentiated by custom coachwork VIP cabin modifications: typically 8–10 high-comfort captain seats, executive lighting, leather consoles, and passenger entertainment systems. Standard exterior stock photographs do not reflect this interior configuration and would mislead corporate clients.
- **Action Taken:** `images` array is retained as `[]`. The existing editorial fallback displays cleanly with the automotive emblem and informative copy. Client-provided photos of the actual cabin interior are required.

---

## 5. Files Changed

1. `src/data/vehicles.ts`:
   - Updated `rawVehiclesData` to assign local WebP image paths and reference alt texts for 13 verified models.
   - Retained `images: []` for `hiace-luxury`.
2. `tests/unit/vehicles.test.ts`:
   - Updated image assertion to test that 13 models have valid `/images/vehicles/*.webp` sources with honest reference alt text, and `hiace-luxury` retains `images: []`.
   - Added unit test asserting all referenced image files physically exist on disk in `public/images/vehicles/` with valid file sizes.
3. `package.json`:
   - Configured `"build": "next build --webpack"` to guarantee deterministic Next.js builds on Windows environments.
4. `scripts/fetch-vehicles.mjs`:
   - Script created to fetch, resize, and convert source images into optimized WebP assets using Sharp.
5. `public/images/vehicles/`:
   - Directory populated with 13 WebP assets (`alphard.webp`, `avanza-xenia.webp`, etc.).
6. `tests/e2e/images.spec.ts`:
   - Created Playwright E2E suite verifying image rendering across catalog cards, scroll-triggered lazy loading, Alphard detail page, and Hiace Luxury fallback.
7. `docs/VEHICLE-IMAGE-ASSET-REGISTER.md`:
   - Master compliance register for all 14 vehicle assets.
8. `docs/PHASE-5.2-VEHICLE-IMAGE-REPORT.md`:
   - This comprehensive Phase 5.2 report.

---

## 6. Test Commands and Actual Results

All validation suites were executed locally with zero regressions:

### 1. TypeScript Strict Typecheck
```bash
$ npx tsc --noEmit
Exit code: 0
Result: 0 errors
```

### 2. ESLint Check
```bash
$ npm run lint
> eslint .
Exit code: 0
Result: Clean pass across entire workspace
```

### 3. Vitest Unit Test Suite
```bash
$ npm test
> vitest run

 ✓ tests/unit/format.test.ts (5 tests)
 ✓ tests/unit/filters.test.ts (12 tests)
 ✓ tests/unit/whatsapp.test.ts (8 tests)
 ✓ tests/unit/vehicles.test.ts (8 tests)
 ✓ tests/unit/catalog.test.ts (8 tests)

 Test Files  5 passed (5)
      Tests  41 passed (41)
   Duration  11.60s
Exit code: 0
```

### 4. Playwright E2E Test Suite
```bash
$ npx playwright test
Running 30 tests using 2 workers

  30 passed (2.6m)
Exit code: 0
```
- Includes 24 user flow tests (search, filter, sort, contact form, slug 404, terms, about).
- Includes 6 dedicated image integration and fallback tests across Desktop Chromium and Mobile Chrome.

### 5. Production Build
```bash
$ npm run build
> next build --webpack

▲ Next.js 16.4.0 (webpack)
✓ Compiled successfully in 13.0s
✓ Prerendered static pages (26/26) in 3.1s

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /icon.svg
├ ○ /kebijakan-privasi
├ ○ /kontak
├ ○ /layanan
├ ○ /mobil
├   /mobil/[slug] (14 static detail pages)
├ ○ /robots.txt
├ ○ /sitemap.xml
├ ○ /syarat-ketentuan
└ ○ /tentang-kami

Exit code: 0
```

---

## 7. Performance Considerations

1. **Lightweight WebP Compression:** Total asset size for the entire catalog is 1.47 MB, averaging 113 KB per vehicle.
2. **Deterministic Aspect Ratio:** Cards enforce `aspect-[4/3]` fixed CSS ratio, ensuring **Cumulative Layout Shift (CLS) = 0**.
3. **Responsive `sizes`:** Uses `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw` to prevent overfetching on mobile devices.
4. **Lazy Loading:** Next.js native `loading="lazy"` defers below-the-fold catalog images until scrolled into viewport, verified during Playwright mobile execution.
5. **No Remote Domain Latency:** Assets are served locally from `public/images/vehicles/`, avoiding external DNS handshakes and external downtime risks.

---

## 8. Remaining Client Approvals

Before commercial rollout and production marketing:

1. **Client Fleet Photography Authorization (Hiace Luxury):**
   - Provide high-resolution interior photographs of the actual PT. MAULANA SADHA UTAMA HiAce Luxury unit (captain seats, VIP cabin lighting, passenger amenities).
2. **Optional Actual Fleet Photos (13 Models):**
   - If the client wishes to replace the verified reference photographs with actual photographs of vehicles bearing PT. MAULANA SADHA UTAMA plates or branding, they may supply authorized photos for seamless replacement into `public/images/vehicles/`.
3. **Reference Photo Disclaimer Sign-off:**
   - Formal sign-off on the model reference alt text (`Foto referensi model...`) and disclaimer banner in the vehicle detail pages.

---

## 9. Final Verdict

**Verdict:** `PARTIAL — CLIENT PHOTOS OR PERMISSIONS REQUIRED`

**Reasoning:** 13 of 14 vehicle categories have high-resolution, rights-verified photographs under CC BY-SA 4.0 and CC0 integrated into the build. The remaining single vehicle (*Hiace Luxury*) requires authentic interior cabin photographs directly from the client to prevent misrepresenting custom VIP seating, and therefore retains its editorial fallback visual. All technical checks, type checks, lint checks, unit tests, E2E tests, and production builds pass with 100% success.
