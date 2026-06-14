// Embeds SEO-aligned metadata into the site's content image assets, so every
// shared, scraped, or re-hosted file is self-describing and attributable.
//
// Covers (driven by the MANIFEST below):
//   - public/og.png            → home OpenGraph card (title/description from messages/en.json)
//   - public/work/*.png        → showcase cards (seoTitle/metaDescription from lib/content/text/en.ts)
//   - public/images/team/*.jpeg→ team portraits (name/role/bio from messages/en.json → Foundation.team)
//   - public/ads/*.png         → off-site ad creatives (brand + factual campaign descriptors)
//
// Deliberately NOT covered: favicons / icon-512 / apple-touch-icon — functional
// UI chrome that browsers and platforms routinely re-encode; embedded SEO text
// there is meaningless and only adds bytes.
//
// PNG: standard iTXt text chunks (UTF-8) + a Dublin Core XMP packet.
// JPEG: a Dublin Core XMP packet in an APP1 segment (existing EXIF is preserved).
// Both are idempotent — prior text/XMP we wrote is stripped and re-added.
//
// Source of truth for copy lives in the repo (no values are invented here).
// Re-run after changing that copy:  npm run images:meta
//
// Usage: node scripts/image-metadata.mjs [--check] [glob-substring]

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

// Mirrors lib/seo/site.ts (SITE_URL / SITE_NAME / LEGAL_NAME / FOUNDING_DATE).
const BRAND = {
  siteName: "PRIONATION.io",
  legalName: "PRIORITY FOUNDATION",
  url: "https://www.prionation.io",
  year: "2026",
};
const COPYRIGHT = `© ${BRAND.year} ${BRAND.legalName} (${BRAND.siteName}). All rights reserved.`;

const messages = JSON.parse(
  readFileSync(resolve(repoRoot, "messages/en.json"), "utf8"),
);
const team = Object.fromEntries(
  messages.Foundation.team.map((m) => [m.name.split(" ")[0].toLowerCase(), m]),
);

// --- Asset manifest -------------------------------------------------------
// title/description are copied verbatim from the cited source of truth.
const MANIFEST = [
  {
    // messages/en.json → Meta.homeTitle / homeDescription
    file: "public/og.png",
    title: messages.Meta.homeTitle,
    description: messages.Meta.homeDescription,
    keywords: [
      "AI product engineering",
      "production AI infrastructure",
      "mid-market AI",
      "EU AI consultancy",
      "US AI consultancy",
      "fixed scope fixed price",
      "8 weeks to production",
    ],
  },
  {
    // lib/content/text/en.ts → showcases.epidom.seoTitle / metaDescription
    file: "public/work/epidom.png",
    title: "Epidom — F&B operations dashboard · PRIONATION",
    description:
      "How PRIONATION replaced manual, multi-location inventory tracking with a centralised production system for Epidom, a European F&B operator — and the transferable lesson.",
    keywords: ["Epidom", "F&B operations", "inventory management", "production dashboard", "PRIONATION showcase", "France"],
  },
  {
    // lib/content/text/en.ts → showcases.expeditoo.seoTitle / metaDescription
    file: "public/work/expeditoo.png",
    title: "Expeditoo — logistics marketplace, France · PRIONATION",
    description:
      "How PRIONATION engineered a logistics and auction marketplace for Expeditoo — combining bidding and shipment tracking in one production system — and the transferable lesson.",
    keywords: ["Expeditoo", "logistics marketplace", "auction bidding", "shipment tracking", "PRIONATION showcase", "France"],
  },
  {
    // lib/content/text/en.ts → showcases["the-lead-agent"].seoTitle / metaDescription
    file: "public/work/lead-agent.png",
    title: "The Lead Agent — real estate lead gen, Australia · PRIONATION",
    description:
      "How PRIONATION built a lead generation and appointment-setting platform for The Lead Agent, automating pipeline management for Australian estate agents — and the transferable lesson.",
    keywords: ["The Lead Agent", "real estate", "lead generation", "appointment setting", "PRIONATION showcase", "Australia"],
  },
  {
    // messages/en.json → Foundation.team (Darwin Prayoga)
    file: "public/images/team/darwin.jpeg",
    title: `${team.darwin.name} — ${team.darwin.role} · ${BRAND.siteName}`,
    description: team.darwin.bio,
    creator: team.darwin.name,
    keywords: [team.darwin.name, team.darwin.role, BRAND.siteName, BRAND.legalName],
  },
  {
    // messages/en.json → Foundation.team (Evan Cao)
    file: "public/images/team/evan.jpeg",
    title: `${team.evan.name} — ${team.evan.role} · ${BRAND.siteName}`,
    description: team.evan.bio,
    creator: team.evan.name,
    keywords: [team.evan.name, team.evan.role, BRAND.siteName, BRAND.legalName],
  },
  {
    file: "public/ads/bug-bounty-campaign-1080x1350.png",
    title: `${BRAND.siteName} — Bug Bounty Campaign (portrait)`,
    description: `Advertising creative for the ${BRAND.siteName} bug bounty campaign. 1080×1350 (4:5) portrait format.`,
    keywords: ["PRIONATION.io", "bug bounty", "advertising creative", "campaign"],
  },
  {
    file: "public/ads/bug-bounty-campaign-1080x1920.png",
    title: `${BRAND.siteName} — Bug Bounty Campaign (story)`,
    description: `Advertising creative for the ${BRAND.siteName} bug bounty campaign. 1080×1920 (9:16) story format.`,
    keywords: ["PRIONATION.io", "bug bounty", "advertising creative", "campaign"],
  },
  {
    file: "public/ads/higgsfield-motion-competition-ad-1080x1350.png",
    title: `${BRAND.siteName} — Higgsfield Motion Competition (portrait)`,
    description: `Advertising creative for ${BRAND.siteName} — Higgsfield motion competition. 1080×1350 (4:5) portrait format.`,
    keywords: ["PRIONATION.io", "Higgsfield", "motion competition", "advertising creative"],
  },
  {
    file: "public/ads/higgsfield-motion-competition-ad-1080x1920.png",
    title: `${BRAND.siteName} — Higgsfield Motion Competition (story)`,
    description: `Advertising creative for ${BRAND.siteName} — Higgsfield motion competition. 1080×1920 (9:16) story format.`,
    keywords: ["PRIONATION.io", "Higgsfield", "motion competition", "advertising creative"],
  },
  {
    file: "public/ads/hiring-ai-roles-ad-1080x1350.png",
    title: `${BRAND.siteName} — Hiring: AI Product Engineering (portrait)`,
    description: `Recruitment advertising creative for ${BRAND.siteName} — AI Product Engineering roles. 1080×1350 (4:5) portrait format.`,
    keywords: ["PRIONATION.io", "hiring", "AI Product Engineer", "recruitment", "advertising creative"],
  },
  {
    file: "public/ads/hiring-ai-roles-ad-1080x1920.png",
    title: `${BRAND.siteName} — Hiring: AI Product Engineering (story)`,
    description: `Recruitment advertising creative for ${BRAND.siteName} — AI Product Engineering roles. 1080×1920 (9:16) story format.`,
    keywords: ["PRIONATION.io", "hiring", "AI Product Engineer", "recruitment", "advertising creative"],
  },
];

