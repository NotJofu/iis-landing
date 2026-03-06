/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#E8E4DD',
        accent: '#E63B2E',
        offwhite: '#F5F3EE',
        dark: '#111111',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
