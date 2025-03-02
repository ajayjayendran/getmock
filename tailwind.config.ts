import type { Config } from "tailwindcss";

export default {
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
        primary: {
          100: "var(--primary-100)",
        },
        neutral: {
          100: "var(--neutral-100)",
          90: "var(--neutral-90)",
        },
        tertiary: {
          100: "var(--tertiary-100)",
        },
        font: {
          primary: {
            100: "var(--color-text-primary-100)",
            90: "var(--color-text-primary-90)",
          },
          secondary: {
            100: "var(--color-text-secondary-100)",
            90: "var(--color-text-secondary-90)",
          },
        },
        border: "var(--border-color)",
        input: "var(--input-bg)",
      },
      fontFamily: {
        primary: "var(--font-primary)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
