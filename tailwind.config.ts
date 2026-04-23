import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1a237e",
          deep: "#101757",
          surface: "#eef1ff"
        },
        accent: {
          DEFAULT: "#2e7d32",
          soft: "#ecf7ee"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(26, 35, 126, 0.12)"
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
