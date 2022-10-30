const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      screens: {
        'cero': '0px',
        'xs': '360px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        'sans': ['Chivo', 'sans-serif'], // overriding 'sans' familiy with 'chivo'(desired) because its called as default in all the text
        // 'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular']
      },
      extend: {
        colors: {
          'stamm-primary': '#00D89D',
          'stamm-secondary': '#805AFF',
          'stamm-black': '#272727',
          'stamm-background': '#354747',
          'stamm-gray': '#D8D8D8',
          'stamm-red': '#602D2D',
          'stamm-white': '#F9F9F9'
        },
        padding: {
          '150': '655px',
          '17.5':'70px',
        }
      },
  },
  plugins: [require('@tailwindcss/typography')],
}