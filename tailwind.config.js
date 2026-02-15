/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["ClashDisplay", "ui-sans-serif", "system-ui"],
        body: ["Satoshi", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#0F172A",
        paper: "#F8FAFC",
        accent: "#22C55E",
        accentDark: "#16A34A",
      },
      boxShadow: {
        soft: "0 20px 40px -20px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};
