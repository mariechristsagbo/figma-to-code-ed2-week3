import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        'mona': ['var(--font-mona)'],
      },

      colors: {
        'tokena-white': '#FFFFFF',
        'tokena-light-gray': '#F3F4F6',
        'tokena-gray': '#D1D5DB',
        'tokena-dark-gray': '#6B7280',
        'tokena-dark': '#1D1D1D',
        'tokena-yellow': '#F2D604',
        'tokena-green': '#01B130',
        'tokena-red': '#CB0101',
        'tokena-blue': '#006EFF',
        'tokena-dark-2': '#0065EA',
        'tokena-dark-blue-1': '#171923',
        'tokena-dark-blue-2' : '#292C3B',
      },

      width:{
        '23': '23rem',
      }
    },
  },
  plugins: [],
};
export default config;
