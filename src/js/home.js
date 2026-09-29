import { mountField } from "./tiles/render.js";
import { watchReveals } from "./reveal.js";

const hero = document.querySelector(".hero .field");
if (hero) mountField(hero, { around: document.querySelector(".hero .statement") });

watchReveals();
document.documentElement.dataset.anim = "";
