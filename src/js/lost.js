import { watchBar } from "./reveal.js";
import { mountField } from "./tiles/render.js";

const field = document.querySelector(".lost .field");
if (field) mountField(field, { around: document.querySelector(".lost-copy"), seed: 17, keepTop: 64, fadeTop: 90, fadeBottom: (h) => h * 0.2 });
watchBar();
document.documentElement.dataset.anim = "";
