import { rng } from "./rng.js";
import { BLOOM, LEAF, cellsOf } from "./sprites.js";

/* Lays out the hedge on a grid of `cols` by `rows` tiles and gives every piece
   a birth time, so the renderer only has to ask "what exists at time t".

   A piece is one stem tile, one leaf or one flower. It has stages (a leaf is
   folded, then half open, then open) and each stage is a list of cells
   `[x, y, key]` in grid space. The ground is the bottom SOIL rows; everything
   else grows up out of it.

   Composition: the hedge is low in the middle, under the headline, and rises
   toward both edges. Two layers: a taller, paler row at the back and a lower,
   richer row in front, which is what gives it depth on a light page. */

export const SOIL = 2;

// Tiles per second a stem climbs. The tallest stems reach the top at ~1.5s.
const SPEED = 30;

const KIND = { stem: 0, leaf: 1, bloom: 2 };

export function growHedge({ cols, rows, seed = 11, narrow = false, tall = 1, blooms = 1 }) {
  const r = rng(seed);
  const ground = rows - SOIL;
  const pieces = [];

  const add = (kind, layer, birth, ax, ay, stages, extra = {}) => {
    pieces.push({
      kind,
      layer,
      birth,
      ax,
      ay,
      stages: stages.map(({ at, cells }) => ({
        at,
        cells: cells.map(([dx, dy, key]) => [ax + dx, ay + dy, key]),
      })),
      ...extra,
    });
  };

  const stemCell = (x, y, t, layer) => {
    if (y < 0 || y >= ground) return;
    add("stem", layer, t, x, y, [{ at: 0, cells: [[0, 0, "k"]] }]);
  };

  const leaf = (x, y, side, t, layer, big) => {
    const lean = side * r.range(0.35, 0.75);
    const open = big ? LEAF.open : LEAF.small;
    add(
      "leaf",
      layer,
      t + 0.04,
      x + side,
      y,
      [
        { at: 0, cells: cellsOf(LEAF.folded, { lean }) },
        { at: 0.1, cells: cellsOf(LEAF.half, { lean }) },
        { at: 0.22, cells: cellsOf(open, { lean }) },
      ],
      // Neighbouring leaves in different greens, so each one reads as a leaf
      // and not as part of a green mass.
      { variant: r.int(0, 2) },
    );
  };

  const bloom = (x, y, t, layer, big) => {
    const lean = r.range(-0.3, 0.3);
    const flip = r() < 0.5;
    add(
      "bloom",
      layer,
      t,
      x,
      y,
      [
        { at: 0, cells: cellsOf(BLOOM.bud, { lean }) },
        { at: 0.16, cells: cellsOf(BLOOM.opening, { lean, flip }) },
        { at: 0.3, cells: cellsOf(big ? BLOOM.open : BLOOM.small, { lean, flip }) },
      ],
      { variant: r() < 0.72 ? 0 : 1 },
    );
  };

  function branch(x, y, dir, len, t, depth, layer) {
    let fx = x;
    let px = x;
    let cy = y;
    let side = r() < 0.5 ? -1 : 1;
    let nextLeaf = r.int(2, 3);
    let tt = t;
    const big = layer === 1 && depth < 2;

    for (let i = 0; i < len; i++) {
      cy -= 1;
      fx += dir + r.range(-0.2, 0.2);
      dir *= 0.88;
      const cx = Math.round(fx);
      tt = t + i / SPEED;

      // A sideways jump would leave a gap in the stem, so bridge it.
      const step = Math.sign(cx - px);
      for (let bx = px + step; step && bx !== cx; bx += step) stemCell(bx, cy + 1, tt, layer);
      stemCell(cx, cy, tt, layer);
      px = cx;

      if (i >= nextLeaf) {
        // Kachnar flowers along the branch as well as at the tips.
        if (i > 5 && r() < 0.05 * blooms) bloom(cx + side, cy, tt + r.range(0.35, 0.8), layer, false);
        else leaf(cx, cy, side, tt, layer, big);
        side = -side;
        nextLeaf = i + r.int(3, 4);
      }

      if (depth < 2 && i > 3 && i < len - 4 && r() < (depth === 0 ? 0.17 : 0.1)) {
        const s = r() < 0.5 ? -1 : 1;
        branch(cx, cy, s * r.range(0.45, 0.95), Math.round((len - i) * r.range(0.45, 0.75)), tt, depth + 1, layer);
      }
    }

    if (len < 2) return;
    if (r() < (depth === 0 ? 0.75 : 0.35) * blooms) bloom(px, cy - 1, tt + r.range(0.25, 0.6), layer, layer === 1 || depth === 0);
    else leaf(px, cy - 1, 0, tt, layer, big);
  }

  // Low in the middle (0) and tall at the edges (1).
  const profile = (xn) => {
    const e = Math.min(1, Math.abs(xn - 0.5) * 2);
    // On a phone the headline fills the width, so the edges rise less.
    return narrow ? 0.4 + 0.32 * e ** 1.4 : 0.36 + 0.58 * e ** 1.6;
  };

  for (const layer of [0, 1]) {
    let x = -r.int(2, 6);
    while (x < cols + 6) {
      const xn = x / cols;
      const room = ground * profile(xn) * tall;
      // Leave room above every stem for a flower, so none is cut off by the
      // top of the canvas.
      const height = Math.min(room * (layer === 0 ? r.range(0.8, 1) : r.range(0.5, 0.75)), ground - 9);
      const start = 0.05 + Math.abs(xn - 0.5) * 0.3 + r.range(0, 0.25) + (layer === 0 ? 0.06 : 0);
      branch(x, ground, r.range(-0.25, 0.25), Math.round(height), start, 0, layer);
      x += layer === 0 ? r.int(5, 9) : r.int(4, 8);
    }
  }

  // Ground cover: leaves sitting right on the soil, so the base reads as a
  // hedge and not as a row of bare stems.
  let x = r.int(-1, 1);
  while (x < cols + 2) {
    const side = r() < 0.5 ? -1 : 1;
    leaf(x, ground - r.int(0, 1), side, r.range(0.02, 0.45), 1, r() < 0.6);
    x += r.int(2, 3);
  }

  pieces.sort((p, q) => p.layer - q.layer || KIND[p.kind] - KIND[q.kind] || p.birth - q.birth);

  let end = 0;
  for (const p of pieces) end = Math.max(end, p.birth + p.stages[p.stages.length - 1].at + 0.4);

  const soil = [];
  for (let y = ground; y < rows; y++) {
    for (let sx = 0; sx < cols; sx++) soil.push([sx, y, r() < 0.18 ? "h" : r() < 0.1 ? "j" : "g"]);
  }

  return { pieces, soil, end, ground };
}
