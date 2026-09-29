# Dvaita site: handoff

The company site for Dvaita Technologies. It has one landing page, a contact page, the WhatsApp Business page that Meta verification points at, and a 404. The site is light-first and static, apart from one Cloudflare Pages Function for the contact form.

## Run it

```
npm install
npm run dev        # vite on :5173, no contact function
npm run pages      # build + wrangler pages dev, contact function included
npm run build      # -> dist/
```

Pushing to `main` deploys to the Cloudflare Pages project `dvaitatech` through `.github/workflows/deploy.yml`. That workflow uses the repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## To do before it goes live (Saurabh)

1. **Custom domain.** dvaitatech.com has Cloudflare nameservers but no A/CNAME record, so today only `dvaitatech.pages.dev` works. To fix it, go to Pages → dvaitatech → Custom domains and add `dvaitatech.com` and `www.dvaitatech.com`.
2. **Contact form email.**
   - Create a Resend account and verify `dvaitatech.com`. Resend's DNS records (SPF/DKIM on a subdomain) sit alongside the Google Workspace MX; they don't replace it.
   - Then set `RESEND_API_KEY` under Pages → Settings → Variables and secrets.
   - Optional: `CONTACT_TO` (default `contact@dvaitatech.com`) and `CONTACT_FROM` (default `Dvaita website <website@dvaitatech.com>`).
   - Until the key is set, the form answers 503 and tells the visitor to email instead, so nothing is lost silently.
3. **Check these facts:**
   - The contact email `contact@dvaitatech.com` and the phone number `+91 98923 56631`.
   - Whether GradGuard, Invoice Buddy and the MGNREGA/PMAY work can be named publicly. LexiVox is already public.
   - Whether Invoice Buddy really makes and sends invoices from WhatsApp. The card describes it that way.
   - **The legal name on `/whatsapp`.** It reads "Dvatia Technologies OPC Private Limited", copied letter for letter from the old page. If "Dvatia" is a typo, fix it, but only once the name matches what Meta has on record.

## Design rules

The site follows the Beady site's grammar (`~/workspace/beady-site`):

1. **Colour never argues.** The greens and pinks live inside the hedge, the pixel leaf and the card films. They never go on a heading, a button or a link. The pale pink closing band is the one exception, and its colour is the flower's.
2. **Big type, light weight.** Display sizes use Inter 400 at -0.04em.
3. **A ring, never a shadow.** Cards are `box-shadow: 0 0 0 1px var(--color-ring)`. There is no drop shadow anywhere.
4. **The name keeps its serif.** द्वैत is set in Tiro Devanagari Sanskrit, and nothing else is.
5. **Copy:** short, plain, first person plural, no em dashes. Don't add taglines, uppercase eyebrow labels, pills used as decoration, or stats nobody can back up.

## The kachnar hedge (`src/js/kachnar/`)

This is the idea behind the whole site:

- Kachnar (*Bauhinia*) has a leaf split into two lobes, one leaf in two halves, which is dvaita. The genus is named after the Bauhin brothers because of that leaf.
- The hero hedge grows up out of the soil line in about 2.6s. Stems climb first, then leaves come out folded and open, then the flowers pop. After that it stays still.

The three files:

- `grow.js` lays out the hedge on a tile grid. Every piece (a stem tile, a leaf, a flower) gets a birth time and stages. The knobs:
  - `SPEED` (tiles per second).
  - The `profile()` curve: low in the middle under the headline, tall at the edges.
  - Two layers: the back row is paler.
  - The `tall` and `blooms` options.
  - It is seeded, so the composition is the same on every visit. Change `seed` to get a different one.
- `sprites.js` holds the pixel sprites. Leaves are `a` (lit lobe), `b` (shaded lobe) and `m` (midrib), so every leaf shows its two halves.
- `render.js` draws on a Canvas2D:
  - Settled tiles are resolved on a grid and drawn one colour at a time (about 3ms a frame at 1440px).
  - Only pieces that are still popping are drawn tile by tile.
  - It pauses off screen and in background tabs.
  - It draws the finished frame straight away under `prefers-reduced-motion`.
  - It re-lays out on resize.

`?t=1.2` on any page freezes the hedge at that moment. Use it for reviewing and screenshots. `public/og.png` was taken from `/?t=9` at 1200×630.

The contact page and 404 use a short strip of the same hedge (`tall: 0.62, blooms: 0.45`).

## Motion (`src/js/reveal.js`, `src/styles/base.css`, `src/styles/films.css`)

This is ported from Beady's `hero.js`:

- **`[data-reveal]`:** fades up 18px over 560ms.
- **`.deal`:** cards go down like cards on a desk. They lean ±1.2°, use the `--ease-deal` overshoot, take 880ms and are staggered 80ms apart. Both toggle `.in-view` on and off, so they replay when you scroll back.
- **`[data-film="ms"]`:** plays the one-shot animations inside a card well while it's on screen, and replays every `ms` after a short fade (`.rewind`). `0` means it plays once each time it arrives. The plain CSS state of every film is its finished frame, so no-JS and reduced motion both show the end.
- **`[data-words]`:** is split into one span per word, for the word-by-word films (LexiVox reading, Invoice Buddy typing).
- **Gating:** everything is gated on `html[data-anim]`, which the script sets last.

## Files

```
index.html               the one pager
contact/index.html       form + details
whatsapp/index.html      Meta verification page (noindex, kept out of the nav)
404.html
functions/api/contact.js Pages Function -> Resend
src/styles/tokens.css    colours, type, radii, easing
src/styles/base.css      bar, buttons, footer, reveal/deal, reduced motion
src/styles/home.css      hero, name band, cards, close band
src/styles/films.css     the card films
src/styles/pages.css     contact / whatsapp / 404
src/js/kachnar/          the hedge
public/                  favicon (the pixel leaf), og.png, _headers, robots, sitemap
```

The wordmark's leaf dot and the big leaf in the name band are inline SVG rects generated from the same pixel shape as the favicon. If you change the leaf, change it in all three places.
