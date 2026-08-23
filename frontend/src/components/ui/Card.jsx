import { View } from "react-native";
import { shadows } from "../../theme/shadows.js";

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
