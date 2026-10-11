import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Car,
  UserCheck,
  Building2,
  Heart,
  Bus,
  Sparkles,
  PhoneCall,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { VehicleCard } from "@/components/catalog/vehicle-card";
import { getFeaturedVehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Sewa Mobil Medan | ${siteConfig.name}`,
  description:
    "Layanan sewa mobil terpercaya di Kota Medan dan sekitarnya oleh PT. MAULANA SADHA UTAMA. Menyediakan sewa dengan sopir, lepas kunci, dinas korporat, Hiace, dan armada tahun 2022 ke atas.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.brandName} — Sewa Mobil Medan Terpercaya`,
    description:
      "Layanan rental mobil dengan sopir dan lepas kunci di Medan oleh PT. MAULANA SADHA UTAMA. Armada terawat tahun 2022 ke atas.",
    url: siteConfig.url,
  },
};

const SERVICES_SUMMARY = [
  {
    icon: UserCheck,
    title: "Sewa dengan Sopir",
    desc: "Layanan sewa harian dengan sopir berpengalaman, ramah, dan menguasai rute Medan serta Sumatera Utara.",
    href: "/layanan#dengan-sopir",
    tag: "Paling Populer",
  },
  {
    icon: Car,
    title: "Sewa Lepas Kunci",
    desc: "Fleksibilitas mengemudi sendiri untuk kebutuhan personal atau keluarga dengan verifikasi persyaratan resmi.",
    href: "/layanan#lepas-kunci",
    tag: "Penawaran Khusus",
  },
  {
    icon: Building2,
    title: "Perjalanan Dinas & Korporat",
    desc: "Solusi transportasi terpercaya untuk tamu instansi, kementerian, BUMN, perbankan, dan perusahaan swasta.",
    href: "/layanan#perjalanan-dinas",
    tag: "Kontrak & Harian",
  },
  {
    icon: Heart,
    title: "Wedding Car & Acara",
    desc: "Armada premium dengan dekorasi elegan untuk mendampingi momen istimewa pernikahan Anda di Medan.",
    href: "/layanan#wedding-car",
    tag: "Armada Premium",
  },
  {
    icon: Bus,
    title: "Rental Hiace & Minibus",
    desc: "Kenyamanan kapasitas rombongan keluarga atau studi banding dengan unit Hiace Commuter, Premio, dan Luxury.",
    href: "/layanan#rental-hiace",
    tag: "Rombongan Nyaman",
  },
  {
    icon: Bus,
    title: "Bus Pariwisata",
    desc: "Pilihan medium bus hingga big bus untuk tour wisata Danau Toba, Berastagi, ziarah, dan acara besar.",
    href: "/layanan#bus-pariwisata",
    tag: "Kapasitas Besar",
  },
  {
    icon: Sparkles,
    title: "Request Order Khusus",
    desc: "Permintaan armada spesifik di luar daftar katalog untuk memenuhi kebutuhan dan spesifikasi eksklusif Anda.",
    href: "/layanan#request-order",
    tag: "Kustom Sesuai Kebutuhan",
  },
];

const ORDER_STEPS = [
  {
    step: "01",
    title: "Pilih Armada atau Layanan",
    desc: "Jelajahi 14 pilihan armada dan layanan sewa yang sesuai dengan kebutuhan perjalanan dan jumlah rombongan Anda.",
  },
  {
    step: "02",
    title: "Konsultasi via WhatsApp",
    desc: "Hubungi tim operasional kami lewat WhatsApp dengan pesan yang telah disusun rapi mencakup tanggal dan rute tujuan.",
  },
  {
    step: "03",
    title: "Konfirmasi & Unit Disiapkan",
    desc: "Admin kami memverifikasi ketersediaan jadwal serta detail penawaran. Armada siap mengantar perjalanan Anda.",
  },
];

