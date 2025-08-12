import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        navy: 'var(--color-navy)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'footer-bg': 'var(--color-footer-bg)',
        'light-gray': 'var(--color-light-gray)',
        'soft-blue': 'var(--color-soft-blue)',
        'charcoal': 'var(--color-charcoal)',
        'glass': 'var(--color-glass)',
        'glass-border': 'var(--color-glass-border)',
        
        // Additional semantic colors using CSS custom properties
        'focus-ring': 'var(--color-focus-ring)',
        'accent-10': 'var(--color-accent-10)',
        'accent-20': 'var(--color-accent-20)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '20px',
        '2xl': '40px',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideInLeft': 'slideInLeft 0.8s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;