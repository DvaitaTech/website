import { growHedge } from "./grow.js";

/* Draws the hedge on a canvas and grows it once.

   Every frame repaints the lot (a few thousand rects, a few milliseconds),
   and once the last flower has settled the loop stops for good: after that
   the canvas is a still picture until the window is resized. */

const CANVAS = [251, 250, 249];

// Front row. The back row is the same colours washed toward the page.
const PALETTE = {
  k: "#5a5a3c", // stem
  m: "#244a2b", // midrib
  a: "#82b863", // lit lobe
  b: "#356f3e", // shaded lobe
  q: "#b85a8c", // bud
  c: "#fbe3ef", // flower centre
  w: "#fff6fa", // stamen
  y: "#e7b43f", // anther
  v: "#7a1d52", // vein on the standard petal
  g: "#c9b59b", // soil
  h: "#b39c7f",
  j: "#dccbb3",
};

// Young, grown and old leaves.
const LEAVES = [
  { a: "#9fcb74", b: "#4f8d49" },
  { a: "#82b863", b: "#356f3e" },
  { a: "#679c50", b: "#285a31" },
];

// Two kinds of flower: the common pink-lavender and a deeper magenta.
const PETALS = [
  { p: "#eaa3cf", D: "#c24790" },
  { p: "#d670ad", D: "#9e2c6e" },
];

const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
const mix = (rgb, to, k) => rgb.map((v, i) => Math.round(v + (to[i] - v) * k));
const css = ([r, g, b]) => `rgb(${r} ${g} ${b})`;

function colourOf(key, kind, layer, variant, x, y) {
  let base = PALETTE[key];
  if (kind === "bloom" && (key === "p" || key === "D")) base = PETALS[variant][key];
  if (kind === "leaf" && (key === "a" || key === "b")) base = LEAVES[variant][key];
  let rgb = hex(base);
  // A little per-tile variation, so it reads as a mosaic and not a flat fill.
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  const jitter = (n - Math.floor(n) - 0.5) * 0.1;
  rgb = jitter > 0 ? mix(rgb, [255, 255, 255], jitter) : mix(rgb, [0, 0, 0], -jitter);
  if (layer === 0) rgb = mix(rgb, CANVAS, 0.36);
  return css(rgb);
}

// Beady's --ease-spring, cubic-bezier(0.34, 1.4, 0.5, 1), solved for x.
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

const POP = 0.26; // seconds for a piece to pop to full size
const STAGE_POP = 0.16;

export function mountHedge(canvas, { seed = 11, delay = 0.25, tall = 1, blooms = 1 } = {}) {
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let dpr = 1;
  let tile = 8;
  let ox = 0;
  let oy = 0;
  let hedge = null;
  let t0 = null;
  let raf = 0;
  let finished = still;
  let visible = true;

  function layout() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    tile = Math.max(5, Math.min(12, Math.round(w / 150)));
    const cols = Math.ceil(w / tile);
    const rows = Math.floor(h / tile);
    ox = Math.floor((w - cols * tile) / 2);
    oy = h - rows * tile;
    hedge = growHedge({ cols, rows, seed, narrow: w < 700, tall, blooms });
    for (const p of hedge.pieces) {
      for (const s of p.stages) {
        for (const c of s.cells) c[3] = colourOf(c[2], p.kind, p.layer, p.variant ?? 0, c[0], c[1]);
      }
    }
    hedge.soil.forEach((c) => (c[3] = colourOf(c[2], "soil", 1, 0, c[0], c[1])));
    return true;
  }

  // One tile: a square with a hairline gap, a lit top edge and a shaded
  // bottom edge, drawn in device pixels so it stays crisp.
  function cell(gx, gy, colour, scale, ax, ay) {
    const size = tile * scale;
    const cx = ox + (ax + 0.5 + (gx - ax) * scale) * tile;
    const cy = oy + (ay + 1 + (gy + 0.5 - ay - 1) * scale) * tile;
    const gap = Math.max(1, Math.round(dpr * 0.75));
    const x = Math.round((cx - size / 2) * dpr);
    const y = Math.round((cy - size / 2) * dpr);
    const s = Math.round(size * dpr) - gap;
    if (s <= 0) return;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, s, s);
    const edge = Math.max(1, Math.round(s * 0.16));
    ctx.fillStyle = "rgb(255 255 255 / 0.13)";
    ctx.fillRect(x, y, s, edge);
    ctx.fillStyle = "rgb(0 0 0 / 0.07)";
    ctx.fillRect(x, y + s - edge, s, edge);
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const [x, y, , colour] of hedge.soil) cell(x, y, colour, 1, x, y);
    for (const p of hedge.pieces) {
      const age = t - p.birth;
      if (age < 0) continue;
      let stage = p.stages[0];
      for (const s of p.stages) if (s.at <= age) stage = s;
      let scale = spring(age / POP);
      if (stage.at > 0) scale *= 0.75 + 0.25 * spring((age - stage.at) / STAGE_POP);
      for (const [x, y, , colour] of stage.cells) cell(x, y, colour, scale, p.ax, p.ay);
    }
  }

  function frame(now) {
    raf = 0;
    if (t0 === null) t0 = now + delay * 1000;
    const t = Math.max(0, (now - t0) / 1000);
    draw(t);
    if (t >= hedge.end) {
      finished = true;
      return;
    }
    if (visible) raf = requestAnimationFrame(frame);
  }

  // `?t=1.2` freezes the hedge at that moment, for reviewing the growth.
  const frozen = new URLSearchParams(location.search).get("t");

  function start() {
    if (!layout()) return;
    if (frozen !== null) {
      finished = true;
      draw(Number(frozen));
    } else if (finished) draw(Infinity);
    else raf = requestAnimationFrame(frame);
  }

  // A resize lays the grid out again for the new width. Mid-growth it simply
  // carries on from the same moment; afterwards it draws the finished hedge.
  let resizeTimer = 0;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const w = canvas.clientWidth;
      if (Math.round(w * dpr) === canvas.width && canvas.height === Math.round(canvas.clientHeight * dpr)) return;
      if (!layout()) return;
      if (finished) draw(frozen !== null ? Number(frozen) : Infinity);
    }, 120);
  };
  new ResizeObserver(onResize).observe(canvas);

  // Off screen or in a background tab, the clock stops rather than the growth
  // being over by the time anyone looks.
  const pause = (hidden) => {
    if (finished) return;
    if (hidden && visible) {
      visible = false;
      cancelAnimationFrame(raf);
      raf = 0;
      pausedAt = performance.now();
    } else if (!hidden && !visible) {
      visible = true;
      if (t0 !== null) t0 += performance.now() - pausedAt;
      raf = requestAnimationFrame(frame);
    }
  };
  let pausedAt = 0;
  document.addEventListener("visibilitychange", () => pause(document.hidden));
  new IntersectionObserver(([e]) => pause(!e.isIntersecting)).observe(canvas);

  start();
  return { replay: () => ((finished = false), (t0 = null), start()) };
}
