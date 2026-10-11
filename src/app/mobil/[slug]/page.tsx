import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { VehicleImage } from "@/components/catalog/vehicle-image";
import { VehicleCard } from "@/components/catalog/vehicle-card";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import {
  getAllVehicleSlugs,
  getVehicleBySlug,
  getRelatedVehicles,
} from "@/lib/vehicles";
import { formatIdr } from "@/lib/format";
import { createVehicleInquiryMessage } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema, getVehicleProductSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}


export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllVehicleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "Armada Tidak Ditemukan",
    };
  }

  const priceText = vehicle.price.amountIdr
    ? `${formatIdr(vehicle.price.amountIdr)}/hari`
    : "Berdasarkan Penawaran";

  const title = `Sewa ${vehicle.name} Medan — Harga Indikatif ${priceText}`;
  const description = `Layanan sewa mobil ${vehicle.name} di Kota Medan dan sekitarnya dengan sopir profesional. Armada tahun 2022 ke atas, tarif indikatif ${priceText}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/mobil/${vehicle.slug}`,
    },
    openGraph: {
      title: `Sewa ${vehicle.name} di Medan | ${siteConfig.brandName}`,
      description: `Sewa mobil ${vehicle.name} dengan sopir terpercaya di Medan. Hubungi PT. MAULANA SADHA UTAMA untuk ketersediaan.`,
      url: `${siteConfig.url}/mobil/${vehicle.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Sewa ${vehicle.name} di Medan | ${siteConfig.brandName}`,
      description: `Sewa mobil ${vehicle.name} dengan sopir terpercaya di Medan. Hubungi PT. MAULANA SADHA UTAMA.`,
    },
  };
}

const categoryLabels: Record<string, string> = {
  "city-car": "City Car",
  mpv: "MPV",
  suv: "SUV",
  van: "Van / Minibus",
  premium: "Premium",
};

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const categoryLabel = categoryLabels[vehicle.category] || vehicle.category.toUpperCase();
  const priceFormatted = formatIdr(vehicle.price.amountIdr);
  const isGrouped = vehicle.name.includes("/");
  const relatedVehicles = getRelatedVehicles(vehicle.slug, 3);
  const waInquiryMessage = createVehicleInquiryMessage(vehicle);

  const breadcrumbItems = [
    { name: "Beranda", item: "/" },
    { name: "Armada", item: "/mobil" },
    { name: vehicle.name, item: `/mobil/${vehicle.slug}` },
  ];

  return (
    <div className="py-8 sm:py-14">
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={getVehicleProductSchema(vehicle)} />
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5A626A]">
            <li>
              <Link href="/" className="hover:text-[#9B7627] transition-colors">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#C49A3A]">/</li>
            <li>
              <Link href="/mobil" className="hover:text-[#9B7627] transition-colors">
                Armada
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#C49A3A]">/</li>
            <li className="font-semibold text-[#20252B]" aria-current="page">
              {vehicle.name}
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/mobil"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#20252B] hover:text-[#9B7627] underline underline-offset-6 decoration-[#C49A3A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Kembali ke Katalog Armada</span>
          </Link>
        </div>

        {/* Main Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16">
          {/* Left Column: Vehicle Image & Badges */}
          <div className="lg:col-span-7 space-y-6">
            <VehicleImage
              images={vehicle.images}
              vehicleName={vehicle.name}
              priority
              className="rounded-none shadow-sm"
            />

            {/* Photo & Model Clarification Banner */}
            <div className="p-5 bg-[#F7F4EC] border border-[#E5E0D4] rounded-none text-xs text-[#5A626A] space-y-3">
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#9B7627] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">
                  Seluruh unit armada operasional PT. MAULANA SADHA UTAMA adalah kendaraan terawat tahun <strong>2022 ke atas</strong>.
                </p>
              </div>
              {isGrouped && (
                <div className="flex items-start gap-2.5 pt-3 border-t border-[#E5E0D4]">
                  <AlertCircle className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="leading-relaxed">
                    <strong>Grup Model Gabungan:</strong> Unit yang disediakan dapat berupa salah satu model dalam kelompok <em>{vehicle.name}</em>, disesuaikan dengan jadwal dan ketersediaan unit saat pemesanan.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pricing, Overview, & CTAs */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              {/* Category & Tag */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="category">{categoryLabel}</Badge>
                {vehicle.yearNote && (
                  <span className="text-xs font-semibold text-[#7A5817] uppercase tracking-wider">
                    {vehicle.yearNote}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium text-[#20252B] tracking-tight leading-[1.15]">
                {vehicle.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="relative p-6 sm:p-7 bg-[#F7F4EC] border border-[#E5E0D4] rounded-none shadow-2xs space-y-3">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7A5817] block">
                Estimasi Harga Rental
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#20252B] tracking-tight">
                  {priceFormatted}
                </span>
                <span className="text-sm font-medium text-[#5A626A]">/ hari</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="indicative">Termasuk Sopir</Badge>
                <Badge variant="default">Area Medan &amp; Sekitarnya</Badge>
              </div>
              <p className="text-[11px] text-[#5A626A] pt-3 border-t border-[#E5E0D4] leading-relaxed">
                *Harga di atas adalah tarif indikatif harian dalam kota. Tarif dapat berubah saat hari libur nasional atau rute khusus.
              </p>
            </div>

            {/* Inclusions & Terms */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-[#20252B] uppercase tracking-widest">
                Ketentuan Layanan Sewa:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#5A626A]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">Sopir ramah, rapi, dan memahami rute Medan serta Sumatera Utara</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">Kondisi mobil prima, bersih, dan AC dingin terawat</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">Belum termasuk: BBM, tol, parkir, dan makan/akomodasi sopir jika luar kota</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">Untuk sewa korporat / instansi, harga dasar belum termasuk PPN/PPh</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="pt-3 space-y-3">
              <WhatsAppButton
                message={waInquiryMessage}
                size="lg"
                isFullWidth
              >
                Tanyakan Ketersediaan via WhatsApp
              </WhatsAppButton>

              <p className="text-[11px] text-center text-[#5A626A] leading-relaxed font-normal">
                Pesan akan otomatis disusun di WhatsApp. Konfirmasi jadwal diproses langsung oleh admin operasional kami.
              </p>
            </div>
          </div>
        </div>

        {/* Related Vehicles Section */}
        {relatedVehicles.length > 0 && (
          <section className="pt-14 border-t border-[#E5E0D4]">
            <div className="mb-8">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight">
                Pilihan Armada Lainnya
              </h2>
              <p className="text-sm text-[#5A626A] mt-1 font-normal">
                Armada sejenis yang mungkin sesuai dengan kebutuhan perjalanan Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedVehicles.map((relVehicle) => (
                <VehicleCard key={relVehicle.id} vehicle={relVehicle} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
