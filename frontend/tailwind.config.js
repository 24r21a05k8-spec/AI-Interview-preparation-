/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { 
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        // InterviewAI color palette
        'bg-primary': '#0A0A0F',
        'bg-sidebar': '#111115',
        'bg-card': '#1A1A24',
        'accent-green': '#00FF88',
        'accent-cyan': '#00D4FF',
        'accent-purple': '#A855F7',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8888AA',
        'border-color': '#2A2A3A',
        indigo: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      backgroundOpacity: { 8: '0.08', 12: '0.12' },
    },
  },
  plugins: [],
}
