import { View } from "react-native";
import { shadows } from "../../theme/shadows.js";

// Design System: Card per SCREEN_SPECIFICATIONS_AND_COMPONENTS.md
// Padding: 16px horizontal, 12px vertical
// Corner radius: 12px
// Shadow: Elevation 1

export function Card({ children, className = "", padded = true }) {
  return (
    <View
      className={`bg-white rounded-2xl w-full ${padded ? "px-4 py-3" : ""} ${className}`}
      style={shadows.sm}
      accessible={false}
    >
      {children}
    </View>
  );
}
