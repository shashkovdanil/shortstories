import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/newComponents/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    colors: {
      ...colors,
      background: 'oklch(98.7% 0.007 246.71)',
      black: 'oklch(20.59% 0.091 260.03/ <alpha-value>)',
      brand: 'oklch(64.4% 0.211 289 / <alpha-value>)',
    },
    extend: {
      animation: {
        'reverse-spin':
          'reverse-spin 1.5s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite',
      },
      boxShadow: {
        outline: '0 0 0 4.1px',
      },
      keyframes: {
        'reverse-spin': {
          '0%': {
            transform: 'rotate(0)',
          },
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
    },
  },
}
export default config
