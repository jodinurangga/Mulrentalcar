import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  UserCheck,
  Key,
  Briefcase,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, createGeneralInquiryMessage } from "@/lib/whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Sewa Mobil Medan",
  description:
    "Ketentuan dan persyaratan resmi rental mobil di PT. MAULANA SADHA UTAMA: sewa dengan sopir, lepas kunci, dan korporat. Transparan, aman, dan jelas.",
  alternates: {
    canonical: "/syarat-ketentuan",
  },
  openGraph: {
    title: `Syarat & Ketentuan Sewa | ${siteConfig.brandName}`,
    description:
      "Persyaratan resmi sewa mobil dengan sopir, lepas kunci, dan korporat di Kota Medan oleh PT. MAULANA SADHA UTAMA.",
    url: `${siteConfig.url}/syarat-ketentuan`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Syarat & Ketentuan Sewa | ${siteConfig.brandName}`,
    description:
      "Persyaratan resmi sewa mobil dengan sopir, lepas kunci, dan korporat di Kota Medan.",
  },
};

export default function TermsPage() {
  const waConfirmUrl = buildWhatsAppUrl(
    "Halo PT. MAULANA SADHA UTAMA (MUL Rent Car), saya ingin mengonfirmasi persyaratan dan prosedur sewa mobil."
  );

  const breadcrumbItems = [
    { name: "Beranda", item: "/" },
    { name: "Syarat & Ketentuan", item: "/syarat-ketentuan" },
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
              Syarat & Ketentuan
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A] text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#C49A3A]" />
            Ketentuan & Kebijakan Sewa
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#20252B] tracking-tight leading-[1.15] mb-5">
            Syarat & Ketentuan Rental
          </h1>
          <p className="text-base md:text-lg text-[#5A626A] leading-relaxed">
            Demi kenyamanan, keamanan, dan kejelasan kerja sama, berikut adalah pedoman umum persyaratan sewa mobil di PT. MAULANA SADHA UTAMA untuk masing-masing kategori layanan.
          </p>
        </header>

        {/* Privacy Critical Notice (FR-REQ-003) */}
        <div className="mb-16 p-6 bg-[#F7F4EC] border-l-4 border-[#C49A3A] border border-[#E5E0D4] flex items-start gap-4 text-[#20252B]">
          <ShieldAlert className="w-6 h-6 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs md:text-sm leading-relaxed">
            <strong className="block font-bold text-[#20252B] uppercase tracking-wide mb-1.5">
              Pemberitahuan Keamanan & Privasi Identitas:
            </strong>
            Website ini tidak memiliki sistem penyimpanan dokumen dan tidak menyediakan formulir unggah berkas. <strong>Jangan mengirim foto identitas asli (KTP, SIM, NPWP) melalui situs ini.</strong> Verifikasi dokumen hanya dilakukan melalui saluran komunikasi resmi dan prosedur serah terima langsung yang diarahkan oleh admin kami.
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-14">
          {/* Section 1: Sewa Dengan Sopir */}
          <section
            id="dengan-sopir"
            className="scroll-mt-24 bg-white border border-[#E5E0D4] p-8 md:p-12 relative"
          >
            <div className="absolute top-0 left-0 w-20 h-1 bg-[#C49A3A]" />
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A] flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#C49A3A] uppercase tracking-widest block mb-1">
                  Kategori 01
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#20252B] tracking-tight">
                  Persyaratan Sewa Mobil dengan Sopir
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#5A626A] leading-relaxed mb-6">
              <p>
                Layanan dengan sopir merupakan skema paling praktis dan tidak membutuhkan penyerahan dokumen jaminan yang rumit. Prosedur pemesanan meliputi:
              </p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#20252B] font-semibold">Konfirmasi Jadwal & Rute:</strong> Menyampaikan jadwal tanggal sewa, jam penjemputan, lokasi jemput, dan rute tujuan (dalam Kota Medan atau luar kota).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#20252B] font-semibold">Durasi Sewa Harian:</strong> Perhitungan sewa harian dengan sopir dihitung per hari (standar 12 jam kerja per hari). Biaya overtime berlaku jika pemakaian melebihi batas waktu harian.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#20252B] font-semibold">Komponen Biaya Operasional:</strong> Harga indikatif sewa mencakup unit mobil dan jasa sopir. Bahan Bakar Minyak (BBM), karcis tol, biaya parkir, dan akomodasi penginapan sopir (bila menginap di luar kota) ditanggung oleh penyewa.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#20252B] font-semibold">Uang Muka (DP):</strong> Pembayaran tanda jadi (DP) diperlukan untuk mengikat ketersediaan unit armada pada tanggal yang dipilih.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] text-xs text-[#5A626A] italic">
              * Persyaratan dan rincian biaya dapat disesuaikan berdasarkan rute khusus atau pemesanan beruntun (multi-day).
            </div>
          </section>

          {/* Section 2: Sewa Lepas Kunci */}
          <section
            id="lepas-kunci"
            className="scroll-mt-24 bg-white border border-[#E5E0D4] p-8 md:p-12 relative"
          >
            <div className="absolute top-0 left-0 w-20 h-1 bg-[#C49A3A]" />
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A] flex items-center justify-center shrink-0">
                <Key className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#C49A3A] uppercase tracking-widest block mb-1">
                  Kategori 02
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#20252B] tracking-tight">
                  Persyaratan Sewa Lepas Kunci (Self-Drive)
                </h2>
              </div>
            </div>

            <div className="space-y-5 text-sm text-[#5A626A] leading-relaxed mb-6">
              <p>
                Untuk menjaga keselamatan unit armada, penyewaan tanpa supir (lepas kunci) memberlakukan proses seleksi dan verifikasi kelayakan dokumen secara ketat:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div className="p-6 bg-[#F7F4EC] border border-[#E5E0D4]">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#20252B] mb-3">
                    Dokumen Wajib:
                  </h3>
                  <ul className="text-xs text-[#5A626A] space-y-2">
                    <li>• KTP Asli penyewa (wajib ditunjukkan saat serah terima)</li>
                    <li>• Surat Izin Mengemudi (SIM A) yang masih berlaku</li>
                    <li>• Identitas pendukung (ID Card Karyawan / Kartu Keluarga)</li>
                    <li>• Akun media sosial aktif untuk verifikasi domisili</li>
                  </ul>
                </div>

                <div className="p-6 bg-[#F7F4EC] border border-[#E5E0D4]">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#20252B] mb-3">
                    Ketentuan Jaminan & Deposit:
                  </h3>
                  <ul className="text-xs text-[#5A626A] space-y-2">
                    <li>• Deposit uang jaminan (nominal ditentukan sesuai unit)</li>
                    <li>• Deposit dikembalikan penuh setelah masa sewa berakhir dan unit diperiksa bebas kendala</li>
                    <li>• Bersedia difoto bersama kendaraan saat serah terima unit</li>
                    <li>• Batas wilayah jelajah sesuai kesepakatan awal</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-[#F7F4EC] border-l-2 border-[#C49A3A] border border-[#E5E0D4] text-xs text-[#5A626A]">
                <strong className="text-[#20252B]">Catatan Tarif:</strong> Tarif lepas kunci <em>bukan</em> tarif yang tercantum di katalog beranda (tarif katalog adalah sewa dengan sopir). Tarif lepas kunci diberikan khusus berdasarkan kesepakatan penawaran.
              </div>
            </div>

            <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] text-xs text-[#5A626A] italic">
              * Perusahaan berhak menolak permohonan sewa lepas kunci apabila dokumen tidak memenuhi standar verifikasi keselamatan armada.
            </div>
          </section>

          {/* Section 3: Sewa Korporat */}
          <section
            id="perusahaan"
            className="scroll-mt-24 bg-white border border-[#E5E0D4] p-8 md:p-12 relative"
          >
            <div className="absolute top-0 left-0 w-20 h-1 bg-[#C49A3A]" />
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A] flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#C49A3A] uppercase tracking-widest block mb-1">
                  Kategori 03
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#20252B] tracking-tight">
                  Persyaratan Sewa Korporat & Instansi Perusahaan
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#5A626A] leading-relaxed mb-6">
              <p>
                Untuk perusahaan swasta, BUMN, perbankan, dan instansi pemerintahan, kami menyediakan alur administrasi yang tertib dan akuntabel:
              </p>

              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#20252B] font-semibold">Purchase Order / Surat Tugas Resmi:</strong> Pengajuan permohonan sewa menggunakan kop surat perusahaan resmi atau Purchase Order (PO) yang ditandatangani pejabat berwenang.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#20252B] font-semibold">Kelengkapan Legalitas Korporat:</strong> Salinan NPWP Badan Usaha, NIB, dan kontak penanggung jawab operasional.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#20252B] font-semibold">Perjanjian Kerja Sama (MoU):</strong> Penandatanganan kontrak sewa untuk durasi mingguan, bulanan, atau kontrak tahunan.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[#20252B] font-semibold">Faktur Pajak & Termin Pembayaran:</strong> Penagihan melalui invoice resmi. Ketentuan pajak PPn/PPh diperhitungkan di luar tarif sewa dasar sesuai ketentuan perpajakan yang berlaku.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] text-xs text-[#5A626A] italic">
              * Silakan hubungi tim administrasi kami untuk permohonan surat penawaran resmi (Quotation) berstempel PT. MAULANA SADHA UTAMA.
            </div>
          </section>

          {/* Section 4: Catatan Harga & Disclaimer */}
          <section className="bg-[#F7F4EC] border border-[#E5E0D4] p-8 md:p-10">
            <h3 className="font-editorial text-xl font-normal text-[#20252B] mb-4 flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#C49A3A]" aria-hidden="true" />
              Ketentuan Harga Umum & Batasan Tanggung Jawab
            </h3>
            <div className="space-y-3 text-xs md:text-sm text-[#5A626A] leading-relaxed">
              <p>
                1. <strong className="text-[#20252B]">Sifat Tarif Indikatif:</strong> Semua harga yang tertera di situs ini adalah harga indikatif awal. Tarif final dapat dinegosiasikan sesuai durasi sewa, musim liburan (peak season), atau permintaan rute khusus.
              </p>
              <p>
                2. <strong className="text-[#20252B]">Bukan Sistem Booking Otomatis:</strong> Website ini berfungsi sebagai media katalog dan konsultasi penawaran. Pemesanan baru sah setelah tercapai kesepakatan tertulis dan konfirmasi admin via WhatsApp.
              </p>
              <p>
                3. <strong className="text-[#20252B]">Perubahan Persyaratan:</strong> Syarat dan ketentuan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya dan wajib dikonfirmasi ulang sebelum unit kendaraan diberangkatkan.
              </p>
            </div>
          </section>
        </div>

        {/* CTA Bar */}
        <div className="mt-16 text-center p-10 md:p-12 bg-[#20252B] border-t-2 border-[#C49A3A] text-white">
          <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-3">
            Ada Pertanyaan Terkait Persyaratan Sewa?
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto mb-6">
            Tim kami siap menjelaskan detail dokumen, ketentuan deposit, atau kalkulasi rute khusus perjalanan Anda.
          </p>
          <a
            href={waConfirmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-8 py-3.5 rounded-none uppercase tracking-wider text-xs transition-colors"
          >
            <span>Konfirmasi Persyaratan via WhatsApp</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
