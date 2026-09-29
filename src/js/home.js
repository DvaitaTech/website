import { mountField } from "./tiles/render.js";
import { watchReveals } from "./reveal.js";

const field = document.querySelector(".hero .field");
if (field) mountField(field, { around: document.querySelector(".hero .statement") });

watchReveals();
document.documentElement.dataset.anim = "";
