import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function Chip({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-3 py-1.5 rounded-full mr-2 ${active ? "bg-primary" : "bg-white border border-border"}`}
    >
      <Text className={active ? "text-white text-xs font-medium" : "text-text-primary text-xs"}>
        {label}
      </Text>
    </Pressable>
  );
}
