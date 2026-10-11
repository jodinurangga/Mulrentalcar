import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Container } from "@/components/ui/container";
import { QuoteForm } from "@/components/contact/quote-form";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, createGeneralInquiryMessage } from "@/lib/whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kontak Kami & Permintaan Penawaran",
  description:
    "Hubungi PT. MAULANA SADHA UTAMA (MUL Rent Car) untuk informasi sewa mobil di Medan. WhatsApp 0812 6267 9533, email, dan formulir permintaan penawaran resmi.",
  alternates: {
    canonical: "/kontak",
  },
  openGraph: {
    title: `Kontak Kami | ${siteConfig.brandName} - ${siteConfig.name}`,
    description:
      "Kontak resmi dan formulir penawaran sewa mobil di Kota Medan dan sekitarnya oleh PT. MAULANA SADHA UTAMA.",
    url: `${siteConfig.url}/kontak`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Kontak Kami | ${siteConfig.brandName} - ${siteConfig.name}`,
    description:
      "Hubungi PT. MAULANA SADHA UTAMA (MUL Rent Car) untuk konsultasi dan penawaran sewa mobil di Medan.",
  },
};

export default function ContactPage() {
  const directWaUrl = buildWhatsAppUrl(createGeneralInquiryMessage());

  const breadcrumbItems = [
    { name: "Beranda", item: "/" },
    { name: "Kontak", item: "/kontak" },
  ];

  return (
    <div className="py-12 md:py-20 bg-white">
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#C49A3A] transition-colors">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-300">/</li>
            <li className="text-[#20252B]" aria-current="page">
              Kontak
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A] text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#C49A3A]" />
            Layanan Pelanggan & Konsultasi
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#20252B] tracking-tight leading-[1.15] mb-5">
            Hubungi MUL Rent Car
          </h1>
          <p className="text-base md:text-lg text-[#5A626A] leading-relaxed">
            Butuh informasi ketersediaan unit, rincian biaya sewa, atau konsultasi armada untuk perjalanan dinas dan acara di Medan? Tim kami siap melayani Anda.
          </p>
        </header>

        {/* Main Content Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Card */}
            <div className="bg-[#F7F4EC] border border-[#E5E0D4] p-8 md:p-10 relative">
              <div className="absolute top-0 left-0 w-20 h-1 bg-[#C49A3A]" />
              <h2 className="font-editorial text-2xl font-normal text-[#20252B] tracking-tight mb-6">
                Informasi Kontak Resmi
              </h2>

              <ul className="space-y-6 text-sm">
                {/* WhatsApp */}
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-white border border-[#E5E0D4] text-[#25D366] flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-bold text-neutral-500">WhatsApp Resmi</span>
                    <a
                      href={directWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-[#20252B] hover:text-[#C49A3A] transition-colors"
                    >
                      {siteConfig.whatsapp.display}
                    </a>
                    <p className="text-xs text-[#5A626A] mt-1">
                      Chat langsung untuk respon cepat konsultasi armada
                    </p>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-white border border-[#E5E0D4] text-[#C49A3A] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-bold text-neutral-500">Email Korespondensi</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-[#20252B] hover:text-[#C49A3A] hover:underline break-all"
                    >
                      {siteConfig.email}
                    </a>
                    <p className="text-xs text-[#5A626A] mt-1">
                      Untuk pengiriman surat resmi atau dokumen korporat
                    </p>
                  </div>
                </li>

                {/* Location */}
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-white border border-[#E5E0D4] text-[#C49A3A] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-bold text-neutral-500">Cakupan Wilayah Operasional</span>
                    <span className="text-sm font-semibold text-[#20252B]">
                      {siteConfig.location.city} dan Sekitarnya, {siteConfig.location.region}
                    </span>
                    <p className="text-xs text-[#5A626A] mt-1">
                      Melayani penjemputan bandara, dalam kota Medan, serta rute luar kota Sumatera Utara
                    </p>
                  </div>
                </li>

                {/* Operating Note */}
                <li className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-white border border-[#E5E0D4] text-[#C49A3A] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-bold text-neutral-500">Layanan Konsultasi Chat</span>
                    <span className="text-sm font-semibold text-[#20252B]">
                      Aktif Setiap Hari via WhatsApp
                    </span>
                    <p className="text-xs text-[#5A626A] mt-1">
                      Permintaan dan pertanyaan pelanggan akan direspons secepat mungkin oleh tim admin
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Media Card */}
            <div className="bg-white border border-[#E5E0D4] p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#20252B] mb-5">
                Saluran Media Sosial
              </h2>
              <div className="space-y-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-[#E5E0D4] bg-[#F7F4EC] hover:border-[#C49A3A] transition-colors text-xs font-semibold text-[#20252B]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#20252B] text-white flex items-center justify-center text-[10px] font-bold">
                      IG
                    </span>
                    <span>Instagram (@Medanrentalmobilmul)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                </a>

                <a
                  href={siteConfig.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-[#E5E0D4] bg-[#F7F4EC] hover:border-[#C49A3A] transition-colors text-xs font-semibold text-[#20252B]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#20252B] text-white flex items-center justify-center text-[10px] font-bold">
                      TT
                    </span>
                    <span>TikTok (@Mulrentcarmedan)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                </a>

                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 border border-[#E5E0D4] bg-[#F7F4EC] hover:border-[#C49A3A] transition-colors text-xs font-semibold text-[#20252B]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#20252B] text-white flex items-center justify-center text-[10px] font-bold">
                      FB
                    </span>
                    <span>Facebook (Jasa Sewa Mobil Medan)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Corporate Entity Notice */}
            <div className="p-5 bg-[#F7F4EC] border-l-2 border-[#C49A3A] border border-[#E5E0D4] text-xs text-[#5A626A] flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-[#20252B] block font-semibold mb-1 uppercase tracking-wide">
                  Legalitas Perusahaan Resmi
                </strong>
                Layanan dioperasikan langsung oleh <span className="font-semibold text-[#20252B]">{siteConfig.name}</span>. Invoice resmi dan surat kerja sama tersedia untuk keperluan administrasi korporat.
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form (7 cols) */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
