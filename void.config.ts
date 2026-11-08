import { defineConfig } from "void/config";

export default defineConfig({
  routing: {
    typedRoutes: true,
  },
  worker: {
    compatibility_date: "2026-02-24",
  },
  output: "static",
  cloudflare: {
    name: "ultsaza-dev",
  },
  head: {
    // Wraps every page title, including the home page title in index.server.ts.
    titleTemplate: "%s · ultsaza.dev",
    htmlAttrs: { lang: "ja" },
    meta: [
      // Cloudflare serves HTML as "text/html" without a charset.
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "color-scheme", content: "light dark" },
    ],
  },
});
