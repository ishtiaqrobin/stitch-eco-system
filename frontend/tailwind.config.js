/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#005bbf', foreground: '#ffffff' },
        secondary: { DEFAULT: '#ad3219', foreground: '#ffffff' },
        accent: { DEFAULT: '#ff6d4e', foreground: '#ffffff' },
        background: '#f8f9fa',
        surface: '#ffffff',
        muted: { DEFAULT: '#f3f4f5', foreground: '#727785' },
        border: '#c1c6d6',
        destructive: { DEFAULT: '#ba1a1a', foreground: '#ffffff' },
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
};
