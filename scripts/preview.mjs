import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../out");
const PORT = Number(process.env.PORT) || 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(
    new URL(req.url, `http://localhost:${PORT}`).pathname
  );
  let safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(OUT_DIR, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
    filePath = filePath + ".html";
  }

  if (!fs.existsSync(filePath)) {
    const notFound = path.join(OUT_DIR, "404.html");
    if (fs.existsSync(notFound)) {
      res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      });
      fs.createReadStream(notFound).pipe(res);
      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  const headers = {
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff",
  };

  // High-performance cache headers
  if (
    urlPath.startsWith("/_next/static/") ||
    [".webp", ".svg", ".png", ".jpg", ".jpeg", ".ico", ".woff2", ".woff"].includes(ext)
  ) {
    headers["Cache-Control"] = "public, max-age=31536000, immutable";
  } else if (ext === ".html" || urlPath === "/" || urlPath.endsWith("/")) {
    headers["Cache-Control"] = "public, max-age=0, must-revalidate";
  } else {
    headers["Cache-Control"] = "public, max-age=3600, must-revalidate";
  }

  const acceptEncoding = req.headers["accept-encoding"] || "";
  const isCompressible =
    contentType.startsWith("text/") ||
    contentType.includes("javascript") ||
    contentType.includes("json") ||
    contentType.includes("svg") ||
    ext === ".html" ||
    ext === ".css" ||
    ext === ".js" ||
    ext === ".json";

  if (isCompressible && acceptEncoding.includes("br")) {
    headers["Content-Encoding"] = "br";
    headers["Vary"] = "Accept-Encoding";
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(zlib.createBrotliCompress()).pipe(res);
  } else if (isCompressible && acceptEncoding.includes("gzip")) {
    headers["Content-Encoding"] = "gzip";
    headers["Vary"] = "Accept-Encoding";
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
  } else {
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Preview server running at http://localhost:${PORT}`);
  console.log(`PWA install (secure context): http://localhost:${PORT} or http://127.0.0.1:${PORT}`);
  console.log(`Network access: http://<your-ip>:${PORT}`);
});
