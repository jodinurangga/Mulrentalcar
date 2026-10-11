import { describe, it, expect } from "vitest";
import { filterVehicles, sortVehicles } from "@/lib/filters";
import { getAllVehicles } from "@/lib/vehicles";

describe("Filter & Search Logic (QA Checklist Section 5)", () => {
  const allVehicles = getAllVehicles();

  it("finds Avanza / Xenia when searching 'avanza'", () => {
    const results = filterVehicles(allVehicles, { query: "avanza" });
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("avanza-xenia");
  });

  it("performs case-insensitive search with 'AVANZA'", () => {
    const results = filterVehicles(allVehicles, { query: "AVANZA" });
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("avanza-xenia");
  });

  it("finds Avanza / Xenia when searching model alias 'xenia'", () => {
    const results = filterVehicles(allVehicles, { query: "xenia" });
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("avanza-xenia");
  });

  it("finds Rush / Terios when query has excess whitespace '  rush '", () => {
    const results = filterVehicles(allVehicles, { query: "  rush " });
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("rush-terios");
  });

  it("returns empty array for non-matching query 'zzz'", () => {
    const results = filterVehicles(allVehicles, { query: "zzz" });
    expect(results).toHaveLength(0);
  });

  it("filters by category 'van' returning 3 Hiace entries", () => {
    const results = filterVehicles(allVehicles, { category: "van" });
    expect(results).toHaveLength(3);
    const slugs = results.map((v) => v.slug);
    expect(slugs).toContain("hiace-commuter");
    expect(slugs).toContain("hiace-premio");
    expect(slugs).toContain("hiace-luxury");
  });

  it("filters by category 'premium' returning 1 Alphard entry", () => {
    const results = filterVehicles(allVehicles, { category: "premium" });
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("alphard");
  });

  it("filters by max price <= Rp650.000", () => {
    const results = filterVehicles(allVehicles, { maxPrice: 650000 });
    expect(results).toHaveLength(6);
    results.forEach((v) => {
      expect(v.price.amountIdr).toBeLessThanOrEqual(650000);
    });
  });
});

describe("Sorting Logic (QA Checklist Section 5)", () => {
  const allVehicles = getAllVehicles();

  it("sorts by price-asc with lowest price first (Brio / Agya @ Rp550.000)", () => {
    const sorted = sortVehicles(allVehicles, "price-asc");
    expect(sorted[0].slug).toBe("brio-agya");
    expect(sorted[0].price.amountIdr).toBe(550000);
  });

  it("sorts by price-desc with highest price first (Alphard / Hiace Luxury @ Rp2.500.000)", () => {
    const sorted = sortVehicles(allVehicles, "price-desc");
    expect(sorted[0].price.amountIdr).toBe(2500000);
  });

  it("sorts by name-asc alphabetically (Alphard first)", () => {
    const sorted = sortVehicles(allVehicles, "name-asc");
    expect(sorted[0].slug).toBe("alphard");
  });

  it("sorts by default order (Brio / Agya first)", () => {
    const sorted = sortVehicles(allVehicles, "default");
    expect(sorted[0].slug).toBe("brio-agya");
    expect(sorted[sorted.length - 1].slug).toBe("alphard");
  });
});
