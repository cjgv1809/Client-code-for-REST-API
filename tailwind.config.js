/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./node_modules/flowbite/**/*.js",
    "index.html",
    "src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#232323",
        secondary: {
          100: "#FFF0EB",
          200: "#FFD6C0",
          300: "#FFBC95",
          400: "#FFA16A",
          500: "#FF8740",
          600: "#CC6E2F",
          700: "#99561E",
          800: "#663D0D",
          900: "#332504",
        },
        tertiary: {
          100: "#F0F4FF",
          200: "#C0D0FF",
          300: "#95ADFF",
          400: "#6A8AFF",
          500: "#3A67FF",
          600: "#2D4FBF",
          700: "#1F3780",
          800: "#122040",
          900: "#080A20",
        },
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