export default function HomePage() {
  const featuredVehicles = getFeaturedVehicles();

  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-12">
      {/* 1. Hero Section — Asymmetric 12-Column Editorial Composition */}
      <section className="relative overflow-hidden pt-4 sm:pt-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: 7 Cols — Editorial Narrative & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F4EC] border border-[#C49A3A]/40 text-[#7A5817] text-xs font-semibold uppercase tracking-widest">
                <span className="w-2 h-2 bg-[#C49A3A] inline-block" aria-hidden="true" />
                <span>{siteConfig.name}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal sm:font-medium tracking-tight text-[#20252B] leading-[1.12]">
                Sewa Mobil di Medan — Dengan Sopir &amp; Lepas Kunci
              </h1>

              <div className="w-16 h-[2px] bg-[#C49A3A]" aria-hidden="true" />

              <p className="text-base sm:text-lg text-[#5A626A] leading-relaxed max-w-2xl font-normal">
                Layanan transportasi andalan di Kota Medan dan sekitarnya. Menyediakan armada terawat tahun 2022 ke atas untuk perjalanan dinas korporat, wisata keluarga, acara pernikahan, dan tour rombongan.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button href="/mobil" size="lg" className="gap-2">
                  <span>Lihat Katalog Armada</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
                <WhatsAppButton
                  size="lg"
                  message="Halo PT. MAULANA SADHA UTAMA, saya ingin konsultasi sewa mobil di Medan."
                >
                  Konsultasi WhatsApp
                </WhatsAppButton>
              </div>

              {/* Verified Trust Highlights */}
              <div className="pt-8 border-t border-[#E5E0D4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#5A626A]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
                  <span className="font-medium text-[#20252B]">Unit tahun 2022 ke atas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
                  <span className="font-medium text-[#20252B]">Sopir ramah &amp; berpengalaman</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" aria-hidden="true" />
                  <span className="font-medium text-[#20252B]">Badan usaha resmi terpercaya</span>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Cols — Editorial Luxury Vignette Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#F7F4EC] border border-[#E5E0D4] p-6 sm:p-8 card-3d">
                {/* Hairline Accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />

                <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D4]">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7A5817] block">
                      Executive Fleet
                    </span>
                    <h2 className="font-editorial text-lg font-bold text-[#20252B]">
                      Standar Transportasi Eksekutif
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-[#E5E0D4] text-[#20252B]">
                    Medan &amp; Sumut
                  </span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="p-4 bg-white border border-[#E5E0D4] flex items-center justify-between gap-3">
                    <div>
                      <p className="font-editorial text-base font-bold text-[#20252B]">Toyota Alphard</p>
                      <p className="text-xs text-[#5A626A]">VIP Delegation &amp; Wedding</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#5A626A] block">Indikatif</span>
                      <span className="font-editorial text-sm font-bold text-[#20252B]">Rp2.500.000</span>
                      <span className="text-[10px] text-[#5A626A]"> / hari</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-[#E5E0D4] flex items-center justify-between gap-3">
                    <div>
                      <p className="font-editorial text-base font-bold text-[#20252B]">Innova Zenix &amp; Reborn</p>
                      <p className="text-xs text-[#5A626A]">Dinas Korporat &amp; Bisnis</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#5A626A] block">Mulai</span>
                      <span className="font-editorial text-sm font-bold text-[#20252B]">Rp750.000</span>
                      <span className="text-[10px] text-[#5A626A]"> / hari</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-[#E5E0D4] flex items-center justify-between gap-3">
                    <div>
                      <p className="font-editorial text-base font-bold text-[#20252B]">Toyota Hiace Premio</p>
                      <p className="text-xs text-[#5A626A]">Rombongan &amp; Tamu Wisata</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#5A626A] block">Mulai</span>
                      <span className="font-editorial text-sm font-bold text-[#20252B]">Rp1.300.000</span>
                      <span className="text-[10px] text-[#5A626A]"> / hari</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E0D4] flex items-center justify-between">
                  <span className="text-xs text-[#5A626A]">14 Pilihan Kelompok Armada</span>
                  <Link
                    href="/mobil"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#20252B] hover:text-[#9B7627] transition-colors"
                  >
                    <span>Eksplorasi Katalog</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Services Summary Section — Editorial Luxury Layout */}
      <section className="bg-[#F7F4EC] py-16 sm:py-24 border-y border-[#E5E0D4]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              eyebrow="Layanan Unggulan"
              title="Solusi Transportasi Lengkap di Medan"
              description="Menyediakan berbagai opsi rental fleksibel yang dirancang khusus untuk kenyamanan setiap kebutuhan perjalanan Anda."
              className="mb-0"
            />
            <Link
              href="/layanan"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#20252B] hover:text-[#9B7627] underline underline-offset-6 decoration-[#C49A3A] shrink-0 transition-colors"
            >
              <span>Pelajari detail seluruh layanan</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_SUMMARY.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="p-7 bg-white border border-[#E5E0D4] rounded-none card-3d flex flex-col justify-between hover:border-[#C49A3A] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="w-12 h-12 rounded-none bg-[#20252B] text-[#C49A3A] flex items-center justify-center border border-[#20252B]">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A5817] bg-[#F7F4EC] px-2.5 py-1 border border-[#C49A3A]/40">
                        {svc.tag}
                      </span>
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#20252B] mb-2.5">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-[#5A626A] leading-relaxed mb-6 font-normal">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E5E0D4]">
                    <Link
                      href={svc.href}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#20252B] hover:text-[#9B7627] transition-colors"
                    >
                      <span>Lihat selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Featured Fleet Section */}
      <section>
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <SectionHeading
              eyebrow="Armada Pilihan"
              title="Kendaraan Populer &amp; Terfavorit"
              description="Pilihan mobil terawat dengan harga indikatif sewa per hari dengan sopir untuk area Kota Medan dan sekitarnya."
              className="mb-0"
            />
            <Link
              href="/mobil"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#20252B] hover:text-[#9B7627] underline underline-offset-6 decoration-[#C49A3A] shrink-0 transition-colors"
            >
              <span>Lihat semua 14 armada</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredVehicles.slice(0, 6).map((vehicle, idx) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                priorityImage={idx === 0}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Why Us Section — Editorial Assurance */}
      <section className="bg-[#F7F4EC] py-16 sm:py-24 border-y border-[#E5E0D4]">
        <Container>
          <SectionHeading
            eyebrow="Mengapa Memilih Kami"
            title="Komitmen Pelayanan PT. MAULANA SADHA UTAMA"
            description="Membangun kepercayaan pelanggan melalui transparansi layanan, armada terawat, dan integritas profesional."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
            <div className="p-8 bg-white border border-[#E5E0D4] rounded-none space-y-4 text-center card-3d">
              <div className="w-13 h-13 rounded-none bg-[#F7F4EC] text-[#7A5817] border border-[#C49A3A]/40 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#20252B]">
                Legalitas Badan Usaha Resmi
              </h3>
              <p className="text-sm text-[#5A626A] leading-relaxed font-normal">
                PT. MAULANA SADHA UTAMA adalah perusahaan berbadan hukum sah yang melayani kebutuhan sewa perorangan, korporat swasta, dan instansi kedinasan.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E0D4] rounded-none space-y-4 text-center card-3d">
              <div className="w-13 h-13 rounded-none bg-[#F7F4EC] text-[#7A5817] border border-[#C49A3A]/40 flex items-center justify-center mx-auto">
                <Car className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#20252B]">
                Armada Terawat Tahun 2022+
              </h3>
              <p className="text-sm text-[#5A626A] leading-relaxed font-normal">
                Seluruh kendaraan operasional dinyatakan tahun 2022 ke atas, menjalani perawatan berkala, serta bersih dan nyaman sebelum diserahkan kepada penyewa.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E0D4] rounded-none space-y-4 text-center card-3d">
              <div className="w-13 h-13 rounded-none bg-[#F7F4EC] text-[#7A5817] border border-[#C49A3A]/40 flex items-center justify-center mx-auto">
                <UserCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#20252B]">
                Sopir Ramah &amp; Profesional
              </h3>
              <p className="text-sm text-[#5A626A] leading-relaxed font-normal">
                Pengemudi kami berpenampilan rapi, berpengalaman mengemudi secara aman, dan memiliki pemahaman rute terbaik di Medan, Kualanamu, serta destinasi wisata Sumut.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. How to Order Section */}
      <section>
        <Container>
          <SectionHeading
            eyebrow="Proses Pemesanan"
            title="3 Langkah Praktis Melalui WhatsApp"
            description="Alur mudah untuk menanyakan ketersediaan dan mendapatkan estimasi penawaran resmi tanpa proses berbelit-belit."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
            {ORDER_STEPS.map((st) => (
              <div
                key={st.step}
                className="relative p-8 bg-white border border-[#E5E0D4] rounded-none card-3d space-y-3"
              >
                <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#7A5817] block">
                  {st.step}
                </span>
                <h3 className="font-editorial text-lg font-bold text-[#20252B]">
                  {st.title}
                </h3>
                <p className="text-sm text-[#5A626A] leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#5A626A] max-w-xl mx-auto">
              *Website ini berfungsi sebagai etalase informasi dan penyusun pesan penawaran. Permintaan pemesanan resmi baru diproses setelah Anda mengirimkan pesan WhatsApp ke admin kami.
            </p>
          </div>
        </Container>
      </section>

      {/* 6. Pricing Disclaimer & Call to Action Banner — Editorial Luxury */}
      <section>
        <Container>
          <div className="bg-[#20252B] text-white rounded-none p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-[#E5E0D4]/20 shadow-sm">
            {/* Top Gold Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#9B7627] via-[#C49A3A] to-[#9B7627]" aria-hidden="true" />

            <div className="max-w-2xl relative z-10 space-y-5">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#C49A3A] bg-white/5 px-3 py-1 border border-[#C49A3A]/40">
                Konsultasi &amp; Penawaran
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight leading-tight">
                Rencanakan Perjalanan Anda di Medan Bersama MUL Rent Car
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                Hubungi kami sekarang untuk menanyakan ketersediaan unit armada, penawaran kontrak sewa korporat, atau layanan penjemputan Bandara Internasional Kualanamu.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <WhatsAppButton
                  message="Halo PT. MAULANA SADHA UTAMA, saya ingin konsultasi sewa mobil dan meminta penawaran harga."
                >
                  Konsultasi via WhatsApp
                </WhatsAppButton>
                <Button
                  variant="secondary"
                  href="/kontak"
                  className="border-[#E5E0D4] text-white hover:bg-white hover:text-[#20252B]"
                >
                  Halaman Kontak
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
