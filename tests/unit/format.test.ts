import { describe, it, expect } from "vitest";
import { formatIdr, formatPhone } from "@/lib/format";

describe("formatIdr Utility", () => {
  it("formats positive numbers to IDR currency with thousands separators", () => {
    expect(formatIdr(550000)).toBe("Rp550.000");
    expect(formatIdr(600000)).toBe("Rp600.000");
    expect(formatIdr(1100000)).toBe("Rp1.100.000");
    expect(formatIdr(2500000)).toBe("Rp2.500.000");
  });

  it("formats zero to Rp0", () => {
    expect(formatIdr(0)).toBe("Rp0");
  });

  it("returns 'Harga berdasarkan penawaran' for null and undefined", () => {
    expect(formatIdr(null)).toBe("Harga berdasarkan penawaran");
    expect(formatIdr(undefined)).toBe("Harga berdasarkan penawaran");
  });
});

describe("formatPhone Utility", () => {
  it("formats 6281262679533 to readable 0812 6267 9533", () => {
    expect(formatPhone("6281262679533")).toBe("0812 6267 9533");
  });

  it("handles string with special characters", () => {
    expect(formatPhone("+62 812-6267-9533")).toBe("0812 6267 9533");
  });
});
