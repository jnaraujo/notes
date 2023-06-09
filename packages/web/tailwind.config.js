const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif", ...defaultTheme.fontFamily.sans],
      serif: ["'Roboto Slab'", "serif", ...defaultTheme.fontFamily.serif],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
