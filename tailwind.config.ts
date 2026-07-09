import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",   // ← THE FIX: use .dark class, not OS media query
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ink-based backgrounds — warm dark, NOT pure black
        ink: {
          black:  "#0D0D0B",
          dark:   "#141412",
          card:   "#1A1A17",
          border: "#2A2820",
        },
        // Parchment text colors — warm off-white
        parchment: {
          primary:   "#F0EBE0",
          secondary: "#A89880",
          dim:       "#5C5449",
        },
        // Primary accent — Japanese vermillion ink stamp
        vermillion: {
          DEFAULT: "#E63946",
          dark:    "#C1121F",
          light:   "#FF6B6B",
        },
        // Secondary accent — aged gold / parchment
        gold: {
          DEFAULT: "#F5E6C8",
          dark:    "#C9A96E",
          muted:   "#8A6F4E",
        },
        // Tech blue for code highlights
        electric: {
          DEFAULT: "#4A90D9",
          dim:     "#2D5A8A",
        },
      },
      fontFamily: {
        sans:    ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        jp:      ["var(--font-noto-jp)", "serif"],
        cursive: ["var(--font-dancing)", "cursive"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        // Fluid type scale using clamp
        "hero":    ["clamp(4rem, 12vw, 14rem)",    { lineHeight: "0.9",  fontWeight: "800" }],
        "section": ["clamp(2.5rem, 6vw, 7rem)",    { lineHeight: "1.0",  fontWeight: "700" }],
        "card":    ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2",  fontWeight: "600" }],
        "body":    ["clamp(0.9rem, 1.2vw, 1.1rem)", { lineHeight: "1.7",  fontWeight: "300" }],
        "caption": ["0.75rem",                      { lineHeight: "1.4",  letterSpacing: "0.2em" }],
        "kanji":   ["clamp(4rem, 10vw, 12rem)",     { lineHeight: "1.0",  fontWeight: "900" }],
      },
      spacing: {
        "section-x": "clamp(1.5rem, 5vw, 6rem)",
        "section-y": "clamp(4rem, 10vh, 8rem)",
      },
      maxWidth: {
        "site": "1440px",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.6s ease forwards",
        "ink-drop":   "inkDrop 0.4s ease forwards",
        "draw-line":  "drawLine 1.2s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        inkDrop: {
          "0%":   { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
        drawLine: {
          "0%":   { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      backgroundImage: {
        "noise": "url('/images/noise.png')",
        "paper": "url('/images/paper-texture.png')",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in":  "cubic-bezier(0.7, 0, 0.84, 0)",
      },
    },
  },
  plugins: [],
};

export default config;
