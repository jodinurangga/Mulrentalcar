import type { Vehicle, VehicleCategory } from "@/data/vehicles";

export type SortOption = "default" | "name-asc" | "price-asc" | "price-desc";

export interface FilterOptions {
  query?: string;
  category?: VehicleCategory | "all";
  maxPrice?: number;
}

/**
 * Filter vehicles by search text (name / alias), category, and maximum price.
 * Case-insensitive, trims excess spaces.
 */
export function filterVehicles(
  vehicles: Vehicle[],
  options: FilterOptions = {}
): Vehicle[] {
  const { query, category, maxPrice } = options;
  const cleanQuery = query ? query.trim().toLowerCase() : "";

  return vehicles.filter((vehicle) => {
    // 1. Text Search (Matches vehicle name, slug, or models inside group)
    if (cleanQuery) {
      const nameMatch = vehicle.name.toLowerCase().includes(cleanQuery);
      const slugMatch = vehicle.slug.toLowerCase().includes(cleanQuery);
      // Handles individual model matches in grouped entries (e.g. "xenia", "agya", "pajero", "terios", "raize")
      const parts = vehicle.name.toLowerCase().split(/\s*[\/\-]\s*/);
      const partMatch = parts.some((p) => p.includes(cleanQuery));

      if (!nameMatch && !slugMatch && !partMatch) {
        return false;
      }
    }

    // 2. Category Filter
    if (category && category !== "all") {
      if (vehicle.category !== category) {
        return false;
      }
    }

    // 3. Max Price Filter
    if (maxPrice !== undefined && maxPrice > 0) {
      if (vehicle.price.amountIdr === null || vehicle.price.amountIdr > maxPrice) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort vehicles by selected sort option.
 */
export function sortVehicles(
  vehicles: Vehicle[],
  sortBy: SortOption = "default"
): Vehicle[] {
  const list = [...vehicles];

  switch (sortBy) {
    case "price-asc":
      return list.sort((a, b) => {
        const priceA = a.price.amountIdr ?? Number.MAX_SAFE_INTEGER;
        const priceB = b.price.amountIdr ?? Number.MAX_SAFE_INTEGER;
        return priceA - priceB;
      });

    case "price-desc":
      return list.sort((a, b) => {
        const priceA = a.price.amountIdr ?? 0;
        const priceB = b.price.amountIdr ?? 0;
        return priceB - priceA;
      });

    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name, "id-ID"));

    case "default":
    default:
      return list.sort((a, b) => a.order - b.order);
  }
}
