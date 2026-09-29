import { mountHedge } from "./kachnar/render.js";
import { watchReveals } from "./reveal.js";

const hedge = document.querySelector(".hedge");
if (hedge) mountHedge(hedge);

watchReveals();
document.documentElement.dataset.anim = "";
