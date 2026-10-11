import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getAllVehicles } from "@/lib/vehicles";
import { siteConfig } from "@/config/site";

import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Katalog Armada Rental Mobil Medan — Harga Indikatif Harian",
  description:
    "Daftar 14 kelompok armada rental mobil dengan sopir di Kota Medan dan sekitarnya dari PT. MAULANA SADHA UTAMA. Brio, Avanza, Xpander, Innova Reborn, Zenix, Fortuner, Hiace, dan Alphard.",
  alternates: {
    canonical: "/mobil",
  },
  openGraph: {
    title: `Katalog Armada — ${siteConfig.brandName} Medan`,
    description:
      "Pilihan armada rental mobil terawat tahun 2022 ke atas dengan sopir di Kota Medan dan sekitarnya.",
    url: `${siteConfig.url}/mobil`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Katalog Armada Rental Mobil Medan | ${siteConfig.brandName}`,
    description: "Pilihan armada terawat tahun 2022 ke atas dengan sopir di Kota Medan dan sekitarnya.",
  },
};

function CatalogSkeleton() {
  return (
    <div className="space-y-8 animate-pulse" aria-hidden="true">
      {/* Filter Bar Skeleton */}
      <div className="p-6 sm:p-8 bg-[#F7F4EC] border border-[#E5E0D4] min-h-[160px] rounded-none">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
          <div className="sm:col-span-8 h-11 bg-white/70 border border-[#E5E0D4]" />
          <div className="sm:col-span-4 h-11 bg-white/70 border border-[#E5E0D4]" />
        </div>
        <div className="h-8 bg-white/50 border border-[#E5E0D4] w-2/3" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-[#E5E0D4] p-4 flex flex-col min-h-[380px] rounded-none">
            <div className="aspect-[16/10] bg-[#F7F4EC] mb-4 border border-[#E5E0D4]" />
            <div className="h-5 bg-[#F7F4EC] w-3/4 mb-3" />
            <div className="h-4 bg-[#F7F4EC] w-1/2 mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const vehicles = getAllVehicles();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Beranda", item: "/" },
    { name: "Armada", item: "/mobil" },
  ]);

  return (
    <div className="py-10 sm:py-14">
      <JsonLd data={breadcrumbSchema} />
      <Container>
        {/* Page Header */}
        <SectionHeading
          as="h1"
          eyebrow="Katalog Resmi"
          title="Pilihan Armada Rental Mobil Medan"
          description="Seluruh harga di bawah merupakan estimasi indikatif sewa per hari dengan sopir untuk area Kota Medan dan sekitarnya. Unit terawat tahun 2022 ke atas."
        />

        {/* Interactive Catalog wrapped in Suspense with stable dimension skeleton */}
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogView initialVehicles={vehicles} />
        </Suspense>
      </Container>
    </div>
  );
}
