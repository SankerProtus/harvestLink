import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";

// A 2-up (or n-up, via flex-wrap) grid tile used on role dashboards for
// deep-linking into sibling tabs or stack screens — "Log Harvest",
// "Browse Market", etc. Kept visually distinct from Button (which implies
// a single primary submit action) since these are peer navigational
// shortcuts, several per screen.
export function QuickAction({ icon, label, accent = "primary", onPress }) {
  const iconBg = accent === "accent" ? "bg-accent-light" : "bg-primary-muted";
  const iconColor = accent === "accent" ? colors.accent : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
      className="flex-1 min-w-[46%] rounded-xl2 bg-white border border-line/50 px-3.5 py-3.5"
    >
      <View
        className={`w-9 h-9 rounded-xl items-center justify-center mb-2.5 ${iconBg}`}
      >
        <Feather name={icon} size={16} color={iconColor} />
      </View>
      <Text
        className="text-[13px] font-bold text-ink tracking-[-0.1px]"
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function QuickActionGrid({ children }) {
  return <View className="flex-row flex-wrap gap-3">{children}</View>;
}
