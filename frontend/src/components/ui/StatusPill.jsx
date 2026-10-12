import { View } from "react-native";
import { Text } from "./AppText.jsx";
import { TONE_COLORS } from "../../features/deliveryTracking/lib/orderStatus.js";

export function StatusPill({ label, tone = "neutral" }) {
  const t = TONE_COLORS[tone] ?? TONE_COLORS.neutral;
  return (
    <View
      className="rounded-full px-2.5 py-[3px] self-start"
      style={{ backgroundColor: t.bg }}
    >
      <Text
        className="text-[11px] font-bold"
        style={{ color: t.fg }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}
