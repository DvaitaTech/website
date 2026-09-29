import { growField } from "./field.js";

/* Grows the field on a canvas that fills the hero, once, around the words.

   The clearing is measured from `around` (the headline block), so the tiles
   stop short of the text at every width. Growth takes about two and a half
   seconds, then the loop stops. After that, tiles under the pointer turn to
   their twin, the same shade in the other half's colour, and turn back.

   `?t=1.2` freezes the growth at that moment, for review. */

// Deepest at the frame, palest at the clearing. Left half, then right half.
const FAMILIES = [
  ["#2c5534", "#3a6e40", "#4f8a4b", "#6fa65a", "#95c27a", "#bfdcab", "#e2eedb"],
  ["#6e1b4a", "#922a66", "#b8438a", "#d267a8", "#e596c6", "#f2c4de", "#f9e3ef"],
];
const BANDS = 7;
const SHADES = 3; // per-tile variation, so it reads as a mosaic

const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
const css = (rgb) => `rgb(${rgb.map(Math.round).join(" ")})`;

// Every colour a tile can be: family, band, shade.
const COLOURS = [];
for (const fam of FAMILIES) {
  for (const c of fam) {
    const rgb = hex(c);
    COLOURS.push(css(rgb.map((v) => v * 0.94)), css(rgb), css(rgb.map((v) => v + (255 - v) * 0.08)));
  }
}
const colourOf = (side, band, shade) => (side * BANDS + band) * SHADES + shade;

// Beady's --ease-spring, cubic-bezier(0.34, 1.4, 0.5, 1).
function bezier(x1, y1, x2, y2) {
  const at = (a, b, t) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 18; i++) {
      t = (lo + hi) / 2;
      if (at(x1, x2, t) < x) lo = t;
      else hi = t;
    }
    return at(y1, y2, t);
  };
}
const spring = bezier(0.34, 1.4, 0.5, 1);

const GROW = 2.1; // seconds from the first tile to the last
const POP = 0.28;
const FLIP = 0.7; // seconds a tile stays its twin

