import React from "react";
import Image from "next/image";
import { Car } from "lucide-react";
import type { VehicleImage as VehicleImageType } from "@/data/vehicles";

export interface VehicleImageProps {
  images?: VehicleImageType[];
  vehicleName: string;
  className?: string;
  priority?: boolean;
}

export function VehicleImage({
  images = [],
  vehicleName,
  className = "",
  priority = false,
}: VehicleImageProps) {
  const primaryImage = images && images.length > 0 ? images[0] : null;

  return (
    <div
      className={`relative w-full aspect-[4/3] bg-[#F7F4EC] rounded-none overflow-hidden flex items-center justify-center border border-[#E5E0D4] ${className}`.trim()}
    >
      {primaryImage ? (
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt || `Armada ${vehicleName}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        /* Editorial Luxury Automotive Placeholder */
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F7F4EC] text-[#20252B] relative"
          role="img"
          aria-label={`Foto ${vehicleName} segera tersedia`}
        >
          {/* Subtle Decorative Editorial Corner Marks */}
          <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C49A3A]/40" aria-hidden="true" />
          <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C49A3A]/40" aria-hidden="true" />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#C49A3A]/40" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#C49A3A]/40" aria-hidden="true" />

          {/* Luxury Automotive Emblem */}
          <div className="w-13 h-13 rounded-none bg-white border border-[#C49A3A]/50 flex items-center justify-center mb-3 text-[#C49A3A] shadow-2xs">
            <Car className="w-6 h-6 text-[#9B7627]" aria-hidden="true" />
          </div>

          <p className="font-editorial text-sm font-semibold tracking-wide text-[#20252B]">
            Foto segera tersedia
          </p>
          <div className="w-8 h-[1px] bg-[#C49A3A] my-1.5" aria-hidden="true" />
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#7A5817]">
            Armada tahun 2022 ke atas
          </p>
        </div>
      )}
    </div>
  );
}
