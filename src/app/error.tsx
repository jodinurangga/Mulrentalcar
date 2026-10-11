"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, createGeneralInquiryMessage } from "@/lib/whatsapp";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error securely without exposing sensitive detail to UI
    console.error("Application error boundary caught an error:", error);
  }, [error]);

  const waUrl = buildWhatsAppUrl(createGeneralInquiryMessage());

  return (
    <div className="py-24 md:py-36 flex items-center justify-center min-h-[65vh] bg-white">
      <Container>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F7F4EC] border border-[#E5E0D4] text-[#C49A3A]">
            <AlertCircle className="w-8 h-8" aria-hidden="true" />
          </div>

          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[#20252B] tracking-tight">
            Terjadi Kendala pada Halaman
          </h1>

          <p className="text-sm md:text-base text-[#5A626A] leading-relaxed max-w-md mx-auto">
            Mohon maaf atas ketidaknyamanan ini. Terjadi kendala teknis saat memproses tampilan halaman. Silakan muat ulang atau kembali ke halaman beranda.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#20252B] hover:bg-[#2c333b] text-white font-bold px-6 py-3.5 rounded-none uppercase tracking-wider text-xs transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[#C49A3A]" aria-hidden="true" />
              <span>Coba Lagi</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F7F4EC] text-[#20252B] font-bold px-6 py-3.5 rounded-none border border-[#E5E0D4] hover:border-[#C49A3A] uppercase tracking-wider text-xs transition-colors shadow-xs"
            >
              <Home className="w-4 h-4 text-[#C49A3A]" aria-hidden="true" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>

          <div className="pt-8 border-t border-[#E5E0D4] text-xs text-[#5A626A]">
            Kendala berlanjut? Hubungi kami langsung di{" "}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#20252B] font-bold hover:text-[#C49A3A] transition-colors inline-flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] inline" />
              WhatsApp Admin ({siteConfig.whatsapp.display})
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
