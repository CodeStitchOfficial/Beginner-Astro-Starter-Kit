import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.yourwebsite.com", // update me!
  integrations: [sitemap()],
  image: {
    layout: "constrained",
  },
});
