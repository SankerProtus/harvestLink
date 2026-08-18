import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";

export function InlinePageHeader({
  title,
  subtitle,
  leftAction,
  rightAction,
  large = true,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="px-5 pb-4 bg-surface"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          {leftAction ? <View className="mb-3">{leftAction}</View> : null}
          <Text
            className={`text-ink tracking-[-0.5px] ${
              large
                ? "text-[32px] leading-[36px] font-extrabold"
                : "text-[22px] leading-[26px] font-extrabold"
            }`}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-[14px] text-ink-muted mt-1 leading-5">
              {subtitle}
            </Text>
          ) : null}
        </View>
        {rightAction ? (
          <View className="pt-1">{rightAction}</View>
        ) : null}
      </View>
    </View>
  );
}

export function IconCircleButton({
  icon,
  onPress,
  accessibilityLabel,
  badgeCount = 0,
  variant = "surface",
}) {
  const bgClass =
    variant === "primary"
      ? "bg-primary"
      : "bg-white border border-line/60";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
      className={`w-11 h-11 rounded-full items-center justify-center ${bgClass}`}
    >
      <Feather
        name={icon}
        size={20}
        color={variant === "primary" ? colors.white : colors.ink}
      />
      {badgeCount > 0 ? (
        <View className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent items-center justify-center border-2 border-surface">
          <Text className="text-white text-[10px] font-bold">
            {badgeCount > 9 ? "9+" : badgeCount}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function BackButton({ onPress, label = "Go back" }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      className="flex-row items-center -ml-1"
    >
      <Feather name="arrow-left" size={22} color={colors.ink} />
    </Pressable>
  );
}
