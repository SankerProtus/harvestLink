import { Pressable, Text, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

// Design System: Buttons per SCREEN_SPECIFICATIONS_AND_COMPONENTS.md
// All buttons follow 8pt grid: 44px height (5.5U), 8px corner radius

const VARIANT_STYLES = {
  primary: "bg-primary",
  secondary: "bg-white border-[1px] border-line",
  danger: "bg-danger",
  ghost: "bg-transparent",
};

const VARIANT_TEXT_STYLES = {
  primary: "text-white",
  secondary: "text-ink",
  danger: "text-white",
  ghost: "text-primary",
};

const VARIANT_SPINNER_COLOR = {
  primary: colors.white,
  secondary: colors.primary,
  danger: colors.white,
  ghost: colors.primary,
};

const VARIANT_ICON_COLOR = {
  primary: colors.white,
  secondary: colors.primary,
  danger: colors.white,
  ghost: colors.primary,
};

// Size variants follow 8pt grid system
// Standard button: 44px height, 12px horizontal padding, 10px vertical padding, 8px radius
const SIZE_STYLES = {
  sm: "py-2.5 px-3 min-h-[40px] rounded-lg", // Compact: 40px
  md: "py-2.5 px-4 min-h-[44px] rounded-lg", // Standard: 44px (spec default)
  lg: "py-3 px-6 min-h-[48px] rounded-lg", // Large: 48px
};

const SIZE_TEXT = {
  sm: "text-sm font-semibold", // 14px Semibold
  md: "text-base font-semibold", // 16px Semibold (spec default)
  lg: "text-lg font-semibold", // 18px Semibold
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md", // Default to standard size per design spec
  icon,
  isLoading = false,
  disabled = false,
  className = "",
}) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      style={({ pressed }) => ({
        // Opacity states per design spec
        opacity: isDisabled ? 0.5 : 1,
        // Scale transforms per design spec (0.98 for active state)
        transform: [{ scale: pressed && !isDisabled ? 0.98 : 1 }],
        // Shadow elevation per design spec
        ...(variant === "primary"
          ? pressed && !isDisabled
            ? shadows.sm // Reduced shadow on press
            : shadows.sm
          : variant === "secondary"
            ? shadows.none
            : {}),
      })}
      className={`
        items-center justify-center flex-row gap-2
        ${SIZE_STYLES[size]}
        ${VARIANT_STYLES[variant]}
        ${className}
      `}
    >
      {isLoading ? (
        <ActivityIndicator color={VARIANT_SPINNER_COLOR[variant]} />
      ) : (
        <>
          {icon ? (
            <Feather
              name={icon}
              size={size === "sm" ? 16 : size === "md" ? 18 : 20}
              color={VARIANT_ICON_COLOR[variant]}
            />
          ) : null}
          <Text
            className={`tracking-tight ${SIZE_TEXT[size]} ${VARIANT_TEXT_STYLES[variant]}`}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
