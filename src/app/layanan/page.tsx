import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  UserCheck,
  Key,
  Briefcase,
  HeartHandshake,
  Users,
  Bus,
  SearchCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { siteConfig } from "@/config/site";
import {
  createServiceInquiryMessage,
  createCorporateInquiryMessage,
  createRequestOrderMessage,
} from "@/lib/whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Layanan Rental Mobil Medan — Sopir, Lepas Kunci, Korporat & Bus",
  description:
    "Layanan lengkap sewa mobil di Medan oleh PT. MAULANA SADHA UTAMA: rental dengan sopir, lepas kunci, perjalanan dinas korporat, wedding car, Toyota Hiace, bus pariwisata, dan request order.",
  alternates: {
    canonical: "/layanan",
  },
  openGraph: {
    title: `Layanan Rental Mobil Medan | ${siteConfig.brandName}`,
    description:
      "Pilihan layanan rental mobil profesional di Kota Medan dan sekitarnya oleh PT. MAULANA SADHA UTAMA.",
    url: `${siteConfig.url}/layanan`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Layanan Rental Mobil Medan | ${siteConfig.brandName}`,
    description:
      "Layanan lengkap sewa mobil di Medan oleh PT. MAULANA SADHA UTAMA: rental dengan sopir, lepas kunci, perjalanan dinas, dan bus.",
  },
};

export default function ServicesPage() {
  const driverMessage = createServiceInquiryMessage("Sewa Mobil dengan Sopir");
  const selfDriveMessage = createServiceInquiryMessage("Sewa Mobil Lepas Kunci");
  const corporateMessage = createCorporateInquiryMessage();
  const weddingMessage = createServiceInquiryMessage("Wedding Car / Mobil Pengantin");
  const hiaceMessage = createServiceInquiryMessage("Rental Toyota Hiace");
  const busMessage = createServiceInquiryMessage("Bus Pariwisata");
  const requestOrderMessage = createRequestOrderMessage();

  const breadcrumbItems = [
    { name: "Beranda", item: "/" },
    { name: "Layanan", item: "/layanan" },
  ];

  return (
    <div className="py-12 md:py-16">
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-neutral-500">
            <li>
              <Link href="/" className="hover:text-[#0B2A4A] transition-colors">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-900 font-medium" aria-current="page">
              Layanan
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F4EC] border border-[#C49A3A]/40 text-[#7A5817] text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 bg-[#C49A3A] inline-block" aria-hidden="true" />
            <span>Solusi Transportasi Komprehensif</span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl lg:text-5xl font-normal md:font-medium text-[#20252B] tracking-tight mb-4">
            Layanan Rental Mobil Kami
          </h1>
          <div className="w-16 h-[2px] bg-[#C49A3A] mb-4" aria-hidden="true" />
          <p className="text-base md:text-lg text-[#5A626A] leading-relaxed font-normal">
            PT. MAULANA SADHA UTAMA menyediakan 7 skema layanan transportasi darat di Medan dan Sumatera Utara yang dirancang fleksibel untuk kebutuhan personal, acara keluarga, hingga instansi korporat.
          </p>
        </header>

        {/* Quick Anchor Navigation — Sharp Editorial Bar */}
        <div className="mb-14 p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
          <span className="block text-xs font-bold uppercase tracking-widest text-[#7A5817] mb-3">
            Pilih Kategori Layanan:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href="#dengan-sopir"
              className="px-3.5 py-2 bg-white rounded-none border border-[#E5E0D4] font-semibold text-[#20252B] hover:border-[#C49A3A] hover:text-[#7A5817] transition-colors"
            >
              1. Dengan Sopir
            </a>
            <a
              href="#lepas-kunci"
              className="px-3.5 py-2 bg-white rounded-none border border-[#E5E0D4] font-semibold text-[#20252B] hover:border-[#C49A3A] hover:text-[#7A5817] transition-colors"
            >
              2. Lepas Kunci
            </a>
            <a
              href="#perjalanan-dinas"
              className="px-3.5 py-2 bg-white rounded-none border border-[#E5E0D4] font-semibold text-[#20252B] hover:border-[#C49A3A] hover:text-[#7A5817] transition-colors"
            >
              3. Korporat &amp; Dinas
            </a>
            <a
              href="#wedding-car"
              className="px-3.5 py-2 bg-white rounded-none border border-[#E5E0D4] font-semibold text-[#20252B] hover:border-[#C49A3A] hover:text-[#7A5817] transition-colors"
            >
              4. Wedding Car
            </a>
            <a
              href="#rental-hiace"
              className="px-3.5 py-2 bg-white rounded-none border border-[#E5E0D4] font-semibold text-[#20252B] hover:border-[#C49A3A] hover:text-[#7A5817] transition-colors"
            >
              5. Rental Hiace
            </a>
            <a
              href="#bus-pariwisata"
              className="px-3.5 py-2 bg-white rounded-none border border-[#E5E0D4] font-semibold text-[#20252B] hover:border-[#C49A3A] hover:text-[#7A5817] transition-colors"
            >
              6. Bus Pariwisata
            </a>
            <a
              href="#request-order"
              className="px-3.5 py-2 bg-white rounded-none border border-[#E5E0D4] font-semibold text-[#20252B] hover:border-[#C49A3A] hover:text-[#7A5817] transition-colors"
            >
              7. Request Order
            </a>
          </div>
        </div>

        {/* 7 Services Sections */}
        <div className="space-y-12">
          {/* 1. Sewa dengan Sopir */}
          <section
            id="dengan-sopir"
            className="scroll-mt-24 bg-white rounded-none border border-[#E5E0D4] p-6 md:p-10 shadow-2xs relative overflow-hidden card-3d"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-[#20252B] text-[#C49A3A] flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#7A5817] uppercase tracking-widest block">
                  Layanan 01
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight">
                  Sewa Mobil dengan Sopir
                </h2>
              </div>
            </div>

            <p className="text-[#5A626A] text-sm md:text-base leading-relaxed mb-6 font-normal">
              Layanan rental mobil andalan yang menyertakan pengemudi berpengalaman, sopan, dan memahami seluk-beluk rute Kota Medan serta destinasi luar kota di Sumatera Utara. Anda tinggal duduk tenang menikmati perjalanan tanpa perlu lelah menyetir atau menghadapi kemacetan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#20252B] uppercase tracking-widest mb-2.5">
                  Cocok Untuk:
                </h3>
                <ul className="text-xs text-[#5A626A] space-y-2 font-normal">
                  <li>• Tamu dinas luar kota yang butuh mobilitas cepat &amp; efisien</li>
                  <li>• Wisata keluarga ke Danau Toba, Berastagi, atau Bukit Lawang</li>
                  <li>• Antar-jemput tamu penting dan penjemputan Bandara Kualanamu</li>
                </ul>
              </div>

              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#7A5817] uppercase tracking-widest mb-2.5">
                  Ketentuan Tarif:
                </h3>
                <p className="font-editorial text-base text-[#20252B] font-bold mb-1">
                  Mulai Rp550.000 / hari (Indikatif)
                </p>
                <p className="text-[11px] text-[#5A626A] leading-relaxed font-normal">
                  Untuk area Kota Medan &amp; sekitarnya. Belum termasuk BBM, tol, parkir, dan akomodasi driver luar kota.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E0D4]">
              <WhatsAppButton
                message={driverMessage}
                text="Minta Penawaran Sewa Sopir"
              />
              <Link
                href="/mobil"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#20252B] hover:text-[#7A5817] transition-colors"
              >
                <span>Lihat Pilihan Armada di Katalog</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* 2. Sewa Lepas Kunci */}
          <section
            id="lepas-kunci"
            className="scroll-mt-24 bg-white rounded-none border border-[#E5E0D4] p-6 md:p-10 shadow-2xs relative overflow-hidden card-3d"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-[#20252B] text-[#C49A3A] flex items-center justify-center shrink-0">
                <Key className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#7A5817] uppercase tracking-widest block">
                  Layanan 02
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight">
                  Sewa Mobil Lepas Kunci (Self-Drive)
                </h2>
              </div>
            </div>

            <p className="text-[#5A626A] text-sm md:text-base leading-relaxed mb-6 font-normal">
              Layanan sewa mandiri bagi pelanggan yang menginginkan kebebasan berkendara pribadi bersama keluarga atau rekan kerja tanpa kehadiran pengemudi kami.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#20252B] uppercase tracking-widest mb-2.5">
                  Cocok Untuk:
                </h3>
                <ul className="text-xs text-[#5A626A] space-y-2 font-normal">
                  <li>• Perjalanan privat keluarga yang membutuhkan ruang penuh</li>
                  <li>• Pelanggan yang familiar dengan rute jalanan Medan</li>
                  <li>• Kebutuhan operasional mingguan atau bulanan mandiri</li>
                </ul>
              </div>

              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#C49A3A]/40">
                <h3 className="text-xs font-bold text-[#7A5817] uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#7A5817]" />
                  <span>Tarif &amp; Verifikasi Dokumen:</span>
                </h3>
                <p className="font-editorial text-base text-[#20252B] font-bold mb-1">
                  Harga Berdasarkan Penawaran (Khusus)
                </p>
                <p className="text-[11px] text-[#5A626A] leading-relaxed font-normal">
                  Tarif lepas kunci berbeda dengan tarif sewa bersopir. Wajib melalui verifikasi kelayakan dokumen dan jaminan deposit sebelum unit diserahkan.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E0D4]">
              <WhatsAppButton
                message={selfDriveMessage}
                text="Tanyakan Sewa Lepas Kunci via WA"
              />
              <Link
                href="/syarat-ketentuan#lepas-kunci"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#20252B] hover:text-[#7A5817] transition-colors"
              >
                <span>Pelajari Persyaratan Lepas Kunci</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* 3. Perjalanan Dinas & Korporat */}
          <section
            id="perjalanan-dinas"
            className="scroll-mt-24 bg-white rounded-none border border-[#E5E0D4] p-6 md:p-10 shadow-2xs relative overflow-hidden card-3d"
          >
            <div id="korporat" className="scroll-mt-24" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-[#20252B] text-[#C49A3A] flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#7A5817] uppercase tracking-widest block">
                  Layanan 03
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight">
                  Perjalanan Dinas &amp; Layanan Korporat
                </h2>
              </div>
            </div>

            <p className="text-[#5A626A] text-sm md:text-base leading-relaxed mb-6 font-normal">
              Solusi transportasi resmi terintegrasi untuk BUMN, instansi pemerintahan, perusahaan multinasional, dan sektor perbankan. Kami menyediakan kontrak fleksibel (harian, mingguan, bulanan) dengan kelengkapan administrasi dan invoice resmi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#20252B] uppercase tracking-widest mb-2.5">
                  Keunggulan Korporat:
                </h3>
                <ul className="text-xs text-[#5A626A] space-y-2 font-normal">
                  <li>• Legalitas berbadan hukum resmi PT. MAULANA SADHA UTAMA</li>
                  <li>• Faktur pajak &amp; invoice resmi (belum termasuk PPn/PPh pada tarif dasar)</li>
                  <li>• Dukungan unit pengganti bila terjadi kendala teknis</li>
                </ul>
              </div>

              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#7A5817] uppercase tracking-widest mb-2.5">
                  Ketentuan Tarif:
                </h3>
                <p className="font-editorial text-base text-[#20252B] font-bold mb-1">
                  Berdasarkan Penawaran Resmi &amp; SPK
                </p>
                <p className="text-[11px] text-[#5A626A] leading-relaxed font-normal">
                  Disesuaikan dengan volume unit, durasi kontrak, serta rute penugasan dinas di wilayah Sumatera.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E0D4]">
              <WhatsAppButton
                message={corporateMessage}
                text="Konsultasi Layanan Korporat"
              />
              <Link
                href="/syarat-ketentuan#perusahaan"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#20252B] hover:text-[#7A5817] transition-colors"
              >
                <span>Lihat Prosedur Kerja Sama Korporat</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* 4. Wedding Car */}
          <section
            id="wedding-car"
            className="scroll-mt-24 bg-white rounded-none border border-[#E5E0D4] p-6 md:p-10 shadow-2xs relative overflow-hidden card-3d"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-[#20252B] text-[#C49A3A] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#7A5817] uppercase tracking-widest block">
                  Layanan 04
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight">
                  Wedding Car / Mobil Pengantin
                </h2>
              </div>
            </div>

            <p className="text-[#5A626A] text-sm md:text-base leading-relaxed mb-6 font-normal">
              Layanan mobil pernikahan eksklusif untuk melengkapi momen istimewa Anda di Kota Medan. Tersedia opsi unit premium seperti Toyota Alphard, Camry, Fortuner, atau Innova Zenix lengkap dengan driver berbusana rapi dan opsi dekorasi bunga.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#20252B] uppercase tracking-widest mb-2.5">
                  Fasilitas &amp; Layanan:
                </h3>
                <ul className="text-xs text-[#5A626A] space-y-2 font-normal">
                  <li>• Unit kendaraan bersih dan wangi standar VIP</li>
                  <li>• Driver profesional, tepat waktu, dan berbusana formal rapi</li>
                  <li>• Tersedia opsi dekorasi pita/bunga sesuai tema pernikahan</li>
                </ul>
              </div>

              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#7A5817] uppercase tracking-widest mb-2.5">
                  Ketentuan Tarif:
                </h3>
                <p className="font-editorial text-base text-[#20252B] font-bold mb-1">
                  Berdasarkan Penawaran Paket
                </p>
                <p className="text-[11px] text-[#5A626A] leading-relaxed font-normal">
                  Dihitung berdasarkan tipe mobil pilihan, durasi acara pernikahan, dan rute rangkaian acara.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E0D4]">
              <WhatsAppButton
                message={weddingMessage}
                text="Konsultasi Wedding Car via WhatsApp"
              />
            </div>
          </section>

          {/* 5. Rental Toyota Hiace */}
          <section
            id="rental-hiace"
            className="scroll-mt-24 bg-white rounded-none border border-[#E5E0D4] p-6 md:p-10 shadow-2xs relative overflow-hidden card-3d"
          >
            <div id="hiace" className="scroll-mt-24" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-[#20252B] text-[#C49A3A] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#7A5817] uppercase tracking-widest block">
                  Layanan 05
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight">
                  Rental Toyota Hiace (Commuter, Premio, Luxury)
                </h2>
              </div>
            </div>

            <p className="text-[#5A626A] text-sm md:text-base leading-relaxed mb-6 font-normal">
              Solusi transportasi rombongan keluarga besar, instansi, atau tamu VIP dengan kenyamanan kabin lega dan suspensi halus. Kami menyediakan 3 varian Toyota Hiace resmi sesuai kebutuhan Anda.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="font-editorial text-base font-bold text-[#20252B] mb-1">Hiace Commuter</h3>
                <p className="font-editorial text-sm font-bold text-[#7A5817] mb-2">Rp1.300.000 / hari</p>
                <p className="text-[11px] text-[#5A626A] font-normal leading-relaxed">
                  Kapasitas besar, ideal untuk rombongan wisata keluarga dan kegiatan instansi.
                </p>
              </div>

              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="font-editorial text-base font-bold text-[#20252B] mb-1">Hiace Premio</h3>
                <p className="font-editorial text-sm font-bold text-[#7A5817] mb-2">Rp1.400.000 / hari</p>
                <p className="text-[11px] text-[#5A626A] font-normal leading-relaxed">
                  Desain modern semi-bonnet dengan kenyamanan berkendara lebih hening dan lapang.
                </p>
              </div>

              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="font-editorial text-base font-bold text-[#20252B] mb-1">Hiace Luxury</h3>
                <p className="font-editorial text-sm font-bold text-[#7A5817] mb-2">Rp2.500.000 / hari</p>
                <p className="text-[11px] text-[#5A626A] font-normal leading-relaxed">
                  Kabin captain seat mewah untuk tamu VIP, pimpinan delegasi, dan kenyamanan premium.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E0D4]">
              <WhatsAppButton
                message={hiaceMessage}
                text="Tanyakan Ketersediaan Hiace"
              />
              <Link
                href="/mobil?kategori=van"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#20252B] hover:text-[#7A5817] transition-colors"
              >
                <span>Lihat Varian Hiace di Katalog</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* 6. Bus Pariwisata */}
          <section
            id="bus-pariwisata"
            className="scroll-mt-24 bg-white rounded-none border border-[#E5E0D4] p-6 md:p-10 shadow-2xs relative overflow-hidden card-3d"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-[#20252B] text-[#C49A3A] flex items-center justify-center shrink-0">
                <Bus className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#7A5817] uppercase tracking-widest block">
                  Layanan 06
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight">
                  Bus Pariwisata (Minibus, Medium, &amp; Big Bus)
                </h2>
              </div>
            </div>

            <p className="text-[#5A626A] text-sm md:text-base leading-relaxed mb-6 font-normal">
              Penyediaan armada bus pariwisata berkapasitas besar untuk kegiatan tour wisata di Sumatera Utara, gathering korporat, rombongan ziarah, study tour, dan transportasi massal acara formal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#20252B] uppercase tracking-widest mb-2.5">
                  Pilihan Armada Bus:
                </h3>
                <ul className="text-xs text-[#5A626A] space-y-2 font-normal">
                  <li>• <strong>Medium Bus:</strong> Kapasitas 25–35 kursi penumpang</li>
                  <li>• <strong>Big Bus:</strong> Kapasitas 45–50 kursi penumpang</li>
                  <li>• Fasilitas AC sejuk, audio karaoke, dan bagasi barang luas</li>
                </ul>
              </div>

              <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4]">
                <h3 className="text-xs font-bold text-[#7A5817] uppercase tracking-widest mb-2.5">
                  Ketentuan Tarif:
                </h3>
                <p className="font-editorial text-base text-[#20252B] font-bold mb-1">
                  Berdasarkan Penawaran Rute
                </p>
                <p className="text-[11px] text-[#5A626A] leading-relaxed font-normal">
                  Dihitung berdasarkan rute tujuan (Medan, Danau Toba, Samosir, Berastagi), durasi hari, dan tipe bus.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E0D4]">
              <WhatsAppButton
                message={busMessage}
                text="Minta Penawaran Bus Pariwisata"
              />
            </div>
          </section>

          {/* 7. Request Order */}
          <section
            id="request-order"
            className="scroll-mt-24 bg-white rounded-none border border-[#E5E0D4] p-6 md:p-10 shadow-2xs relative overflow-hidden card-3d"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-none bg-[#20252B] text-[#C49A3A] flex items-center justify-center shrink-0">
                <SearchCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#7A5817] uppercase tracking-widest block">
                  Layanan 07
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#20252B] tracking-tight">
                  Request Order (Kendaraan Khusus)
                </h2>
              </div>
            </div>

            <p className="text-[#5A626A] text-sm md:text-base leading-relaxed mb-6 font-normal">
              Mencari tipe kendaraan khusus yang belum tercantum di katalog armada standar kami? Melalui jaringan penyedia kendaraan kami, PT. MAULANA SADHA UTAMA siap membantu mengupayakan pengadaan unit sesuai spesifikasi yang Anda inginkan.
            </p>

            <div className="p-5 rounded-none bg-[#F7F4EC] border border-[#E5E0D4] mb-8 max-w-2xl">
              <h3 className="text-xs font-bold text-[#20252B] uppercase tracking-widest mb-2.5">
                Alur Pemesanan Request Order:
              </h3>
              <ol className="text-xs text-[#5A626A] space-y-2 list-decimal pl-4 font-normal">
                <li>Sampaikan tipe mobil, merek, atau spesifikasi khusus yang diinginkan via WhatsApp.</li>
                <li>Sebutkan jadwal pemakaian, perkiraan durasi, dan rute perjalanan.</li>
                <li>Tim kami akan memeriksa jaringan unit dan memberikan penawaran harga serta konfirmasi ketersediaan.</li>
              </ol>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E5E0D4]">
              <WhatsAppButton
                message={requestOrderMessage}
                text="Ajukan Request Order via WhatsApp"
              />
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
