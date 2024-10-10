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
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
        // Add any other custom rotations here
      }
    },
  },
  plugins: [],
};
export default config;
