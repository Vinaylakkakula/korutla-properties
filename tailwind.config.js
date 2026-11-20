/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#183D34',
          50: '#F0F5F3',
          100: '#DFECE8',
          200: '#BFDAD1',
          300: '#94C0B2',
          400: '#64A18F',
          500: '#3D816E',
          600: '#2A6354',
          700: '#1F4F42',
          800: '#183D34',
          900: '#10231D',
          950: '#091511',
        },
        deep: '#10231D',
        ivory: {
          DEFAULT: '#F7F6F2',
          50: '#FDFDFC',
          100: '#FAF9F6',
          200: '#F7F6F2',
          300: '#EDEAE1',
          400: '#DDD8C8',
        },
        charcoal: '#252724',
        mutedGray: '#777873',
        gold: {
          DEFAULT: '#B79A68',
          light: '#CEB68B',
          dark: '#967948',
          50: '#F9F7F2',
          100: '#F2EDE2',
          200: '#E4DAC3',
          300: '#D5C49F',
          400: '#C5AC7E',
          500: '#B79A68',
          600: '#9D7D4E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Playfair Display', 'serif'],
        editorial: ['Cinzel', 'DM Serif Display', 'serif']
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(16, 35, 29, 0.04)',
        'card': '0 4px 20px -2px rgba(16, 35, 29, 0.06), 0 2px 6px -1px rgba(16, 35, 29, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(16, 35, 29, 0.12), 0 8px 10px -6px rgba(16, 35, 29, 0.06)',
        'floating': '0 25px 50px -12px rgba(16, 35, 29, 0.25)',
      }
    },
  },
  plugins: [],
}

