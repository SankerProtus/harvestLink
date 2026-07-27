import { View, Text, Pressable, ScrollView } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";
import { useDeliveryStore } from "../../store/useDeliveryStore";
import { apiClient } from "../../api/client";

export default function ProduceDetail() {
  const navigation = useNavigation<any>();
  const detail = useDeliveryStore((s) => s.produceDetail);
  const confirmMatch = useDeliveryStore((s) => s.confirmMatch);

  if (!detail) return null;

  const handleConfirm = async (buyerId: string) => {
    try {
      await apiClient.post(`/matches/${buyerId}/confirm`);
      confirmMatch(buyerId);
      navigation.navigate("OrderConfirmation", { buyerId });
    } catch (err) {
      console.error("Failed to confirm match:", err);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-5 pt-14">
        <Pressable onPress={() => navigation.goBack()} className="flex-row items-center mb-4">
          <ChevronLeft size={20} color="#1A1A1A" />
          <Text className="text-text-primary font-medium ml-1">Listing Details</Text>
        </Pressable>
      </View>

      <View className="h-40 bg-primary-light mx-5 rounded-card mb-4" />

      <View className="px-5">
        <View className="flex-row justify-between items-start mb-1">
          <Text className="text-xl font-bold text-text-primary">{detail.title}</Text>
          <Text className="text-primary font-bold text-lg">GH₵{detail.pricePerKg.toFixed(2)}/kg</Text>
        </View>
        <Text className="text-text-secondary mb-4">{detail.location}</Text>

        <View className="flex-row items-center mb-6">
          <Avatar name={detail.farmerName} size={36} />
          <View className="ml-3">
            <Text className="font-semibold text-text-primary">{detail.farmName}</Text>
            <Text className="text-xs text-text-secondary">
              {detail.farmerName} · {detail.quantityKg}kg available · {detail.availableDate}
            </Text>
          </View>
        </View>

        <Text className="font-semibold text-text-primary mb-3">Matched Buyers</Text>

        {detail.matchedBuyers.map((buyer) => (
          <View
            key={buyer.id}
            className="flex-row items-center justify-between border border-border rounded-card p-3 mb-3"
          >
            <View className="flex-row items-center flex-1">
              <Avatar name={buyer.name} size={36} />
              <View className="ml-3 flex-1">
                <Text className="font-medium text-text-primary">{buyer.name}</Text>
                <Text className="text-xs text-text-secondary">
                  {buyer.distanceKm}km away · wants {buyer.wantsKg}kg
                </Text>
              </View>
            </View>
            <View
              className={`px-2 py-1 rounded-full ${
                buyer.status === "matched" ? "bg-primary-light" : "bg-yellow-50"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  buyer.status === "matched" ? "text-primary" : "text-yellow-700"
                }`}
              >
                {buyer.status === "matched" ? "Matched" : "Pending"}
              </Text>
            </View>
          </View>
        ))}

        <View className="flex-row mt-2 mb-10" style={{ gap: 12 }}>
          <View className="flex-1">
            <Button label="Edit Listing" variant="outline" onPress={() => navigation.navigate("LogHarvest")} />
          </View>
          <View className="flex-1">
            <Button
              label="Confirm Match"
              onPress={() => {
                const target = detail.matchedBuyers.find((b) => b.status === "matched") ?? detail.matchedBuyers[0];
                if (target) handleConfirm(target.id);
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
