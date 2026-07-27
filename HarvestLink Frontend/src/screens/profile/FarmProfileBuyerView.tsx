import { View, Text, Pressable, ScrollView } from "react-native";
import { ChevronLeft, Star } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";
import { ProduceCard } from "../../components/ProduceCard";

const STATS = [
  { label: "Harvests sold", value: "32" },
  { label: "On-time", value: "96%" },
  { label: "Rating", value: "4.9" },
];

const LISTINGS = [
  { id: "1", title: "Fresh Tomatoes", location: "Ejura, Ashanti", quantityLabel: "120kg avail.", pricePerKg: 8.5, rating: 4.8 },
  { id: "2", title: "Yellow Maize", location: "Ejura, Ashanti", quantityLabel: "120kg avail.", pricePerKg: 8.5, rating: 4.8 },
];

export default function FarmProfileBuyerView() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-5 pt-14">
        <Pressable onPress={() => navigation.goBack()} className="flex-row items-center mb-6">
          <ChevronLeft size={20} color="#1A1A1A" />
          <Text className="text-text-primary font-medium ml-1">Farm Profile</Text>
        </Pressable>

        <View className="items-center mb-6">
          <Avatar name="Kwaku Asante" size={64} />
          <Text className="text-lg font-bold text-text-primary mt-3">Asante Family Farm</Text>
          <Text className="text-xs text-primary mb-1">✓ Ghana Card verified</Text>
          <View className="flex-row items-center">
            <Star size={12} color="#2F6B3C" fill="#2F6B3C" />
            <Text className="text-xs text-text-secondary ml-1">
              4.9 · Kwaku Asante · Ejura, Ashanti · Since 2024
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mb-6">
          {STATS.map((s) => (
            <View key={s.label} className="flex-1 items-center border border-border rounded-card py-3 mx-1">
              <Text className="font-bold text-text-primary">{s.value}</Text>
              <Text className="text-xs text-text-secondary">{s.label}</Text>
            </View>
          ))}
        </View>

        <Text className="font-semibold text-text-primary mb-3">Farm photos</Text>
        <View className="flex-row mb-1" style={{ gap: 8 }}>
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-1 h-16 bg-primary-light rounded-card" />
          ))}
        </View>
        <Text className="text-xs text-text-secondary mb-6">12 photos · tap to view all</Text>

        <Text className="font-semibold text-text-primary mb-3">Active listings</Text>
        <View className="flex-row flex-wrap justify-between mb-4">
          {LISTINGS.map((item) => (
            <ProduceCard
              key={item.id}
              title={item.title}
              location={item.location}
              quantityLabel={item.quantityLabel}
              pricePerKg={item.pricePerKg}
              rating={item.rating}
              onPress={() => navigation.navigate("ProduceDetail", { id: item.id })}
            />
          ))}
        </View>

        <View className="mb-10">
          <Button label="Request Produce from this Farm" onPress={() => navigation.navigate("LogHarvest")} />
        </View>
      </View>
    </ScrollView>
  );
}
