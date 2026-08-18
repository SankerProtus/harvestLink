import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

export function HeaderActionButton({
  icon,
  size = 18,
  accessibilityLabel,
  onPress,
  badgeCount = 0,
  variant = "glass",
}) {
  const Container = onPress ? Pressable : View;

  const bgClass =
    variant === "solid" ? "bg-white/20" : "bg-white/15 border border-white/20";

  return (
    <Container
      {...(onPress ? { onPress, accessibilityRole: "button" } : {})}
      accessibilityLabel={onPress ? accessibilityLabel : undefined}
      {...(onPress
        ? {
            style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }),
          }
        : {})}
      className={`h-10 w-10 items-center justify-center rounded-xl ${bgClass}`}
    >
      <Feather name={icon} size={size} color="#FFFFFF" />
      {badgeCount > 0 ? (
        <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-accent items-center justify-center border-2 border-primary-dark">
          <Text className="text-white text-[10px] font-bold">
            {badgeCount > 9 ? "9+" : badgeCount}
          </Text>
        </View>
      ) : null}
    </Container>
  );
}

export function StepIndicator({ current, total }) {
  return (
    <View className="flex-row items-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <View
          key={step}
          className={`h-1.5 rounded-full ${
            step === current
              ? "w-6 bg-white"
              : step < current
                ? "w-1.5 bg-white/60"
                : "w-1.5 bg-white/25"
          }`}
        />
      ))}
    </View>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  leftAction,
  rightAction,
  backgroundClassName = "bg-primary-dark",
  titleClassName = "text-[20px] font-extrabold text-white tracking-[-0.3px]",
  subtitleClassName = "text-white/70 text-[13px] mt-1",
  large = false,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View className={`${backgroundClassName} overflow-hidden`}>
      {/* Decorative depth layers */}
      <View className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
      <View className="absolute top-8 -left-8 w-24 h-24 rounded-full bg-white/5" />
      <View className="absolute bottom-0 left-0 right-0 h-24 bg-primary opacity-90" />

      <View
        className="px-5 rounded-b-xl3 relative z-10"
        style={{
          paddingTop: insets.top + (large ? 8 : 12),
          paddingBottom: large ? 28 : 22,
          ...shadows.md,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-shrink-0" style={{ minWidth: 40 }}>
            {leftAction}
          </View>
          <View className="flex-1 px-2 items-center">
            <Text className={titleClassName} numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text className={subtitleClassName} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          <View className="flex-shrink-0 items-end" style={{ minWidth: 40 }}>
            {rightAction}
          </View>
        </View>
      </View>
    </View>
  );
}

export function PageContainer({ children, className = "" }) {
  return <View className={`flex-1 bg-surface ${className}`}>{children}</View>;
}
