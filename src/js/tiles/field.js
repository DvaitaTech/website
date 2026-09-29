import { rng } from "./rng.js";

/* The field: tiles that grow in from every edge of the box toward a clearing
   in the middle, where the words sit.

   How it grows: every edge cell is a seed, and each tile's arrival time is
   its cheapest path from any edge through random step costs (first-passage
   percolation, a Dijkstra with noisy weights). That gives organic, ragged
   fronts that advance at roughly the same pace from all sides.

   The dvaita part: every tile remembers which half of the box its seed was
   on. Growth from the left is one colour family and from the right another,
   and where the two fronts meet, above and below the words, they leave an
   uneven seam. Two halves, one frame.

   Colour is by depth: a tile on a growing front is the palest, and each step
   further in is a band deeper, like shallows on a map. The outermost row of
   every front thins out in a dither into the page. */

class Heap {
  constructor() {
    this.k = [];
    this.v = [];
  }
  push(key, val) {
    const k = this.k;
    const v = this.v;
    let i = k.length;
    k.push(key);
    v.push(val);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (k[p] <= key) break;
      k[i] = k[p];
      v[i] = v[p];
      i = p;
    }
    k[i] = key;
    v[i] = val;
  }
  pop() {
    const k = this.k;
    const v = this.v;
    const topK = k[0];
    const topV = v[0];
    const lastK = k.pop();
    const lastV = v.pop();
    if (k.length) {
      let i = 0;
      const n = k.length;
      for (;;) {
        let c = 2 * i + 1;
        if (c >= n) break;
        if (c + 1 < n && k[c + 1] < k[c]) c++;
        if (k[c] >= lastK) break;
        k[i] = k[c];
        v[i] = v[c];
        i = c;
      }
      k[i] = lastK;
      v[i] = lastV;
    }
    return [topK, topV];
  }
  get size() {
    return this.k.length;
  }
}

export function growField({ cols, rows, clear, seed = 5, fadeTop = 0, fadeBottom = 0, keepTop = 0 }) {
  const r = rng(seed);
  const n = cols * rows;
  const time = new Float32Array(n).fill(Infinity);
  const side = new Int8Array(n).fill(-1);
  const cost = new Float32Array(n);
  for (let i = 0; i < n; i++) cost[i] = 0.35 + r() ** 2 * 1.6;

  // The clearing: an ellipse around the words, its edge roughened with a
  // little low-frequency wobble so it isn't a drawn shape.
  const wob = [r() * 6.28, r() * 6.28, r() * 6.28];
  const inside = (x, y) => {
    const dx = (x + 0.5 - clear.cx) / clear.rx;
    const dy = (y + 0.5 - clear.cy) / clear.ry;
    const a = Math.atan2(dy, dx);
    const edge = 1 + 0.06 * Math.sin(3 * a + wob[0]) + 0.04 * Math.sin(5 * a + wob[1]) + 0.03 * Math.sin(8 * a + wob[2]);
    return Math.hypot(dx, dy) / edge;
  };
  const norm = new Float32Array(n);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) norm[y * cols + x] = inside(x, y);

  // Which half a seed belongs to. The sides are pure; along the top and
  // bottom the seeds come in runs, and toward the middle a run is as likely
  // to be one half as the other, so the two meet in an interleaved seam.
  const runs = (y) => {
    const out = new Int8Array(cols);
    let x = 0;
    while (x < cols) {
      const len = r.int(4, 13);
      const left = 1 / (1 + Math.exp((x + len / 2 - cols / 2) / (cols * 0.07)));
      const v = r() < left ? 0 : 1;
      for (let k = 0; k < len && x < cols; k++, x++) out[x] = v;
    }
    return out;
  };
  const topRun = runs(0);
  const bottomRun = runs(rows - 1);
  const half = (x, y) => (y === 0 ? topRun[x] : y === rows - 1 ? bottomRun[x] : x < cols / 2 ? 0 : 1);

  const heap = new Heap();
  for (let x = 0; x < cols; x++) {
    for (const y of [0, rows - 1]) {
      const i = y * cols + x;
      time[i] = cost[i];
      side[i] = half(x, y);
      heap.push(time[i], i);
    }
  }
  for (let y = 1; y < rows - 1; y++) {
    for (const x of [0, cols - 1]) {
      const i = y * cols + x;
      time[i] = cost[i];
      side[i] = x < cols / 2 ? 0 : 1;
      heap.push(time[i], i);
    }
  }

  while (heap.size) {
    const [t, i] = heap.pop();
    if (t > time[i]) continue;
    const x = i % cols;
    const y = (i / cols) | 0;
    const near = [x > 0 && i - 1, x < cols - 1 && i + 1, y > 0 && i - cols, y < rows - 1 && i + cols];
    for (const j of near) {
      if (j === false || norm[j] < 1) continue;
      const nt = t + cost[j];
      if (nt < time[j]) {
        time[j] = nt;
        side[j] = side[i];
        heap.push(nt, j);
      }
    }
  }

  let tMax = 0;
  for (let i = 0; i < n; i++) if (time[i] < Infinity) tMax = Math.max(tMax, time[i]);

  // Distance from each tile to the nearest open cell: 0 on a growing front,
  // more the deeper inside. Fronts are pale, the frame's body is deep.
  const dist = new Int16Array(n).fill(-1);
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (time[i] === Infinity) {
      dist[i] = 0;
      queue.push(i);
    }
  }
  for (let q = 0; q < queue.length; q++) {
    const i = queue[q];
    const x = i % cols;
    const y = (i / cols) | 0;
    for (const j of [x > 0 && i - 1, x < cols - 1 && i + 1, y > 0 && i - cols, y < rows - 1 && i + cols]) {
      if (j === false || dist[j] !== -1) continue;
      dist[j] = dist[i] + 1;
      queue.push(j);
    }
  }

  const tiles = [];
  for (let i = 0; i < n; i++) {
    if (time[i] === Infinity) continue;
    const x = i % cols;
    const y = (i / cols) | 0;
    // Cells the fill never reaches (a box with no clearing) count as deep.
    const d = dist[i] === -1 ? 99 : dist[i] - 1;
    // The outermost row of a front thins out, a dither into the page.
    if (d === 0 && r() < 0.45) continue;
    const band = Math.max(0, 6 - Math.min(6, Math.floor(d * 0.9 + r() * 0.8)));
    // Dissolves: under the nav, so it sits on clear ground, and along the
    // bottom, so the field melts into the next section instead of stopping.
    // Tiles thin out in a dither and go pale as they near either edge.
    let fade = 1;
    if (y < keepTop) continue;
    if (y < keepTop + fadeTop) fade = Math.min(fade, (y - keepTop + 0.5) / fadeTop);
    if (y >= rows - fadeBottom) fade = Math.min(fade, (rows - y - 0.5) / fadeBottom);
    if (fade < 1) {
      if (r() > fade ** 1.6) continue;
      const pale = Math.round((1 - fade) * 6);
      tiles.push({ i, x, y, at: time[i] / tMax, side: side[i], band: Math.max(band, pale) });
      continue;
    }
    tiles.push({ i, x, y, at: time[i] / tMax, side: side[i], band });
  }
  return { tiles };
}
