import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

export function MetricCard({ label, value, caption, icon, accent = "primary" }) {
  const iconBg =
    accent === "accent" ? "bg-accent-light" : "bg-primary-muted";
  const iconColor = accent === "accent" ? colors.accent : colors.primary;

  return (
    <View
      className="flex-1 rounded-xl2 bg-white p-4 border border-line/50"
      style={shadows.card}
    >
      <View className="flex-row items-center justify-between mb-3">
        {icon ? (
          <View
            className={`w-8 h-8 rounded-xl items-center justify-center ${iconBg}`}
          >
            <Feather name={icon} size={14} color={iconColor} />
          </View>
        ) : (
          <View />
        )}
      </View>
      <Text
        className="text-[22px] leading-[26px] font-extrabold text-ink tracking-[-0.3px]"
        numberOfLines={1}
      >
        {value}
      </Text>
      <Text className="text-[11px] font-semibold text-ink-muted mt-1 uppercase tracking-wide">
        {label}
      </Text>
      {caption ? (
        <Text className="text-[10px] text-ink-faint mt-0.5">{caption}</Text>
      ) : null}
    </View>
  );
}
