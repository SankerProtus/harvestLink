import { Platform } from "react-native";

// Design System: Shadow/Elevation per DESIGN_STRATEGY.md
// Elevation 0: None (flat)
// Elevation 1: 0 2px 4px rgba(0,0,0,0.08) - Cards in lists
// Elevation 2: 0 4px 8px rgba(0,0,0,0.12) - Active cards, modals
// Elevation 3: 0 8px 16px rgba(0,0,0,0.15) - Modal dialogs

export const shadows = {
  none: {},

  // Elevation 1: Subtle depth for cards
  sm: Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.08,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 2 },
    },
    android: { elevation: 2 },
    default: {},
  }),

  // Elevation 2: Medium depth for active cards
  md: Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.12,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: 4 },
    default: {},
  }),

  // Elevation 3: Prominent depth for modals
  lg: Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 8 },
    },
    android: { elevation: 8 },
    default: {},
  }),

  // Card elevation (Elevation 1)
  card: Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.08,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 2 },
    },
    android: { elevation: 2 },
    default: {},
  }),

  // Floating/Modal elevation (Elevation 3)
  floating: Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 8 },
    },
    android: { elevation: 8 },
    default: {},
  }),
};
