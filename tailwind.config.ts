import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kernel: {
          white: "var(--white)",
          ivory: "var(--ivory)",
          gold: "var(--gold)",
          "gold-deep": "var(--gold-deep)",
          "gold-text": "var(--gold-text)",
          charcoal: "var(--charcoal)",
          "charcoal-2": "var(--charcoal-2)",
          grey: "var(--grey)",
          border: "var(--border)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "Playfair Display",
          "DM Serif Display",
          "Georgia",
          "serif",
        ],
      },
      borderRadius: {
        editorial: "1.25rem",
        "editorial-lg": "1.75rem",
        "editorial-xl": "2.25rem",
        arch: "100px 100px 0 0",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(36, 35, 33, 0.04), 0 1px 2px rgba(36, 35, 33, 0.02)",
        card: "0 6px 24px -4px rgba(36, 35, 33, 0.05)",
        floating: "0 16px 40px -8px rgba(36, 35, 33, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
