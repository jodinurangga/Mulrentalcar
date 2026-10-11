import { describe, it, expect } from "vitest";
import { filterVehicles, sortVehicles } from "@/lib/filters";
import {
  getAllVehicles,
  getVehicleBySlug,
  getAllVehicleSlugs,
  getRelatedVehicles,
} from "@/lib/vehicles";

describe("Catalog & Detail Logic Tests (Phase 2 Testing)", () => {
  const allVehicles = getAllVehicles();

  it("catalog displays exactly 14 vehicles by default", () => {
    expect(allVehicles).toHaveLength(14);
  });

  it("combines search query, category, and max price filter correctly", () => {
    // Search "innova", category "mpv", max price 1000000
    // Expected: innova-reborn-diesel (750k) and innova-zenix-g (800k).
    // (innova-zenix-q-sunroof is 1.1m, so filtered out by max price)
    const filtered = filterVehicles(allVehicles, {
      query: "innova",
      category: "mpv",
      maxPrice: 1000000,
    });

    expect(filtered).toHaveLength(2);
    const slugs = filtered.map((v) => v.slug);
    expect(slugs).toContain("innova-reborn-diesel");
    expect(slugs).toContain("innova-zenix-g");
    expect(slugs).not.toContain("innova-zenix-q-sunroof");
  });

  it("returns empty result when combined filters produce no matches", () => {
    const filtered = filterVehicles(allVehicles, {
      query: "alphard",
      category: "city-car",
    });
    expect(filtered).toHaveLength(0);
  });

  it("returns all 14 vehicles when filter parameters are reset/empty", () => {
    const filtered = filterVehicles(allVehicles, {
      query: "",
      category: undefined,
      maxPrice: undefined,
    });
    expect(filtered).toHaveLength(14);
  });

  it("all 14 slugs can be resolved to published vehicle objects", () => {
    const slugs = getAllVehicleSlugs();
    expect(slugs).toHaveLength(14);

    slugs.forEach((slug) => {
      const vehicle = getVehicleBySlug(slug);
      expect(vehicle).toBeDefined();
      expect(vehicle?.slug).toBe(slug);
      expect(vehicle?.published).toBe(true);
      // Ensure pricing is with-driver indicative only
      expect(vehicle?.price.includesDriver).toBe(true);
      expect(vehicle?.price.scope).toBe("Kota Medan dan sekitarnya");
    });
  });

  it("unknown slug returns undefined (yielding 404 in detail page)", () => {
    expect(getVehicleBySlug("random-car-not-exist")).toBeUndefined();
    expect(getVehicleBySlug("sedan-mewah")).toBeUndefined();
    expect(getVehicleBySlug("undefined")).toBeUndefined();
  });

  it("provides related vehicles from same category or backfilled without duplicating current vehicle", () => {
    const related = getRelatedVehicles("xpander", 3);
    expect(related).toHaveLength(3);
    related.forEach((rel) => {
      expect(rel.slug).not.toBe("xpander");
    });
  });

  it("does not fabricate indicative prices for self-drive (lepas kunci)", () => {
    // Mandatory Rule: Lepas kunci pricing is always 'Harga berdasarkan penawaran'.
    // Vehicles in src/data/vehicles.ts only contain prices where includesDriver: true
    allVehicles.forEach((v) => {
      expect(v.price.includesDriver).toBe(true);
      expect(v.price.amountIdr).not.toBeNull();
      // Verify no self-drive price is hardcoded as an amount
      const services = v.services;
      if (services.includes("self-drive")) {
        // If self-drive is listed in services, the price amount must explicitly be for with-driver
        expect(v.price.includesDriver).toBe(true);
      }
    });
  });
});
