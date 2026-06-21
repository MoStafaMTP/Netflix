/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          'red-dark': '#B20710',
          black: '#141414',
          'black-pure': '#000000',
          gray: '#808080',
          'gray-dark': '#2F2F2F',
          'gray-light': '#B3B3B3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.4) 50%, rgba(20,20,20,0.1) 100%)',
        'card-gradient':
          'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)',
        'nav-gradient':
          'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        fadeIn: 'fadeIn 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};
