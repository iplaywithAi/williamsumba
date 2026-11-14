/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        paper: '#F5F6F8',
        ink: '#1E2733',
        mute: '#5A6573',
        line: '#DCE0E6',
        accent: { DEFAULT: '#2F6F73', dark: '#245659', soft: '#E3EEEE' },
        panel: '#222C38',
      },
    },
  },
  plugins: [],
};
