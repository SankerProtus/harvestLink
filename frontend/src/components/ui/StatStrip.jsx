import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

// A single, compact stat strip — one card, columns divided by thin rules —
// instead of separately-padded MetricCards. Production dashboards (order
// management apps, POS home screens) favor this dense row so the "overview"
// reads at a glance without pushing the actual content below the fold.
export function StatStripItem({
  icon,
  value,
  label,
  accent = "primary",
  isLast = false,
}) {
  const iconBg = accent === "accent" ? "bg-accent-light" : "bg-primary-muted";
  const iconColor = accent === "accent" ? colors.accent : colors.primary;

  return (
    <View
      className={`flex-1 flex-row items-center gap-2.5 py-3 px-3 ${
        isLast ? "" : "border-r border-line/60"
      }`}
    >
      <View
        className={`w-8 h-8 rounded-xl items-center justify-center ${iconBg}`}
      >
        <Feather name={icon} size={14} color={iconColor} />
      </View>
      <View className="flex-1 min-w-0">
        <Text
          className="text-[15px] font-extrabold text-ink tracking-[-0.2px]"
          numberOfLines={1}
        >
          {value}
        </Text>
        <Text
          className="text-[9.5px] font-semibold text-ink-muted uppercase tracking-wide"
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}

export function StatStrip({ items, className = "" }) {
  return (
    <View
      className={`flex-row rounded-xl2 bg-white border border-line/50 ${className}`}
      style={shadows.card}
    >
      {items.map((item, index) => (
        <StatStripItem
          key={item.label}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  );
}
