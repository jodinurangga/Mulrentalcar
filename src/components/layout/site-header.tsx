"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = React.useRef<HTMLElement>(null);

  // Close mobile menu on Escape key press or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const waHeaderUrl = buildWhatsAppUrl(
    "Halo PT. MAULANA SADHA UTAMA (MUL Rent Car), saya ingin menanyakan layanan sewa mobil."
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#E5E0D4] transition-all"
    >
      {/* Top Hairline Gold Accent */}
      <div className="h-[2px] bg-gradient-to-r from-[#9B7627] via-[#C49A3A] to-[#9B7627]" aria-hidden="true" />
      <Container>
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Brand Identity / Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#C49A3A] p-1 -m-1"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full overflow-hidden bg-white shadow-2xs border border-[#E5E0D4] group-hover:border-[#C49A3A] transition-colors">
              <Image
                src={siteConfig.logo}
                alt="Logo MUL Rent Car — PT. MAULANA SADHA UTAMA"
                width={48}
                height={48}
                priority
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#20252B] group-hover:text-[#9B7627] transition-colors leading-none">
                {siteConfig.brandName}
              </span>
              <span className="text-[10px] font-semibold text-[#7A5817] tracking-widest uppercase mt-1">
                {siteConfig.name}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-3"
            aria-label="Navigasi Utama"
          >
            {siteConfig.navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-200 border-b-2 ${
                    isActive
                      ? "text-[#20252B] border-[#C49A3A] bg-[#F7F4EC]"
                      : "text-[#5A626A] border-transparent hover:text-[#20252B] hover:border-[#E5E0D4] hover:bg-[#F7F4EC]/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href={waHeaderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#128C7E] text-white hover:bg-[#075E54] text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-none shadow-2xs hover:shadow-xs transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#C49A3A] focus-visible:outline-offset-2 min-h-[44px]"
              aria-label="WhatsApp — Konsultasi via WhatsApp (buka jendela baru)"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-none text-[#20252B] hover:bg-[#F7F4EC] min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#C49A3A]"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden py-4 border-t border-[#E5E0D4] space-y-2 animate-in fade-in duration-200 bg-white"
          >
            <nav className="flex flex-col space-y-1" aria-label="Navigasi Ponsel">
              {siteConfig.navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-none text-sm uppercase tracking-wider font-semibold min-h-[44px] flex items-center ${
                      isActive
                        ? "text-[#20252B] bg-[#F7F4EC] border-l-2 border-[#C49A3A]"
                        : "text-[#5A626A] hover:bg-[#F7F4EC] hover:text-[#20252B]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#E5E0D4]">
              <a
                href={waHeaderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#128C7E] text-white hover:bg-[#075E54] font-semibold py-3 px-4 rounded-none shadow-2xs min-h-[44px] text-sm uppercase tracking-wider"
                aria-label="Hubungi via WhatsApp (buka jendela baru)"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Hubungi via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
