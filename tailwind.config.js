/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FBF9F5',
        card: {
          DEFAULT: '#F4F0E8',
          subtle: '#EFE9DC',
          floating: '#FFFFFF',
        },
        ink: {
          primary: '#221F1D',
          secondary: '#57524E',
          muted: '#8C827A',
          inverted: '#FBF9F5',
        },
        canopy: {
          deep: '#2D4739',
          sage: '#5B7563',
          tint: '#E2EBE4',
        },
        heat: {
          terracotta: '#B84A39',
          amber: '#D97746',
          ochre: '#EAB365',
          tint: '#FBEFEA',
        },
      },
      borderColor: {
        hairline: 'rgba(34, 31, 29, 0.07)',
        'hairline-strong': 'rgba(34, 31, 29, 0.12)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        editorial: '0 10px 30px -10px rgba(78, 67, 58, 0.07), 0 4px 6px -2px rgba(78, 67, 58, 0.03)',
        floating: '0 25px 50px -12px rgba(45, 35, 27, 0.12)',
      },
    },
  },
  plugins: [],
}
