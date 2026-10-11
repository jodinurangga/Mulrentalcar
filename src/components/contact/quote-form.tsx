"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import {
  buildWhatsAppUrl,
  createQuoteFormMessage,
  type QuoteFormData,
} from "@/lib/whatsapp";
import { getAllVehicles } from "@/lib/vehicles";

const serviceOptions = [
  "Sewa Mobil dengan Sopir",
  "Sewa Mobil Lepas Kunci (Self-Drive)",
  "Perjalanan Dinas & Korporat",
  "Wedding Car / Mobil Pengantin",
  "Rental Toyota Hiace",
  "Bus Pariwisata",
  "Request Order (Kendaraan Khusus)",
];

export function QuoteForm() {
  const vehicles = getAllVehicles();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: serviceOptions[0],
    vehicleName: "",
    startDate: "",
    durationDays: "1",
    route: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Today in YYYY-MM-DD format for date input min
  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    } else if (formData.name.trim().length > 80) {
      newErrors.name = "Nama maksimal 80 karakter";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor WhatsApp wajib diisi";
    } else if (!/^[0-9+-\s]{8,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Format nomor WhatsApp tidak valid";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Tanggal mulai wajib dipilih";
    } else if (formData.startDate < today) {
      newErrors.startDate = "Tanggal mulai tidak boleh di masa lalu";
    }

    const durationNum = parseInt(formData.durationDays, 10);
    if (!formData.durationDays || isNaN(durationNum) || durationNum < 1 || durationNum > 365) {
      newErrors.durationDays = "Durasi sewa harus antara 1 sampai 365 hari";
    }

    if (formData.route.length > 200) {
      newErrors.route = "Rute/tujuan maksimal 200 karakter";
    }

    if (formData.notes.length > 500) {
      newErrors.notes = "Catatan tambahan maksimal 500 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const quoteData: QuoteFormData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      vehicleName: formData.vehicleName || undefined,
      startDate: formData.startDate,
      durationDays: formData.durationDays,
      route: formData.route.trim() || "Kota Medan dan sekitarnya",
      notes: formData.notes.trim() || undefined,
    };

    const message = createQuoteFormMessage(quoteData);
    const waUrl = buildWhatsAppUrl(message);

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="bg-white border border-[#E5E0D4] p-8 md:p-12 relative shadow-xs">
      <div className="absolute top-0 left-0 w-24 h-1 bg-[#C49A3A]" />
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#C49A3A] mb-2">
          <span className="w-4 h-px bg-[#C49A3A]" />
          Permintaan Resmi
        </div>
        <h2 className="font-editorial text-2xl md:text-3xl font-normal text-[#20252B] tracking-tight">
          Formulir Permintaan Penawaran
        </h2>
        <p className="text-xs md:text-sm text-[#5A626A] mt-2 leading-relaxed">
          Lengkapi data perjalanan Anda. Formulir ini akan menyusun pesan rapi untuk dikirimkan langsung melalui WhatsApp admin kami.
        </p>
      </div>

      {submitted && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 p-5 bg-[#F7F4EC] border-l-4 border-emerald-600 border border-[#E5E0D4] text-[#20252B]"
        >
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold text-[#20252B] uppercase tracking-wide">
                Pesan Anda telah disiapkan di WhatsApp
              </h3>
              <p className="text-xs text-[#5A626A] mt-1.5 leading-relaxed">
                Permintaan baru diproses setelah Anda menekan tombol kirim di aplikasi WhatsApp. Pastikan jendela chat telah terbuka.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs font-bold text-[#C49A3A] uppercase tracking-wider underline hover:text-[#9B7627] transition-colors"
              >
                Buat Permintaan Baru
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice Banner */}
      <div className="mb-8 p-4 bg-[#F7F4EC] border-l-2 border-[#C49A3A] border border-[#E5E0D4] flex items-start gap-3 text-xs text-[#5A626A]">
        <ShieldAlert className="w-4 h-4 text-[#C49A3A] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong className="text-[#20252B] font-semibold">Perhatian Privasi:</strong> Website ini tidak menyimpan data pribadi Anda. Jangan mengirimkan dokumen identitas fisik (KTP, SIM, NPWP) melalui formulir ini.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Nama & Telepon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              id="form-name"
              type="text"
              required
              maxLength={80}
              placeholder="Contoh: Budi Santoso"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-4 py-3 rounded-none border text-sm text-[#20252B] placeholder:text-neutral-400 focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-colors ${
                errors.name ? "border-red-500 bg-red-50/20" : "border-[#E5E0D4] bg-white"
              }`}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="form-phone" className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
              Nomor WhatsApp Anda <span className="text-red-500">*</span>
            </label>
            <input
              id="form-phone"
              type="tel"
              required
              placeholder="Contoh: 08123456789"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full px-4 py-3 rounded-none border text-sm text-[#20252B] placeholder:text-neutral-400 focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-colors ${
                errors.phone ? "border-red-500 bg-red-50/20" : "border-[#E5E0D4] bg-white"
              }`}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Layanan & Pilihan Armada */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="form-service" className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
              Jenis Layanan <span className="text-red-500">*</span>
            </label>
            <select
              id="form-service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 rounded-none border border-[#E5E0D4] bg-white text-sm text-[#20252B] focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-colors"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="form-vehicle" className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
              Pilihan Armada <span className="text-neutral-400 font-normal lowercase">(opsional)</span>
            </label>
            <select
              id="form-vehicle"
              value={formData.vehicleName}
              onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
              className="w-full px-4 py-3 rounded-none border border-[#E5E0D4] bg-white text-sm text-[#20252B] focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-colors"
            >
              <option value="">Belum Memilih / Fleksibel</option>
              {vehicles.map((v) => (
                <option key={v.slug} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tanggal & Durasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="form-start-date" className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
              Tanggal Mulai Sewa <span className="text-red-500">*</span>
            </label>
            <input
              id="form-start-date"
              type="date"
              required
              min={today}
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              aria-invalid={errors.startDate ? "true" : "false"}
              aria-describedby={errors.startDate ? "start-date-error" : undefined}
              className={`w-full px-4 py-3 rounded-none border text-sm text-[#20252B] focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-colors ${
                errors.startDate ? "border-red-500 bg-red-50/20" : "border-[#E5E0D4] bg-white"
              }`}
            />
            {errors.startDate && (
              <p id="start-date-error" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="form-duration" className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
              Durasi Sewa (Hari) <span className="text-red-500">*</span>
            </label>
            <input
              id="form-duration"
              type="number"
              min={1}
              max={365}
              required
              value={formData.durationDays}
              onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
              aria-invalid={errors.durationDays ? "true" : "false"}
              aria-describedby={errors.durationDays ? "duration-error" : undefined}
              className={`w-full px-4 py-3 rounded-none border text-sm text-[#20252B] focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-colors ${
                errors.durationDays ? "border-red-500 bg-red-50/20" : "border-[#E5E0D4] bg-white"
              }`}
            />
            {errors.durationDays && (
              <p id="duration-error" className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.durationDays}
              </p>
            )}
          </div>
        </div>

        {/* Rute & Tujuan */}
        <div>
          <label htmlFor="form-route" className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
            Rute / Lokasi Tujuan <span className="text-neutral-400 font-normal lowercase">(opsional)</span>
          </label>
          <input
            id="form-route"
            type="text"
            maxLength={200}
            placeholder="Contoh: Dalam Kota Medan, Medan - Parapat / Danau Toba, Bandara Kualanamu"
            value={formData.route}
            onChange={(e) => setFormData({ ...formData, route: e.target.value })}
            className="w-full px-4 py-3 rounded-none border border-[#E5E0D4] bg-white text-sm text-[#20252B] placeholder:text-neutral-400 focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-colors"
          />
        </div>

        {/* Catatan Tambahan */}
        <div>
          <label htmlFor="form-notes" className="block text-xs font-bold uppercase tracking-wider text-[#20252B] mb-2">
            Catatan Tambahan <span className="text-neutral-400 font-normal lowercase">(opsional)</span>
          </label>
          <textarea
            id="form-notes"
            rows={3}
            maxLength={500}
            placeholder="Contoh: Butuh penjemputan jam 08.00 WIB di hotel, permintaan faktur pajak korporat, dsb."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-none border border-[#E5E0D4] bg-white text-sm text-[#20252B] placeholder:text-neutral-400 focus:outline-none focus:border-[#C49A3A] focus:ring-1 focus:ring-[#C49A3A] transition-colors"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-4 rounded-none uppercase tracking-wider text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 cursor-pointer"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Kirim Permintaan via WhatsApp</span>
          </button>
          <p className="text-[11px] text-[#5A626A] text-center mt-2.5">
            Dengan menekan tombol di atas, Anda akan dialihkan ke aplikasi WhatsApp untuk konfirmasi pesan.
          </p>
        </div>
      </form>
    </div>
  );
}
