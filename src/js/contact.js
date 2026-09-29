import { watchBar, watchReveals } from "./reveal.js";

const form = document.querySelector("#contact-form");
if (form) wireForm(form);

watchReveals();
watchBar();
document.documentElement.dataset.anim = "";

function wireForm(form) {
  const error = form.querySelector(".form-error");
  const sent = form.parentElement.querySelector(".sent");
  const EMAIL = "contact@dvaitatech.com";

  const showError = (text) => {
    error.replaceChildren(text + " ");
    const a = document.createElement("a");
    a.href = `mailto:${EMAIL}`;
    a.textContent = EMAIL;
    error.append("You can also write to ", a, ".");
    error.hidden = false;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.hidden = true;

    // Mark what's missing rather than trusting the browser's bubbles.
    let first = null;
    for (const field of form.querySelectorAll("[required]")) {
      const bad = !field.value.trim() || (field.type === "email" && !field.checkValidity());
      field.setAttribute("aria-invalid", String(bad));
      if (bad && !first) first = field;
    }
    if (first) {
      first.focus();
      error.textContent = "A name, an email and a line about the project, and we're set.";
      error.hidden = false;
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    form.classList.add("is-busy");
    form.querySelector("button").disabled = true;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.hidden = true;
      sent.hidden = false;
      sent.focus();
    } catch {
      showError("That didn't go through.");
    } finally {
      form.classList.remove("is-busy");
      form.querySelector("button").disabled = false;
    }
  });

  form.addEventListener("input", (event) => {
    if (event.target.getAttribute("aria-invalid") === "true") event.target.setAttribute("aria-invalid", "false");
  });
}
