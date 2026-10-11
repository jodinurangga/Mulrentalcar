import React from "react";
import Link from "next/link";
import { formatIdr } from "@/lib/format";
import { VehicleImage } from "./vehicle-image";
import { Badge } from "@/components/ui/badge";
import type { Vehicle } from "@/data/vehicles";

export interface VehicleCardProps {
  vehicle: Vehicle;
  priorityImage?: boolean;
}

const categoryLabels: Record<string, string> = {
  "city-car": "City Car",
  mpv: "MPV",
  suv: "SUV",
  van: "Van / Minibus",
  premium: "Premium",
};

export function VehicleCard({ vehicle, priorityImage = false }: VehicleCardProps) {
  const categoryLabel = categoryLabels[vehicle.category] || vehicle.category.toUpperCase();
  const priceFormatted = formatIdr(vehicle.price.amountIdr);

  return (
    <article className="group relative bg-white border border-[#E5E0D4] rounded-none overflow-hidden card-3d flex flex-col h-full hover:border-[#C49A3A] transition-all duration-300">
      {/* Top Gold Accent Indicator */}
      <div className="h-[2px] w-full bg-transparent group-hover:bg-[#C49A3A] transition-colors duration-300" aria-hidden="true" />

      {/* Vehicle Image */}
      <div className="p-3 pb-0">
        <VehicleImage
          images={vehicle.images}
          vehicleName={vehicle.name}
          priority={priorityImage}
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category & Year note */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <Badge variant="category">{categoryLabel}</Badge>
          {vehicle.yearNote && (
            <span className="text-xs text-[#5A626A] font-medium">
              {vehicle.yearNote}
            </span>
          )}
        </div>

        {/* Vehicle Name */}
        <h3 className="font-editorial text-xl font-bold tracking-tight text-[#20252B] group-hover:text-[#9B7627] transition-colors">
          <Link
            href={`/mobil/${vehicle.slug}`}
            className="focus-visible:outline-2 focus-visible:outline-[#C49A3A] focus-visible:outline-offset-2 rounded-none after:absolute after:inset-0"
          >
            {vehicle.name}
          </Link>
        </h3>

        {/* Price & Service Scope */}
        <div className="mt-auto pt-4 border-t border-[#E5E0D4]">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-xs text-[#5A626A] block font-medium">Mulai</span>
              <span className="font-editorial text-xl font-bold text-[#20252B] tracking-tight">
                {priceFormatted}
              </span>
              <span className="text-xs text-[#5A626A]"> / hari</span>
            </div>
            <Badge variant="indicative">Dengan sopir</Badge>
          </div>
          <p className="text-[11px] text-[#5A626A] mt-1.5 font-normal">
            Kota Medan dan sekitarnya
          </p>
        </div>
      </div>
    </article>
  );
}
