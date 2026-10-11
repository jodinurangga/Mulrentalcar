import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Keamanan Data Pengguna",
  description:
    "Kebijakan privasi resmi PT. MAULANA SADHA UTAMA (MUL Rent Car). Website ini tidak menyimpan data pribadi Anda di server database.",
  alternates: {
    canonical: "/kebijakan-privasi",
  },
  openGraph: {
    title: `Kebijakan Privasi | ${siteConfig.brandName}`,
    description:
      "Kebijakan privasi resmi PT. MAULANA SADHA UTAMA mengenai perlindungan data pengguna.",
    url: `${siteConfig.url}/kebijakan-privasi`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Kebijakan Privasi | ${siteConfig.brandName}`,
    description:
      "Kebijakan privasi resmi PT. MAULANA SADHA UTAMA mengenai perlindungan data pengguna.",
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { name: "Beranda", item: "/" },
    { name: "Kebijakan Privasi", item: "/kebijakan-privasi" },
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
              Kebijakan Privasi
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A] text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#C49A3A]" />
            Perlindungan Data & Transparansi
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#20252B] tracking-tight leading-[1.15] mb-5">
            Kebijakan Privasi
          </h1>
          <p className="text-base md:text-lg text-[#5A626A] leading-relaxed">
            PT. MAULANA SADHA UTAMA (MUL Rent Car) berkomitmen untuk melindungi privasi dan menjaga keamanan informasi pengunjung situs web kami.
          </p>
        </header>

        {/* Content Box */}
        <div className="bg-white border border-[#E5E0D4] p-8 md:p-14 relative shadow-xs max-w-4xl space-y-10 text-[#5A626A] leading-relaxed text-sm md:text-base">
          <div className="absolute top-0 left-0 w-24 h-1 bg-[#C49A3A]" />

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl font-normal text-[#20252B] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C49A3A]" aria-hidden="true" />
              1. Prinsip Bebas Penyimpanan Data (No Server Storage)
            </h2>
            <p>
              Website ini dirancang secara statis sebagai etalase informasi armada dan company profile. <strong className="text-[#20252B]">Kami tidak mengumpulkan, tidak menyimpan, dan tidak mengolah data pribadi Anda dalam basis data (database) server kami.</strong>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl font-normal text-[#20252B] flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#C49A3A]" aria-hidden="true" />
              2. Cara Kerja Formulir Permintaan Penawaran
            </h2>
            <p>
              Formulir penawaran yang ada pada halaman Kontak sepenuhnya berjalan di peramban (browser) Anda. Ketika Anda menekan tombol kirim, data yang Anda masukkan digunakan semata-mata untuk merangkai pesan teks WhatsApp dan membukanya di aplikasi WhatsApp Anda.
            </p>
            <p>
              Tidak ada data formulir yang dikirimkan ke server kami atau pihak ketiga lainnya sebelum atau sesudah tindakan tersebut.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl font-normal text-[#20252B] flex items-center gap-3">
              <EyeOff className="w-5 h-5 text-[#C49A3A]" aria-hidden="true" />
              3. Dokumen Pribadi & Identitas
            </h2>
            <p>
              Website ini <strong className="text-[#20252B]">tidak pernah meminta atau mengizinkan pengunggahan dokumen identitas</strong> seperti foto KTP, SIM, NPWP, atau buku nikah. Segala bentuk verifikasi identitas resmi (misalnya untuk kebutuhan sewa lepas kunci atau perjanjian korporat) dilakukan secara langsung dan tertutup atas instruksi resmi tim kami di luar situs ini.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl font-normal text-[#20252B] flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#C49A3A]" aria-hidden="true" />
              4. Pertanyaan Mengenai Privasi
            </h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau praktik penggunaan data pada layanan kami, Anda dapat menghubungi kami melalui email resmi di{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#20252B] font-semibold underline hover:text-[#C49A3A] transition-colors"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <div className="pt-8 border-t border-[#E5E0D4] text-xs text-neutral-500">
            Terakhir diperbarui: Oktober 2026. PT. MAULANA SADHA UTAMA berhak memperbarui ketentuan privasi ini sesuai dengan perkembangan operasional dan hukum yang berlaku.
          </div>
        </div>
      </Container>
    </div>
  );
}
