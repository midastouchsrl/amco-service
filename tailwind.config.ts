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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: "#5a981d",
          dark: "#3d6e0f",
          light: "#e8f5de",
          subtle: "#f4faf0",
        },
        text: {
          DEFAULT: "#334155",
          muted: "#64748b",
        },
        border: "#e2e8f0",
        surface: "#f8fafc",
        "accent-warm": "#f59e0b",
        destructive: "#ef4444",
        emergency: "#dc2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h1": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h2": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "h3": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-lg": ["1.25rem", { lineHeight: "1.65" }],
        "body": ["1rem", { lineHeight: "1.65" }],
        "small": ["0.875rem", { lineHeight: "1.5" }],
        "label": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },
      borderRadius: {
        "card": "1rem",
        "button": "0.75rem",
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
