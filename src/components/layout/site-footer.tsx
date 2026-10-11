import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  const waContactUrl = buildWhatsAppUrl(
    "Halo PT. MAULANA SADHA UTAMA (MUL Rent Car), saya ingin menanyakan informasi layanan."
  );

  return (
    <footer className="bg-[#20252B] text-white pt-14 pb-10 border-t-2 border-[#C49A3A]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#E5E0D4]/15">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden bg-white p-0.5 border border-[#C49A3A]/40 shadow-sm">
                <Image
                  src={siteConfig.logo}
                  alt="Logo MUL Rent Car — PT. MAULANA SADHA UTAMA"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                  unoptimized
                />
              </div>
              <div>
                <span className="font-editorial text-2xl font-bold tracking-tight text-white block leading-tight">
                  {siteConfig.brandName}
                </span>
                <p className="text-[10px] font-semibold text-[#C49A3A] uppercase tracking-widest mt-0.5">
                  {siteConfig.name}
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal pt-1">
              Solusi transportasi andalan dan terpercaya untuk perjalanan keluarga, dinas korporat, wisata, dan acara di Medan & sekitarnya.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C49A3A] mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#C49A3A] hover:underline underline-offset-4 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Area */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C49A3A] mb-4">
              Kontak Resmi
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Kota Medan dan sekitarnya, Sumatera Utara</span>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" aria-hidden="true" />
                <a
                  href={waContactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp: {siteConfig.whatsapp.display}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C49A3A] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[#C49A3A] transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational & Order Notice */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C49A3A] mb-4">
              Ketentuan Pemesanan
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              Website ini berfungsi sebagai etalase informasi dan katalog armada. Pemesanan dan konfirmasi ketersediaan dilakukan langsung melalui WhatsApp.
            </p>
            <div className="p-3.5 bg-white/5 rounded-none border border-[#E5E0D4]/20 text-[11px] text-neutral-300 leading-relaxed">
              Pesan disiapkan otomatis di WhatsApp. Permintaan baru diproses setelah Anda mengirimkan pesan konfirmasi tersebut.
            </div>
          </div>
        </div>

        {/* Pricing Disclaimer, Privacy Link & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            {siteConfig.pricingDisclaimer}
          </p>
          <div className="shrink-0 text-center md:text-right space-y-1">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p>
              <Link
                href="/kebijakan-privasi"
                className="hover:text-[#C49A3A] transition-colors underline underline-offset-2 text-[11px]"
              >
                Kebijakan Privasi
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
