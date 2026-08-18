import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shadows } from "../../theme/shadows.js";

export function StickyActionBar({ children, className = "" }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`absolute bottom-0 left-0 right-0 bg-white border-t border-line/50 px-5 pt-3 ${className}`}
      style={{
        paddingBottom: insets.bottom + 12,
        ...shadows.floating,
      }}
    >
      {children}
    </View>
  );
}
