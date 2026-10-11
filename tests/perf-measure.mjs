process.env.PLAYWRIGHT_BROWSERS_PATH = "D:\\.playwright-browsers";
import { chromium } from "playwright";

const PAGES = [
  { name: "Homepage", url: "http://localhost:3000/" },
  { name: "Catalog", url: "http://localhost:3000/mobil" },
  { name: "Vehicle Detail", url: "http://localhost:3000/mobil/xpander" },
  { name: "Services", url: "http://localhost:3000/layanan" },
  { name: "Contact", url: "http://localhost:3000/kontak" },
];

async function measurePage(browser, pageConfig, isMobile = false) {
  const context = await browser.newContext({
    viewport: isMobile ? { width: 375, height: 812 } : { width: 1280, height: 800 },
    isMobile: isMobile,
    userAgent: isMobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1"
      : undefined,
  });

  const page = await context.newPage();
  
  const resourceMetrics = {
    totalBytes: 0,
    jsBytes: 0,
    cssBytes: 0,
    imgBytes: 0,
    fontBytes: 0,
    documentBytes: 0,
    requestCount: 0,
  };

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  page.on("response", async (res) => {
    try {
      const buffer = await res.body();
      const bytes = buffer.length;
      resourceMetrics.totalBytes += bytes;
      resourceMetrics.requestCount += 1;

      const url = res.url();
      const contentType = res.headers()["content-type"] || "";

      if (contentType.includes("javascript") || url.endsWith(".js")) {
        resourceMetrics.jsBytes += bytes;
      } else if (contentType.includes("css") || url.endsWith(".css")) {
        resourceMetrics.cssBytes += bytes;
      } else if (contentType.includes("image") || url.match(/\.(png|jpe?g|webp|svg|gif|ico)/)) {
        resourceMetrics.imgBytes += bytes;
      } else if (contentType.includes("font") || url.match(/\.(woff2?|ttf|otf)/)) {
        resourceMetrics.fontBytes += bytes;
      } else if (contentType.includes("html")) {
        resourceMetrics.documentBytes += bytes;
      }
    } catch {
      // Ignore response body read errors (aborted or static)
    }
  });

  await page.goto(pageConfig.url, { waitUntil: "networkidle" });

  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      let cls = 0;
      let lcp = 0;
      let fcp = 0;

      // FCP
      const paintEntries = performance.getEntriesByType("paint");
      for (const entry of paintEntries) {
        if (entry.name === "first-contentful-paint") {
          fcp = entry.startTime;
        }
      }

      // CLS
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });

      // LCP
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          lcp = entries[entries.length - 1].startTime;
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });

      const navEntry = performance.getEntriesByType("navigation")[0];
      const domContentLoaded = navEntry ? navEntry.domContentLoadedEventEnd - navEntry.startTime : 0;
      const loadEvent = navEntry ? navEntry.loadEventEnd - navEntry.startTime : 0;

      setTimeout(() => {
        resolve({
          fcp: Math.round(fcp),
          lcp: Math.round(lcp),
          cls: Number(cls.toFixed(4)),
          domContentLoaded: Math.round(domContentLoaded),
          loadEvent: Math.round(loadEvent),
        });
      }, 500);
    });
  });

  await context.close();

  return {
    page: pageConfig.name,
    viewport: isMobile ? "Mobile (375x812)" : "Desktop (1280x800)",
    ...metrics,
    resources: resourceMetrics,
    consoleErrors: consoleErrors.filter((e) => !e.includes("favicon")),
  };
}

async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];

  for (const pageConfig of PAGES) {
    const desktopRes = await measurePage(browser, pageConfig, false);
    const mobileRes = await measurePage(browser, pageConfig, true);
    results.push(desktopRes, mobileRes);
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
