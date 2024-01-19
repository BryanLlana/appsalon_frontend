/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: [
    './index.html',
    './src/**/*.{vue, js, ts, jsx, tsx}',
    './node_modules/vue-tailwind-datepicker/**/*.js',
    './formkit.config.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'app': "url('/img/hero.jpg')"
      },
      colors: {
        'vtd-primary': colors.blue
      }
    }
  },
  plugins: [],
}

