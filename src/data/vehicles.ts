import { z } from "zod";

/**
 * Vehicle Data Types and Zod Schema
 * Source: PRD Section 14.1, 14.2, 14.3
 */

export const VehicleCategorySchema = z.enum([
  "city-car",
  "mpv",
  "suv",
  "van",
  "premium",
]);
export type VehicleCategory = z.infer<typeof VehicleCategorySchema>;

export const RentalServiceSchema = z.enum([
  "with-driver",
  "self-drive",
  "corporate",
  "wedding",
  "tour",
  "request-order",
]);
export type RentalService = z.infer<typeof RentalServiceSchema>;

export const PriceModeSchema = z.enum(["indicative", "quote"]);
export type PriceMode = z.infer<typeof PriceModeSchema>;

export const VehiclePriceSchema = z.object({
  amountIdr: z.number().int().positive().nullable(),
  unit: z.literal("per-day"),
  scope: z.literal("Kota Medan dan sekitarnya"),
  mode: PriceModeSchema,
  includesDriver: z.literal(true),
});
export type VehiclePrice = z.infer<typeof VehiclePriceSchema>;

export const VehicleImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});
export type VehicleImage = z.infer<typeof VehicleImageSchema>;

export const VehicleSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: z.string().min(1),
  category: VehicleCategorySchema,
  services: z.array(RentalServiceSchema).min(1),
  yearNote: z.string().optional(),
  price: VehiclePriceSchema,
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  images: z.array(VehicleImageSchema),
  published: z.boolean(),
  featured: z.boolean(),
  order: z.number().int(),
});
export type Vehicle = z.infer<typeof VehicleSchema>;

/**
 * 14 Armada Awal PT. MAULANA SADHA UTAMA (Single Source of Truth)
 * Sesuai PRD Section 14.3.
 *
 * CATATAN INTEGRITAS DATA:
 * - Harga rental dengan sopir, Kota Medan dan sekitarnya, indikatif, per hari.
 * - Tidak ada data kapasitas kursi (seats), transmisi, atau spesifikasi buatan.
 * - Foto belum tersedia dari perusahaan, ditandai sebagai kebutuhan aset (array kosong).
 */
export const rawVehiclesData: Vehicle[] = [
  {
    id: "veh-brio-agya",
    slug: "brio-agya",
    name: "Brio / Agya",
    category: "city-car",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 550000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/brio-agya.webp",
        alt: "Foto referensi model Honda Brio RS (2023). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: false,
    order: 10,
  },
  {
    id: "veh-avanza-xenia",
    slug: "avanza-xenia",
    name: "Avanza / Xenia",
    category: "mpv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 600000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/avanza-xenia.webp",
        alt: "Foto referensi model Toyota Avanza G (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: true,
    order: 20,
  },
  {
    id: "veh-rocky-raize",
    slug: "rocky-raize",
    name: "Rocky / Raize",
    category: "suv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 600000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/rocky-raize.webp",
        alt: "Foto referensi model Toyota Raize Turbo (2021). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: false,
    order: 30,
  },
  {
    id: "veh-xpander",
    slug: "xpander",
    name: "Xpander",
    category: "mpv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 650000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/xpander.webp",
        alt: "Foto referensi model Mitsubishi Xpander Ultimate facelift (2021). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: true,
    order: 40,
  },
  {
    id: "veh-rush-terios",
    slug: "rush-terios",
    name: "Rush / Terios",
    category: "suv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 650000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/rush-terios.webp",
        alt: "Foto referensi model Toyota Rush GR Sport (2024). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: false,
    order: 50,
  },
  {
    id: "veh-honda-brv",
    slug: "honda-brv",
    name: "Honda BR-V",
    category: "suv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 650000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/honda-brv.webp",
        alt: "Foto referensi model Honda BR-V Prestige Sensing (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: false,
    order: 60,
  },
  {
    id: "veh-innova-reborn-diesel",
    slug: "innova-reborn-diesel",
    name: "Innova Reborn Diesel",
    category: "mpv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 750000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/innova-reborn-diesel.webp",
        alt: "Foto referensi model Toyota Kijang Innova Reborn 2.4 G Diesel (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: true,
    order: 70,
  },
  {
    id: "veh-innova-zenix-g",
    slug: "innova-zenix-g",
    name: "Innova Zenix G",
    category: "mpv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 800000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/innova-zenix-g.webp",
        alt: "Foto referensi model Toyota Kijang Innova Zenix 2.0 G (2023). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: true,
    order: 80,
  },
  {
    id: "veh-innova-zenix-q-sunroof",
    slug: "innova-zenix-q-sunroof",
    name: "Innova Zenix Q Sunroof",
    category: "mpv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 1100000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/innova-zenix-q-sunroof.webp",
        alt: "Foto referensi model Toyota Kijang Innova Zenix 2.0 Q Hybrid (2023). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: false,
    order: 90,
  },
  {
    id: "veh-fortuner-gr-pajero",
    slug: "fortuner-gr-pajero",
    name: "Fortuner GR / Pajero",
    category: "suv",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 1100000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/fortuner-gr-pajero.webp",
        alt: "Foto referensi model Toyota Fortuner 2.8 VRZ GR Sport (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: true,
    order: 100,
  },
  {
    id: "veh-hiace-commuter",
    slug: "hiace-commuter",
    name: "Hiace Commuter",
    category: "van",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 1300000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/hiace-commuter.webp",
        alt: "Foto referensi model Toyota HiAce 3.0 Commuter (2022). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: true,
    order: 110,
  },
  {
    id: "veh-hiace-premio",
    slug: "hiace-premio",
    name: "Hiace Premio",
    category: "van",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 1400000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/hiace-premio.webp",
        alt: "Foto referensi model Toyota HiAce Premio 2.8 (2019). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: false,
    order: 120,
  },
  {
    id: "veh-hiace-luxury",
    slug: "hiace-luxury",
    name: "Hiace Luxury",
    category: "van",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 2500000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [],
    published: true,
    featured: false,
    order: 130,
  },
  {
    id: "veh-alphard",
    slug: "alphard",
    name: "Alphard",
    category: "premium",
    services: ["with-driver"],
    yearNote: "Tahun 2022 ke atas",
    price: {
      amountIdr: 2500000,
      unit: "per-day",
      scope: "Kota Medan dan sekitarnya",
      mode: "indicative",
      includesDriver: true,
    },
    images: [
      {
        src: "/images/vehicles/alphard.webp",
        alt: "Foto referensi model Toyota Alphard Hybrid AH40 (2023). Unit aktual armada PT. MAULANA SADHA UTAMA dikonfirmasi saat pemesanan.",
      },
    ],
    published: true,
    featured: true,
    order: 140,
  },
];

// Validate vehicles array against schema
export const vehiclesData: Vehicle[] = z
  .array(VehicleSchema)
  .parse(rawVehiclesData);
