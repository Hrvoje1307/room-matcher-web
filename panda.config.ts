import { defineConfig } from "@pandacss/dev";
import { buttonRecipe } from "./src/theme/recipes/button.recipe";

export default defineConfig({
  preflight: true,

  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],

  theme: {
    extend: {
      recipes: {
        button: buttonRecipe,
      },
      tokens: {
        colors: {
          navy: { 500: { value: "#1A1F3C" } },
          coral: { 500: { value: "#FF6B4A" } },
          cream: { 500: { value: "#F8F7F4" } },
          sand: { 500: { value: "#E8E6E1" } },
        },
      },
    },
  },

  jsxFramework: "react",

  outdir: "styled-system",
});