// --- Shared helpers -------------------------------------------------------
const xmlEsc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function resolved(item) {
  return {
    title: item.title,
    description: item.description,
    creator: item.creator ?? BRAND.legalName,
    copyright: COPYRIGHT,
    source: BRAND.url,
    keywords: item.keywords ?? [],
  };
}

function buildXmp(m, width, height) {
  const subjects = m.keywords
    .map((k) => `            <rdf:li>${xmlEsc(k)}</rdf:li>`)
    .join("\n");
  const dims =
    width && height
      ? `\n      <exif:PixelXDimension>${width}</exif:PixelXDimension>\n      <exif:PixelYDimension>${height}</exif:PixelYDimension>`
      : "";
  return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="prionation-image-metadata">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:xmp="http://ns.adobe.com/xap/1.0/"
        xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
        xmlns:exif="http://ns.adobe.com/exif/1.0/">
      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${xmlEsc(m.title)}</rdf:li></rdf:Alt></dc:title>
      <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${xmlEsc(m.description)}</rdf:li></rdf:Alt></dc:description>
      <dc:creator><rdf:Seq><rdf:li>${xmlEsc(m.creator)}</rdf:li></rdf:Seq></dc:creator>
      <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${xmlEsc(m.copyright)}</rdf:li></rdf:Alt></dc:rights>
      <dc:source>${xmlEsc(m.source)}</dc:source>
      <dc:subject>
         <rdf:Bag>
${subjects}
         </rdf:Bag>
      </dc:subject>
      <xmpRights:Marked>True</xmpRights:Marked>
      <xmpRights:WebStatement>${xmlEsc(m.source)}</xmpRights:WebStatement>
      <xmp:CreatorTool>prionation-image-metadata</xmp:CreatorTool>${dims}
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

// --- PNG -----------------------------------------------------------------
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, "latin1");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}
function pngITXt(keyword, text) {
  return pngChunk(
    "iTXt",
    Buffer.concat([
      Buffer.from(keyword, "latin1"),
      Buffer.from([0, 0, 0]), // null, compression flag (0), method (0)
      Buffer.from([0]), // empty language tag + null
      Buffer.from([0]), // empty translated keyword + null
      Buffer.from(text, "utf8"),
    ]),
  );
}
function processPng(buf, item) {
  if (!buf.subarray(0, 8).equals(PNG_SIG)) throw new Error("Not a PNG");
  const chunks = [];
  let i = 8;
  while (i < buf.length) {
    const length = buf.readUInt32BE(i);
    const type = buf.toString("latin1", i + 4, i + 8);
    chunks.push({ type, data: buf.subarray(i + 8, i + 8 + length) });
    i += 12 + length;
    if (type === "IEND") break;
  }
  const ihdr = chunks.find((c) => c.type === "IHDR");
  const width = ihdr.data.readUInt32BE(0);
  const height = ihdr.data.readUInt32BE(4);
  const m = resolved(item);
  const meta = [
    pngITXt("Title", m.title),
    pngITXt("Description", m.description),
    pngITXt("Author", m.creator),
    pngITXt("Copyright", m.copyright),
    pngITXt("Source", m.source),
    pngITXt("Keywords", m.keywords.join(", ")),
    pngITXt("XML:com.adobe.xmp", buildXmp(m, width, height)),
  ];
  const kept = chunks.filter((c) => !["tEXt", "iTXt", "zTXt"].includes(c.type));
  const out = [PNG_SIG];
  for (const c of kept) {
    out.push(pngChunk(c.type, c.data));
    if (c.type === "IHDR") out.push(...meta);
  }
  return { buf: Buffer.concat(out), width, height };
}

