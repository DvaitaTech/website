import { mountField } from "./tiles/render.js";
import { watchBar, watchReveals } from "./reveal.js";

const hero = document.querySelector(".hero .field");
if (hero) {
  mountField(hero, {
    around: document.querySelector(".hero .statement"),
    // px: nothing behind the bar, a dissolve under it, and the last part of
    // the hero melting into the page below.
    keepTop: 64,
    fadeTop: 90,
    fadeBottom: (h) => h * 0.2,
  });
}

watchBar();
watchReveals();
document.documentElement.dataset.anim = "";
