#!/usr/bin/env node
/**
 * Generates src/app/favicon.ico from the AdminSignal signal console mark.
 * Uses only Node.js built-ins (no external deps).
 */
import { writeFileSync } from 'fs';
import { deflateSync } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dir, '../src/app/favicon.ico');

// --- CRC32 for PNG chunks ---
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  CRC_TABLE[i] = c;
}
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const len = Buffer.allocUnsafe(4); len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crcBuf]);
}

function makePNG(size, pixels) {
  const rows = [];
  for (let y = 0; y < size; y++) {
    const filterByte = Buffer.alloc(1); // None filter
    rows.push(filterByte);
    rows.push(pixels.subarray(y * size * 4, (y + 1) * size * 4));
  }
  const raw = Buffer.concat(rows);
  const compressed = deflateSync(raw, { level: 9 });

  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function makeICO(frames) {
  const n = frames.length;
  let dataOffset = 6 + n * 16;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(n, 4); // count

  const dir = Buffer.alloc(n * 16);
  const pngBufs = [];
  for (let i = 0; i < n; i++) {
    const { size, png } = frames[i];
    const b = i * 16;
    dir[b + 0] = size >= 256 ? 0 : size;
    dir[b + 1] = size >= 256 ? 0 : size;
    dir[b + 2] = 0; // color count
    dir[b + 3] = 0; // reserved
    dir.writeUInt16LE(1, b + 4);  // planes
    dir.writeUInt16LE(32, b + 6); // bits per pixel
    dir.writeUInt32LE(png.length, b + 8);
    dir.writeUInt32LE(dataOffset, b + 12);
    dataOffset += png.length;
    pngBufs.push(png);
  }

  return Buffer.concat([header, dir, ...pngBufs]);
}

// Render the AdminSignal signal console mark.
// SVG design: 100x100 viewBox, blue (#2563EB) rounded-rect bg (rx=22),
// white ">" chevron at M31,42 L40,50 L31,58 (stroke-width=6),
// white underscore bar at x=45,y=56 w=17,h=5.
function renderLogo(size) {
  const pixels = Buffer.alloc(size * size * 4, 0); // all transparent
  // S: scale factor — converts pixel coords to SVG viewBox coords
  const S = 100 / size;

  const setPixel = (x, y, r, g, b) => {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const i = (y * size + x) * 4;
    pixels[i] = r; pixels[i + 1] = g; pixels[i + 2] = b; pixels[i + 3] = 255;
  };

  // Rounded rect check in SVG coordinate space
  const inRR = (vx, vy, x, y, w, h, rx) => {
    if (vx < x || vx > x + w || vy < y || vy > y + h) return false;
    const cx1 = x + rx, cx2 = x + w - rx;
    const cy1 = y + rx, cy2 = y + h - rx;
    if (vx < cx1 && vy < cy1) return Math.hypot(vx - cx1, vy - cy1) <= rx;
    if (vx > cx2 && vy < cy1) return Math.hypot(vx - cx2, vy - cy1) <= rx;
    if (vx < cx1 && vy > cy2) return Math.hypot(vx - cx1, vy - cy2) <= rx;
    if (vx > cx2 && vy > cy2) return Math.hypot(vx - cx2, vy - cy2) <= rx;
    return true;
  };

  // Distance from point to line segment (SVG coords)
  const segDist = (px, py, x1, y1, x2, y2) => {
    const dx = x2 - x1, dy = y2 - y1;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(px - x1, py - y1);
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len2));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  };

  // Stroke half-width in SVG units, ensuring at least 1.5px visibility at target size
  const hw = Math.max(3, 1.5 * S);

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      // Pixel center in SVG coordinate space
      const vx = (px + 0.5) * S;
      const vy = (py + 0.5) * S;

      // Skip pixels outside the blue background rounded rect
      if (!inRR(vx, vy, 0, 0, 100, 100, 22)) continue;

      // Default: blue #2563EB
      let r = 0x25, g = 0x63, b = 0xEB;

      // ">" chevron: M31 42 L40 50 L31 58
      if (segDist(vx, vy, 31, 42, 40, 50) <= hw || segDist(vx, vy, 40, 50, 31, 58) <= hw) {
        r = 255; g = 255; b = 255;
      } else if (size >= 24) {
        // Underscore bar: x=45 y=56 w=17 h=5 — ensure min 2px tall in pixel space
        const barH = Math.max(5, 2 * S);
        if (vx >= 45 && vx <= 62 && vy >= 56 && vy <= 56 + barH) {
          r = 255; g = 255; b = 255;
        }
      }

      setPixel(px, py, r, g, b);
    }
  }

  return pixels;
}

const frames = [16, 32, 48].map(size => ({
  size,
  png: makePNG(size, renderLogo(size)),
}));

writeFileSync(OUT, makeICO(frames));
console.log(`Generated ${OUT} (16x16, 32x32, 48x48)`);
