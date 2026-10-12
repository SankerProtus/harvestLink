import { Pressable, ActivityIndicator } from "react-native";
import { Text } from "./AppText.jsx";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

const VARIANT_STYLES = {
  primary: "bg-primary",
  accent: "bg-accent-dark",
  soft: "bg-primary-light",
  secondary: "bg-white border border-line-strong",
  danger: "bg-danger",
  ghost: "bg-transparent",
};

const VARIANT_TEXT_STYLES = {
  primary: "text-white",
  accent: "text-white",
  soft: "text-primary-dark",
  secondary: "text-ink",
  danger: "text-white",
  ghost: "text-primary",
};

const VARIANT_SPINNER_COLOR = {
  primary: colors.white,
  accent: colors.white,
  soft: colors.primaryActive,
  secondary: colors.primary,
  danger: colors.white,
  ghost: colors.primary,
};

const VARIANT_ICON_COLOR = VARIANT_SPINNER_COLOR;

const SIZE_STYLES = {
  sm: "py-2 px-3.5 min-h-[44px] rounded-xl",
  md: "py-2.5 px-5 min-h-[48px] rounded-xl",
  lg: "py-3 px-6 min-h-[54px] rounded-2xl",
};

const SIZE_TEXT = {
  sm: "text-sm font-semibold",
  md: "text-base font-semibold",
  lg: "text-[17px] font-semibold",
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
