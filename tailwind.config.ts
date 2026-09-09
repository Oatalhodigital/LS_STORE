import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: {
          DEFAULT: "#2F7BFF",
          claro: "#5B9BFF",
          escuro: "#1A5FDB",
        },
        preto: "#111111",
        borda: "#E5E7EB",
        fundo: "#FFFFFF",
        "fundo-alt": "#F5F5F5",
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
