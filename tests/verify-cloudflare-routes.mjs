import { createServer } from "../scripts/serve-static.mjs";
import path from "node:path";
import fs from "node:fs";

const TEST_PORT = 3456;
const BASE_URL = `http://localhost:${TEST_PORT}`;

const CRITICAL_ROUTES = [
  { path: "/", expectedStatus: 200, type: "html", requiredText: "MUL Rent Car" },
  { path: "/mobil", expectedStatus: 200, type: "html", requiredText: "Pilihan Armada Rental Mobil Medan" },
  { path: "/mobil/alphard", expectedStatus: 200, type: "html", requiredText: "Alphard" },
  { path: "/mobil/brio-agya", expectedStatus: 200, type: "html", requiredText: "Brio / Agya" },
  { path: "/layanan", expectedStatus: 200, type: "html", requiredText: "Solusi Transportasi" },
  { path: "/kontak", expectedStatus: 200, type: "html", requiredText: "Kontak Kami" },
  { path: "/tentang-kami", expectedStatus: 200, type: "html", requiredText: "Tentang Kami" },
  { path: "/syarat-ketentuan", expectedStatus: 200, type: "html", requiredText: "Syarat & Ketentuan" },
  { path: "/kebijakan-privasi", expectedStatus: 200, type: "html", requiredText: "Kebijakan Privasi" },
  { path: "/sitemap.xml", expectedStatus: 200, type: "xml", requiredText: "https://mulrentcar.com" },
  { path: "/robots.txt", expectedStatus: 200, type: "text", requiredText: "User-Agent: *" },
  { path: "/halaman-fiktif-123", expectedStatus: 404, type: "html", requiredText: "Halaman Tidak Ditemukan" },
  { path: "/mobil/kendaraan-fiktif", expectedStatus: 404, type: "html", requiredText: "Halaman Tidak Ditemukan" },
];

async function runAudit() {
  console.log("=== PHASE 5.4B — STATIC ROUTE & ASSET AUDIT (LOCAL CLOUDFLARE EMULATION) ===");
  const server = createServer();

  await new Promise((resolve) => {
    server.listen(TEST_PORT, "127.0.0.1", resolve);
  });
  console.log(`Test server running at ${BASE_URL}\n`);

  let allPassed = true;
  const results = [];
  const assetsChecked = new Set();
  const assetErrors = [];

  for (const item of CRITICAL_ROUTES) {
    const url = `${BASE_URL}${item.path}`;
    
    // Direct navigation test
    const res1 = await fetch(url);
    const body1 = await res1.text();
    const status1 = res1.status;

    // Simulated refresh test (F5)
    const res2 = await fetch(url);
    const status2 = res2.status;

    const statusOk = (status1 === item.expectedStatus) && (status2 === item.expectedStatus);
    const contentOk = body1.includes(item.requiredText);
    const noServerImage = !body1.includes("/_next/image?");

    // Check embedded assets if HTML
    let assetsOk = true;
    if (item.type === "html") {
      // Find stylesheets
      const cssMatches = [...body1.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/g)];
      for (const m of cssMatches) {
        const assetUrl = m[1].startsWith("http") ? m[1] : `${BASE_URL}${m[1]}`;
        if (!assetsChecked.has(assetUrl)) {
          assetsChecked.add(assetUrl);
          const aRes = await fetch(assetUrl);
          if (aRes.status !== 200) {
            assetErrors.push(`FAIL CSS ${aRes.status}: ${assetUrl}`);
            assetsOk = false;
          }
        }
      }

      // Find scripts
      const jsMatches = [...body1.matchAll(/<script[^>]+src=["']([^"']+)["']/g)];
      for (const m of jsMatches) {
        const assetUrl = m[1].startsWith("http") ? m[1] : `${BASE_URL}${m[1]}`;
        if (!assetsChecked.has(assetUrl)) {
          assetsChecked.add(assetUrl);
          const aRes = await fetch(assetUrl);
          if (aRes.status !== 200) {
            assetErrors.push(`FAIL JS ${aRes.status}: ${assetUrl}`);
            assetsOk = false;
          }
        }
      }

      // Find images
      const imgMatches = [...body1.matchAll(/<img[^>]+src=["']([^"']+)["']/g)];
      for (const m of imgMatches) {
        const rawSrc = m[1];
        if (rawSrc.startsWith("data:")) continue;
        const assetUrl = rawSrc.startsWith("http") ? rawSrc : `${BASE_URL}${rawSrc}`;
        if (!assetsChecked.has(assetUrl)) {
          assetsChecked.add(assetUrl);
          const aRes = await fetch(assetUrl);
          if (aRes.status !== 200) {
            assetErrors.push(`FAIL IMG ${aRes.status}: ${assetUrl}`);
            assetsOk = false;
          }
        }
      }
    }

    const testPassed = statusOk && contentOk && noServerImage && assetsOk;
    if (!testPassed) allPassed = false;

    results.push({
      path: item.path,
      expected: item.expectedStatus,
      statusDirect: status1,
      statusRefresh: status2,
      contentOk,
      noServerImage,
      assetsOk,
      pass: testPassed
    });
  }

  server.close();

  // Print results table
  console.log("ENDPOINT TEST RESULTS:");
  console.log("----------------------------------------------------------------------------------------------------");
  console.log(
    "Endpoint".padEnd(28) +
    "Expected".padEnd(10) +
    "Direct".padEnd(8) +
    "Refresh".padEnd(9) +
    "Content".padEnd(10) +
    "No/_next/image".padEnd(16) +
    "Assets".padEnd(8) +
    "Result"
  );
  console.log("----------------------------------------------------------------------------------------------------");

  for (const r of results) {
    console.log(
      r.path.padEnd(28) +
      String(r.expected).padEnd(10) +
      String(r.statusDirect).padEnd(8) +
      String(r.statusRefresh).padEnd(9) +
      (r.contentOk ? "PASS" : "FAIL").padEnd(10) +
      (r.noServerImage ? "PASS" : "FAIL").padEnd(16) +
      (r.assetsOk ? "PASS" : "FAIL").padEnd(8) +
      (r.pass ? "PASS" : "FAIL")
    );
  }
  console.log("----------------------------------------------------------------------------------------------------");
  console.log(`Total Unique Static Assets Verified (CSS, JS, WebP, SVG): ${assetsChecked.size}`);

  if (assetErrors.length > 0) {
    console.log("\nAsset Errors:");
    assetErrors.forEach((e) => console.error(" ", e));
  } else {
    console.log("All referenced CSS stylesheets, JS chunks, and vehicle WebP images loaded with HTTP 200 OK.");
  }

  console.log(`\nOVERALL VERIFICATION RESULT: ${allPassed ? "PASS (100% Valid)" : "FAIL"}`);
  process.exit(allPassed ? 0 : 1);
}

runAudit().catch((err) => {
  console.error("Audit script error:", err);
  process.exit(1);
});
