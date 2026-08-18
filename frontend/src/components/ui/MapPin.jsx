// src/components/ui/MapPin.jsx
//
// react-native-maps' <Marker /> draws a default red pin automatically
// when given no children. MapLibre RN's <Marker /> has no such default —
// it requires an explicit child element to render anything. This is
// that pin, styled to match the app's design system instead of using a
// generic platform-default marker image.
import { View } from "react-native";
import { colors } from "../../theme/colors.js";

export function MapPin({ color = colors.primary }) {
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: color,
        borderWidth: 3,
        borderColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
      }}
    />
  );
}
