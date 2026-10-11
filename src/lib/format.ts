/**
 * Formatting Utilities — PT. MAULANA SADHA UTAMA (MUL Rent Car)
 *
 * Mandatory rule: Single source for price formatting across the entire app.
 */

/**
 * Format currency amount to IDR string (e.g. 550000 -> "Rp550.000")
 * If amount is null or undefined (e.g. quote mode or self-drive), returns "Harga berdasarkan penawaran"
 * If amount is 0, returns "Rp0"
 */
export function formatIdr(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    return "Harga berdasarkan penawaran";
  }

  // Indonesian Rupiah formatted with thousands dot separator
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  // Normalize non-breaking spaces if any
  return formatted.replace(/\s+/g, "");
}

/**
 * Format phone number from 6281262679533 to readable "0812 6267 9533"
 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) {
    const local = "0" + digits.slice(2);
    // Format 0812 6267 9533
    return local.replace(/(\d{4})(\d{4})(\d+)/, "$1 $2 $3").trim();
  }
  return raw;
}
