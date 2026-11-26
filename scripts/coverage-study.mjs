// Deployments opening: a coverage study on an illustrative terrain (seeded noise, not a real site), computed like the
// real one: candidate high points, their line of sight over the relief within the detection range, and a greedy pick
// of the three that see the most forest. Writes the terrain and one viewshed per kept point to content/deployments/
// and the points and coverage steps to data/coverage.json. Needs ImageMagick (magick). Run: node scripts/coverage-study.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const KM_W = 70, KM_H = 52.5, RANGE_KM = 20; // map size and detection range (data/figures.yaml, id range)
const GW = 300, GH = 225; // analysis grid, 200 m cells
const PX = 4; // image pixels per cell: 1200 x 900
const CELL = (KM_W * 1000) / GW, RANGE = (RANGE_KM * 1000) / CELL;
const MAST = 15, SMOKE = 50; // camera above the ground; smoke seen once it rises this high

// Seeded value noise, smooth enough to evaluate at any resolution
let seed = 7;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
const lattice = Float64Array.from({ length: 256 * 256 }, rand);
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10); // smooth slopes too, so the hillshade shows no grid
function noise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), u = fade(x - xi), v = fade(y - yi);
  const at = (i, j) => lattice[((j & 255) << 8) | (i & 255)];
  const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, octaves, ridged) {
  let sum = 0, amp = 0.5, f = 1;
  for (let o = 0; o < octaves; o++, amp *= 0.5, f *= 2.03) {
    // each octave turned by about 37 degrees so no direction lines up
    [x, y] = [0.8 * x - 0.6 * y, 0.6 * x + 0.8 * y];
    const n = noise(x * f + o * 17.3, y * f - o * 9.1);
    sum += amp * (ridged ? 1 - Math.abs(2 * n - 1) : n);
  }
  return sum;
}
// Elevation in metres at a point in cells: a long massif across the map, cut by valleys, plains around it
function elevation(x, y) {
  const ox = x - GW * 0.5, oy = y - GH * 0.5;
  const dx = (0.96 * ox + 0.28 * oy) / (GW * 0.41), dy = (-0.28 * ox + 0.96 * oy) / (GH * 0.31);
  const dome = Math.exp(-1.2 * (dx * dx + dy * dy) ** 1.4);
  const relief = 0.65 * fbm(x / 40, y / 40, 5, true) + 0.35 * fbm(x / 28, y / 28, 4, false);
  return 60 + 1500 * (0.04 + dome) * relief ** 2.2;
}
// Forest: the massif's slopes, with a few clearings; the plains around are open
const clamp = (v) => Math.min(1, Math.max(0, v));
const forest = (x, y, h) => fade(clamp((fbm(x / 22 + 50, y / 22, 4, false) - 0.2) * 6)) * fade(clamp((h - 220) / 120));

const H = new Float64Array(GW * GH), F = new Uint8Array(GW * GH);
for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
  const h = elevation(x + 0.5, y + 0.5);
  H[y * GW + x] = h;
  F[y * GW + x] = forest(x + 0.5, y + 0.5, h) > 0.5 ? 1 : 0;
}
const sample = (x, y) => {
  const xi = Math.min(GW - 2, Math.max(0, Math.floor(x - 0.5))), yi = Math.min(GH - 2, Math.max(0, Math.floor(y - 0.5)));
  const u = Math.min(1, Math.max(0, x - 0.5 - xi)), v = Math.min(1, Math.max(0, y - 0.5 - yi)), i = yi * GW + xi;
  return H[i] * (1 - u) * (1 - v) + H[i + 1] * u * (1 - v) + H[i + GW] * (1 - u) * v + H[i + GW + 1] * u * v;
};

// Candidates: the highest summits, at least 10 km apart and away from the edges
const peaks = [];
for (let y = 12; y < GH - 12; y++) for (let x = 12; x < GW - 12; x++) {
  const h = H[y * GW + x];
  let top = true;
  for (let j = -6; j <= 6 && top; j++) for (let i = -6; i <= 6; i++) if (H[(y + j) * GW + x + i] > h) { top = false; break; }
  if (top) peaks.push({ x, y, h });
}
peaks.sort((a, b) => b.h - a.h);
const sites = [];
for (const p of peaks) if (sites.length < 8 && sites.every((s) => Math.hypot(s.x - p.x, s.y - p.y) > 36)) sites.push(p);

// Line of sight from each candidate, with the earth's curvature and refraction (k = 0.13)
const drop = (d) => ((d * CELL) ** 2 * 0.87) / (2 * 6371000);
for (const s of sites) {
  const eye = s.h + MAST, cx = s.x + 0.5, cy = s.y + 0.5;
  s.seen = new Uint8Array(GW * GH);
  for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
    const tx = x + 0.5, ty = y + 0.5, d = Math.hypot(tx - cx, ty - cy);
    if (d > RANGE) continue;
    const target = (H[y * GW + x] + SMOKE - drop(d) - eye) / Math.max(d, 1e-6);
    let ok = true;
    for (let t = 0.5; t < d - 0.5; t += 0.5) {
      if ((sample(cx + ((tx - cx) * t) / d, cy + ((ty - cy) * t) / d) - drop(t) - eye) / t > target) { ok = false; break; }
    }
    s.seen[y * GW + x] = ok ? 1 : 0;
  }
}

