/**
 * Site Configuration — PT. MAULANA SADHA UTAMA (MUL Rent Car)
 *
 * MANDATORY RULE: WhatsApp number must ONLY be defined here in this file.
 * All other modules must import from siteConfig.whatsapp.
 */

export const siteConfig = {
  name: "PT. MAULANA SADHA UTAMA",
  brandName: "MUL Rent Car",
  tagline: "Sewa Mobil Terpercaya di Medan & Sekitarnya",
  logo: "/images/brand/logo.webp",
  description:
    "Layanan rental mobil terpercaya di Kota Medan dan sekitarnya oleh PT. MAULANA SADHA UTAMA. Menyediakan sewa dengan sopir, lepas kunci, perjalanan dinas korporat, wedding car, dan bus pariwisata.",
  url: "https://mulrentcar.com", // [OQ-09: domain konfirmasi pending]
  whatsapp: {
    // [VERIFIKASI OQ-03]: Nomor sementara yang wajib dikonfirmasi oleh pemilik sebelum peluncuran resmi.
    number: "6281262679533",
    display: "0812 6267 9533",
    isTemporaryVerificationPending: true,
  },
  email: "Mulrentcarindonesia@gmail.com",
  location: {
    city: "Medan",
    region: "Sumatera Utara",
    country: "Indonesia",
    coverageScope: "Kota Medan dan sekitarnya",
  },
  social: {
    // [OQ-12]: URL lengkap akun media sosial menunggu konfirmasi
    instagram: "https://instagram.com/Medanrentalmobilmul",
    tiktok: "https://tiktok.com/@Mulrentcarmedan",
    facebook: "https://facebook.com/JasaSewaMobilMedan",
  },
  navigation: [
    { label: "Beranda", href: "/" },
    { label: "Armada", href: "/mobil" },
    { label: "Layanan", href: "/layanan" },
    { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Kontak", href: "/kontak" },
  ],
  pricingDisclaimer:
    "Harga yang tercantum adalah harga indikatif rental dengan sopir untuk area Kota Medan dan sekitarnya. Harga belum termasuk BBM, tol, parkir, dan akomodasi driver ke luar kota. Tarif dapat berubah saat periode liburan atau permintaan khusus.",
} as const;

export type SiteConfig = typeof siteConfig;
