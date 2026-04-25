import { defineConfig } from "@pandacss/dev";
import { buttonRecipe } from "./src/theme/recipes/button.recipe";
import { colors } from "./src/shared/config/colors";

function toTokens(scale: Record<string, string>) {
    return Object.fromEntries(
        Object.entries(scale).map(([k, v]) => [k, { value: v }])
    );
}

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
                    navy: toTokens(colors.navy),
                    coral: toTokens(colors.coral),
                    cream: toTokens(colors.cream),
                    sand: toTokens(colors.sand),
                    grey: toTokens(colors.grey),
                },
            },
        },
    },

    jsxFramework: "react",

    outdir: "styled-system",
});
