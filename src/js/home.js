import { mountField } from "./tiles/render.js";
import { watchReveals } from "./reveal.js";

const hero = document.querySelector(".hero .field");
if (hero) mountField(hero, { around: document.querySelector(".hero .statement") });

const foot = document.querySelector(".foot-cta .field");
if (foot) mountField(foot, { around: document.querySelector(".foot-cta-copy"), seed: 23, whenSeen: true });

watchReveals();
document.documentElement.dataset.anim = "";
