import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  srcDir: "./src",
  outDir: "./dist",
  publicDir: "./public",
  integrations: [tailwind()],

  build: {
    format: "directory",
  },

  server: {
    port: 3000,
    host: true,
  },

  vite: {
    ssr: {
      noExternal: ["@astrojs/tailwind"],
    },
  },

  output: "server",
  adapter: {
    adapter: vercel(),
  },
});
