# Project Rules — PT. MAULANA SADHA UTAMA (MUL Rent Car)

## Source of Truth

- **PRD:** [`PRD-MUL-RENT-CAR.md`](file:///d:/mobilrentel/PRD-MUL-RENT-CAR.md) — read before any implementation.
- **Design System:** [`docs/DESIGN.md`](file:///d:/mobilrentel/docs/DESIGN.md) — visual tokens, components, principles.
- **Implementation Plan:** [`docs/IMPLEMENTATION-PLAN.md`](file:///d:/mobilrentel/docs/IMPLEMENTATION-PLAN.md) — phased roadmap.
- **QA Checklist:** [`docs/QA-CHECKLIST.md`](file:///d:/mobilrentel/docs/QA-CHECKLIST.md) — testing requirements.

## Mandatory Rules

1. **Read PRD before coding.** Every feature must trace back to a requirement in the PRD.
2. **Do NOT fabricate vehicle data.** No made-up prices, specs, seat counts, transmission types, features, or descriptions. Use only data from `src/data/vehicles.ts` sourced from PRD Section 14.3.
3. **Do NOT apply with-driver prices to self-drive.** Lepas kunci pricing is always "Harga berdasarkan penawaran". Never show indicative prices for self-drive.
4. **Do NOT create dead buttons or pages.** Every button must perform a real action. Every page must have real content. No placeholder pages just to fill a menu.
5. **Do NOT claim booking success.** Opening WhatsApp is NOT a booking. Never show "booking berhasil", "pesanan terkirim", or similar. Use: "Pesan Anda disiapkan di WhatsApp. Permintaan baru diproses setelah Anda mengirim pesan tersebut."
6. **Do NOT store credentials in source code.** No API keys, tokens, or secrets in committed files. Use `.env.example` with variable names only.
7. **All pages must be responsive.** Test at 375px, 768px, and 1280px viewports minimum.
8. **All changes must be tested.** Run `tsc --noEmit`, `eslint`, and relevant tests before declaring completion.
9. **Report limitations and failures honestly.** If a test fails, a feature is incomplete, or a design doesn't meet targets — say so explicitly. Never claim tests pass without running them.
10. **Do NOT expand MVP scope without approval.** No dashboard admin, no database, no authentication, no booking system, no blog, no multi-language, no CRM, no chat widget unless explicitly approved.

## Data Integrity

- WhatsApp number: `6281262679533` (display: `0812 6267 9533`) — defined ONLY in `src/config/site.ts`.
- All prices are with-driver, Kota Medan dan sekitarnya, indicative, per-day.
- No statistics, testimonials, partner logos, or reviews unless real data is provided.
- Claims marked [VERIFIKASI] in PRD must be displayed as company statements, not facts.
- No personal documents (KTP, NPWP, etc.) uploaded through website forms.

## Technical Standards

- Next.js App Router, TypeScript strict, Tailwind CSS.
- Server Components by default; `'use client'` only for interactive components.
- `next/image` for all images. No raw `<img>` tags.
- Single source for WhatsApp message templates: `src/lib/whatsapp.ts`.
- Single source for price formatting: `src/lib/format.ts`.
- Data access only through `src/lib/vehicles.ts`, not direct imports of data files.
- No API routes in MVP.
- Respect `prefers-reduced-motion`. Touch targets ≥ 44×44px.

## Anti-Fabrication Checklist

Before submitting any code:
- [ ] No fake vehicle specs (seats, transmission, features) added without source data.
- [ ] No made-up company statistics or customer counts.
- [ ] No stock photos presented as company fleet.
- [ ] No testimonials or reviews.
- [ ] No partner logos.
- [ ] No fabricated operating hours (OQ-08 pending).
- [ ] Prices match PRD Section 14.3 exactly.

---

<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service — even well-known ones like React, Next.js, Prisma, Express, Tailwind, Django, or Spring Boot. This includes API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use even when you think you know the answer — your training data may not reflect recent changes. Prefer this over web search for library docs.

Do not use for: refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Steps

1. Always start with `resolve-library-id` using the library name and what to look up in the library's documentation, unless the user provides an exact library ID in `/org/project` format
2. Pick the best match (ID format: `/org/project`) by: exact name match, description relevance, code snippet count, source reputation (High/Medium preferred), and benchmark score (higher is better). If results don't look right, try alternate names or queries (e.g., "next.js" not "nextjs", or rephrase the question). Use version-specific IDs when the user mentions a version
3. `query-docs` with the selected library ID and what to look up in the library's documentation (not single words), scoped to a single concept. If the question spans multiple distinct concepts (e.g. routing and auth and caching), make a separate `query-docs` call per concept with the same library ID, unless the question is about how the concepts interact — combined queries dilute ranking and return shallow results for each topic
4. Answer using the fetched docs
<!-- context7 -->
