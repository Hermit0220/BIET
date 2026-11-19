// Downloads the Unsplash photos used by the reference, converts to WebP, writes a manifest.
// Usage: node scripts/fetch-images.mjs <ids-file>
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ids = fs.readFileSync(process.argv[2], 'utf8').split(/\s+/).filter(Boolean);
const out = 'public/assets/images';
fs.mkdirSync(out, { recursive: true });
const manifest = {};
const HERO = new Set(['photo-1541339907198-e08756dedf3f', 'photo-1581092160607-ee22621dd758', 'photo-1531482615713-2afd69097998', 'photo-1523240795612-9a054b0db644']);
for (const id of ids) {
  const width = HERO.has(id) ? 2200 : 1400;
  const file = path.join(out, `${id}.webp`);
  if (fs.existsSync(file)) { manifest[id] = { status: 'cached' }; continue; }
  try {
    const res = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    const info = await sharp(buf).webp({ quality: 78 }).toFile(file);
    manifest[id] = { status: 'ok', width: info.width, height: info.height, bytes: info.size };
    console.log('ok', id, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
  } catch (e) {
    manifest[id] = { status: 'failed', error: String(e) };
    console.log('FAIL', id, String(e));
  }
}
fs.writeFileSync('scripts/image-manifest.json', JSON.stringify(manifest, null, 2));

