import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_PATH = "C:\\Users\\Evandio\\.gemini\\antigravity-ide\\brain\\da9df2b2-98b4-404c-a4ca-ec19e87148b8\\.user_uploaded\\media_1791714892170.jpg";
const BRAND_DIR = path.resolve("public/images/brand");
const PUBLIC_DIR = path.resolve("public");
const APP_DIR = path.resolve("src/app");

fs.mkdirSync(BRAND_DIR, { recursive: true });

async function generate() {
  if (!fs.existsSync(SOURCE_PATH)) {
    console.error("Source logo file not found:", SOURCE_PATH);
    process.exit(1);
  }

  console.log("Reading source image:", SOURCE_PATH);
  const { data, info } = await sharp(SOURCE_PATH).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Center and radius precisely measured
  const cx = 352;
  const cy = 351.5;
  const radius = 348; // ensure crisp edge and 0 dark bleed from outside corners

  const targetSize = Math.round(2 * radius);
  const half = targetSize / 2;

  const outBuf = Buffer.alloc(targetSize * targetSize * 4);

  for (let ty = 0; ty < targetSize; ty++) {
    for (let tx = 0; tx < targetSize; tx++) {
      const srcX = Math.round(cx - half + tx);
      const srcY = Math.round(cy - half + ty);
      const targetIdx = (ty * targetSize + tx) * 4;

      const dist = Math.hypot(tx - half, ty - half);
      let alpha = 255;
      if (dist >= radius) {
        alpha = 0;
      } else if (dist > radius - 1.5) {
        alpha = Math.round(255 * (radius - dist) / 1.5);
      }

      if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
        const srcIdx = (srcY * width + srcX) * channels;
        outBuf[targetIdx] = data[srcIdx];
        outBuf[targetIdx + 1] = data[srcIdx + 1];
        outBuf[targetIdx + 2] = data[srcIdx + 2];
        outBuf[targetIdx + 3] = alpha;
      } else {
        outBuf[targetIdx] = 255;
        outBuf[targetIdx + 1] = 255;
        outBuf[targetIdx + 2] = 255;
        outBuf[targetIdx + 3] = 0;
      }
    }
  }

  const baseSharp = sharp(outBuf, {
    raw: {
      width: targetSize,
      height: targetSize,
      channels: 4,
    },
  });

  // 1. High-resolution brand logo (512x512)
  await baseSharp.clone().resize(512, 512, { fit: "contain" }).webp({ quality: 95 }).toFile(path.join(BRAND_DIR, "logo.webp"));
  await baseSharp.clone().resize(512, 512, { fit: "contain" }).png({ compressionLevel: 9 }).toFile(path.join(BRAND_DIR, "logo.png"));

  // 2. Compact logo (128x128)
  const logo128PngPath = path.join(BRAND_DIR, "logo-128.png");
  await baseSharp.clone().resize(128, 128, { fit: "contain" }).webp({ quality: 95 }).toFile(path.join(BRAND_DIR, "logo-128.webp"));
  await baseSharp.clone().resize(128, 128, { fit: "contain" }).png({ compressionLevel: 9 }).toFile(logo128PngPath);

  // 3. Web app icons & Favicons (PWA standard)
  await baseSharp.clone().resize(180, 180, { fit: "contain" }).png().toFile(path.join(PUBLIC_DIR, "apple-icon.png"));
  await baseSharp.clone().resize(192, 192, { fit: "contain" }).png().toFile(path.join(PUBLIC_DIR, "icon-192.png"));
  await baseSharp.clone().resize(512, 512, { fit: "contain" }).png().toFile(path.join(PUBLIC_DIR, "icon-512.png"));

  // 4. SVG Favicon with embedded high-res raster
  const png128Buffer = fs.readFileSync(logo128PngPath);
  const base64Data = png128Buffer.toString("base64");
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image href="data:image/png;base64,${base64Data}" width="128" height="128" />
</svg>
`;

  fs.writeFileSync(path.join(APP_DIR, "icon.svg"), svgContent, "utf8");
  fs.writeFileSync(path.join(PUBLIC_DIR, "icon.svg"), svgContent, "utf8");

  console.log("All brand assets generated successfully!");
}

generate().catch((err) => {
  console.error("Error generating brand assets:", err);
  process.exit(1);
});
