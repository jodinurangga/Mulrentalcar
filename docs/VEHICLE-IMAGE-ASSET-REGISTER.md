# Vehicle Image Asset Register — PT. MAULANA SADHA UTAMA (MUL Rent Car)

**Document Version:** 1.0.0  
**Phase:** 5.2 — Vehicle Image Sourcing & Asset Integration  
**Date:** 2026-10-10  
**Maintainer:** Lead Technical Architect / Anti-Fabrication Compliance Officer  

---

## 1. Governance & Compliance Principles

In accordance with `AGENTS.md` and the project Product Requirements Document (PRD Section 14.3):

1. **Anti-Fabrication:** All vehicle photographs sourced from public repositories are treated strictly as **Visual Model References** and never claimed as actual client-owned vehicles. Alt text explicitly states: `Foto referensi model [Model] ([Tahun]). Unit aktual PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`
2. **Usage Rights Integrity:** Only images under verified open licenses permitting commercial reuse and modification (e.g., Creative Commons Attribution-ShareAlike 4.0, CC0 1.0 Universal) or client-authorized photographs are integrated. No scraped competitor assets, watermark-bearing media, or dealer listings are used.
3. **Honest Presentation & Fallback Preservation:** Where a model variant (such as *Hiace Luxury*) features bespoke VIP interior appointments that cannot be truthfully depicted by standard exterior stock imagery, visual fallbacks are preserved until official client-authorized cabin photos are supplied.

---

## 2. Summary Status Overview

| Status Category | Count | Vehicles |
| :--- | :---: | :--- |
| `CLIENT PHOTO — AUTHORIZED` | 0 | Pending client fleet photoshoot |
| `LICENSE VERIFIED` | 13 | `brio-agya`, `avanza-xenia`, `rocky-raize`, `xpander`, `rush-terios`, `honda-brv`, `innova-reborn-diesel`, `innova-zenix-g`, `innova-zenix-q-sunroof`, `fortuner-gr-pajero`, `hiace-commuter`, `hiace-premio`, `alphard` |
| `PERMISSION REQUIRED` | 0 | None in active codebase |
| `MODEL MATCH UNCERTAIN` | 0 | None; all models verified against Indonesian market 2021–2024 specifications |
| `NO ACCEPTABLE IMAGE FOUND` | 1 | `hiace-luxury` (Retaining luxury editorial fallback) |
| **Total Inventory** | **14** | **13 Integrated, 1 Fallback Preserved** |

---

## 3. Comprehensive Vehicle Asset Inventory

