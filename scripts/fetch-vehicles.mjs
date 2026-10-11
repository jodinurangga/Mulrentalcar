import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "public", "images", "vehicles");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const candidates = [
  {
    slug: "brio-agya",
    name: "Brio / Agya",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/2023_Honda_Brio_RS_%28Indonesia%29_front_view.jpg",
    model: "2023 Honda Brio RS (Indonesia)",
  },
  {
    slug: "avanza-xenia",
    name: "Avanza / Xenia",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/25/2022_Toyota_Avanza_%28W100%29_1.5_G%2C_IIMS_Hybrid%2C_Grand_City%2C_Central_Surabaya.jpg",
    model: "2022 Toyota Avanza (W100) 1.5 G",
  },
  {
    slug: "rocky-raize",
    name: "Rocky / Raize",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b6/2021_Toyota_Raize_1.0T_G_%28Indonesia%29_front_view.jpg",
    model: "2021 Toyota Raize 1.0T G (Indonesia)",
  },
  {
    slug: "xpander",
    name: "Xpander",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e2/2021_Mitsubishi_Xpander_Ultimate_facelift_%28Indonesia%29_front_view_01.jpg",
    model: "2021 Mitsubishi Xpander Ultimate facelift (Indonesia)",
  },
  {
    slug: "rush-terios",
    name: "Rush / Terios",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/2024_Toyota_Rush_GR_Sport_%28Indonesia%29_front_view.jpg",
    model: "2024 Toyota Rush GR Sport (Indonesia)",
  },
  {
    slug: "honda-brv",
    name: "Honda BR-V",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1f/2022_Honda_BR-V_Prestige_with_Honda_Sensing_%28Indonesia%29_front_view_02.jpg",
    model: "2022 Honda BR-V Prestige with Honda Sensing (Indonesia)",
  },
  {
    slug: "innova-reborn-diesel",
    name: "Innova Reborn Diesel",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/2022_Toyota_Kijang_Innova_2.4_G.jpg",
    model: "2022 Toyota Kijang Innova 2.4 G Reborn Diesel",
  },
  {
    slug: "innova-zenix-g",
    name: "Innova Zenix G",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/ef/2023_Toyota_Kijang_Innova_Zenix_2.0_G%2C_Taman%2C_Sidoarjo.jpg",
    model: "2023 Toyota Kijang Innova Zenix 2.0 G",
  },
  {
    slug: "innova-zenix-q-sunroof",
    name: "Innova Zenix Q Sunroof",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/2023_Toyota_Kijang_Innova_Zenix_2.0_Q_Hybrid_Modellista_%28front%29.jpg",
    model: "2023 Toyota Kijang Innova Zenix 2.0 Q Hybrid Modellista",
  },
  {
    slug: "fortuner-gr-pajero",
    name: "Fortuner GR / Pajero",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/2022_Toyota_Fortuner_2.8_VRZ_GR_Sport_4x2_GUN166R_%2820220428%29.jpg",
    model: "2022 Toyota Fortuner 2.8 VRZ GR Sport (Indonesia)",
  },
  {
    slug: "hiace-commuter",
    name: "Hiace Commuter",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/2022_Toyota_Hiace_3.0_Commuter_in_white%2C_front_right.jpg",
    model: "2022 Toyota HiAce 3.0 Commuter",
  },
  {
    slug: "hiace-premio",
    name: "Hiace Premio",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/91/2019_Toyota_HiAce_Premio_2.8_GDH322R_%2820190722%29.jpg",
    model: "2019-2024 Toyota HiAce Premio 2.8 (Indonesia)",
  },
  {
    slug: "alphard",
    name: "Alphard",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/2023_Toyota_Alphard_Hybrid_%28AH40%29_1.jpg",
    model: "2023 Toyota Alphard Hybrid (AH40)",
  },
];

async function main() {
  console.log(`Starting vehicle image processing for ${candidates.length} assets...`);
  const headers = {
    "User-Agent": "MulRentCarAssetFetcher/1.0 (contact: info@mulrentcar.com; educational and commercial rental web asset optimization)",
    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
  };

  const results = [];

  for (const item of candidates) {
    const outFile = path.join(outDir, `${item.slug}.webp`);
    console.log(`\nFetching [${item.slug}] (${item.name})...`);
    console.log(`URL: ${item.url}`);

    try {
      const response = await fetch(item.url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const inputBuffer = Buffer.from(arrayBuffer);
      console.log(`Downloaded ${Math.round(inputBuffer.length / 1024)} KB raw image.`);

      const image = sharp(inputBuffer);
      const metadata = await image.metadata();

      // Resize to max width 1200px while maintaining aspect ratio
      let transform = sharp(inputBuffer);
      if (metadata.width && metadata.width > 1200) {
        transform = transform.resize({ width: 1200, withoutEnlargement: true });
      }

      // Convert to WebP with balanced 82 quality
      await transform
        .webp({ quality: 82, effort: 4 })
        .toFile(outFile);

      const outStat = fs.statSync(outFile);
      const outMeta = await sharp(outFile).metadata();

      const res = {
        slug: item.slug,
        name: item.name,
        originalWidth: metadata.width,
        originalHeight: metadata.height,
        finalWidth: outMeta.width,
        finalHeight: outMeta.height,
        finalSizeBytes: outStat.size,
        finalSizeKb: Math.round(outStat.size / 1024),
        status: "SUCCESS",
      };
      console.log(`Saved ${outFile} -> ${res.finalWidth}x${res.finalHeight}px, ${res.finalSizeKb} KB`);
      results.push(res);
    } catch (err) {
      console.error(`Failed processing ${item.slug}:`, err.message);
      results.push({
        slug: item.slug,
        name: item.name,
        error: err.message,
        status: "FAILED",
      });
    }
  }

  console.log("\n--- Processing Summary ---");
  console.table(results);
}

main().catch(console.error);
