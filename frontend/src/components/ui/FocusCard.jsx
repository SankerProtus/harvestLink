import { View, Pressable } from "react-native";
import { Text } from "./AppText.jsx";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

export function FocusCard({
  icon,
  eyebrow,
  title,
  subtitle,
  tone = "primary",
  onPress,
}) {
  const isAccent = tone === "accent";
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${eyebrow ? eyebrow + ". " : ""}${title}. ${subtitle ?? ""}`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.92 : 1,
        transform: [{ scale: pressed ? 0.99 : 1 }],
        ...shadows.card,
      })}
      className={`rounded-2xl border p-4 flex-row items-center ${
        isAccent
          ? "bg-accent-light border-accent/30"
          : "bg-white border-line/60"
      }`}
    >
      <View
        className={`w-11 h-11 rounded-full items-center justify-center mr-3 ${
          isAccent ? "bg-accent-dark" : "bg-primary-light"
        }`}
      >
        <Feather
          name={icon}
          size={19}
          color={isAccent ? colors.white : colors.primary}
        />
      </View>
      <View className="flex-1 min-w-0 mr-2">
        {eyebrow ? (
          <Text
            className="text-[11px] font-bold uppercase tracking-[0.8px] text-ink-muted"
            numberOfLines={1}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Text
          className="text-[16px] font-extrabold text-ink tracking-[-0.2px]"
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            className="text-[13px] text-ink-secondary mt-0.5 leading-[18px]"
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Feather name="chevron-right" size={18} color={colors.inkMuted} />
    </Pressable>
  );
}

export function AttentionList({ items, allClearTitle, allClearBody }) {
  if (items.length === 0) {
    return (
      <View className="rounded-2xl bg-primary-light border border-primary/15 p-4 flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-3">
          <Feather name="check" size={18} color={colors.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-bold text-primary-dark">
            {allClearTitle}
          </Text>
          <Text className="text-[13px] text-ink-secondary mt-0.5">
            {allClearBody}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View
      className="rounded-2xl bg-white border border-line/60 overflow-hidden"
      style={shadows.card}
    >
      {items.map((item, index) => (
        <Pressable
          key={item.key}
          onPress={item.onPress}
          accessibilityRole="button"
          accessibilityLabel={`${item.count} ${item.label}. ${item.hint}`}
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
          className={`flex-row items-center px-4 py-3.5 min-h-[56px] ${
            index < items.length - 1 ? "border-b border-line/60" : ""
          }`}
        >
          <View className="w-9 h-9 rounded-full bg-accent-light items-center justify-center mr-3">
            <Feather name={item.icon} size={16} color={colors.accentDark} />
          </View>
          <View className="flex-1 min-w-0 mr-2">
            <Text className="text-[14px] font-bold text-ink" numberOfLines={1}>
              {item.label}
            </Text>
            <Text
              className="text-[12.5px] text-ink-muted mt-0.5"
              numberOfLines={1}
            >
              {item.hint}
            </Text>
          </View>
          <View className="min-w-[28px] h-7 px-2 rounded-full bg-accent-dark items-center justify-center">
            <Text className="text-[13px] font-bold text-white">
              {item.count}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
