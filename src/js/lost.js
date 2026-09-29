import { mountField } from "./tiles/render.js";

const field = document.querySelector(".lost .field");
if (field) mountField(field, { around: document.querySelector(".lost-copy"), seed: 17 });
document.documentElement.dataset.anim = "";
