import { test, expect } from "@playwright/test";

test.describe("PT. MAULANA SADHA UTAMA — E2E User Flows", () => {
  test("1. Homepage loads successfully with branding and key sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/MUL Rent Car/);

    // Verify header branding
    const brand = page.locator("header").getByText("MUL Rent Car").first();
    await expect(brand).toBeVisible();

    // Verify hero section
    const heroHeading = page.getByRole("heading", { level: 1 });
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText("Medan");

    // Verify services section
    await expect(page.getByText("Solusi Transportasi Lengkap di Medan")).toBeVisible();

    // Verify featured vehicles section
    await expect(page.getByText("Kendaraan Populer & Terfavorit")).toBeVisible();

    // Verify footer disclaimer
    const footer = page.locator("footer");
    await expect(footer).toContainText("PT. MAULANA SADHA UTAMA");
    await expect(footer).toContainText("Harga yang tercantum adalah harga indikatif rental dengan sopir");
  });

  test("2. Navigates to catalog and displays all 14 vehicle groups", async ({ page }) => {
    await page.goto("/mobil");
    await expect(page).toHaveTitle(/Katalog Armada/);

    // Verify catalog header
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Pilihan Armada Rental Mobil Medan");

    // Verify result counter shows 14 vehicles
    await expect(page.getByText(/Menampilkan 14 dari 14 armada/)).toBeVisible();

    // Verify vehicle cards exist
    const cards = page.locator("article");
    await expect(cards).toHaveCount(14);
  });

  test("3. Search input filters vehicles by name and alias in real time", async ({ page }) => {
    await page.goto("/mobil");
    const searchInput = page.locator("#catalog-search");
    await expect(searchInput).toBeVisible();

    // Search for "avanza"
    await searchInput.fill("avanza");
    await page.waitForTimeout(300); // debounce

    await expect(page.getByText(/Menampilkan 1 dari 14 armada/)).toBeVisible();
    await expect(page.locator("article").first()).toContainText("Avanza / Xenia");

    // Search for alias "xenia"
    await searchInput.fill("xenia");
    await page.waitForTimeout(300);
    await expect(page.getByText(/Menampilkan 1 dari 14 armada/)).toBeVisible();
    await expect(page.locator("article").first()).toContainText("Avanza / Xenia");
  });

  test("4. Category and Max Price filter work correctly", async ({ page, isMobile }) => {
    await page.goto("/mobil");

    if (isMobile) {
      const categorySelect = page.locator("#category-filter");
      await categorySelect.selectOption("van");
    } else {
      const vanPill = page.getByRole("button", { name: /Van/i });
      await vanPill.click();
    }

    await expect(page.getByText(/Menampilkan 3 dari 14 armada/)).toBeVisible();
    const cards = page.locator("article");
    await expect(cards).toHaveCount(3);
    await expect(cards.first()).toContainText("Hiace");

    // Filter by Max Price (1.4m covers Commuter and Premio)
    const maxPriceSelect = page.locator("#max-price-filter");
    await maxPriceSelect.selectOption("1400000");

    await expect(page.getByText(/Menampilkan 2 dari 14 armada/)).toBeVisible();
    await expect(cards.first()).toContainText("Hiace");
  });

  test("5. Sorting vehicles by price and name works", async ({ page }) => {
    await page.goto("/mobil");
    const sortSelect = page.locator("#sort-filter");

    // Sort cheapest first
    await sortSelect.selectOption("price-asc");
    const firstCardAsc = page.locator("article").first();
    await expect(firstCardAsc).toContainText("Brio / Agya");

    // Sort most expensive first
    await sortSelect.selectOption("price-desc");
    const firstCardDesc = page.locator("article").first();
    // Alphard or Hiace Luxury @ 2.5m
    await expect(firstCardDesc).toContainText("Rp2.500.000");

    // Sort alphabetically
    await sortSelect.selectOption("name-asc");
    const firstCardAlpha = page.locator("article").first();
    await expect(firstCardAlpha).toContainText("Alphard");
  });

  test("6. URL query parameters restore filter state on reload", async ({ page }) => {
    await page.goto("/mobil?kategori=van&urut=price-asc");

    // 3 Hiace vehicles displayed
    await expect(page.getByText(/Menampilkan 3 dari 14 armada/)).toBeVisible();

    // Verify reset button clears URL params and resets list to 14
    const resetButton = page.getByRole("button", { name: /Reset/i });
    await resetButton.click();
    await expect(page.getByText(/Menampilkan 14 dari 14 armada/)).toBeVisible();
  });

  test("7. Opens vehicle detail page with accurate indicative pricing and WhatsApp CTA", async ({ page }) => {
    await page.goto("/mobil/xpander");
    await expect(page).toHaveTitle(/Sewa Xpander Medan/);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Xpander");

    // Price display & badges
    await expect(page.getByText("Rp650.000").first()).toBeVisible();
    await expect(page.getByText("Termasuk Sopir").first()).toBeVisible();
    await expect(page.getByText("Area Medan & Sekitarnya").first()).toBeVisible();

    // WhatsApp CTA button check
    const waButton = page.locator("main").getByRole("link", { name: /Tanyakan Ketersediaan/i }).first();
    await expect(waButton).toBeVisible();
    const href = await waButton.getAttribute("href");
    expect(href).toContain("https://wa.me/6281262679533");
    expect(href).toContain("Xpander");
    expect(href).toContain("Rp650.000");

    // Verify pricing terms note
    await expect(page.getByText("Ketentuan Layanan Sewa:")).toBeVisible();
    await expect(page.getByText(/Belum termasuk: BBM, tol, parkir/)).toBeVisible();

    // Verify related vehicles section
    await expect(page.getByText("Pilihan Armada Lainnya")).toBeVisible();
  });

  test("8. Invalid vehicle slug renders custom 404 page", async ({ page }) => {
    const response = await page.goto("/mobil/kendaraan-fiktif-tidak-ada");
    expect(response?.status()).toBe(404);

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Halaman Tidak Ditemukan");
    const backToHome = page.getByRole("link", { name: /Kembali ke Beranda/i });
    await expect(backToHome).toBeVisible();
  });

  test("9. Contact page loads with official NAP and QuoteForm client validation", async ({ page }) => {
    await page.goto("/kontak");
    await expect(page).toHaveTitle(/Kontak Kami/);

    // Verify official WhatsApp & email in main content
    await expect(page.locator("main").getByRole("link", { name: /0812 6267 9533/ }).first()).toBeVisible();
    await expect(page.locator("main").getByText("Mulrentcarindonesia@gmail.com").first()).toBeVisible();

    // Try submitting empty form to verify client-side validation
    const submitBtn = page.locator("main").getByRole("button", { name: /Kirim Permintaan via WhatsApp/i });
    await submitBtn.click();

    await expect(page.getByText("Nama wajib diisi")).toBeVisible();
    await expect(page.getByText("Nomor WhatsApp wajib diisi")).toBeVisible();
    await expect(page.getByText("Tanggal mulai wajib dipilih")).toBeVisible();
  });

  test("10. About Us page displays official profile, vision, and mission verbatim", async ({ page }) => {
    await page.goto("/tentang-kami");
    await expect(page).toHaveTitle(/Tentang Kami/);

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Solusi Transportasi Tepercaya di Medan");

    // Official Vision
    await expect(
      page.getByText("memberikan servis terbaik kepada pelanggan, menjadi perusahaan transportasi terdepan", { exact: false })
    ).toBeVisible();

    // Official Mission
    await expect(page.getByText("Memberikan Solusi Transportasi kepada Mitra")).toBeVisible();
    await expect(page.getByText("Menyediakan Kendaraan Optimal dan Terbaru")).toBeVisible();
    await expect(page.getByText("Membangun Kinerja yang Memuaskan untuk Penyewa")).toBeVisible();
  });

  test("11. Services page renders all 7 anchored sections", async ({ page }) => {
    await page.goto("/layanan");
    await expect(page).toHaveTitle(/Layanan Rental Mobil Medan/);

    await expect(page.locator("#dengan-sopir")).toBeVisible();
    await expect(page.locator("#lepas-kunci")).toBeVisible();
    await expect(page.locator("#perjalanan-dinas")).toBeVisible();
    await expect(page.locator("#wedding-car")).toBeVisible();
    await expect(page.locator("#rental-hiace")).toBeVisible();
    await expect(page.locator("#bus-pariwisata")).toBeVisible();
    await expect(page.locator("#request-order")).toBeVisible();

    // Verify self-drive section does not fabricate indicative prices
    const lepasKunciSection = page.locator("#lepas-kunci");
    await expect(lepasKunciSection).toContainText("Harga Berdasarkan Penawaran");
  });

  test("12. Terms & Conditions page displays driver, self-drive, corporate, and privacy note", async ({ page }) => {
    await page.goto("/syarat-ketentuan");
    await expect(page).toHaveTitle(/Syarat & Ketentuan/);

    // Verify privacy alert
    await expect(page.getByText("Jangan mengirim foto identitas asli (KTP, SIM, NPWP)", { exact: false })).toBeVisible();

    // Verify sections
    await expect(page.locator("#dengan-sopir")).toBeVisible();
    await expect(page.locator("#lepas-kunci")).toBeVisible();
    await expect(page.locator("#perusahaan")).toBeVisible();
  });
});
