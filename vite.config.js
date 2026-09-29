import { resolve } from "node:path";
import { defineConfig } from "vite";

// One HTML file per page. Cloudflare Pages serves `/contact` from
// `contact/index.html` and falls back to `404.html` on its own.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        contact: resolve(import.meta.dirname, "contact/index.html"),
        whatsapp: resolve(import.meta.dirname, "whatsapp/index.html"),
        lexivox: resolve(import.meta.dirname, "lexivox/index.html"),
        notFound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
