/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#0066FF',
          hover: '#0052D9',
          light: '#EEF4FF',
          glow: 'rgba(0, 102, 255, 0.18)',
        },
        teal: {
          DEFAULT: '#0EB5B2',
          light: 'rgba(14, 181, 178, 0.12)',
        },
        bg: '#F8FAFC',
        card: '#FFFFFF',
        'text-primary': '#1E293B',
        'text-secondary': '#64748B',
        'text-muted': '#94A3B8',
        border: '#E2E8F0',
        'border-focus': '#0066FF',
        error: '#EF4444',
        'error-bg': '#FEF2F2',
        success: '#10B981',
      },
      borderRadius: {
        input: '10px',
        card: '18px',
        btn: '10px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,23,42,0.06), 0 8px 32px rgba(15,23,42,0.08), 0 32px 64px rgba(15,23,42,0.04)',
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
