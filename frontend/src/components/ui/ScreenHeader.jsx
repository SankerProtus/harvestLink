import { View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Text } from "./AppText.jsx";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

const BUTTON_SIZE = 44;

export function HeaderActionButton({
  icon,
  size = 20,
  accessibilityLabel,
  onPress,
  badgeCount = 0,
  variant = "glass",
}) {
  const solid = variant === "solid";
  const base = {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: solid ? colors.primary : colors.white,
    borderWidth: solid ? 0 : 1,
    borderColor: colors.line,
    ...(solid ? null : shadows.sm),
  };

  const content = (
    <>
      <Feather
        name={icon}
        size={size}
        color={solid ? colors.white : colors.ink}
      />
      {badgeCount > 0 ? (
        <View
          accessible={false}
          style={{
            position: "absolute",
            top: -3,
            right: -3,
            minWidth: 18,
            height: 18,
            paddingHorizontal: 4,
            borderRadius: 9,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.accentDark,
            borderWidth: 2,
            borderColor: colors.white,
          }}
        >
          <Text
            maxFontSizeMultiplier={1}
            style={{
              fontSize: 10,
              lineHeight: 12,
              fontWeight: "700",
              color: colors.white,
            }}
          >
            {badgeCount > 9 ? "9+" : badgeCount}
          </Text>
        </View>
      ) : null}
    </>
  );

  if (!onPress) {
    return (
      <View accessible={false} style={base}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      hitSlop={4}
      accessibilityRole="button"
      accessibilityLabel={
        badgeCount > 0 && accessibilityLabel
          ? `${accessibilityLabel}, ${badgeCount} new`
          : accessibilityLabel
      }
      style={({ pressed }) => [
        base,
        {
          opacity: pressed ? 0.75 : 1,
          transform: [{ scale: pressed ? 0.96 : 1 }],
        },
      ]}
    >
      {content}
    </Pressable>
  );
}

export function StepIndicator({ current, total }) {
  return (
    <View
      accessible
      accessibilityLabel={`Step ${current} of ${total}`}
      style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
    >
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <View
          key={step}
          style={{
            height: 6,
            width: step === current ? 24 : 6,
            borderRadius: 3,
            backgroundColor:
              step <= current ? colors.primary : colors.lineStrong,
          }}
        />
      ))}
    </View>
  );
}

export function SectionLabel({ children }) {
  return (
    <Text
      className="text-[12px] font-bold text-ink-muted uppercase tracking-[1px] mb-2"
      numberOfLines={1}
    >
      {children}
    </Text>
  );
}

export function SectionHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 16,
      }}
    >
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text className="text-[20px] font-extrabold text-ink tracking-[-0.4px]">
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-[13px] text-ink-muted mt-0.5">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          hitSlop={8}
          style={{ flexDirection: "row", alignItems: "center" }}
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

export function ScreenHeader({
  title,
  subtitle,
  eyebrow,
  leftAction,
  rightAction,
  tone = "plain",
  overlap = 0,
  children,
}) {
  const insets = useSafeAreaInsets();
  const tinted = tone === "tinted";

  const compactTitle = Boolean(leftAction);

  return (
    <View
      style={
        tinted
          ? {
              backgroundColor: colors.primaryLight,
              borderBottomLeftRadius: 28,
              borderBottomRightRadius: 28,
            }
          : undefined
      }
    >
      <View
        style={{
          paddingTop: insets.top + 10,
          paddingBottom: (tinted ? 22 : 14) + overlap,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {leftAction ? (
            <View style={{ marginRight: 12 }}>{leftAction}</View>
          ) : null}

          <View style={{ flex: 1, minWidth: 0 }}>
            {eyebrow ? (
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  lineHeight: 14,
                  fontWeight: "700",
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: colors.primary,
                  marginBottom: 2,
                }}
              >
                {eyebrow}
              </Text>
            ) : null}
            <Text
              accessibilityRole="header"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              maxFontSizeMultiplier={1.2}
              style={{
                fontSize: compactTitle ? 22 : 26,
                lineHeight: compactTitle ? 27 : 31,
                fontWeight: "800",
                letterSpacing: -0.6,
                color: colors.ink,
              }}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                numberOfLines={1}
                maxFontSizeMultiplier={1.2}
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  marginTop: 2,
                  color: colors.inkSecondary,
                }}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>

          {rightAction ? (
            <View style={{ marginLeft: 12 }}>{rightAction}</View>
          ) : null}
        </View>

        {children ? <View style={{ marginTop: 16 }}>{children}</View> : null}
      </View>
    </View>
  );
}

export function PageContainer({ children, className = "" }) {
  return <View className={`flex-1 bg-surface ${className}`}>{children}</View>;
}