// Greedy pick: each time, the candidate that adds the most forest in view
const forestCells = F.reduce((a, b) => a + b, 0), union = new Uint8Array(GW * GH), kept = [], steps = [];
for (let k = 0; k < 3; k++) {
  let best, gain = -1;
  for (const s of sites) {
    if (kept.includes(s)) continue;
    let g = 0;
    for (let i = 0; i < union.length; i++) g += F[i] & s.seen[i] & (union[i] ^ 1);
    if (g > gain) [best, gain] = [s, g];
  }
  kept.push(best);
  for (let i = 0; i < union.length; i++) union[i] |= best.seen[i];
  steps.push(Math.round((100 * union.reduce((a, v, i) => a + (v & F[i]), 0)) / forestCells));
}

// Images, rendered from the continuous terrain at 1200 x 900
const tmp = mkdtempSync(join(tmpdir(), "coverage-"));
const IW = GW * PX, IH = GH * PX, hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
// The same map twice: forest in green, and forest in amber (shown where a kept point sees it)
const PAPER = hex("#f6f4ea"), CANOPY = hex("#c6d6b4"), SEEN = hex("#f4c552"), TEAL = hex("#054546");
const img = Buffer.alloc(IW * IH * 3), seenImg = Buffer.alloc(IW * IH * 3), forestPx = new Float32Array(IW * IH);
for (let py = 0; py < IH; py++) for (let px = 0; px < IW; px++) {
  const x = (px + 0.5) / PX, y = (py + 0.5) / PX, e = 1 / PX;
  const h = elevation(x, y), hx = (elevation(x + e, y) - elevation(x - e, y)) / (2 * e * CELL), hy = (elevation(x, y + e) - elevation(x, y - e)) / (2 * e * CELL);
  // Hillshade, light from the north-west, softened so it reads as paper rather than a photo
  const n = Math.hypot(hx * 5, hy * 5, 1), shade = (-hx * 5 * -0.5 + -hy * 5 * -0.5 + 0.7071) / n / 0.7071;
  const light = 1 + 0.2 * Math.max(-1, Math.min(0.3, shade - 1));
  const f = (forestPx[py * IW + px] = forest(x, y, h));
  // Contours every 50 m, every 250 m stronger, drawn at an even width whatever the slope
  const slope = Math.hypot(hx, hy) * CELL / PX; // metres per pixel
  const lineAt = (step, w) => clamp(w - (Math.abs(((h / step + 0.5) % 1) - 0.5) * step) / Math.max(slope, 1e-3));
  const ink = Math.max(0.2 * lineAt(50, 0.9), 0.38 * lineAt(250, 1.3));
  const o = (py * IW + px) * 3;
  for (let c = 0; c < 3; c++) {
    const base = (PAPER[c] + (CANOPY[c] - PAPER[c]) * f) * light, seen = SEEN[c] * light;
    img[o + c] = Math.min(255, Math.round(base + (TEAL[c] - base) * ink));
    seenImg[o + c] = Math.min(255, Math.round(seen + (TEAL[c] - seen) * ink));
  }
}
const write = (name, buf, alpha) => {
  const raw = join(tmp, name + ".pam");
  const head = `P7\nWIDTH ${IW}\nHEIGHT ${IH}\nDEPTH ${alpha ? 4 : 3}\nMAXVAL 255\nTUPLTYPE ${alpha ? "RGB_ALPHA" : "RGB"}\nENDHDR\n`;
  writeFileSync(raw, Buffer.concat([Buffer.from(head), buf]));
  execFileSync("magick", [raw, "-quality", alpha ? "60" : "78", join(root, "content/deployments", name + ".webp")]);
};
write("coverage-terrain", img, false);

// Forest in view from each kept point, with soft edges; overlaps are the same pixels, so stacking them does not darken
kept.forEach((s, k) => {
  const v = Float32Array.from(s.seen), blur = new Float32Array(GW * GH);
  for (let y = 1; y < GH - 1; y++) for (let x = 1; x < GW - 1; x++) {
    let sum = 0;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) sum += v[(y + j) * GW + x + i];
    blur[y * GW + x] = sum / 9;
  }
  const out = Buffer.alloc(IW * IH * 4);
  for (let py = 0; py < IH; py++) for (let px = 0; px < IW; px++) {
    const x = Math.min(GW - 1.001, Math.max(0, (px + 0.5) / PX - 0.5)), y = Math.min(GH - 1.001, Math.max(0, (py + 0.5) / PX - 0.5));
    const xi = Math.floor(x), yi = Math.floor(y), u = x - xi, w = y - yi, i = yi * GW + xi;
    const val = blur[i] * (1 - u) * (1 - w) + blur[i + 1] * u * (1 - w) + blur[i + GW] * (1 - u) * w + blur[i + GW + 1] * u * w;
    const o = (py * IW + px) * 4;
    const p = py * IW + px;
    out.set([...seenImg.subarray(p * 3, p * 3 + 3), Math.round(255 * clamp((val - 0.4) / 0.2) * forestPx[p])], o);
  }
  write(`coverage-${k + 1}`, out, true);
});

// Points in the page's 600 x 450 drawing space, kept ones first and in the order they were picked
const toView = (s) => ({ x: Math.round(((s.x + 0.5) * 600) / GW), y: Math.round(((s.y + 0.5) * 450) / GH), elevation: Math.round(s.h / 10) * 10 });
const data = {
  range: Math.round((RANGE * 600) / GW),
  kept: kept.map(toView),
  candidates: sites.filter((s) => !kept.includes(s)).map(toView),
  steps,
};
writeFileSync(join(root, "data/coverage.json"), JSON.stringify(data, null, 2) + "\n");
console.log(data);
