import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = import.meta.dirname;
const pages = ["contact", "whatsapp", "lexivox"];

// Cloudflare Pages serves /contact from contact/index.html. Vite's own
// servers would hand back the home page for it instead, so do what Pages
// does: a folder with an index.html answers to its name, slash or not.
const folders = () => {
  const rewrite = (req, _res, next) => {
    const [path, query = ""] = req.url.split("?");
    const name = path.replace(/^\/|\/$/g, "");
    if (pages.includes(name) && existsSync(resolve(root, name, "index.html"))) {
      req.url = `/${name}/index.html${query ? `?${query}` : ""}`;
    }
    next();
  };
  return {
    name: "folder-pages",
    // Block bodies on purpose: a hook that returns a function is run later,
    // after Vite's own fallback has already answered.
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
};

export default defineConfig({
  plugins: [folders()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        ...Object.fromEntries(pages.map((p) => [p, resolve(root, p, "index.html")])),
        notFound: resolve(root, "404.html"),
      },
    },
  },
});
