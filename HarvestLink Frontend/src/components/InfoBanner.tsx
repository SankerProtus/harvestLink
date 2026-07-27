import { View, Text } from "react-native";

export function InfoBanner({ text }: { text: string }) {
  return (
    <View className="bg-primary-light rounded-input px-3 py-3 mt-1">
      <Text className="text-xs text-primary">{text}</Text>
    </View>
  );
}
