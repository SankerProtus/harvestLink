import { View, Text, Image, Pressable } from "react-native";
import { Star } from "lucide-react-native";

type Props = {
  title: string;
  location: string;
  quantityLabel: string;
  pricePerKg: number;
  rating: number;
  imageUri?: string;
  onPress: () => void;
};

export function ProduceCard({ title, location, quantityLabel, pricePerKg, rating, imageUri, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="w-[48%] mb-4">
      <View className="w-full h-28 bg-primary-light rounded-card mb-2 overflow-hidden">
        {imageUri ? <Image source={{ uri: imageUri }} className="w-full h-full" /> : null}
      </View>
      <Text className="font-semibold text-text-primary">{title}</Text>
      <Text className="text-xs text-text-secondary">
        {location} · {quantityLabel}
      </Text>
      <View className="flex-row items-center justify-between mt-1">
        <Text className="text-primary font-semibold">GH₵{pricePerKg.toFixed(2)}/kg</Text>
        <View className="flex-row items-center">
          <Star size={12} color="#2F6B3C" fill="#2F6B3C" />
          <Text className="text-xs text-text-secondary ml-1">{rating}</Text>
        </View>
      </View>
    </Pressable>
  );
}
