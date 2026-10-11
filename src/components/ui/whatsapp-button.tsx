import React from "react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button, type ButtonSize } from "./button";

export interface WhatsAppButtonProps {
  message?: string;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
  text?: string;
  isFullWidth?: boolean;
}

export function WhatsAppButton({
  message = "Halo PT. MAULANA SADHA UTAMA (MUL Rent Car), saya ingin menanyakan layanan rental mobil.",
  size = "md",
  className = "",
  children,
  text,
  isFullWidth = false,
}: WhatsAppButtonProps) {
  const content = children || text || "Hubungi WhatsApp";
  const url = buildWhatsAppUrl(message);

  return (
    <Button
      variant="whatsapp"
      size={size}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      isFullWidth={isFullWidth}
      className={`gap-2 font-medium ${className}`.trim()}
      aria-label={`${typeof content === "string" ? content : "Hubungi"} via WhatsApp (buka jendela baru)`}
    >
      <WhatsAppIcon className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span>{content}</span>
    </Button>
  );
}
