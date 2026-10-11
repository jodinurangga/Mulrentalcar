import { siteConfig } from "@/config/site";
import { formatIdr } from "./format";
import type { Vehicle } from "@/data/vehicles";

/**
 * WhatsApp Helper & Template Generator — PT. MAULANA SADHA UTAMA (MUL Rent Car)
 *
 * Source of truth: PRD Section 14.5, 17, 18.2
 * Mandatory rule: WhatsApp number is imported strictly from siteConfig.
 */

/**
 * Builds a direct wa.me URL with pre-filled message text.
 */
export function buildWhatsAppUrl(message: string): string {
  const cleanNumber = siteConfig.whatsapp.number.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp Template: Tanya Ketersediaan Kendaraan
 */
export function createVehicleInquiryMessage(vehicle: Vehicle): string {
  const isGrouped = vehicle.name.includes("/");
  const unitNote = isGrouped ? " (unit sesuai ketersediaan)" : "";
  const priceDisplay =
    vehicle.price.amountIdr !== null
      ? `${formatIdr(vehicle.price.amountIdr)} / hari (dengan sopir, Medan & sekitarnya)`
      : "Harga berdasarkan penawaran";

  return [
    `Halo PT. MAULANA SADHA UTAMA (MUL Rent Car),`,
    `Saya ingin menanyakan ketersediaan armada berikut:`,
    `- Kendaraan: ${vehicle.name}${unitNote}`,
    `- Estimasi Harga Indikatif: ${priceDisplay}`,
    `- Tanggal Sewa: [Mohon sebutkan tanggal]`,
    `- Durasi: [Mohon sebutkan durasi hari]`,
    `- Rute / Tujuan: [Dalam Kota Medan / Luar Kota]`,
    ``,
    `Apakah unit tersedia untuk jadwal tersebut? Terima kasih.`,
  ].join("\n");
}

/**
 * WhatsApp Template: Tanya Layanan Tertentu
 */
export function createServiceInquiryMessage(serviceName: string): string {
  return [
    `Halo PT. MAULANA SADHA UTAMA (MUL Rent Car),`,
    `Saya tertarik untuk berkonsultasi mengenai layanan: ${serviceName}.`,
    ``,
    `- Tanggal / Periode: [Isi tanggal]`,
    `- Kebutuhan Armada: [Isi tipe armada / jumlah orang]`,
    `- Lokasi / Rute: [Isi tujuan perjalanan]`,
    ``,
    `Mohon informasi lebih lanjut dan penawaran harganya. Terima kasih.`,
  ].join("\n");
}

/**
 * WhatsApp Template: Konsultasi Layanan Korporat & Dinas
 */
export function createCorporateInquiryMessage(): string {
  return [
    `Halo PT. MAULANA SADHA UTAMA (MUL Rent Car),`,
    `Saya ingin berkonsultasi mengenai penyewaan kendaraan untuk kebutuhan Perusahaan / Perjalanan Dinas.`,
    ``,
    `- Nama Perusahaan / Instansi: [Isi nama perusahaan]`,
    `- Jenis Layanan: [Harian / Bulanan / Kontrak Jangka Panjang]`,
    `- Kebutuhan Armada: [Tipe kendaraan & jumlah unit]`,
    `- Estimasi Periode: [Tanggal mulai - selesai]`,
    ``,
    `Mohon info prosedur kerja sama dan penawaran resmi (termasuk ketentuan PPN/PPh). Terima kasih.`,
  ].join("\n");
}

/**
 * WhatsApp Template: Request Order (Mobil Tidak Ada di Katalog)
 */
export function createRequestOrderMessage(requestedVehicle?: string): string {
  return [
    `Halo PT. MAULANA SADHA UTAMA (MUL Rent Car),`,
    `Saya ingin menanyakan ketersediaan kendaraan khusus melalui Request Order:`,
    `- Kendaraan yang dicari: ${requestedVehicle || "[Sebutkan jenis kendaraan]"}`,
    `- Tanggal Penggunaan: [Isi tanggal]`,
    `- Durasi: [Isi durasi]`,
    `- Rute / Tujuan: [Isi tujuan]`,
    ``,
    `Apakah PT. Maulana Sadha Utama dapat menyediakan unit tersebut? Terima kasih.`,
  ].join("\n");
}

/**
 * WhatsApp Template: Konsultasi Umum
 */
export function createGeneralInquiryMessage(): string {
  return [
    `Halo PT. MAULANA SADHA UTAMA (MUL Rent Car),`,
    `Saya ingin menanyakan informasi layanan sewa mobil di Medan.`,
    ``,
    `Mohon bantuannya. Terima kasih.`,
  ].join("\n");
}

/**
 * Input Data untuk Formulir Penawaran
 */
export interface QuoteFormData {
  name: string;
  phone?: string;
  service: string;
  vehicleName?: string;
  startDate: string;
  durationDays: string;
  route: string;
  notes?: string;
}

/**
 * WhatsApp Template: Formulir Minta Penawaran
 */
export function createQuoteFormMessage(data: QuoteFormData): string {
  return [
    `Halo PT. MAULANA SADHA UTAMA (MUL Rent Car),`,
    `Saya ingin mengajukan permintaan penawaran sewa mobil dengan rincian berikut:`,
    `- Nama Pemesan: ${data.name}`,
    data.phone ? `- No. WhatsApp: ${data.phone}` : null,
    `- Layanan: ${data.service}`,
    data.vehicleName ? `- Pilihan Armada: ${data.vehicleName}` : null,
    `- Tanggal Mulai: ${data.startDate}`,
    `- Durasi: ${data.durationDays} hari`,
    `- Rute / Tujuan: ${data.route}`,
    data.notes ? `- Catatan Tambahan: ${data.notes}` : null,
    ``,
    `Mohon rincian penawaran dan ketersediaan unit. Terima kasih.`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
