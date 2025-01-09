/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,jsx,tsx}",
    // you can either add all styles
    "./node_modules/@rewind-ui/core/dist/theme/styles/*.js",
    // OR you can add only the styles you need
    "./node_modules/@rewind-ui/core/dist/theme/styles/Button.styles.js",
    "./node_modules/@rewind-ui/core/dist/theme/styles/Text.styles.js",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
  theme: {
    blue: {
      50: "#eef8ff",
      100: "#daefff",
      200: "#bde4ff",
      300: "#90d5ff",
      400: "#5bbbff",
      500: "#349cfc",
      600: "#1f7ef1",
      700: "#1767de",
      800: "#1954b4",
      900: "#1b488d",
      950: "#152d56",
    },
  },
};
