import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#4B4D39",
          dark: "#383A2A",
          mid: "#5C5E47",
        },
        paper: "#FEFBF6",
        sand: "#F4F0E6",
        clay: "#E8E2D4",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Jost'", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        rise: "rise 0.9s ease both",
        "rise-fast": "rise 0.35s ease both",
        marquee: "marquee 36s linear infinite",
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.28em",
        widest4: "0.34em",
      },
    },
  },
  plugins: [],
};
export default config;
