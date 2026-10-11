import React from "react";
import Link from "next/link";
import { ArrowLeft, Car, Home } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Container } from "@/components/ui/container";
import { buildWhatsAppUrl, createGeneralInquiryMessage } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  const waUrl = buildWhatsAppUrl(createGeneralInquiryMessage());

  return (
    <div className="py-24 md:py-36 flex items-center justify-center min-h-[65vh] bg-white">
      <Container>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A]">
            <span className="font-editorial text-3xl font-bold tracking-tight">404</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#20252B] tracking-tight">
            Halaman Tidak Ditemukan
          </h1>

          <p className="text-sm md:text-base text-[#5A626A] leading-relaxed max-w-md mx-auto">
            Mohon maaf, halaman yang Anda tuju tidak tersedia, telah dipindahkan, atau alamat URL yang dimasukkan kurang tepat.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#20252B] hover:bg-[#2c333b] text-white font-bold px-6 py-3.5 rounded-none uppercase tracking-wider text-xs transition-colors shadow-xs"
            >
              <Home className="w-4 h-4 text-[#C49A3A]" aria-hidden="true" />
              <span>Kembali ke Beranda</span>
            </Link>

            <Link
              href="/mobil"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F7F4EC] text-[#20252B] font-bold px-6 py-3.5 rounded-none border border-[#E5E0D4] hover:border-[#C49A3A] uppercase tracking-wider text-xs transition-colors shadow-xs"
            >
              <Car className="w-4 h-4 text-[#C49A3A]" aria-hidden="true" />
              <span>Lihat Katalog Armada</span>
            </Link>
          </div>

          <div className="pt-8 border-t border-[#E5E0D4] text-xs text-[#5A626A]">
            Butuh bantuan langsung?{" "}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#20252B] font-bold hover:text-[#C49A3A] transition-colors inline-flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] inline" />
              Chat WhatsApp Admin ({siteConfig.whatsapp.display})
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
