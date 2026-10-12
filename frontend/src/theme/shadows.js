import { Platform } from "react-native";

export const shadows = {
  none: {},

  // Elevation 1: Subtle depth for cards
    sm: Platform.select({
    ios: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    android: { elevation: 1 },
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
      shadowColor: "#0F172A",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
    },
    android: { elevation: 1 },
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
