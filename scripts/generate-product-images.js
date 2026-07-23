import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "products");
mkdirSync(outDir, { recursive: true });

const width = 800;
const height = 450;

const covers = [
  { slug: "ai-crm", title: "AI-Powered CRM", from: "#142263", to: "#2b46b8" },
  { slug: "pos-billing", title: "POS & Billing System", from: "#0a1030", to: "#e8940c" },
  { slug: "hr-system", title: "HR Management System", from: "#0f1a4a", to: "#c67d0a" },
];

const escapeXml = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

for (const { slug, title, from, to } of covers) {
  const safeTitle = escapeXml(title);
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#g)" />
      <circle cx="${width - 80}" cy="80" r="140" fill="rgba(255,255,255,0.06)" />
      <circle cx="60" cy="${height - 40}" r="100" fill="rgba(255,255,255,0.05)" />
      <text x="60" y="${height - 70}" font-family="Arial, sans-serif" font-size="40" font-weight="700" fill="#ffffff">${safeTitle}</text>
      <text x="60" y="${height - 36}" font-family="Arial, sans-serif" font-size="18" fill="#f2a71b" font-weight="600">GLOARO</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(outDir, `${slug}.png`));

  console.log("Generated:", slug);
}
