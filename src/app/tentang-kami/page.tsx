import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  Building2,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { siteConfig } from "@/config/site";
import { createGeneralInquiryMessage } from "@/lib/whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Tentang Kami — Profil Perusahaan & Visi Misi",
  description:
    "Profil resmi PT. MAULANA SADHA UTAMA (MUL Rent Car), penyedia layanan sewa mobil terpercaya di Medan. Visi, misi, dan komitmen layanan transportasi profesional.",
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: `Tentang Kami | ${siteConfig.brandName} - ${siteConfig.name}`,
    description:
      "Profil resmi PT. MAULANA SADHA UTAMA (MUL Rent Car), penyedia sewa mobil terpercaya di Kota Medan dan sekitarnya.",
    url: `${siteConfig.url}/tentang-kami`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Tentang Kami | ${siteConfig.brandName} - ${siteConfig.name}`,
    description:
      "Profil resmi PT. MAULANA SADHA UTAMA (MUL Rent Car), penyedia layanan rental mobil terpercaya di Medan.",
  },
};

export default function AboutPage() {
  const waMessage = createGeneralInquiryMessage();

  const breadcrumbItems = [
    { name: "Beranda", item: "/" },
    { name: "Tentang Kami", item: "/tentang-kami" },
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
              Tentang Kami
            </li>
          </ol>
        </nav>

        {/* Hero / Header Section */}
        <header className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A] text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#C49A3A]" />
            Profil Resmi Perusahaan
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#20252B] tracking-tight leading-[1.15] mb-6">
            Solusi Transportasi Tepercaya di Medan
          </h1>
          <p className="text-base md:text-lg text-[#5A626A] leading-relaxed max-w-3xl">
            <strong className="text-[#20252B] font-semibold">{siteConfig.name}</strong> dengan merek layanan{" "}
            <strong className="text-[#20252B] font-semibold">{siteConfig.brandName}</strong> hadir sebagai mitra terpercaya dalam menyediakan layanan rental mobil profesional di Kota Medan dan wilayah sekitarnya.
          </p>
        </header>

        {/* Section: Profil & Latar Belakang */}
        <section className="mb-20 bg-[#F7F4EC] border border-[#E5E0D4] p-8 md:p-12 lg:p-14 relative">
          <div className="absolute top-0 left-0 w-24 h-1 bg-[#C49A3A]" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden bg-white shadow-2xs border border-[#E5E0D4] p-1">
                  <Image
                    src={siteConfig.logo}
                    alt="Logo Resmi PT. MAULANA SADHA UTAMA (MUL Rent Car)"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-full"
                    unoptimized
                  />
                </div>
                <div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#20252B]">
                    Tentang PT. MAULANA SADHA UTAMA
                  </h2>
                  <p className="text-xs font-semibold text-[#7A5817] tracking-wider uppercase mt-1">
                    Merek Layanan: {siteConfig.brandName}
                  </p>
                </div>
              </div>
              <p className="text-[#5A626A] leading-relaxed text-sm md:text-base">
                Didirikan dengan komitmen untuk menghadirkan standar kenyamanan dan keselamatan perjalanan terbaik, kami melayani berbagai kebutuhan transportasi darat mulai dari perjalanan pribadi, liburan keluarga, perjalanan dinas, hingga kebutuhan operasional instansi dan korporasi.
              </p>
              <p className="text-[#5A626A] leading-relaxed text-sm md:text-base">
                Fokus utama kami adalah memberikan armada kendaraan yang terawat, pengemudi profesional yang ramah dan menguasai rute jalanan Sumatera Utara, serta keterbukaan tarif tanpa biaya tak terduga.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5E0D4] font-semibold text-[#20252B]">
                  <Building2 className="w-4 h-4 text-[#C49A3A]" aria-hidden="true" />
                  Badan Hukum PT Resmi
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5E0D4] font-semibold text-[#20252B]">
                  <Compass className="w-4 h-4 text-[#C49A3A]" aria-hidden="true" />
                  Operasional Medan & Sekitarnya
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#20252B] text-white p-8 border-t-2 border-[#C49A3A] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-[#C49A3A] font-bold">
                  Pernyataan Resmi Perusahaan
                </h3>
              </div>
              <ul className="space-y-4 text-sm text-neutral-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white block font-semibold">Pengalaman Lebih dari 5 Tahun:</strong>
                    Telah melayani kebutuhan perjalanan dinas, wisata, dan persewaan kendaraan di Medan.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white block font-semibold">Jaringan di 38 Provinsi:</strong>
                    Didukung kemitraan penyedia transportasi antar-wilayah di seluruh Indonesia.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-white block font-semibold">Armada Tahun 2022 ke Atas:</strong>
                    Seluruh unit armada dirawat secara berkala demi menjamin kenyamanan maksimal.
                  </div>
                </li>
              </ul>
              <p className="text-[11px] text-neutral-400 pt-3 border-t border-white/10 italic">
                * Keterangan di atas merupakan pernyataan resmi dari manajemen PT. Maulana Sadha Utama.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Visi & Misi Resmi */}
        <section className="mb-20">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C49A3A] mb-3">
              <span className="w-6 h-px bg-[#C49A3A]" />
              Fondasi Perusahaan
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#20252B] mb-4">
              Visi & Misi Perusahaan
            </h2>
            <p className="text-sm md:text-base text-[#5A626A]">
              Landasan nilai dan arah strategis PT. MAULANA SADHA UTAMA dalam memberikan layanan transportasi darat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Visi */}
            <div className="lg:col-span-5 bg-[#20252B] text-white p-8 md:p-10 border-t-2 border-[#C49A3A] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#C49A3A] mb-6">
                  <Award className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-editorial text-2xl font-normal mb-4 tracking-tight text-white">Visi Perusahaan</h3>
                <blockquote className="text-neutral-300 text-sm md:text-base leading-relaxed italic border-l-2 border-[#C49A3A] pl-5 my-6 font-serif">
                  &ldquo;Memberikan servis terbaik kepada pelanggan, menjadi perusahaan transportasi terdepan, menjadi mitra kerja yang dapat diandalkan sekarang maupun di masa depan, dan menjadi andalan dalam melayani perjalanan di berbagai kota di Indonesia.&rdquo;
                </blockquote>
              </div>
              <p className="text-xs text-neutral-400 pt-4 border-t border-white/10 tracking-wider uppercase font-semibold">
                Dokumen Resmi PT. MAULANA SADHA UTAMA
              </p>
            </div>

            {/* Misi */}
            <div className="lg:col-span-7 bg-white border border-[#E5E0D4] p-8 md:p-10">
              <div className="w-12 h-12 bg-[#F7F4EC] border border-[#E5E0D4] flex items-center justify-center text-[#C49A3A] mb-6">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-2xl font-normal text-[#20252B] mb-6 tracking-tight">
                Misi Perusahaan
              </h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-4 p-5 bg-[#F7F4EC] border border-[#E5E0D4]">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#20252B] text-[#C49A3A] text-xs font-bold shrink-0">
                    01
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#20252B] mb-1.5 uppercase tracking-wide">
                      Memberikan Solusi Transportasi kepada Mitra
                    </h4>
                    <p className="text-xs md:text-sm text-[#5A626A] leading-relaxed">
                      Menghadirkan layanan transportasi yang adaptif, tepat waktu, dan andal untuk memenuhi kebutuhan mobilitas mitra perorangan maupun korporat.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-5 bg-[#F7F4EC] border border-[#E5E0D4]">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#20252B] text-[#C49A3A] text-xs font-bold shrink-0">
                    02
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#20252B] mb-1.5 uppercase tracking-wide">
                      Menyediakan Kendaraan Optimal dan Terbaru
                    </h4>
                    <p className="text-xs md:text-sm text-[#5A626A] leading-relaxed">
                      Selalu berupaya menyediakan armada prima tahun 2022 ke atas dengan standar kebersihan, perawatan mekanis rutin, dan keamanan terjamin.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 p-5 bg-[#F7F4EC] border border-[#E5E0D4]">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#20252B] text-[#C49A3A] text-xs font-bold shrink-0">
                    03
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#20252B] mb-1.5 uppercase tracking-wide">
                      Membangun Kinerja yang Memuaskan untuk Penyewa
                    </h4>
                    <p className="text-xs md:text-sm text-[#5A626A] leading-relaxed">
                      Memberikan pelayanan ramah, komunikasi responsif, serta etika berkendara profesional demi terciptanya kepuasan jangka panjang.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section: Siapa yang Kami Layani */}
        <section className="mb-20">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C49A3A] mb-3">
              <span className="w-6 h-px bg-[#C49A3A]" />
              Portofolio Layanan
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#20252B] mb-3">
              Mitra & Segmen Layanan
            </h2>
            <p className="text-sm md:text-base text-[#5A626A]">
              Kami siap melayani kebutuhan beragam pelanggan dengan pendekatan profesional dan fleksibel:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-[#E5E0D4] relative hover:border-[#C49A3A] transition-colors group">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#C49A3A] opacity-0 group-hover:opacity-100 transition-opacity" />
              <Users className="w-8 h-8 text-[#C49A3A] mb-5" aria-hidden="true" />
              <h3 className="font-bold text-[#20252B] text-base mb-2">Korporasi & Instansi</h3>
              <p className="text-xs md:text-sm text-[#5A626A] leading-relaxed">
                Kunjungan kerja dinas, operasional bulanan pejabat/staf, dan tamu perusahaan dengan kelengkapan penawaran resmi.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E0D4] relative hover:border-[#C49A3A] transition-colors group">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#C49A3A] opacity-0 group-hover:opacity-100 transition-opacity" />
              <Building2 className="w-8 h-8 text-[#C49A3A] mb-5" aria-hidden="true" />
              <h3 className="font-bold text-neutral-900 text-base mb-2">Perhotelan & Perbankan</h3>
              <p className="text-xs md:text-sm text-[#5A626A] leading-relaxed">
                Antar jemput tamu VIP, delegasi rapat, dan kebutuhan mobilitas rekanan bisnis dengan standar pelayanan tinggi.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E0D4] relative hover:border-[#C49A3A] transition-colors group">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#C49A3A] opacity-0 group-hover:opacity-100 transition-opacity" />
              <Compass className="w-8 h-8 text-[#C49A3A] mb-5" aria-hidden="true" />
              <h3 className="font-bold text-neutral-900 text-base mb-2">Event Organizer & Travel</h3>
              <p className="text-xs md:text-sm text-[#5A626A] leading-relaxed">
                Dukungan armada rombongan Hiace dan bus pariwisata untuk tur wisata, konser, pameran, serta acara khusus di Medan.
              </p>
            </div>
          </div>
        </section>

        {/* Section: CTA Bar */}
        <section className="bg-[#20252B] text-white p-10 md:p-14 border-t-2 border-[#C49A3A] text-center relative">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-white">
              Siap Melakukan Perjalanan Bersama Kami?
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              Konsultasikan jadwal perjalanan, rute tujuan, dan tipe kendaraan yang Anda butuhkan. Tim admin kami siap membantu memberikan penawaran terbaik.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <WhatsAppButton
                message={waMessage}
                text="Konsultasi via WhatsApp"
                size="lg"
                className="w-full sm:w-auto rounded-none bg-[#25D366] hover:bg-[#20ba59] text-white font-bold tracking-wide"
              />
              <Link
                href="/mobil"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-600 text-white font-medium hover:border-[#C49A3A] hover:text-[#C49A3A] transition-colors text-sm uppercase tracking-wider"
              >
                Lihat Semua Armada
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
