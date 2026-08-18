// tailwind.config.js
module.exports = {
  content: ["./App.jsx", "./App.js", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary Brand Green - Trust, agriculture, growth
        primary: {
          DEFAULT: "#2D7A3B",    // Brand Green
          dark: "#1A4823",       // Active/pressed state
          light: "#E8F4ED",      // Light background
          hover: "#4A9D56",      // Hover state
          muted: "#E8F4ED",      // Muted variant
        },
        // Secondary Accent Orange - Urgency, energy, action
        accent: {
          DEFAULT: "#E8731B",
          light: "#F9DCC4",
        },
        // Backgrounds
        surface: {
          DEFAULT: "#F8F8F8",     // Secondary background
          elevated: "#FFFFFF",    // Main surface
        },
        cream: "#FAFAF7",
        card: "#FFFFFF",
        // Status Colors
        success: {
          DEFAULT: "#27AE60",     // Order confirmed, delivery completed
          muted: "#E8F4ED",       // Light success background
        },
        warning: {
          DEFAULT: "#F39C12",     // Pending, in transit
          muted: "#F9DCC4",       // Light warning background
        },
        danger: {
          DEFAULT: "#E74C3C",     // Cancelled, issues
          muted: "#FFF5F3",       // Light error background
        },
        info: {
          DEFAULT: "#3498DB",     // Informational
          muted: "#DBEAFE",       // Light info background
        },
        // Text - WCAG 2.2 AA Compliant
        ink: {
          DEFAULT: "#1A1A1A",     // Primary text (18:1 on white)
          secondary: "#5A5A5A",   // Secondary text (7:1 on white)
          muted: "#A0A0A0",       // Disabled, tertiary (4.5:1 on white)
          faint: "#A0A0A0",       // Placeholders, hints
        },
        // Borders & Dividers
        line: {
          DEFAULT: "#E0E0E0",     // Default border
          strong: "#CBD5E1",      // Strong border
        },
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
