/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        capilar: {
          primary: '#004f9f',
          secondary: '#00a3ad',
          accent: '#f28c00',
          light: '#f5f8fc',
          dark: '#12314d',
        },
      },
      boxShadow: {
        panel: '0 8px 24px rgba(18, 49, 77, 0.12)',
      },
    },
  },
  plugins: [],
}
