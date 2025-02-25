/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#ffffff",
          secondary: "#f3f4f6",
          tertiary: "#e5e7eb",
          text: "#111827",
          "text-light": "#4b5563", 
          accent: "#111827",
        },
        dark: {
          primary: "#111827",
          secondary: "#1f2937",
          tertiary: "#374151",
          text: "#f9fafb",
          "text-light": "#d1d5db", 
          accent: "#e5e7eb",
        },
        highlight: "#6b7280",
        "highlight-hover": "#4b5563",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
        "card-dark": "0 10px 30px -15px rgba(0, 0, 0, 0.7)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern-light": "linear-gradient(to right bottom, rgba(229, 231, 235, 0.8), rgba(249, 250, 251, 0.8))",
        "hero-pattern-dark": "linear-gradient(to right bottom, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.8))",
      },
    },
  },
  plugins: [],
} 