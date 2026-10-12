// tailwind.config.js
module.exports = {
  content: ["./App.jsx", "./App.js", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
  primary: {
    DEFAULT: "#2E7D32",
    dark: "#1B5E20",
    light: "#E8F3E9",
    hover: "#43A047",
    muted: "#E8F3E9",
  },
  accent: { DEFAULT: "#C96A3D", light: "#F7E6DC", dark: "#A4511F" },
  surface: { DEFAULT: "#F8F9FA", elevated: "#FFFFFF" },
  cream: "#FBF8F2",
  card: "#FFFFFF",
  success: { DEFAULT: "#27AE60", muted: "#E8F3E9" },
  warning: { DEFAULT: "#F39C12", muted: "#FDF1D8" },
  danger: { DEFAULT: "#E74C3C", muted: "#FFF5F3" },
  info: { DEFAULT: "#3498DB", muted: "#DBEAFE" },
  ink: {
    DEFAULT: "#1A1A1A",
    secondary: "#4B5563",
    muted: "#6B7280",
    faint: "#8B929C",
  },
  line: { DEFAULT: "#E5E7EB", strong: "#CBD5E1" },
},
borderRadius: {
  xl2: "20px",
  xl3: "24px",
},
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px" }],
      },
    },
  },
  plugins: [],
};
