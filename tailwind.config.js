/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        midnight: "#0a0a1f",
        primary: {
          cyan: "#00f2ff",
          blue: "#3b82f6",
          violet: "#8b5cf6",
        },
      },
      fontFamily: {
        space: ["'Space Grotesk'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: 1, filter: 'brightness(1) blur(2px)' },
          '50%': { opacity: 0.8, filter: 'brightness(1.5) blur(4px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
