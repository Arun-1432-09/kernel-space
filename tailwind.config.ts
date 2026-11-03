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
          white: "#FFFFFF",
          ivory: "#F7F4EC",
          gold: "#C6A15B",
          "gold-hover": "#A9843E",
          charcoal: "#242321",
          muted: "#77736A",
          border: "#E8E1D2",
          "border-light": "#F0EBE1",
          "charcoal-card": "#2E2D2A",
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
        serif: ["Newsreader", "Georgia", "serif"],
      },
      borderRadius: {
        editorial: "0.75rem",
        "editorial-lg": "1rem",
        "editorial-xl": "1.5rem",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(36, 35, 33, 0.05), 0 1px 2px rgba(36, 35, 33, 0.03)",
        card: "0 4px 20px -2px rgba(36, 35, 33, 0.05)",
        floating: "0 12px 32px -4px rgba(36, 35, 33, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
