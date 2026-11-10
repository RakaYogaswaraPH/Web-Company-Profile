import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "Assets");
const PUBLIC_DIR = path.join(ROOT, "public");
const PUBLIC_IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const PUBLIC_ICONS_DIR = path.join(PUBLIC_DIR, "icons");
const MANIFEST_PATH = path.join(ROOT, "src/content/asset-manifest.ts");

function toKebabCase(str) {
  const nameWithoutExt = path.parse(str).name;
  const ext = path.parse(str).ext.toLowerCase();
  const kebab = nameWithoutExt
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
  return `${kebab}${ext}`;
}

function cleanTitle(str) {
  const name = path.parse(str).name;
  // Special naming overrides if needed
  if (name.toLowerCase() === "dji") return "DJI";
  if (name.toLowerCase() === "apc") return "APC";
  if (name.toLowerCase() === "hp") return "HP";
  if (name.toLowerCase() === "bhp") return "BHP";
  if (name.toLowerCase() === "len") return "LEN";
  if (name.toLowerCase() === "kai") return "KAI";
  if (name.toLowerCase() === "pln" || name.toLowerCase() === "it pln") return "IT PLN";
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function processIcons(iconPath) {
  console.log("Generating PWA icons from:", iconPath);
  await ensureDir(PUBLIC_ICONS_DIR);

  const iconBuffer = await fs.promises.readFile(iconPath);

  // Copy raw Icons.webp to public/icons/icons.webp
  await fs.promises.copyFile(iconPath, path.join(PUBLIC_ICONS_DIR, "icons.webp"));

  // 192x192 PNG
  await sharp(iconBuffer)
    .resize(192, 192, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_ICONS_DIR, "icon-192.png"));

  // 512x512 PNG
  await sharp(iconBuffer)
    .resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_ICONS_DIR, "icon-512.png"));

  // Maskable 512x512 with safe zone ~80% (410px) and #1E2335 background
  const innerIcon = await sharp(iconBuffer)
    .resize(410, 410, { fit: "contain", background: { r: 30, g: 35, b: 53, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 30, g: 35, b: 53, alpha: 1 },
    },
  })
    .composite([{ input: innerIcon, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_ICONS_DIR, "icon-maskable-512.png"));

  // Apple touch icon 180x180
  const appleInner = await sharp(iconBuffer)
    .resize(144, 144, { fit: "contain", background: { r: 30, g: 35, b: 53, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 30, g: 35, b: 53, alpha: 1 },
    },
  })
    .composite([{ input: appleInner, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC_ICONS_DIR, "apple-touch-icon.png"));

  // Favicon 32x32 PNG
  await sharp(iconBuffer)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_ICONS_DIR, "favicon-32x32.png"));

  // Favicon 16x16 PNG for tabs
  await sharp(iconBuffer)
    .resize(16, 16, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_ICONS_DIR, "favicon-16x16.png"));

  // favicon.ico (32x32) in public and src/app
  await sharp(iconBuffer)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, "favicon.ico"));

  await sharp(iconBuffer)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(ROOT, "src/app/favicon.ico"));

  console.log("PWA and tab icons generated successfully from Icons.webp.");
}

async function optimizeFolder(subFolder, maxWidth = 400) {
  const srcDir = path.join(ASSETS_DIR, subFolder);
  const destDir = path.join(PUBLIC_IMAGES_DIR, subFolder.toLowerCase());
  await ensureDir(destDir);

  const files = fs.readdirSync(srcDir);
  const results = [];

  for (const file of files) {
    const srcFile = path.join(srcDir, file);
    const outFileName = toKebabCase(file);
    const destFile = path.join(destDir, outFileName);
    const isSvg = file.toLowerCase().endsWith(".svg");

    if (isSvg) {
      fs.copyFileSync(srcFile, destFile);
      // Rough SVG dimensions or standard viewBox
      results.push({
        name: cleanTitle(file),
        file: outFileName,
        path: `/images/${subFolder.toLowerCase()}/${outFileName}`,
        width: 240,
        height: 80,
        format: "svg",
      });
      continue;
    }

    // Process raster image
    const image = sharp(srcFile);
    const meta = await image.metadata();

    let targetWidth = meta.width;
    let targetHeight = meta.height;

    if (meta.width > maxWidth) {
      targetWidth = maxWidth;
      targetHeight = Math.round((meta.height * maxWidth) / meta.width);
    }

    if (file.toLowerCase().includes("czur")) {
      // czur.webp has white typography. Convert to dark slate #0f172a for light backgrounds.
      const rawCzur = await image.raw().toBuffer({ resolveWithObject: true });
      const { data, info } = rawCzur;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 30) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r > 180 && g > 180 && b > 180) {
            data[i] = 15;
            data[i + 1] = 23;
            data[i + 2] = 42;
          }
        }
      }
      await sharp(data, { raw: info })
        .resize(targetWidth, targetHeight, { fit: "inside" })
        .webp({ quality: 90 })
        .toFile(destFile);
    } else {
      await image
        .resize(targetWidth, targetHeight, { fit: "inside" })
        .webp({ quality: 85 })
        .toFile(destFile);
    }

    results.push({
      name: cleanTitle(file),
      file: outFileName,
      path: `/images/${subFolder.toLowerCase()}/${outFileName}`,
      width: targetWidth,
      height: targetHeight,
      format: "webp",
    });
  }

  return results;
}

