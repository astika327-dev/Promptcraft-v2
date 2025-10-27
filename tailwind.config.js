/** @type {import('tailwindcss').Config} */
import { brand } from './lib/brand.js';

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: brand.colors,
      fontFamily: brand.typography.fontFamily,
      fontSize: brand.typography.fontSize,
      lineHeight: brand.typography.lineHeight,
      spacing: brand.spacing,
      borderRadius: brand.borderRadius,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
