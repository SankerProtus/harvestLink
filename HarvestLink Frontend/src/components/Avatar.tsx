import { View, Text } from "react-native";

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="bg-primary-light items-center justify-center"
    >
      <Text className="text-primary font-semibold" style={{ fontSize: size * 0.35 }}>
        {initials}
      </Text>
    </View>
  );
}
