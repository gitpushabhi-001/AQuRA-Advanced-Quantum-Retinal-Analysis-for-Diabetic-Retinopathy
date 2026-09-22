/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00685f',
          container: '#008378',
          fixed: '#89f5e7',
          dim: '#6bd8cb',
          dark: '#005049',
        },
        secondary: {
          DEFAULT: '#006a63',
          container: '#99efe5',
          dark: '#006f67',
        },
        tertiary: {
          DEFAULT: '#006947',
          container: '#00855b',
          fixed: '#6ffbbe',
          dim: '#4edea3',
        },
        surface: {
          DEFAULT: '#faf8ff',
          dim: '#d2d9f4',
          bright: '#faf8ff',
          lowest: '#ffffff',
          low: '#f2f3ff',
          container: '#eaedff',
          high: '#e2e7ff',
          highest: '#dae2fd',
        },
        'on-surface': '#131b2e',
        'on-surface-variant': '#3d4947',
        outline: '#6d7a77',
        'outline-variant': '#bcc9c6',
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#00685f',
          800: '#005049',
          900: '#00201d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'surgical': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'surgical-lg': '0 10px 25px -5px rgba(13, 148, 136, 0.08), 0 8px 10px -6px rgba(13, 148, 136, 0.04)',
        'glow-teal': '0 0 24px -2px rgba(13, 148, 136, 0.3)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
