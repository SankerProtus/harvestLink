import { Pressable } from "react-native";
import { Text } from "./AppText.jsx";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";

export function Chip({
  label,
  isSelected = false,
  onPress,
  icon,
  size = "md",
}) {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-2 min-h-[36px]"
      : "px-4 py-2.5 min-h-[40px]";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isSelected }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
      className={`flex-row items-center rounded-full mr-2 border ${sizeClasses} ${
        isSelected
          ? "bg-primary border-primary"
          : "bg-white border-line"
      }`}
    >
      {icon ? (
        <Feather
          name={icon}
          size={12}
          color={isSelected ? colors.white : colors.primary}
          style={{ marginRight: 6 }}
        />
      ) : null}
      <Text
        className={`font-semibold ${
          size === "sm" ? "text-[12px]" : "text-[13px]"
        } ${isSelected ? "text-white" : "text-ink-secondary"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
