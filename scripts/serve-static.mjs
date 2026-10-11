import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = parseInt(process.env.PORT || "3000", 10);
const OUT_DIR = path.resolve(process.cwd(), "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

export function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const safePath = path.normalize(cleanPath).replace(/^(\.\.[\/\\])+/, "");

  // 1. Root index
  if (safePath === "/" || safePath === "") {
    const indexPath = path.join(OUT_DIR, "index.html");
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
      return { filePath: indexPath, status: 200, ext: ".html" };
    }
  }

  // 2. Exact file match (e.g. /sitemap.xml, /robots.txt, /images/..., /_next/...)
  const directPath = path.join(OUT_DIR, safePath);
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return { filePath: directPath, status: 200, ext: path.extname(directPath) };
  }

  // 3. Clean URLs: path.html (e.g. /mobil -> out/mobil.html, /mobil/alphard -> out/mobil/alphard.html)
  const htmlPath = path.join(OUT_DIR, `${safePath}.html`);
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    return { filePath: htmlPath, status: 200, ext: ".html" };
  }

  // 4. Directory with index.html (e.g. /mobil/ -> out/mobil/index.html)
  const subIndexPath = path.join(OUT_DIR, safePath, "index.html");
  if (fs.existsSync(subIndexPath) && fs.statSync(subIndexPath).isFile()) {
    return { filePath: subIndexPath, status: 200, ext: ".html" };
  }

  // 5. 404 Fallback (Cloudflare Pages standard: serves out/404.html with status 404)
  const notFoundPath = path.join(OUT_DIR, "404.html");
  if (fs.existsSync(notFoundPath) && fs.statSync(notFoundPath).isFile()) {
    return { filePath: notFoundPath, status: 404, ext: ".html" };
  }

  return { filePath: null, status: 404, ext: ".txt" };
}

export function createServer() {
  return http.createServer((req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Method Not Allowed");
      return;
    }

    const { filePath, status, ext } = resolvePath(req.url || "/");

    if (!filePath) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }

    try {
      const stat = fs.statSync(filePath);
      const mime = MIME_TYPES[ext.toLowerCase()] || "application/octet-stream";

      const headers = {
        "Content-Type": mime,
        "Content-Length": stat.size,
      };

      // Emulate Cloudflare Pages default cache behaviors
      if (filePath.includes(path.join("_next", "static"))) {
        headers["Cache-Control"] = "public, max-age=31536000, immutable";
      } else if (ext === ".html") {
        headers["Cache-Control"] = "public, max-age=0, must-revalidate";
      }

      res.writeHead(status, headers);

      if (req.method === "HEAD") {
        res.end();
      } else {
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      }
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`Internal Server Error: ${err.message}`);
    }
  });
}

// When run directly
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1"))) {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`Error: Output directory not found at ${OUT_DIR}. Run 'npm run build' first.`);
    process.exit(1);
  }

  const server = createServer();
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Cloudflare Pages static emulation server listening on http://localhost:${PORT}`);
    console.log(`Serving files from: ${OUT_DIR}`);
  });
}
