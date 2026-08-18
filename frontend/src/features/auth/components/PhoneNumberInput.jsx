import { View, Text, TextInput } from "react-native";

export function PhoneNumberInput({
  value,
  onChangeText,
  onBlur,
  error,
  label = "Phone Number",
}) {
  return (
    <View className="w-full">
      <Text className="text-sm font-semibold text-ink mb-1.5">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder="0241234567"
        placeholderTextColor="#9CA3AF"
        keyboardType="phone-pad"
        autoComplete="tel"
        textContentType="telephoneNumber"
        accessibilityLabel={label}
        accessibilityHint="Enter your Ghanaian phone number"
        className={`
          border-2 rounded-2xl px-4 py-3.5 text-base text-ink min-h-[52px] bg-white
          ${error ? "border-danger" : "border-line"}
        `}
      />
      {error ? (
        <Text className="text-sm text-danger mt-1" accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
