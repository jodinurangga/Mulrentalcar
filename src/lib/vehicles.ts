import { vehiclesData, type Vehicle, type VehicleCategory } from "@/data/vehicles";

/**
 * Data Access Layer for Vehicles
 *
 * MANDATORY RULE: UI components and pages must only read vehicle data
 * through this module, never by importing src/data/vehicles.ts directly.
 */

/**
 * Returns all published vehicles sorted by their designated order.
 */
export function getAllVehicles(): Vehicle[] {
  return vehiclesData
    .filter((v) => v.published)
    .sort((a, b) => a.order - b.order);
}

/**
 * Retrieves a single vehicle by its slug. Returns undefined if not found or unpublished.
 */
export function getVehicleBySlug(slug: string): Vehicle | undefined {
  const normalizedSlug = slug.toLowerCase().trim();
  const found = vehiclesData.find((v) => v.slug === normalizedSlug);
  if (!found || !found.published) {
    return undefined;
  }
  return found;
}

/**
 * Returns all featured vehicles for hero/showcase sections.
 */
export function getFeaturedVehicles(): Vehicle[] {
  return getAllVehicles().filter((v) => v.featured);
}

/**
 * Returns vehicles by category.
 */
export function getVehiclesByCategory(category: VehicleCategory): Vehicle[] {
  return getAllVehicles().filter((v) => v.category === category);
}

/**
 * Returns related vehicles within the same category, excluding the current vehicle.
 */
export function getRelatedVehicles(currentSlug: string, limit = 3): Vehicle[] {
  const current = getVehicleBySlug(currentSlug);
  if (!current) return [];

  const sameCategory = getAllVehicles().filter(
    (v) => v.category === current.category && v.slug !== current.slug
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // If not enough in same category, backfill with other vehicles
  const others = getAllVehicles().filter(
    (v) => v.category !== current.category && v.slug !== current.slug
  );

  return [...sameCategory, ...others].slice(0, limit);
}

/**
 * Returns all unique valid slugs for static route generation.
 */
export function getAllVehicleSlugs(): string[] {
  return getAllVehicles().map((v) => v.slug);
}
