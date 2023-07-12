/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#201e35",
        navPrimary: "#171626",
        secondary: "#2f2d4b",
      },
      backgroundColor: {
        cardTicket:
          "linear-gradient(180deg, rgba(177, 137, 82, 0.94) 0%, rgba(222, 162, 80, 0.35) 99.99%, rgba(225, 170, 95, 0.00) 100%);",
      },
    },
  },
  plugins: [],
};
