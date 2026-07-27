/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2F6B3C",
          light: "#E8F3E9",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#6B7280",
        },
        border: "#D1D5DB",
      },
      borderRadius: {
        card: "12px",
        input: "8px",
      },
    },
  },
  plugins: [],
};
