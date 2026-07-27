import { View, Text, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  label: string;
  helperText?: string;
};

export function TextField({ label, helperText, ...rest }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-text-primary mb-1">{label}</Text>
      <TextInput
        className="border border-border rounded-input px-3 py-3 text-text-primary"
        placeholderTextColor="#9CA3AF"
        {...rest}
      />
      {helperText ? (
        <Text className="text-xs text-text-secondary mt-1">{helperText}</Text>
      ) : null}
    </View>
  );
}
