import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  adapter: vercel(),
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
});