### 1. Brio / Agya (`brio-agya`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2023 Honda Brio RS (Facelift, Indonesian specification)
- **Local Asset Path:** `public/images/vehicles/brio-agya.webp`
- **Output Dimensions & Size:** 1200 × 720 px, 92 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2023_Honda_Brio_RS_(Indonesia)_front_view.jpg](https://commons.wikimedia.org/wiki/File:2023_Honda_Brio_RS_(Indonesia)_front_view.jpg)
- **Original Resolution:** 4075 × 2445 px (JPEG)
- **Photographer / Rights Holder:** Andra Febrian
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Facelift diamond-mesh front grille and two-tone aerodynamic trim matching 2022+ Indonesian market Brio RS.
- **Alt Text:** `Foto referensi model Honda Brio RS (2023). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 2. Avanza / Xenia (`avanza-xenia`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2022 Toyota Avanza (W100) 1.5 G (Indonesia)
- **Local Asset Path:** `public/images/vehicles/avanza-xenia.webp`
- **Output Dimensions & Size:** 1200 × 900 px, 117 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2022_Toyota_Avanza_(W100)_1.5_G,_IIMS_Hybrid,_Grand_City,_Central_Surabaya.jpg](https://commons.wikimedia.org/wiki/File:2022_Toyota_Avanza_(W100)_1.5_G,_IIMS_Hybrid,_Grand_City,_Central_Surabaya.jpg)
- **Original Resolution:** 4000 × 3000 px (JPEG)
- **Photographer / Rights Holder:** Alex Neman
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Front-wheel drive DNGA platform introduced late 2021 for the 2022+ Indonesian fleet.
- **Alt Text:** `Foto referensi model Toyota Avanza G (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 3. Rocky / Raize (`rocky-raize`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2021–2024 Toyota Raize 1.0T G (Indonesia)
- **Local Asset Path:** `public/images/vehicles/rocky-raize.webp`
- **Output Dimensions & Size:** 1200 × 720 px, 130 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2021_Toyota_Raize_1.0T_G_(Indonesia)_front_view.jpg](https://commons.wikimedia.org/wiki/File:2021_Toyota_Raize_1.0T_G_(Indonesia)_front_view.jpg)
- **Original Resolution:** 4027 × 2416 px (JPEG)
- **Photographer / Rights Holder:** Andra Febrian
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Indonesian compact SUV launched in 2021 and continuing into 2024+.
- **Alt Text:** `Foto referensi model Toyota Raize Turbo (2021). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 4. Xpander (`xpander`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2021–2024 Mitsubishi Xpander Ultimate Facelift (Indonesia)
- **Local Asset Path:** `public/images/vehicles/xpander.webp`
- **Output Dimensions & Size:** 1200 × 800 px, 82 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2021_Mitsubishi_Xpander_Ultimate_facelift_(Indonesia)_front_view_01.jpg](https://commons.wikimedia.org/wiki/File:2021_Mitsubishi_Xpander_Ultimate_facelift_(Indonesia)_front_view_01.jpg)
- **Original Resolution:** 2712 × 1808 px (JPEG)
- **Photographer / Rights Holder:** Andra Febrian
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Distinctive T-shaped LED headlights characteristic of the 2022+ facelift generation.
- **Alt Text:** `Foto referensi model Mitsubishi Xpander Ultimate facelift (2021). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 5. Rush / Terios (`rush-terios`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2024 Toyota Rush GR Sport (Indonesia)
- **Local Asset Path:** `public/images/vehicles/rush-terios.webp`
- **Output Dimensions & Size:** 1200 × 675 px, 86 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2024_Toyota_Rush_GR_Sport_(Indonesia)_front_view.jpg](https://commons.wikimedia.org/wiki/File:2024_Toyota_Rush_GR_Sport_(Indonesia)_front_view.jpg)
- **Original Resolution:** 4058 × 2283 px (JPEG)
- **Photographer / Rights Holder:** Andra Febrian
- **License Evidence:** Creative Commons CC0 1.0 Universal Public Domain Dedication (CC0)
- **Visual Match Verification:** Verified. Contemporary 7-seater LSUV styling representing Rush and Terios group.
- **Alt Text:** `Foto referensi model Toyota Rush GR Sport (2024). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 6. Honda BR-V (`honda-brv`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2022 Honda BR-V Prestige with Honda Sensing (Indonesia)
- **Local Asset Path:** `public/images/vehicles/honda-brv.webp`
- **Output Dimensions & Size:** 1200 × 720 px, 93 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2022_Honda_BR-V_Prestige_with_Honda_Sensing_(Indonesia)_front_view_02.jpg](https://commons.wikimedia.org/wiki/File:2022_Honda_BR-V_Prestige_with_Honda_Sensing_(Indonesia)_front_view_02.jpg)
- **Original Resolution:** 3444 × 2066 px (JPEG)
- **Photographer / Rights Holder:** Andra Febrian
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Second-generation DG3 platform launched late 2021 for the 2022+ market.
- **Alt Text:** `Foto referensi model Honda BR-V Prestige Sensing (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 7. Innova Reborn Diesel (`innova-reborn-diesel`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2022 Toyota Kijang Innova 2.4 G Diesel (Reborn)
- **Local Asset Path:** `public/images/vehicles/innova-reborn-diesel.webp`
- **Output Dimensions & Size:** 1200 × 769 px, 113 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2022_Toyota_Kijang_Innova_2.4_G.jpg](https://commons.wikimedia.org/wiki/File:2022_Toyota_Kijang_Innova_2.4_G.jpg)
- **Original Resolution:** 2730 × 1750 px (JPEG)
- **Photographer / Rights Holder:** Alex Neman
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. 2022 facelift bumper with dark trapezoidal grille and 2.4 G diesel designation.
- **Alt Text:** `Foto referensi model Toyota Kijang Innova Reborn 2.4 G Diesel (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 8. Innova Zenix G (`innova-zenix-g`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2023 Toyota Kijang Innova Zenix 2.0 G (Indonesia)
- **Local Asset Path:** `public/images/vehicles/innova-zenix-g.webp`
- **Output Dimensions & Size:** 1200 × 834 px, 136 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2023_Toyota_Kijang_Innova_Zenix_2.0_G,_Taman,_Sidoarjo.jpg](https://commons.wikimedia.org/wiki/File:2023_Toyota_Kijang_Innova_Zenix_2.0_G,_Taman,_Sidoarjo.jpg)
- **Original Resolution:** 3540 × 2460 px (JPEG)
- **Photographer / Rights Holder:** Alex Neman
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Standard G grade body styling without sunroof or Modellista aero body kit.
- **Alt Text:** `Foto referensi model Toyota Kijang Innova Zenix 2.0 G (2023). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 9. Innova Zenix Q Sunroof (`innova-zenix-q-sunroof`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2023 Toyota Kijang Innova Zenix 2.0 Q Hybrid Modellista (Panoramic Sunroof)
- **Local Asset Path:** `public/images/vehicles/innova-zenix-q-sunroof.webp`
- **Output Dimensions & Size:** 1200 × 743 px, 181 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2023_Toyota_Kijang_Innova_Zenix_2.0_Q_Hybrid_Modellista_(front).jpg](https://commons.wikimedia.org/wiki/File:2023_Toyota_Kijang_Innova_Zenix_2.0_Q_Hybrid_Modellista_(front).jpg)
- **Original Resolution:** 2915 × 1805 px (JPEG)
- **Photographer / Rights Holder:** Alex Neman
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Q grade top trim featuring factory panoramic glass roof and Modellista aerokit.
- **Alt Text:** `Foto referensi model Toyota Kijang Innova Zenix 2.0 Q Hybrid (2023). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 10. Fortuner GR / Pajero (`fortuner-gr-pajero`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2022 Toyota Fortuner 2.8 VRZ GR Sport (Indonesia)
- **Local Asset Path:** `public/images/vehicles/fortuner-gr-pajero.webp`
- **Output Dimensions & Size:** 1200 × 738 px, 90 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2022_Toyota_Fortuner_2.8_VRZ_GR_Sport_4x2_GUN166R_(20220428).jpg](https://commons.wikimedia.org/wiki/File:2022_Toyota_Fortuner_2.8_VRZ_GR_Sport_4x2_GUN166R_(20220428).jpg)
- **Original Resolution:** 5042 × 3100 px (JPEG)
- **Photographer / Rights Holder:** Alex Neman
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Distinctive GR Sport front aerodynamic bumper and dark alloy wheels.
- **Alt Text:** `Foto referensi model Toyota Fortuner 2.8 VRZ GR Sport (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 11. Hiace Commuter (`hiace-commuter`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2022 Toyota HiAce 3.0 Commuter (H200)
- **Local Asset Path:** `public/images/vehicles/hiace-commuter.webp`
- **Output Dimensions & Size:** 1200 × 900 px, 101 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2022_Toyota_Hiace_3.0_Commuter_in_white,_front_right.jpg](https://commons.wikimedia.org/wiki/File:2022_Toyota_Hiace_3.0_Commuter_in_white,_front_right.jpg)
- **Original Resolution:** 2361 × 1771 px (JPEG)
- **Photographer / Rights Holder:** Ethan Llamas
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Classic high-capacity 15-passenger minibus commercial configuration.
- **Alt Text:** `Foto referensi model Toyota HiAce 3.0 Commuter (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 12. Hiace Premio (`hiace-premio`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2019–2024 Toyota HiAce Premio 2.8 GDH322R (H300)
- **Local Asset Path:** `public/images/vehicles/hiace-premio.webp`
- **Output Dimensions & Size:** 1200 × 914 px, 85 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2019_Toyota_HiAce_Premio_2.8_GDH322R_(20190722).jpg](https://commons.wikimedia.org/wiki/File:2019_Toyota_HiAce_Premio_2.8_GDH322R_(20190722).jpg)
- **Original Resolution:** 4681 × 3565 px (JPEG)
- **Photographer / Rights Holder:** Alex Neman
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Semi-bonnet modern executive van front profile sold continuously in Indonesia from 2019 to present.
- **Alt Text:** `Foto referensi model Toyota HiAce Premio 2.8 (2019). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

### 13. Hiace Luxury (`hiace-luxury`)
- **Status:** `NO ACCEPTABLE IMAGE FOUND`
- **Model & Generation:** Toyota HiAce Luxury VIP Cabin Configuration
- **Local Asset Path:** None (Array preserved as `images: []`)
- **Output Dimensions & Size:** N/A
- **Original Source File:** None
- **Photographer / Rights Holder:** None
- **License Evidence:** None
- **Visual Match Verification & Exclusion Rationale:** In the executive transportation sector in Medan, *Hiace Luxury* units feature customized VIP captain-chair layouts (typically 8–10 seats), ambient ceiling illumination, customized leather upholstery, and rear executive consoles. Using an exterior stock photograph would deceive corporate clients who specifically book this variant for its bespoke interior configuration. In accordance with Rule #2 and Rule #4 of `AGENTS.md`, this asset requirement is honestly documented and the editorial luxury fallback is maintained.
- **Fallback Visual:** Editorial Luxury SVG monogram emblem with text *"Foto segera tersedia"* and *"Armada tahun 2022 ke atas"*.

---

### 14. Alphard (`alphard`)
- **Status:** `LICENSE VERIFIED`
- **Model & Generation:** 2023–2024 Toyota Alphard Hybrid (AH40, 4th Generation)
- **Local Asset Path:** `public/images/vehicles/alphard.webp`
- **Output Dimensions & Size:** 1200 × 854 px, 229 KB (WebP q=82)
- **Original Source File:** [Wikimedia Commons File:2023_Toyota_Alphard_Hybrid_(AH40)_1.jpg](https://commons.wikimedia.org/wiki/File:2023_Toyota_Alphard_Hybrid_(AH40)_1.jpg)
- **Original Resolution:** 2229 × 1587 px (JPEG)
- **Photographer / Rights Holder:** Benespit
- **License Evidence:** Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Visual Match Verification:** Verified. Latest AH40 flagship grille and front fascia introduced late 2023 for VIP executive transport.
- **Alt Text:** `Foto referensi model Toyota Alphard Hybrid AH40 (2023). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.`

---

## 4. Technical Asset Specifications

1. **Format:** WebP container with Lanczos3 resampling and quality factor 82.
2. **Dimension Constraints:** Bounded to a maximum width of 1200px (ideal for 2x retina display within 3-column catalog grids and single-column detail heroes).
3. **Average Asset Weight:** ~113 KB across the fleet. Maximum single asset weight: 229 KB (`alphard.webp`). Minimum asset weight: 82 KB (`xpander.webp`). Total fleet image weight: ~1.47 MB.
4. **Rendering Strategy:** `next/image` with responsive `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` and `aspect-[4/3]` container to enforce zero Cumulative Layout Shift (CLS = 0). Above-the-fold candidates receive prioritized preloading, while lower elements are native lazy loaded.
