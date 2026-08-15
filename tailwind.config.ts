import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1a1815',
        'charcoal-2': '#242220',
        'charcoal-3': '#2e2b26',
        cream: '#f5f2ea',
        'cream-2': '#ede8db',
        copper: '#c1571f',
        'copper-dark': '#93401a',
        'copper-light': '#e2793f',
        steel: '#6b655d',
        'steel-light': '#a8a199',
      },
    },
  },
  plugins: [],
};

export default config;
