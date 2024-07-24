/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["monteserrat", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [{
      light: {
        "primary": "#151515",
        "secondary": "#FFFFFF",
        "accent": "#253B80",
        "neutral": "#E2E2E2",
        "base-100": "#F0F0F0",
      },
    }, {
      dark: {
        "primary": "#ffffff",
        "secondary": "#c7c7c7",
        "accent": "#253B80",
        "neutral": "#767676",
        "base-100": "#F0F0F0",
      },
    },],
  },
  plugins: [require("daisyui")],
};
