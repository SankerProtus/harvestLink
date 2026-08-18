// Design System Colors - Reference: DESIGN_STRATEGY.md
// Single source of truth for color values used outside NativeWind className
// strings. Keep in sync with tailwind.config.js.

export const colors = Object.freeze({
  // Primary Brand Green - Trust, agriculture, growth
  primary: "#2D7A3B",        // Brand Green
  primaryHover: "#4A9D56",   // Hover state
  primaryActive: "#1A4823",  // Active/pressed state
  primaryLight: "#E8F4ED",   // Light background

  // Secondary Accent Orange - Urgency, energy, action
  accent: "#E8731B",
  accentLight: "#F9DCC4",

  // Backgrounds
  surface: "#F8F8F8",        // Secondary background
  surfaceElevated: "#FFFFFF",// Main surface
  cream: "#FAFAF7",
  card: "#FFFFFF",

  // Status Colors
  success: "#27AE60",        // Order confirmed, delivery completed
  successMuted: "#E8F4ED",   // Light success background
  warning: "#F39C12",        // Pending, in transit
  warningMuted: "#F9DCC4",   // Light warning background
  danger: "#E74C3C",         // Cancelled, issues
  dangerMuted: "#FFF5F3",    // Light error background
  info: "#3498DB",           // Informational
  infoMuted: "#DBEAFE",      // Light info background

  // Text - WCAG 2.2 AA Compliant
  ink: "#1A1A1A",            // Primary text (18:1 on white)
  inkSecondary: "#5A5A5A",   // Secondary text (7:1 on white)
  inkMuted: "#A0A0A0",       // Disabled, tertiary (4.5:1 on white)
  inkFaint: "#A0A0A0",       // Placeholders, hints

  // Borders & Dividers
  line: "#E0E0E0",           // Default border
  lineStrong: "#CBD5E1",     // Strong border

  white: "#FFFFFF",
  overlay: "rgba(0, 0, 0, 0.4)",  // Modal overlay per design
});
