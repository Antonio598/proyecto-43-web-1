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
        ocean: {
          950: '#060E1A',
          900: '#0A1628',
          800: '#0D1F36',
          700: '#122844',
          600: '#1B3A5C',
          500: '#234D7A',
          400: '#2E6399',
          300: '#4A82B8',
        },
        volcanic: {
          500: '#E8642A',
          400: '#EC7840',
          300: '#F5A623',
          200: '#F7BC55',
          100: '#FDE9C2',
        },
        trust: {
          green: '#00B67A',
          star: '#FFD700',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(180deg, rgba(6,14,26,0.65) 0%, rgba(10,22,40,0.35) 50%, rgba(10,22,40,0.90) 100%)',
        'gradient-card': 'linear-gradient(180deg, transparent 40%, rgba(6,14,26,0.97) 100%)',
        'gradient-volcanic': 'linear-gradient(135deg, #E8642A 0%, #F5A623 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0A1628 0%, #1B3A5C 100%)',
      },
      boxShadow: {
        'card-hover': '0 25px 60px rgba(232, 100, 42, 0.25)',
        'cta': '0 8px 32px rgba(232, 100, 42, 0.45)',
        'trust': '0 4px 24px rgba(0, 182, 122, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-cta': 'pulse-cta 2s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-cta': {
          '0%, 100%': { boxShadow: '0 8px 32px rgba(232, 100, 42, 0.45)' },
          '50%': { boxShadow: '0 8px 48px rgba(232, 100, 42, 0.75)' },
        },
        'scroll-indicator': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}

export default config
