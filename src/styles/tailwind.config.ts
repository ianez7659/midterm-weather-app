import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,ts,css}"],
  safelist: [
    "bg-background",
    "text-text",
    "bg-glass",
    "text-highTemp",
    "text-lowTemp",
    "font-sans",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D1B2A",
        glass: "rgba(255, 255, 255, 0.1)",
        text: "#ffffff",
        highTemp: "#ff9ea2",
        lowTemp: "#a2d2ff",
      },
      fontFamily: {
        sans: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
