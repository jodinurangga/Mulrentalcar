import { defineConfig, devices } from "@playwright/test";

if (!process.env.PLAYWRIGHT_BROWSERS_PATH) {
  process.env.PLAYWRIGHT_BROWSERS_PATH = "D:\\.playwright-browsers";
}

const PORT = process.env.PORT || (process.env.PLAYWRIGHT_USE_STATIC === "1" ? "3005" : "3000");
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: process.env.PLAYWRIGHT_USE_STATIC === "1" ? "node scripts/serve-static.mjs" : "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
