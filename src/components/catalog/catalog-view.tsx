"use client";

import React, { useState, useEffect, useTransition, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { VehicleCard } from "./vehicle-card";
import { Button } from "@/components/ui/button";
import { filterVehicles, sortVehicles, type SortOption } from "@/lib/filters";
import { createRequestOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Vehicle, VehicleCategory } from "@/data/vehicles";

interface CatalogViewProps {
  initialVehicles: Vehicle[];
}

const CATEGORIES: { label: string; value: VehicleCategory | "all" }[] = [
  { label: "Semua Kategori", value: "all" },
  { label: "City Car", value: "city-car" },
  { label: "MPV", value: "mpv" },
  { label: "SUV", value: "suv" },
  { label: "Van / Minibus", value: "van" },
  { label: "Premium", value: "premium" },
];

const PRICE_FILTERS: { label: string; value: number }[] = [
  { label: "Semua Harga", value: 0 },
  { label: "Hingga Rp650.000", value: 650000 },
  { label: "Hingga Rp800.000", value: 800000 },
  { label: "Hingga Rp1.400.000", value: 1400000 },
  { label: "Hingga Rp2.500.000", value: 2500000 },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Urutan Rekomendasi", value: "default" },
  { label: "Harga: Termurah ke Termahal", value: "price-asc" },
  { label: "Harga: Termahal ke Termurah", value: "price-desc" },
  { label: "Nama: A ke Z", value: "name-asc" },
];

export function CatalogView({ initialVehicles }: CatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read states directly from URL query parameters (single source of truth)
  const paramQ = searchParams.get("q") || "";
  const selectedCategory = (searchParams.get("kategori") as VehicleCategory | null) || "all";
  const maxPrice = Number(searchParams.get("maxHarga")) || 0;
  const sortBy = (searchParams.get("urut") as SortOption) || "default";

  // Search input state for immediate typing responsiveness
  const [query, setQuery] = useState(paramQ);
  const [prevParamQ, setPrevParamQ] = useState(paramQ);

  if (paramQ !== prevParamQ) {
    setPrevParamQ(paramQ);
    setQuery(paramQ);
  }

  // Update URL query parameters seamlessly
  const updateUrlParams = (newParams: {
    q?: string;
    kategori?: string;
    maxHarga?: number;
    urut?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newParams.q !== undefined) {
      if (newParams.q.trim()) params.set("q", newParams.q.trim());
      else params.delete("q");
    }

    if (newParams.kategori !== undefined) {
      if (newParams.kategori !== "all") params.set("kategori", newParams.kategori);
      else params.delete("kategori");
    }

    if (newParams.maxHarga !== undefined) {
      if (newParams.maxHarga > 0) params.set("maxHarga", newParams.maxHarga.toString());
      else params.delete("maxHarga");
    }

    if (newParams.urut !== undefined) {
      if (newParams.urut !== "default") params.set("urut", newParams.urut);
      else params.delete("urut");
    }

    const newQueryString = params.toString();
    const newUrl = newQueryString ? `${pathname}?${newQueryString}` : pathname;

    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrlParams({ q: val });
  };

  const handleCategoryChange = (cat: VehicleCategory | "all") => {
    updateUrlParams({ kategori: cat });
  };

  const handleMaxPriceChange = (price: number) => {
    updateUrlParams({ maxHarga: price });
  };

  const handleSortChange = (sort: SortOption) => {
    updateUrlParams({ urut: sort });
  };

  const handleResetFilters = () => {
    setQuery("");
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  // Filter and sort the vehicles
  const filteredVehicles = useMemo(() => {
    const filtered = filterVehicles(initialVehicles, {
      query,
      category: selectedCategory,
      maxPrice: maxPrice > 0 ? maxPrice : undefined,
    });
    return sortVehicles(filtered, sortBy);
  }, [initialVehicles, query, selectedCategory, maxPrice, sortBy]);

  const hasActiveFilters = Boolean(
    query.trim() || selectedCategory !== "all" || maxPrice > 0 || sortBy !== "default"
  );

  const requestOrderUrl = buildWhatsAppUrl(
    createRequestOrderMessage(query.trim() || undefined)
  );

  return (
    <div className="space-y-8">
      {/* Controls: Search, Filter, and Sort Bar — Editorial Luxury */}
      <div className="bg-white p-6 sm:p-8 rounded-none border border-[#E5E0D4] space-y-6">
        {/* Top Row: Search and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-8 relative">
            <label htmlFor="catalog-search" className="sr-only">
              Cari nama atau tipe kendaraan
            </label>
            <div className="relative flex items-center">
              <Search
                className="w-4 h-4 text-[#5A626A] absolute left-3.5 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Cari armada (mis. Avanza, Xpander, Innova, Hiace)..."
                className="w-full pl-10 pr-10 py-3 min-h-[44px] bg-[#F7F4EC]/50 border border-[#E5E0D4] rounded-none text-sm text-[#20252B] placeholder:text-[#5A626A] focus-visible:outline-2 focus-visible:outline-[#C49A3A] transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  className="absolute right-3 p-1 text-[#5A626A] hover:text-[#20252B] focus-visible:outline-2 focus-visible:outline-[#C49A3A] rounded-none"
                  aria-label="Hapus kata kunci pencarian"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-4">
            <label htmlFor="sort-filter" className="sr-only">
              Urutkan armada
            </label>
            <select
              id="sort-filter"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="w-full px-3.5 py-3 min-h-[44px] bg-[#F7F4EC]/50 border border-[#E5E0D4] rounded-none text-sm text-[#20252B] focus-visible:outline-2 focus-visible:outline-[#C49A3A] transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Middle Row: Category Filter (Dropdown + Pills) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label htmlFor="category-filter" className="text-xs font-semibold text-[#7A5817] uppercase tracking-widest">
              Kategori Kendaraan
            </label>
          </div>

          {/* Mobile / Screen-reader Accessible Category Select */}
          <div className="sm:hidden mb-2">
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value as VehicleCategory | "all")}
              className="w-full px-3.5 py-2.5 min-h-[44px] bg-[#F7F4EC]/50 border border-[#E5E0D4] rounded-none text-sm text-[#20252B] focus-visible:outline-2 focus-visible:outline-[#C49A3A] transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop & Tablet Category Pills */}
          <div className="hidden sm:flex flex-wrap gap-2" role="group" aria-label="Filter kategori kendaraan">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 min-h-[38px] text-xs uppercase tracking-wider font-semibold rounded-none transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C49A3A] ${
                    isSelected
                      ? "bg-[#20252B] text-white border border-[#20252B] shadow-2xs"
                      : "bg-[#F7F4EC] text-[#5A626A] border border-[#E5E0D4] hover:border-[#C49A3A] hover:text-[#20252B]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Hidden select for direct testability/automation if pills rendered */}
          <select
            id="category-filter-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value as VehicleCategory | "all")}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bottom Row: Max Price Selector & Active Filters Indicator */}
        <div className="pt-4 border-t border-[#E5E0D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <label htmlFor="max-price-filter" className="text-xs font-semibold text-[#5A626A] uppercase tracking-wider shrink-0">
              Batas Maksimal Harga:
            </label>
            <select
              id="max-price-filter"
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
              className="w-full sm:w-auto px-3 py-2 bg-[#F7F4EC]/50 border border-[#E5E0D4] rounded-none text-xs text-[#20252B] focus-visible:outline-2 focus-visible:outline-[#C49A3A] cursor-pointer"
            >
              {PRICE_FILTERS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#B91C1C] hover:underline focus-visible:outline-2 focus-visible:outline-[#B91C1C] rounded-none cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Semua Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header: Count and Status */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-[#5A626A]" aria-live="polite">
          Menampilkan <strong className="text-[#20252B] font-bold">{filteredVehicles.length}</strong> dari {initialVehicles.length} armada
        </p>
        <span className="text-xs text-[#7A5817] uppercase tracking-wider font-medium hidden sm:inline">
          *Harga indikatif harian dengan sopir di Kota Medan &amp; sekitarnya
        </span>
      </div>

      {/* Fleet Grid or Empty State */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((vehicle, idx) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              priorityImage={idx < 3}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="bg-white border border-[#E5E0D4] rounded-none p-8 sm:p-14 text-center max-w-xl mx-auto space-y-4"
          role="status"
        >
          <div className="w-16 h-16 rounded-none bg-[#F7F4EC] border border-[#C49A3A]/40 flex items-center justify-center mx-auto text-[#9B7627]">
            <SlidersHorizontal className="w-8 h-8" aria-hidden="true" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#20252B]">
            Tidak Ada Armada yang Sesuai
          </h3>
          <p className="text-sm text-[#5A626A] leading-relaxed font-normal">
            Tidak ditemukan kendaraan dengan kriteria pencarian saat ini. Anda dapat mereset filter atau memesan armada khusus melalui fasilitas Request Order.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" onClick={handleResetFilters}>
              Reset Filter
            </Button>
            <a
              href={requestOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#128C7E] text-white hover:bg-[#075E54] font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-none shadow-2xs transition-colors focus-visible:outline-2 focus-visible:outline-[#C49A3A] min-h-[44px]"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Ajukan Request Order</span>
            </a>
          </div>
        </div>
      )}

      {/* Sticky Bottom Request Order Banner */}
      <div className="bg-[#F7F4EC] border border-[#E5E0D4] rounded-none p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C49A3A]" aria-hidden="true" />
        <div>
          <h4 className="font-editorial text-lg font-bold text-[#20252B]">
            Mencari Armada Lain yang Tidak Tercantum?
          </h4>
          <p className="text-xs sm:text-sm text-[#5A626A] mt-1 font-normal">
            Kami melayani Request Order untuk tipe mobil khusus, bus pariwisata, atau kebutuhan armada dalam jumlah besar.
          </p>
        </div>
        <a
          href={requestOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 bg-[#128C7E] text-white hover:bg-[#075E54] text-xs uppercase tracking-wider font-semibold px-5 py-3 rounded-none shadow-2xs transition-colors focus-visible:outline-2 focus-visible:outline-[#C49A3A] min-h-[44px]"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Request Order via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
