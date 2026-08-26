import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carvao: "#0B0C0E",
        "carvao-claro": "#15171A",
        "carvao-card": "#1A1D21",
        azul: {
          DEFAULT: "#2F7BFF",
          claro: "#5B9BFF",
          escuro: "#1A5FDB",
        },
        cinza: {
          claro: "#9CA3AF",
          DEFAULT: "#6B7280",
          escuro: "#4B5563",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
