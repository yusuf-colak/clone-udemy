const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["components/*/.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('../../tailwind-global.config')]
}