export function mountField(canvas, { around, seed = 5, delay = 0.15, pad = 24 } = {}) {
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const frozen = new URLSearchParams(location.search).get("t");

  let dpr = 1;
  let tile = 12;
  let cols = 0;
  let rows = 0;
  let ox = 0;
  let oy = 0;
  let tiles = [];
  let grid = null;
  let flipped = null;
  let buckets = COLOURS.map(() => []);
  let t0 = null;
  let raf = 0;
  let grown = still || frozen !== null;

  function layout() {
    const box = canvas.getBoundingClientRect();
    const w = box.width;
    const h = box.height;
    if (!w || !h) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    tile = w < 700 ? 8 : Math.max(8, Math.min(12, Math.round(w / 150)));
    cols = Math.ceil(w / tile);
    rows = Math.ceil(h / tile);
    ox = Math.floor((w - cols * tile) / 2);
    oy = Math.floor((h - rows * tile) / 2);

    const text = around.getBoundingClientRect();
    const cx = (text.left + text.width / 2 - box.left - ox) / tile;
    const cy = (text.top + text.height / 2 - box.top - oy) / tile;
    // An ellipse that holds the text box with room around it.
    const rx = ((text.width / 2 + pad) * 1.02) / tile;
    const ry = ((text.height / 2 + pad) * 1.12) / tile;
    tiles = growField({ cols, rows, clear: { cx, cy, rx, ry }, seed }).tiles;
    for (const t of tiles) t.shade = (t.x * 7 + t.y * 13) % SHADES;
    grid = new Int32Array(cols * rows);
    flipped = new Float32Array(cols * rows);
    return true;
  }

  function paint(now, t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.fill(-1);
    const popping = [];
    for (const k of tiles) {
      const age = t - k.at * GROW;
      if (age < 0) continue;
      const side = flipped[k.i] > now ? 1 - k.side : k.side;
      const ci = colourOf(side, k.band, k.shade);
      if (age >= POP) grid[k.i] = ci;
      else popping.push(k, ci, spring(age / POP));
    }

    const size = Math.round(tile * dpr) - Math.max(1, Math.round(dpr * 0.75));
    const edge = Math.max(1, Math.round(size * 0.16));
    const xs = (i) => Math.round((ox + (i % cols) * tile) * dpr);
    const ys = (i) => Math.round((oy + ((i / cols) | 0) * tile) * dpr);
    for (const b of buckets) b.length = 0;
    for (let i = 0; i < grid.length; i++) if (grid[i] >= 0) buckets[grid[i]].push(i);
    buckets.forEach((b, ci) => {
      if (!b.length) return;
      ctx.fillStyle = COLOURS[ci];
      ctx.beginPath();
      for (const i of b) ctx.rect(xs(i), ys(i), size, size);
      ctx.fill();
    });
    const light = new Path2D();
    const shade = new Path2D();
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] < 0) continue;
      const x = xs(i);
      const y = ys(i);
      light.rect(x, y, size, edge);
      shade.rect(x, y + size - edge, size, edge);
    }
    ctx.fillStyle = "rgb(255 255 255 / 0.14)";
    ctx.fill(light);
    ctx.fillStyle = "rgb(0 0 0 / 0.07)";
    ctx.fill(shade);

    for (let n = 0; n < popping.length; n += 3) {
      const k = popping[n];
      const s = popping[n + 2] * tile;
      const cx = ox + (k.x + 0.5) * tile;
      const cy = oy + (k.y + 0.5) * tile;
      const px = Math.round((s - Math.max(1, dpr * 0.75) / dpr) * dpr);
      if (px <= 0) continue;
      ctx.fillStyle = COLOURS[popping[n + 1]];
      ctx.fillRect(Math.round((cx - s / 2) * dpr), Math.round((cy - s / 2) * dpr), px, px);
    }
  }

  function frame(now) {
    raf = 0;
    if (t0 === null) t0 = now + delay * 1000;
    const t = Math.max(0, (now - t0) / 1000);
    paint(now / 1000, t);
    if (t < GROW + POP) {
      raf = requestAnimationFrame(frame);
      return;
    }
    grown = true;
    // Keep going only while a tile is still showing its twin.
    const clock = now / 1000;
    if (flipped.some((v) => v > clock)) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (!layout()) return;
    if (frozen !== null) paint(0, Number(frozen));
    else if (grown) paint(0, Infinity);
    else raf = requestAnimationFrame(frame);
  }

  let timer = 0;
  new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (Math.round(canvas.getBoundingClientRect().width * dpr) === canvas.width) return;
      if (!layout()) return;
      if (grown) paint(performance.now() / 1000, frozen !== null ? Number(frozen) : Infinity);
    }, 150);
  }).observe(canvas);

  // Tiles under the pointer turn to their twin for a moment.
  if (!still) {
    canvas.parentElement.addEventListener("pointermove", (e) => {
      if (!grown || e.pointerType === "touch" || frozen !== null) return;
      const box = canvas.getBoundingClientRect();
      const gx = Math.floor((e.clientX - box.left - ox) / tile);
      const gy = Math.floor((e.clientY - box.top - oy) / tile);
      const until = performance.now() / 1000 + FLIP;
      let hit = false;
      for (let y = gy - 2; y <= gy + 2; y++) {
        for (let x = gx - 2; x <= gx + 2; x++) {
          if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
          if ((x - gx) ** 2 + (y - gy) ** 2 > 5) continue;
          flipped[y * cols + x] = until - Math.hypot(x - gx, y - gy) * 0.08;
          hit = true;
        }
      }
      if (hit && !raf) {
        t0 = t0 ?? performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
  }

  if (document.fonts?.ready) document.fonts.ready.then(start);
  else start();
}
