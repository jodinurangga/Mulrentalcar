"use client";

import React from "react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, createGeneralInquiryMessage } from "@/lib/whatsapp";

/**
 * Floating WhatsApp Button
 * Visible on all public pages, fixed to bottom-right corner.
 * Strictly adheres to accessibility (≥ 44x44px touch target) and mobile safe area.
 */
export function FloatingWhatsApp() {
  const waUrl = buildWhatsAppUrl(createGeneralInquiryMessage());

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-6 right-6 z-40 print:hidden"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Hubungi ${siteConfig.brandName} via WhatsApp di nomor ${siteConfig.whatsapp.display}`}
        className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white pl-4 pr-5 py-3 rounded-none border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C49A3A] active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <WhatsAppIcon className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
        <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
          Chat WhatsApp
        </span>
      </a>
    </aside>
  );
}
