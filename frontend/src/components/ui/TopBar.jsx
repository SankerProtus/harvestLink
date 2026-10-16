import { View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "./AppText.jsx";
import { colors } from "../../theme/colors.js";

/**
 * Slim, light page header.
 *
 * Replaces the 230px dark-green slab (ScreenHeader) on content screens. That
 * header also applied the top safe-area inset a second time on every screen
 * that was already wrapped in <SafeAreaView edges={["top"]}>, so the title sat
 * ~30px lower than it needed to. This bar is ~56px tall and leaves the inset to
 * the screen's SafeAreaView, which gives back roughly a fifth of the viewport
 * to actual content.
 */
export function TopBarButton({
  icon,
  onPress,
  accessibilityLabel,
  badgeCount = 0,
  tint = colors.ink,
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={
        badgeCount > 0 && accessibilityLabel
          ? `${accessibilityLabel}, ${badgeCount} new`
          : accessibilityLabel
      }
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
      className="w-10 h-10 rounded-full bg-white border border-line items-center justify-center"
    >
      <Feather name={icon} size={19} color={tint} />
      {badgeCount > 0 ? (
        <View className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-accent-dark items-center justify-center border-2 border-surface">
          <Text
            maxFontSizeMultiplier={1}
            className="text-white text-[10px] leading-[12px] font-bold"
          >
            {badgeCount > 9 ? "9+" : badgeCount}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function TopBar({ title, subtitle, onBack, right, divider = false }) {
  return (
    <View
      className={`flex-row items-center px-5 pt-2 pb-3 bg-surface ${
        divider ? "border-b border-line/70" : ""
      }`}
      style={{ minHeight: 60, gap: 12 }}
    >
      {onBack ? (
        <TopBarButton
          icon="arrow-left"
          onPress={onBack}
          accessibilityLabel="Go back"
        />
      ) : null}
      <View className="flex-1 min-w-0">
        <Text
          accessibilityRole="header"
          numberOfLines={1}
          maxFontSizeMultiplier={1.2}
          className="text-[22px] leading-[27px] font-extrabold text-ink tracking-[-0.5px]"
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            maxFontSizeMultiplier={1.2}
            className="text-[13px] text-ink-muted -mt-0.5"
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? (
        <View className="flex-row items-center" style={{ gap: 8 }}>
          {right}
        </View>
      ) : null}
    </View>
  );
}
