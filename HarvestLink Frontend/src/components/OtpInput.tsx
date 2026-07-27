import { useRef, useState } from "react";
import { View, TextInput } from "react-native";

type Props = {
  length?: number;
  onComplete: (code: string) => void;
};

export function OtpInput({ length = 4, onComplete }: Props) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const next = [...values];
    next[index] = text.slice(-1);
    setValues(next);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
    if (next.every((v) => v !== "")) {
      onComplete(next.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-between w-full">
      {values.map((val, i) => (
        <TextInput
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          value={val}
          onChangeText={(text) => handleChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          keyboardType="number-pad"
          maxLength={1}
          className={`w-14 h-14 border rounded-input text-center text-lg font-semibold text-text-primary ${
            val ? "border-primary" : "border-border"
          }`}
        />
      ))}
    </View>
  );
}
