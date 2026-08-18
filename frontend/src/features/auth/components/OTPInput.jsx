import { useRef } from "react";
import { View, TextInput, Text } from "react-native";
import { OTP_CONFIG } from "../schemas/authSchemas.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";

const CODE_LENGTH = OTP_CONFIG.CODE_LENGTH;

export function OTPInput({ value = "", onChangeText, error }) {
  const inputRefs = useRef([]);

  function handleChangeDigit(text, index) {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);

    const digits = value.split("");
    digits[index] = digit;
    const nextValue = digits.join("").slice(0, CODE_LENGTH);
    onChangeText(nextValue);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(event, index) {
    if (event.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <View className="w-full">
      <View className="flex-row justify-between gap-2.5" accessibilityRole="none">
        {Array.from({ length: CODE_LENGTH }).map((_, index) => {
          const filled = Boolean(value[index]);
          return (
            <TextInput
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={value[index] ?? ""}
              onChangeText={(text) => handleChangeDigit(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              accessibilityLabel={`Digit ${index + 1} of ${CODE_LENGTH}`}
              style={filled ? shadows.sm : undefined}
              className={`
                flex-1 border-[1.5px] rounded-xl2 text-center text-[22px] font-bold text-ink min-h-[56px] bg-white
                ${error ? "border-danger" : filled ? "border-primary bg-primary-muted/30" : "border-line"}
              `}
            />
          );
        })}
      </View>
      {error ? (
        <Text
          className="text-[13px] text-danger mt-3 text-center"
          accessibilityRole="alert"
        >
          {error}
        </Text>
      ) : (
        <Text className="text-[12px] text-ink-muted mt-3 text-center">
          Enter the {CODE_LENGTH}-digit code we sent to your phone
        </Text>
      )}
    </View>
  );
}
