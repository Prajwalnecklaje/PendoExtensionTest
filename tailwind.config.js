/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f8f9ff',
          100: '#f1f2f9',
          200: '#e3e5f0',
          300: '#c7cada',
          400: '#959bb3',
          500: '#69708c',
          600: '#4f566f',
          700: '#3d4359',
          800: '#282c3d',
          900: '#171a28',
          950: '#0c0e17',
        },
        brand: {
          50: '#f4f2ff',
          100: '#ebe7ff',
          200: '#d8d0ff',
          300: '#bcaeff',
          400: '#9d88ff',
          500: '#7d66f5',
          600: '#6852df',
          700: '#5542bd',
          800: '#463795',
          900: '#3b3077',
        },
        mint: {
          50: '#edfcf8',
          100: '#d2f8ee',
          400: '#36cda5',
          500: '#1aae8b',
          600: '#108b70',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Avenir Next', 'Avenir', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px rgba(29, 27, 64, 0.07)',
        card: '0 1px 2px rgba(20, 20, 43, 0.04), 0 10px 28px rgba(29, 27, 64, 0.06)',
        float: '0 18px 55px rgba(31, 29, 72, 0.16)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in .24s ease-out both',
        'slide-in': 'slide-in .24s ease-out both',
        'scale-in': 'scale-in .18s ease-out both',
      },
    },
  },
  plugins: [],
}
