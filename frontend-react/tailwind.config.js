/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6e8',
          100: '#cde8b8',
          200: '#a8d585',
          300: '#7ec14e',
          400: '#5aad28',
          500: '#3d8c14',
          600: '#317010',
          700: '#25540c',
          800: '#193808',
          900: '#0d1c04',
        },
        beige: {
          50: '#fdf9f4',
          100: '#F5E6D3',
          200: '#ead0b0',
          300: '#deba8d',
          400: '#d2a46a',
        },
        coral: {
          400: '#ff8a80',
          500: '#C97664',
          600: '#b5624f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
