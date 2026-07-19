// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Deployed on GitHub Pages behind a custom domain.
// Keep `site` in sync with public/CNAME when the domain changes.
export default defineConfig({
  site: "https://academic.hermann-agossou.com",
  trailingSlash: "never",
  integrations: [sitemap()],
  build: {
    format: "file",
  },
});
