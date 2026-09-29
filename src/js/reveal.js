/* Scroll motion, ported from Beady's hero.js.

   Three things watch the page:
   - `[data-reveal]` and `.deal` get `.in-view` while on screen, toggled rather
     than set once, so a card deals again if you scroll back to it.
   - `[data-film="<ms>"]` plays its one-shot CSS animations while on screen
     (`.play`) and replays every <ms>, fading the pieces first (`.rewind`).
     `data-film="0"` plays once each time it arrives.
   - `[data-words]` is split into one span per word, for the word-by-word
     animations inside the films.

   Every film animation is one-shot with `both` fill and the plain CSS state is
   the finished frame, so without JS, or with reduced motion, you see the end. */

const stillness = matchMedia("(prefers-reduced-motion: reduce)");

function splitWords() {
  for (const el of document.querySelectorAll("[data-words]")) {
    // Built with the DOM, not a string: the words are copy, never markup.
    const words = el.textContent.trim().split(/\s+/);
    el.replaceChildren(
      ...words.flatMap((word, n) => {
        const span = document.createElement("span");
        span.className = "w";
        span.style.setProperty("--n", String(n));
        span.textContent = word;
        return n === 0 ? [span] : [document.createTextNode(" "), span];
      }),
    );
    el.style.setProperty("--words", String(words.length));
  }
}

function watchInView() {
  const dealt = [...document.querySelectorAll(".deal")];
  for (const card of dealt) {
    const siblings = [...card.parentElement.children].filter((el) => el.classList.contains("deal"));
    card.style.setProperty("--i", String(siblings.indexOf(card)));
  }

  const watched = [...dealt, ...document.querySelectorAll("[data-reveal]")];
  if (typeof IntersectionObserver === "undefined") {
    watched.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const seen = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.classList.toggle("in-view", entry.isIntersecting);
    },
    // Zero threshold with the bottom pulled in, not a fraction of the element,
    // so a card taller than the window still arrives.
    { threshold: 0, rootMargin: "0px 0px -12% 0px" },
  );
  watched.forEach((el) => seen.observe(el));
}

const timers = new WeakMap();

function playFilm(film) {
  film.classList.remove("play", "rewind");
  void film.offsetWidth;
  film.classList.add("play");
}

function rewindFilm(film) {
  film.classList.add("rewind");
  setTimeout(() => playFilm(film), 300);
}

function startFilm(film) {
  playFilm(film);
  if (stillness.matches) return;
  const every = Number(film.dataset.film);
  if (every > 0) timers.set(film, setInterval(() => rewindFilm(film), every));
}

function stopFilm(film) {
  clearInterval(timers.get(film));
  timers.delete(film);
  film.classList.remove("play", "rewind");
}

function watchFilms() {
  const films = [...document.querySelectorAll("[data-film]")];
  if (typeof IntersectionObserver === "undefined") {
    films.forEach(playFilm);
    return;
  }
  const seen = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const film = entry.target;
        const running = timers.has(film) || film.classList.contains("play");
        if (entry.isIntersecting && !running) startFilm(film);
        if (!entry.isIntersecting && running) stopFilm(film);
      }
    },
    // Started as it comes up over the bottom edge, so the first frame is seen
    // rather than the finished one snapping back to it in plain view.
    { threshold: 0, rootMargin: "0px 0px -6% 0px" },
  );
  films.forEach((film) => seen.observe(film));
}

export function watchReveals() {
  splitWords();
  watchInView();
  watchFilms();
}

/* The bar is clear over the top of a page and takes on its frosted ground
   once the page scrolls under it. */
export function watchBar() {
  const bar = document.querySelector(".bar");
  if (!bar) return;
  const set = () => bar.classList.toggle("is-scrolled", scrollY > 8);
  set();
  addEventListener("scroll", set, { passive: true });
}