// --- JPEG ----------------------------------------------------------------
const XMP_HDR = "http://ns.adobe.com/xap/1.0/\0";
function processJpeg(buf, item) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("Not a JPEG");
  const segments = [];
  let restStart = buf.length;
  let width = 0;
  let height = 0;
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    if (marker === 0xda) {
      restStart = i; // SOS — entropy-coded data begins; copy verbatim from here
      break;
    }
    const len = buf.readUInt16BE(i + 2);
    const seg = buf.subarray(i, i + 2 + len);
    // SOFn carry dimensions (exclude DHT 0xc4, JPG 0xc8, DAC 0xcc)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      height = buf.readUInt16BE(i + 5);
      width = buf.readUInt16BE(i + 7);
    }
    segments.push({ marker, bytes: seg });
    i += 2 + len;
  }
  const m = resolved(item);
  const xmp = Buffer.from(buildXmp(m, width, height), "utf8");
  const body = Buffer.concat([Buffer.from(XMP_HDR, "latin1"), xmp]);
  if (body.length + 2 > 0xffff) throw new Error("XMP too large for one APP1 segment");
  const lenBuf = Buffer.alloc(2);
  lenBuf.writeUInt16BE(body.length + 2, 0);
  const xmpSeg = Buffer.concat([Buffer.from([0xff, 0xe1]), lenBuf, body]);

  const isOldXmp = (s) =>
    s.marker === 0xe1 &&
    s.bytes.subarray(4, 4 + XMP_HDR.length).toString("latin1") === XMP_HDR;
  const kept = segments.filter((s) => !isOldXmp(s));
  // Insert XMP after a leading APP0/JFIF if present, else right after SOI.
  const insertAt = kept.length && kept[0].marker === 0xe0 ? 1 : 0;

  const parts = [Buffer.from([0xff, 0xd8])];
  kept.slice(0, insertAt).forEach((s) => parts.push(s.bytes));
  parts.push(xmpSeg);
  kept.slice(insertAt).forEach((s) => parts.push(s.bytes));
  parts.push(buf.subarray(restStart));
  return { buf: Buffer.concat(parts), width, height };
}

// --- Run -----------------------------------------------------------------
const checkOnly = process.argv.includes("--check");
const filter = process.argv.slice(2).find((a) => !a.startsWith("--"));

let processed = 0;
let skipped = 0;
for (const item of MANIFEST) {
  if (filter && !item.file.includes(filter)) continue;
  const path = resolve(repoRoot, item.file);
  if (!existsSync(path)) {
    console.warn(`! missing, skipped: ${item.file}`);
    skipped++;
    continue;
  }
  const input = readFileSync(path);
  const isPng = input.subarray(0, 8).equals(PNG_SIG);
  const { buf, width, height } = isPng
    ? processPng(input, item)
    : processJpeg(input, item);
  if (!checkOnly) writeFileSync(path, buf);
  const m = resolved(item);
  console.log(
    `${checkOnly ? "·" : "✓"} ${item.file} (${width}×${height}) — ${m.title}`,
  );
  processed++;
}
console.log(
  `\n${checkOnly ? "Checked" : "Embedded metadata in"} ${processed} image(s)` +
    (skipped ? `, ${skipped} missing` : "") +
    ". Skipped by design: favicons, icon-512, apple-touch-icon.",
);
