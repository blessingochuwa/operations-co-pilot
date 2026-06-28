/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#152229',
        ink2: '#1d3038',
        paper: '#FAF8F3',
        line: '#E8E2D7',
        amber: '#D99A45',
        teal: '#2F6F66',
        coral: '#C2553D',
        indigo: '#5A57A6',
        text: '#1B2A2F',
        muted: '#6E7872',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
