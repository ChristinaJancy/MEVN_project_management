// Tailwind font family used in their UI examples 
//https://tailwindui.com/documentation#optional-add-the-inter-font-family
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {

  content: [
    "./src/index.html",
    "./src/views/**/*.{vue,ts}",
    "./src/components/**/*.{vue,ts,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },

}

