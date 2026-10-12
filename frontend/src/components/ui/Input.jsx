import { View } from "react-native";
import { Text, TextInput } from "./AppText.jsx";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

export function FieldLabel({ children, required = false }) {
  return (
    <Text className="text-xs font-semibold text-ink mb-2">
      {children}
      {required ? <Text className="text-danger"> *</Text> : null}
    </Text>
  );
}

export function Input({
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  label,
  hint,
  leftIcon,
  rightElement,
  keyboardType,
  autoComplete,
  textContentType,
  accessibilityLabel,
  multiline = false,
  className = "",
  ...rest
}) {
  return (
    <View className={`w-full ${className}`}>
      {label ? <FieldLabel>{label}</FieldLabel> : null}

      <View
        className={`flex-row items-center rounded-lg border bg-white overflow-hidden ${
          error ? "border-danger" : "border-line"
        } ${error ? "bg-danger/5" : ""}`}
        style={shadows.sm}
      >
        {leftIcon ? (
          <View className="pl-4 pr-2">
            <Feather name={leftIcon} size={18} color={colors.inkFaint} />
          </View>
        ) : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.inkFaint}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          textContentType={textContentType}
          accessibilityLabel={accessibilityLabel ?? label}
          multiline={multiline}
          className={`flex-1 px-3 py-2.5 text-base text-ink ${
            multiline ? "min-h-24 pt-2.5" : "h-11"
          }`}
          {...rest}
        />

        {rightElement ? <View className="pr-3">{rightElement}</View> : null}
      </View>

      {error ? (
        <Text className="text-xs text-danger mt-1" accessibilityRole="alert">
          ✗ {error}
        </Text>
      ) : hint ? (
        <Text className="text-xs text-ink-muted mt-1">{hint}</Text>
      ) : null}
    </View>
  );
}
