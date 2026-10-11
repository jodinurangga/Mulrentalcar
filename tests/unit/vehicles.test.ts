import { describe, it, expect } from "vitest";
import { getAllVehicles, getVehicleBySlug, getFeaturedVehicles, getAllVehicleSlugs } from "@/lib/vehicles";
import { vehiclesData, VehicleSchema } from "@/data/vehicles";

describe("Vehicles Data Integrity & PRD Section 14.3 Compliance", () => {
  it("should have exactly 14 vehicle groups as defined in PRD Section 14.3", () => {
    const vehicles = getAllVehicles();
    expect(vehicles).toHaveLength(14);
  });

  it("should have valid schema for all vehicle records", () => {
    vehiclesData.forEach((vehicle) => {
      const parsed = VehicleSchema.safeParse(vehicle);
      expect(parsed.success).toBe(true);
    });
  });

  it("should have unique, valid slugs matching ^[a-z0-9]+(-[a-z0-9]+)*$", () => {
    const slugs = getAllVehicleSlugs();
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(14);

    const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    slugs.forEach((slug) => {
      expect(slug).toMatch(slugRegex);
    });
  });

  it("should match exact indicative with-driver prices from PRD Section 14.3", () => {
    const expectedPrices: Record<string, number> = {
      "brio-agya": 550000,
      "avanza-xenia": 600000,
      "rocky-raize": 600000,
      "xpander": 650000,
      "rush-terios": 650000,
      "honda-brv": 650000,
      "innova-reborn-diesel": 750000,
      "innova-zenix-g": 800000,
      "innova-zenix-q-sunroof": 1100000,
      "fortuner-gr-pajero": 1100000,
      "hiace-commuter": 1300000,
      "hiace-premio": 1400000,
      "hiace-luxury": 2500000,
      "alphard": 2500000,
    };

    Object.entries(expectedPrices).forEach(([slug, expectedPrice]) => {
      const vehicle = getVehicleBySlug(slug);
      expect(vehicle, `Vehicle with slug '${slug}' must exist`).toBeDefined();
      expect(vehicle?.price.amountIdr).toBe(expectedPrice);
      expect(vehicle?.price.unit).toBe("per-day");
      expect(vehicle?.price.scope).toBe("Kota Medan dan sekitarnya");
      expect(vehicle?.price.includesDriver).toBe(true);
      expect(vehicle?.price.mode).toBe("indicative");
    });
  });

  it("should not fabricate specs and should maintain strict image integrity", () => {
    getAllVehicles().forEach((vehicle) => {
      // Must not contain fabricated passenger count or transmission in MVP
      expect((vehicle as unknown as Record<string, unknown>).seats).toBeUndefined();
      expect((vehicle as unknown as Record<string, unknown>).transmission).toBeUndefined();

      if (vehicle.slug === "hiace-luxury") {
        // Hiace Luxury requires client interior cabin photos — must retain fallback empty array
        expect(vehicle.images).toEqual([]);
      } else {
        // 13 vehicles have verified reference photos
        expect(vehicle.images.length).toBe(1);
        expect(vehicle.images[0].src).toMatch(/^\/images\/vehicles\/[a-z0-9-]+\.webp$/);
        expect(vehicle.images[0].alt).toContain("Foto referensi model");
      }
    });
  });

  it("should return undefined for non-existent or unpublished slugs", () => {
    expect(getVehicleBySlug("mobil-tidak-ada")).toBeUndefined();
    expect(getVehicleBySlug("")).toBeUndefined();
  });

  it("should return featured vehicles properly", () => {
    const featured = getFeaturedVehicles();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(7);
    featured.forEach((v) => {
      expect(v.featured).toBe(true);
    });
  });

  it("should verify all referenced vehicle images exist on disk", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");

    for (const vehicle of getAllVehicles()) {
      for (const img of vehicle.images) {
        const filePath = path.join(process.cwd(), "public", img.src.replace(/^\//, ""));
        expect(fs.existsSync(filePath)).toBe(true);
        const stat = fs.statSync(filePath);
        expect(stat.size).toBeGreaterThan(10000); // At least 10KB
        expect(stat.size).toBeLessThan(500000); // Under 500KB
      }
    }
  });
});
