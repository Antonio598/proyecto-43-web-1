import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        trip: {
          pink: '#ff3399',
          blue: '#3399ff',
          dark: '#333333',
          light: '#f5f5f5',
          footer: '#0099ff',
        },
        trust: {
          green: '#00B67A',
          star: '#ffcc00',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'trust': '0 4px 24px rgba(0, 182, 122, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
