import { View, Text, Pressable } from "react-native";
import { Check } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "../components/Button";

const ORDER = {
  orderId: "#HL-1042",
  quantity: "80kg Tomatoes",
  totalValue: "GH₵880.00",
  pickupDate: "18 Jul 2026, 8:00 AM",
  buyerName: "Ama Serwaa Foods",
};

export default function OrderConfirmation() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const rows = [
    { label: "Order ID", value: ORDER.orderId },
    { label: "Quantity", value: ORDER.quantity },
    { label: "Total value", value: ORDER.totalValue },
    { label: "Pickup date", value: ORDER.pickupDate },
  ];

  return (
    <View className="flex-1 bg-white px-6 pt-20 items-center">
      <View className="w-16 h-16 bg-primary-light rounded-full items-center justify-center mb-6">
        <Check size={28} color="#2F6B3C" />
      </View>

      <Text className="text-2xl font-bold text-text-primary mb-2 text-center">Match Confirmed!</Text>
      <Text className="text-text-secondary text-center mb-8">
        {ORDER.buyerName} will collect 80kg of tomatoes from your farm tomorrow morning.
      </Text>

      <View className="w-full border border-border rounded-card p-4 mb-8">
        {rows.map((r, i) => (
          <View
            key={r.label}
            className={`flex-row justify-between py-2 ${i < rows.length - 1 ? "border-b border-border" : ""}`}
          >
            <Text className="text-text-secondary">{r.label}</Text>
            <Text className="text-text-primary font-medium">{r.value}</Text>
          </View>
        ))}
      </View>

      <View className="w-full mb-4">
        <Button label="Track This Order" onPress={() => navigation.navigate("Delivery")} />
      </View>

      <Pressable onPress={() => navigation.navigate("Marketplace")}>
        <Text className="text-primary font-medium">Back to Marketplace</Text>
      </Pressable>
    </View>
  );
}
