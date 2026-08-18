import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";

export function SectionLabel({ children }) {
  return (
    <Text className="text-[11px] font-bold text-ink-muted uppercase tracking-[0.8px] mb-2.5 ml-0.5">
      {children}
    </Text>
  );
}

export function SectionHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <View className="flex-row items-end justify-between mb-4">
      <View className="flex-1 pr-3">
        <Text className="text-[20px] font-extrabold text-ink tracking-[-0.4px]">
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-[13px] text-ink-muted mt-0.5">{subtitle}</Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          hitSlop={8}
          className="flex-row items-center"
        >
          <Text className="text-[13px] font-semibold text-primary mr-0.5">
            {actionLabel}
          </Text>
          <Feather name="chevron-right" size={14} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}
