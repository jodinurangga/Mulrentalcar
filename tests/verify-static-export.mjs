import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const vehicles = [
  "alphard", "avanza-xenia", "brio-agya", "fortuner-gr-pajero",
  "hiace-commuter", "hiace-luxury", "hiace-premio", "honda-brv",
  "innova-reborn-diesel", "innova-zenix-g", "innova-zenix-q-sunroof",
  "rocky-raize", "rush-terios", "xpander"
];

console.log("=== 1. CORE STATIC FILES CHECK ===");
const corePages = [
  "index.html",
  "mobil.html",
  "layanan.html",
  "kontak.html",
  "tentang-kami.html",
  "syarat-ketentuan.html",
  "kebijakan-privasi.html",
  "404.html",
  "_not-found.html",
  "robots.txt",
  "sitemap.xml",
  "icon.svg",
  ".htaccess"
];

let allPassed = true;

for (const file of corePages) {
  const p = path.join(outDir, file);
  if (!fs.existsSync(p)) {
    console.error("FAIL - MISSING:", file);
    allPassed = false;
  } else {
    const size = fs.statSync(p).size;
    console.log(`PASS - ${file} (${size} bytes)`);
  }
}

console.log("\n=== 2. VEHICLE DETAIL PAGES CHECK ===");
for (const slug of vehicles) {
  const p = path.join(outDir, "mobil", `${slug}.html`);
  if (!fs.existsSync(p)) {
    console.error(`FAIL - MISSING VEHICLE: ${slug}`);
    allPassed = false;
  } else {
    const content = fs.readFileSync(p, "utf8");
    const hasNextImage = content.includes("/_next/image?");
    const canonicalMatch = content.includes(`href="https://mulrentcar.com/mobil/${slug}"`);
    const waMatch = content.includes("https://wa.me/6281262679533");
    
    if (hasNextImage) {
      console.error(`FAIL: mobil/${slug}.html still references /_next/image`);
      allPassed = false;
    } else if (!canonicalMatch) {
      console.error(`FAIL: mobil/${slug}.html has invalid canonical`);
      allPassed = false;
    } else {
      console.log(`PASS - mobil/${slug}.html (ServerImage: NO, Canonical: OK, WhatsApp: ${waMatch})`);
    }
  }
}

console.log("\n=== 3. SCAN ALL HTML FOR /_next/image ENDPOINTS ===");
let serverImageFound = 0;
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (f.endsWith(".html")) {
      const html = fs.readFileSync(full, "utf8");
      if (html.includes("/_next/image?")) {
        console.error("FOUND /_next/image in:", full);
        serverImageFound++;
      }
    }
  }
}
walk(outDir);
console.log(`Total HTML files with /_next/image endpoint: ${serverImageFound}`);

console.log("\n=== 4. SITEMAP.XML VERIFICATION ===");
const sitemap = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
const locMatches = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
console.log(`Total URLs found in sitemap: ${locMatches.length}`);
for (const match of locMatches) {
  console.log(`  ${match}`);
}

console.log("\n=== 5. ROBOTS.TXT VERIFICATION ===");
const robots = fs.readFileSync(path.join(outDir, "robots.txt"), "utf8");
console.log(robots.trim());

console.log("\n=== 6. .HTACCESS IN OUT/ VERIFICATION ===");
const htaccessPath = path.join(outDir, ".htaccess");
if (fs.existsSync(htaccessPath)) {
  const htaccess = fs.readFileSync(htaccessPath, "utf8");
  console.log(`.htaccess found in out/ (${htaccess.length} bytes)`);
  console.log("Contains ErrorDocument 404:", htaccess.includes("ErrorDocument 404 /404.html"));
  console.log("Contains /mobil rewrite:", htaccess.includes("RewriteRule ^mobil/?$ mobil.html [L]"));
  console.log("Contains /mobil/[slug] rewrite:", htaccess.includes("RewriteRule ^mobil/([a-z0-9-]+)/?$ mobil/$1.html [L]"));
} else {
  console.error("FAIL: .htaccess NOT found in out/");
  allPassed = false;
}

console.log(`\nOVERALL AUDIT STATUS: ${allPassed && serverImageFound === 0 ? "SUCCESS (All Checks Passed)" : "FAILURE"}`);
