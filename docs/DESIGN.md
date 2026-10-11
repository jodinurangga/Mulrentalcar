# Design System — MUL Rent Car

> Source of truth for all visual decisions. Every component and page must reference this document.

## 1. Design Principles

1. **Terpercaya dahulu** — Informasi jelas, jujur, konsisten. Tidak ada klaim atau data palsu.
2. **Premium tapi tidak berlebihan** — Banyak ruang kosong, sedikit dekorasi. Setiap elemen visual memiliki alasan.
3. **Foto asli sebagai pusat** — Layout memberi ruang untuk fotografi armada. Placeholder jelas bertuliskan "Foto segera tersedia".
4. **Satu jalur konversi** — CTA WhatsApp selalu terjangkau, tidak mengganggu.
5. **Mobile-first** — Mayoritas pengguna diperkirakan dari ponsel.

## 2. Anti-AI-Slop Protocol

**Dilarang:**
- Layout template AI generik yang mudah dikenali
- Gradient dekoratif berlebihan
- Glassmorphism pada setiap komponen
- Bento grid tanpa alasan fungsional
- Kartu identik berulang tanpa variasi konten
- Badge, ikon, animasi dekoratif tanpa fungsi
- Typography tidak konsisten
- Hero section dengan terlalu banyak teks
- Statistik, testimoni, logo mitra, klaim rekaan
- Foto stok yang diklaim sebagai armada
- Placeholder permanen
- Tombol tanpa aksi

**Setiap keputusan visual harus punya alasan bisnis atau UX.**

## 3. Color Tokens

Diselaraskan dari PRD Section 13.2 + UI/UX Pro Max recommendation. Warna final mengikuti logo resmi (OQ-04 pending).

### Light Mode (default)

| Token | Nilai | Peran |
|---|---|---|
| `--color-primary` | `#0B2A4A` | Identitas utama — biru tua, kepercayaan & profesionalisme |
| `--color-primary-600` | `#134074` | Varian primer terang |
| `--color-accent` | `#C8963E` | Aksen emas — CTA non-WA, highlight, badge |
| `--color-bg` | `#FAFAF9` | Latar utama (warm off-white) |
| `--color-surface` | `#FFFFFF` | Kartu, panel |
| `--color-text` | `#111827` | Teks utama |
| `--color-muted` | `#4B5563` | Teks sekunder, caption |
| `--color-border` | `#E5E7EB` | Garis pemisah |
| `--color-wa` | `#128C7E` | Khusus tombol WhatsApp (teks putih) |
| `--color-success` | `#15803D` | Status berhasil |
| `--color-warning` | `#B45309` | Status peringatan |
| `--color-error` | `#B91C1C` | Status error, validasi |
| `--color-info` | `#1D4ED8` | Status informasi |

**Kontras minimum:** Semua kombinasi teks-latar diuji ≥ 4.5:1 (WCAG AA).

### Dark Mode

Tidak masuk MVP. Dapat ditambahkan di fase lanjutan.

## 4. Typography

### Font Family

Per PRD Section 13.3 — self-hosted via `next/font`, `display: swap`.

| Peran | Font | Fallback |
|---|---|---|
| Heading | **Plus Jakarta Sans** (600, 700) | Inter, system-ui, sans-serif |
| Body | **Plus Jakarta Sans** (400, 500) | Inter, system-ui, sans-serif |

> Catatan: PRD merekomendasikan Inter atau Plus Jakarta Sans. Dipilih Plus Jakarta Sans untuk karakter yang lebih warmth dan distinctive dibanding Inter, sesuai bisnis jasa yang mengutamakan keramahan. Jika logo resmi menuntut font lain, sesuaikan.

### Type Scale

| Level | Mobile | Desktop | Weight | Line Height |
|---|---|---|---|---|
| H1 | 32px | 48px | 700 | 1.2 |
| H2 | 24px | 32px | 700 | 1.2 |
| H3 | 20px | 24px | 600 | 1.3 |
| Body | 16px | 17px | 400 | 1.6 |
| Body Medium | 16px | 17px | 500 | 1.6 |
| Small | 14px | 14px | 400 | 1.5 |
| Caption | 12px | 12px | 400 | 1.4 |

## 5. Spacing Scale (Tailwind)

4, 8, 12, 16, 24, 32, 48, 64, 96 px.

- Container max: `1200px`
- Gutter mobile: `16px`
- Gutter desktop (≥md): `24px`

## 6. Border Radius