async function main() {
  console.log("Optimizing assets...");
  await ensureDir(PUBLIC_IMAGES_DIR);

  // Optimize brands (maxWidth 800 for teams photo, 400 for logo)
  const brandsSrc = path.join(ASSETS_DIR, "Brands");
  const brandsDest = path.join(PUBLIC_IMAGES_DIR, "brands");
  await ensureDir(brandsDest);

  const brandFiles = fs.readdirSync(brandsSrc);
  const brandResults = [];

  for (const file of brandFiles) {
    const srcFile = path.join(brandsSrc, file);
    const outName = toKebabCase(file);
    const destFile = path.join(brandsDest, outName);
    const isTeam = file.toLowerCase().includes("team");

    const maxWidth = isTeam ? 1200 : 400;
    const image = sharp(srcFile);
    const meta = await image.metadata();

    let targetWidth = meta.width;
    let targetHeight = meta.height;

    if (meta.width > maxWidth) {
      targetWidth = maxWidth;
      targetHeight = Math.round((meta.height * maxWidth) / meta.width);
    }

    if (file.toLowerCase().includes("logo")) {
      // The original Logo.webp has white typography for dark backgrounds.
      // For clean bright backgrounds, convert white pixels to dark slate rgb(15, 23, 42)
      // while preserving the original red emblem and smooth anti-aliased alpha.
      const rawLogo = await image.raw().toBuffer({ resolveWithObject: true });
      const { data, info } = rawLogo;
      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a > 30) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r > 180 && g > 180 && b > 180) {
            data[i] = 15;
            data[i + 1] = 23;
            data[i + 2] = 42;
          }
        }
      }
      await sharp(data, { raw: info })
        .resize(targetWidth, targetHeight, { fit: "inside" })
        .webp({ quality: 90 })
        .toFile(destFile);

      // Also save original light logo version
      const lightDestFile = path.join(brandsDest, "logo-white.webp");
      await sharp(srcFile)
        .resize(targetWidth, targetHeight, { fit: "inside" })
        .webp({ quality: 90 })
        .toFile(lightDestFile);
    } else {
      await image
        .resize(targetWidth, targetHeight, { fit: "inside" })
        .webp({ quality: 88 })
        .toFile(destFile);
    }

    brandResults.push({
      name: cleanTitle(file),
      file: outName,
      path: `/images/brands/${outName}`,
      width: targetWidth,
      height: targetHeight,
      format: "webp",
    });
  }

  // Generate PWA and tab icons from Icons.webp if present, otherwise Logo.webp
  const iconPath = fs.existsSync(path.join(ASSETS_DIR, "Brands/Icons.webp"))
    ? path.join(ASSETS_DIR, "Brands/Icons.webp")
    : path.join(ASSETS_DIR, "Brands/Logo.webp");
  await processIcons(iconPath);

  // Optimize Clients & Partners
  const clientResults = await optimizeFolder("Clients", 320);
  const partnerResults = await optimizeFolder("Partners", 320);

  // Generate asset manifest
  const manifestDir = path.dirname(MANIFEST_PATH);
  await ensureDir(manifestDir);

  const manifestContent = `export interface AssetImage {
  name: string;
  file: string;
  path: string;
  width: number;
  height: number;
  format: string;
}

export const BRANDS: AssetImage[] = ${JSON.stringify(brandResults, null, 2)};

export const CLIENTS: AssetImage[] = ${JSON.stringify(clientResults, null, 2)};

export const PARTNERS: AssetImage[] = ${JSON.stringify(partnerResults, null, 2)};
`;

  fs.writeFileSync(MANIFEST_PATH, manifestContent, "utf-8");
  console.log("Generated asset manifest at:", MANIFEST_PATH);
  console.log("Asset optimization complete!");
}

main().catch((err) => {
  console.error("Asset optimization failed:", err);
  process.exit(1);
});
