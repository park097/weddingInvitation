import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "public", "img");
const targetDir = path.join(sourceDir, "webp");

const MAIN_MAX_WIDTH = 1600;
const WEBP_QUALITY = 74;

async function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

async function run() {
  await fs.mkdir(targetDir, { recursive: true });
  const entries = await fs.readdir(sourceDir);
  const galleryFiles = entries
    .filter((file) => /^img\d+\.jpe?g$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (galleryFiles.length === 0) {
    console.log("No gallery jpg files found in public/img.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const fileName of galleryFiles) {
    const sourcePath = path.join(sourceDir, fileName);
    const outputName = fileName.replace(/\.(jpe?g)$/i, ".webp");
    const outputPath = path.join(targetDir, outputName);

    const sourceStat = await fs.stat(sourcePath);
    totalBefore += sourceStat.size;

    await sharp(sourcePath)
      .rotate()
      .resize({ width: MAIN_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const outputStat = await fs.stat(outputPath);
    totalAfter += outputStat.size;
  }

  const savings = totalBefore > 0 ? ((1 - totalAfter / totalBefore) * 100).toFixed(1) : "0.0";
  console.log(`Converted ${galleryFiles.length} images to WebP.`);
  console.log(`Before: ${await formatBytes(totalBefore)}`);
  console.log(`After : ${await formatBytes(totalAfter)}`);
  console.log(`Saved : ${savings}%`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
