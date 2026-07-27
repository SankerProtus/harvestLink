import { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { Search, Menu } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Chip } from "../../components/Chip";
import { ProduceCard } from "../../components/ProduceCard";
import { BottomTabBar } from "../../components/BottomTabBar";
import { useMarketplaceStore } from "../../store/useMarketplaceStore";

const FILTERS = ["All", "Tomatoes", "Maize", "Cassava", "Plantain"];

export default function Marketplace() {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const listings = useMarketplaceStore((s) => s.listings);

  const filtered = listings.filter((item) => {
    const matchesFilter = filter === "All" || item.cropType === filter;
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-14">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-text-primary">Good morning, Kwabena</Text>
          <Pressable className="w-9 h-9 bg-primary rounded-full items-center justify-center">
            <Menu size={18} color="white" />
          </Pressable>
        </View>

        <View className="flex-row items-center border border-border rounded-input px-3 py-2.5 mb-4">
          <Search size={16} color="#9CA3AF" />
          <TextInput
            placeholder="Search crops or farms..."
            value={query}
            onChangeText={setQuery}
            className="ml-2 flex-1 text-text-primary"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <FlatList
          horizontal
          data={FILTERS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          className="mb-4"
          renderItem={({ item }) => (
            <Chip label={item} active={filter === item} onPress={() => setFilter(item)} />
          )}
        />

        <Text className="text-sm font-medium text-text-secondary mb-3">Fresh listings near you</Text>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <ProduceCard
              title={item.title}
              location={item.location}
              quantityLabel={item.quantityLabel}
              pricePerKg={item.pricePerKg}
              rating={item.rating}
              onPress={() => navigation.navigate("ProduceDetail", { id: item.id })}
            />
          )}
        />
      </View>

      <BottomTabBar activeTab="Marketplace" />
    </View>
  );
}
