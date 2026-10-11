import { test, expect } from "@playwright/test";

test.describe("Vehicle Image Integration & Fallback Verification", () => {
  test("Catalog renders 13 vehicle photographs and 1 luxury fallback", async ({ page }) => {
    const brokenImages: string[] = [];

    page.on("response", (response) => {
      if (
        response.url().includes("/images/vehicles/") &&
        response.status() >= 400
      ) {
        brokenImages.push(`${response.status()}: ${response.url()}`);
      }
    });

    await page.goto("/mobil");
    await expect(page).toHaveTitle(/Katalog Armada/);

    const cards = page.locator("article");
    await expect(cards).toHaveCount(14);

    for (let i = 0; i < 14; i++) {
      const card = cards.nth(i);
      await card.scrollIntoViewIfNeeded();
      const cardText = await card.innerText();

      if (cardText.includes("Hiace Luxury")) {
        await expect(card.getByText("Foto segera tersedia")).toBeVisible();
        await expect(card.getByText("Armada tahun 2022 ke atas")).toBeVisible();
        await expect(card.locator("img")).toHaveCount(0);
      } else {
        const img = card.locator("img");
        await expect(img).toBeVisible();
        await page.waitForFunction(
          (el) => (el as HTMLImageElement).naturalWidth > 0,
          await img.elementHandle()
        );
      }
    }

    // Assert no 404 or broken image responses
    expect(brokenImages).toEqual([]);
  });

  test("Detail page for Alphard renders high quality vehicle photograph", async ({ page }) => {
    await page.goto("/mobil/alphard");
    await expect(page).toHaveTitle(/Alphard/);

    const mainCol = page.locator(".lg\\:col-span-7");
    const img = mainCol.locator("img");
    await expect(img).toHaveCount(1);
    await expect(img).toBeVisible();

    await page.waitForFunction(
      (el) => (el as HTMLImageElement).naturalWidth > 0,
      await img.elementHandle()
    );
  });

  test("Detail page for Hiace Luxury gracefully renders editorial fallback", async ({ page }) => {
    await page.goto("/mobil/hiace-luxury");
    await expect(page).toHaveTitle(/Hiace Luxury/);

    const mainCol = page.locator(".lg\\:col-span-7");
    await expect(mainCol.getByText("Foto segera tersedia")).toBeVisible();
    await expect(mainCol.getByText("Armada tahun 2022 ke atas")).toBeVisible();
    await expect(mainCol.locator("img")).toHaveCount(0);
  });
});
