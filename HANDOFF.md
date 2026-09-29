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
   - Whether GradGuard, Invoice Buddy and the MGNREGA/PMAY work can be named publicly. LexiVox is open source.
   - Whether Invoice Buddy really makes and sends invoices from WhatsApp. The card describes it that way.
   - **The legal name on `/whatsapp`.** It reads "Dvatia Technologies OPC Private Limited", copied letter for letter from the old page. If "Dvatia" is a typo, fix it, but only once the name matches what Meta has on record.

## Design rules

The site follows the Beady site's grammar (`~/workspace/beady-site`):

1. **Colour never argues.** The greens and pinks live inside the hero field, the pixel leaf, the footer mosaic and the card films. They never go on a heading, a button or a link. The pale pink closing band is the one exception, and its colour is the flower's.
2. **Big type, light weight.** Display sizes use Inter 400 at -0.04em.
3. **A ring, never a shadow.** Cards are `box-shadow: 0 0 0 1px var(--color-ring)`. There is no drop shadow anywhere.
4. **The name keeps its serif.** द्वैत is set in Tiro Devanagari Sanskrit, and nothing else is.
5. **Copy:** short, plain, first person plural, no em dashes. Don't add taglines, uppercase eyebrow labels, pills used as decoration, or stats nobody can back up.

## The hero field (`src/js/tiles/`)

- **What it does:** 8-bit tiles grow in from every edge of the first screen toward a clearing around the centred headline, then stop.
- **Dvaita:** growth from the left half is green and from the right half pink, and the two meet in an interleaved seam above and below the words.
- **Colour:** tiles on a growing front are the palest and each step inward is a band deeper. The outermost row of every front dithers out.
- **Edges:**
  - Nothing grows behind the bar (`keepTop`), and tiles dissolve in just below it (`fadeTop`).
  - The bottom fifth dissolves into the next section (`fadeBottom`).
  - The bar is clear over the hero and frosts once you scroll (`watchBar` in `reveal.js`).
- **Pointer:** tiles under it turn to their twin, the same shade in the other half's colour, for 0.7s.

The two files:

- `field.js`: first-passage growth, a Dijkstra with noisy step costs from every edge cell, plus the banding and dithers. `seed` changes the composition.
- `render.js`:
  - Measures the clearing from the headline block and lays the grid out at the canvas size.
  - Draws settled tiles batched by colour; tiles still popping are drawn one at a time.
  - Stops once grown, draws the finished frame under reduced motion, and re-lays out on resize.

`?t=1.2` on any page freezes the growth at that moment, for review and screenshots. `public/og.png` was taken from `/?t=9` at 1200×630. The 404 uses the same field.

The field appears once on the home page, in the hero, on purpose. The closing band is plain pale pink.

The logomark is the kachnar leaf in pixels: the lit lobe and the shaded lobe. It sits beside the name in the bar and footer, folds shut and opens on hover, and is also the favicon and the big leaf in the "Two halves, one leaf" band. The footer ends with द्वैत as a tile mosaic, split green and pink.

## LexiVox (`/lexivox`)

This is a product page on this site. The old app at lexivox.dvaitatech.com no longer resolves, because it has no DNS record, so the page's button goes to GitHub. If the app is hosted again, point the "Get it on GitHub" button (or a second "Open LexiVox" button) at it.

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
lexivox/index.html       LexiVox product page
whatsapp/index.html      Meta verification page (noindex, kept out of the nav)
404.html
functions/api/contact.js Pages Function -> Resend
src/styles/tokens.css    colours, type, radii, easing
src/styles/base.css      bar, buttons, footer, reveal/deal, reduced motion
src/styles/home.css      hero, name band, cards, close band
src/styles/films.css     the card films
src/styles/pages.css     contact / whatsapp / 404
src/js/tiles/            the hero field
public/                  favicon (the pixel leaf), og.png, _headers, robots, sitemap
```

The wordmark's leaf dot and the big leaf in the name band are inline SVG rects generated from the same pixel shape as the favicon. If you change the leaf, change it in all three places.
