import { siteConfig } from "@/config/site";
import type { Vehicle } from "@/data/vehicles";

/**
 * Generate safe, verified JSON-LD structured data.
 * Adheres strictly to PRD Section 14 and anti-fabrication guidelines:
 * - Only verified business information
 * - No fake ratings, reviews, street addresses, or operating hours
 */

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "LocalBusiness"],
    name: siteConfig.name,
    alternateName: siteConfig.brandName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    telephone: `+${siteConfig.whatsapp.number}`,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: "ID",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.location.coverageScope,
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
      siteConfig.social.facebook,
    ],
  };
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http") ? crumb.item : `${siteConfig.url}${crumb.item}`,
    })),
  };
}

export function getVehicleProductSchema(vehicle: Vehicle) {
  const price = vehicle.price.amountIdr;
  const url = `${siteConfig.url}/mobil/${vehicle.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Sewa ${vehicle.name} Medan`,
    description: `Layanan rental mobil ${vehicle.name} dengan sopir di Kota Medan dan sekitarnya dari PT. MAULANA SADHA UTAMA. Unit prima tahun 2022 ke atas.`,
    category: "Rental Mobil",
    brand: {
      "@type": "Brand",
      name: siteConfig.brandName,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "IDR",
      price: price ?? 0,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      description: price
        ? `Tarif indikatif harian sewa dengan sopir area Medan dan sekitarnya: Rp${price.toLocaleString("id-ID")}`
        : "Tarif sewa berdasarkan penawaran khusus.",
    },
  };
}
