/* Pixel sprites for the kachnar hedge.

   Every sprite is drawn with its anchor at the bottom row's `^` column (or the
   middle column when there is no `^`): that is where it joins the stem. Each
   character is a palette key, `.` is empty.

   The leaf is the point of the whole hero. A kachnar leaf is one leaf in two
   lobes, joined at a midrib, so the left lobe (`a`) is lit and the right lobe
   (`b`) is in shade. It comes out of the bud folded shut and opens flat. */

export const LEAF = {
  folded: ["ab", "ab", "ab", "^m"],
  half: [".a.b.", ".amb.", "aambb", ".amb.", "..^.."],
  open: ["aa...bb", "aaa.bbb", "aaambbb", ".aambb.", "...^..."],
  small: ["a...b", "aa.bb", "aambb", "..^.."],
};

/* The flower: five petals, one of them (the "standard", `D` with a `v` vein)
   darker and striped, the way kachnar's upper petal is. `w` and `y` are the
   long pale stamens and their anthers curling out below. */
export const BLOOM = {
  bud: ["q", "q", "^"],
  opening: [".pDp.", "ppcpp", ".pwp.", "..^.."],
  open: ["..DDD..", ".pDvDp.", "ppDDDpp", "pppcppp", ".ppcpp.", "..pwp..", "...^..."],
  small: [".DDD.", "pDvDp", "ppcpp", ".pwp.", "..^.."],
};

/* Turns a sprite into cells relative to its anchor. `lean` shears the rows
   sideways (top rows move most), which is how pixel art tilts a shape
   without rotating it. `flip` mirrors it, so leaves face both ways. */
export function cellsOf(rows, { lean = 0, flip = false } = {}) {
  const h = rows.length;
  const last = rows[h - 1];
  let ax = last.indexOf("^");
  if (ax < 0) ax = Math.floor(last.length / 2);
  const out = [];
  rows.forEach((row, r) => {
    const up = h - 1 - r;
    const shift = Math.round(up * lean);
    [...row].forEach((ch, c) => {
      if (ch === ".") return;
      let dx = c - ax;
      if (flip) dx = -dx;
      let key = ch === "^" ? "m" : ch;
      // Mirrored, the lobes swap too, so the light still comes from the left.
      if (flip && key === "a") key = "b";
      else if (flip && key === "b") key = "a";
      out.push([dx + shift, r - (h - 1), key]);
    });
  });
  return out;
}