| Elemen | Radius |
|---|---|
| Input, select | 6px (`rounded-md`) |
| Kartu | 12px (`rounded-xl`) |
| Hero, media besar | 16–24px (`rounded-2xl` / `rounded-3xl`) |
| Badge | full (`rounded-full`) |
| Tombol | 8px (`rounded-lg`) |

## 7. Elevation & Shadow

| Level | Penggunaan | Tailwind |
|---|---|---|
| Default | Kartu datar | `shadow-sm` |
| Hover/Fokus | Kartu hover, dropdown | `shadow-md` |
| Modal/Overlay | — | `shadow-lg` (jarang) |

Tidak menggunakan bayangan berat. Pemisahan melalui spacing dan background, bukan shadow.

## 8. Breakpoints

| Token | Lebar | Grid katalog |
|---|---|---|
| `sm` | 640px | 2 kolom |
| `md` | 768px | 2 kolom |
| `lg` | 1024px | 3 kolom |
| `xl` | 1280px | 3 kolom |
| Default (<640) | — | 1 kolom |

## 9. Component Specifications

### 9.1 Buttons

| Varian | Style |
|---|---|
| **Primary** | bg `--color-primary`, text white, h ≥ 44px, rounded-lg |
| **WhatsApp** | bg `--color-wa`, icon message, text white — HANYA untuk aksi WA |
| **Secondary** | border `--color-primary`, text primary, bg transparent |
| **Tertiary** | text + underline on hover |

### 9.2 Vehicle Card

- Rasio foto: 4:3
- Konten: nama, kategori (badge), harga ("Mulai Rp… / hari"), tautan keseluruhan kartu
- Hover: shadow-md + subtle scale (1.01)
- Seluruh kartu clickable (`<Link>` wrapper)

### 9.3 Navbar

- Logo kiri, menu tengah/kanan, CTA WA kanan
- Mobile: hamburger → slide panel, close on Esc/click outside, focus trap
- Sticky on scroll, background solid

### 9.4 Footer

- Identitas, NAP, menu, media sosial, disclaimer harga
- Background: `--color-primary` dengan teks putih/terang

### 9.5 Inputs

- Tinggi: 44px
- Label di atas
- Border: `--color-border`
- Focus: ring 2px `--color-primary`
- Error: border merah + pesan di bawah with `aria-describedby`
- `inputmode` sesuai tipe data

### 9.6 Badge

- "Harga indikatif": bg accent/outline
- Kategori: bg surface, text muted

### 9.7 WhatsApp Floating Button

- Fixed bottom-right
- z-index tinggi tapi tidak menutupi konten interaktif di mobile
- margin bottom mobile: 16px dari edge
- Animasi masuk subtle (fade + slide up)
- Respects `prefers-reduced-motion`

## 10. Interaction States

| State | Perilaku |
|---|---|
| Hover | Perubahan warna/shadow, transition 200ms |
| Focus | Ring 2px visible — JANGAN dihapus |
| Disabled | Opacity 50%, cursor `not-allowed`, `aria-disabled` |
| Loading | Skeleton atau spinner kecil, hanya jika ada operasi async |
| Empty | Ikon + judul + aksi (reset/Request Order) |
| Error | Pesan jelas + aksi pemulihan + warna + ikon (tidak hanya warna) |

## 11. Animation Guidelines

- Durasi: 150–300ms untuk hover/transition, 300–500ms untuk enter/exit
- Easing: `ease-out` untuk masuk, `ease-in` untuk keluar
- **Wajib** respect `prefers-reduced-motion: reduce` — disable all motion
- Tidak ada parallax berat, scroll-jacking, atau animasi yang menghalangi konten
- Touch targets: ≥ 44×44px

## 12. Image Guidelines

- Format: WebP/AVIF via `next/image`
- Kartu: ≤ 300KB setelah kompresi
- Galeri: ≤ 500KB setelah kompresi
- Above-the-fold: `priority` attribute
- Lainnya: lazy loading (default)
- Placeholder: "Foto segera tersedia" text on muted background, BUKAN foto stok
- Alt text: deskriptif dan unik per foto

## 13. Accessibility Requirements (WCAG 2.1 AA)

- HTML semantik (nav, main, section, article, aside, footer)
- Satu `h1` per halaman, hierarki heading berurutan
- Navigasi keyboard penuh — tab order logis
- Focus ring visible pada semua elemen interaktif
- Kontras ≥ 4.5:1 untuk teks normal, ≥ 3:1 untuk teks besar
- Label formulir terhubung (`htmlFor` / `aria-describedby`)
- Alt text bermakna pada gambar
- Skip to main content link
- Touch targets ≥ 44×44px
- `prefers-reduced-motion` support
