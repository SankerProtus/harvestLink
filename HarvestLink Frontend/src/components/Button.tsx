import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  disabled?: boolean;
};

export function Button({ label, onPress, variant = "primary", disabled }: Props) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`w-full rounded-input py-4 items-center ${
        isPrimary ? "bg-primary" : "bg-white border border-border"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <Text className={isPrimary ? "text-white font-semibold" : "text-text-primary font-semibold"}>
        {label}
      </Text>
    </Pressable>
  );
}
