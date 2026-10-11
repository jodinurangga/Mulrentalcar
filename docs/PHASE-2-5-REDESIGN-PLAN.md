# PHASE 2.5 — IMPLEMENTATION PLAN: Premium Editorial Luxury Redesign

## 1. Executive Summary & Audit Baseline
The codebase is healthy with Next.js 16.4 App Router, React 19, TypeScript strict, and Tailwind CSS v4. All 40 Vitest unit tests pass and ESLint runs clean.
Original design used a corporate blue (`#0B2A4A`) with heavy rounded corners (`rounded-2xl`, `rounded-full` pills) and standard card layouts.

The redesign will establish an **Editorial Luxury** identity:
- **Palette**: Pure White (`#FFFFFF`), Warm Ivory (`#F7F4EC`), Charcoal (`#20252B`), Champagne Gold (`#C49A3A`), Dark Gold (`#9B7627`), WhatsApp Green (`#25D366`), Neutral Gray (`#5A626A`), Warm Hairline Borders (`#E5E0D4`).
- **Typography**: Playfair Display (editorial display/headings) + Plus Jakarta Sans (body, functional UI, specs).
- **Geometry**: Sharp corners / zero-radius default, asymmetric 12-column editorial grid, fine hairline dividers, intentional negative space.
- **Motion**: Staggered reveals (200-600ms), subtle 3D card tilt & perspective hover, `prefers-reduced-motion` compliance.
- **Zero Fabrication**: 100% preservation of PRD Section 14.3 vehicle data, prices, official WhatsApp `6281262679533`, routes, and test assertions.

## 2. Implementation Stages & File Matrix

| Stage | Target Files | Key Changes |
|---|---|---|
| **Stage 1: Tokens & Typography** | `src/app/layout.tsx`<br>`src/app/globals.css`<br>`src/config/tokens.ts` | Add `Playfair_Display` Google Font alongside `Plus_Jakarta_Sans`. Define editorial luxury CSS variables and utility classes: `--font-serif`, `--color-primary: #20252B`, `--color-ivory: #F7F4EC`, `--color-gold: #C49A3A`, `--color-gold-dark: #9B7627`. Zero-radius default. Micro-animation and 3D perspective utilities. |
| **Stage 2: Core UI Primitives** | `src/components/ui/button.tsx`<br>`src/components/ui/badge.tsx`<br>`src/components/ui/section-heading.tsx`<br>`src/components/ui/whatsapp-button.tsx`<br>`src/components/ui/container.tsx` | Sharp edges, luxury gold/charcoal variants, Playfair Display heading options, hairline border accents. Touch targets ≥ 44px preserved. |
| **Stage 3: Layout & Navigation** | `src/components/layout/site-header.tsx`<br>`src/components/layout/site-footer.tsx`<br>`src/components/layout/floating-whatsapp.tsx` | Editorial masthead header with sharp styling, champagne gold accents, subtle entrance. Luxury footer with charcoal background, champagne typography, official NAP, legal notices. |
| **Stage 4: Vehicle Components** | `src/components/catalog/vehicle-card.tsx`<br>`src/components/catalog/vehicle-image.tsx` | Editorial card layout with subtle 3D hover elevation/perspective, crisp zero-radius border, bespoke automotive emblem placeholder with champagne gold hairline aesthetics. |
| **Stage 5: Homepage Redesign** | `src/app/page.tsx` | Asymmetric luxury automotive hero: Playfair headline, gold hairline rule, verified executive service narrative, dual CTAs, fleet teaser with refined layout. Editorial services, featured vehicles, verified company credibility. All E2E test texts preserved. |
| **Stage 6: Catalog & Detail Pages** | `src/app/mobil/page.tsx`<br>`src/components/catalog/catalog-view.tsx`<br>`src/app/mobil/[slug]/page.tsx` | Editorial catalog filter bar with sharp geometry and champagne accents; luxury product detail layout with high-end specifications table, verified notes, and WhatsApp CTA. |
| **Stage 7: Services & About Pages** | `src/app/layanan/page.tsx`<br>`src/app/tentang-kami/page.tsx` | Asymmetric editorial sections with warm ivory backgrounds, charcoal typography, Playfair headings, fine dividers, and preserved 7 service anchors and company statements. |
| **Stage 8: Contact & Legal Pages** | `src/app/kontak/page.tsx`<br>`src/components/contact/quote-form.tsx`<br>`src/app/syarat-ketentuan/page.tsx`<br>`src/app/kebijakan-privasi/page.tsx`<br>`src/app/not-found.tsx`<br>`src/app/error.tsx` | Luxury contact page and quote form with crisp sharp inputs, feedback state, legal pages with editorial typography, and stylized 404/error pages. |
| **Stage 9: Automated Verification & QA** | All scripts | Run `typecheck`, `lint`, `test`, `build`, and Playwright E2E tests. Verify across desktop and mobile viewports. |
