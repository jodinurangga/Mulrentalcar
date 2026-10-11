import { describe, it, expect } from "vitest";
import {
  buildWhatsAppUrl,
  createVehicleInquiryMessage,
  createServiceInquiryMessage,
  createCorporateInquiryMessage,
  createRequestOrderMessage,
  createQuoteFormMessage,
} from "@/lib/whatsapp";
import { getVehicleBySlug } from "@/lib/vehicles";
import { siteConfig } from "@/config/site";

describe("WhatsApp Utilities & Message Templates", () => {
  it("builds correct URL targeting siteConfig WhatsApp number", () => {
    const testMsg = "Halo MUL Rent Car!";
    const url = buildWhatsAppUrl(testMsg);
    expect(url).toBe(`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(testMsg)}`);
    expect(url).toContain("6281262679533");
  });

  it("does not contain 'undefined' or 'null' text in built URL", () => {
    const url = buildWhatsAppUrl("Halo!");
    expect(url).not.toContain("undefined");
    expect(url).not.toContain("null");
  });

  it("creates accurate vehicle inquiry message with price and scope", () => {
    const xpander = getVehicleBySlug("xpander");
    expect(xpander).toBeDefined();
    if (!xpander) return;

    const message = createVehicleInquiryMessage(xpander);
    expect(message).toContain("Xpander");
    expect(message).toContain("Rp650.000");
    expect(message).toContain("dengan sopir, Medan & sekitarnya");
  });

  it("adds '(unit sesuai ketersediaan)' note for grouped models like Avanza / Xenia", () => {
    const avanzaXenia = getVehicleBySlug("avanza-xenia");
    expect(avanzaXenia).toBeDefined();
    if (!avanzaXenia) return;

    const message = createVehicleInquiryMessage(avanzaXenia);
    expect(message).toContain("Avanza / Xenia (unit sesuai ketersediaan)");
  });

  it("creates corporate inquiry message mentioning corporate needs", () => {
    const message = createCorporateInquiryMessage();
    expect(message).toContain("Perusahaan / Perjalanan Dinas");
    expect(message).toContain("PPN/PPh");
  });

  it("creates service inquiry message for specific service", () => {
    const message = createServiceInquiryMessage("Sewa Lepas Kunci");
    expect(message).toContain("Sewa Lepas Kunci");
  });

  it("creates request order message with requested model name", () => {
    const message = createRequestOrderMessage("Camry Hybrid");
    expect(message).toContain("Camry Hybrid");
  });

  it("creates quote form message correctly without undefined fields", () => {
    const message = createQuoteFormMessage({
      name: "Budi Santoso",
      phone: "08123456789",
      service: "Sewa dengan Sopir",
      vehicleName: "Innova Reborn Diesel",
      startDate: "2026-11-01",
      durationDays: "3",
      route: "Medan - Berastagi - Danau Toba",
      notes: "Jemput di Bandara Kualanamu",
    });

    expect(message).toContain("Budi Santoso");
    expect(message).toContain("08123456789");
    expect(message).toContain("Innova Reborn Diesel");
    expect(message).toContain("3 hari");
    expect(message).toContain("Medan - Berastagi - Danau Toba");
    expect(message).not.toContain("undefined");
  });
});
