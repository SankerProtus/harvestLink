import { View, Text, Pressable } from "react-native";
import { ChevronLeft, Truck, Phone, Check } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../../components/Avatar";
import { BottomTabBar } from "../../components/BottomTabBar";
import { useDeliveryStore } from "../../store/useDeliveryStore";

// Swap this View placeholder for a real <MapView /> from react-native-maps
// once the Google Maps SDK API key is wired up in app.json / AndroidManifest.
function MapPlaceholder() {
  return (
    <View className="h-56 bg-primary-light rounded-card items-center justify-center mb-6">
      <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-2">
        <Truck size={20} color="#2F6B3C" />
      </View>
      <Text className="text-text-secondary text-sm">Map view (Google Maps SDK)</Text>
    </View>
  );
}

export default function DeliveryTracking() {
  const navigation = useNavigation<any>();
  const delivery = useDeliveryStore((s) => s.delivery);

  if (!delivery) return null;

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pt-14 flex-1">
        <Pressable onPress={() => navigation.goBack()} className="flex-row items-center mb-4">
          <ChevronLeft size={20} color="#1A1A1A" />
          <Text className="text-text-primary font-medium ml-1">Track Delivery</Text>
        </Pressable>

        <MapPlaceholder />

        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-text-secondary text-xs">Arriving in</Text>
            <Text className="text-2xl font-bold text-text-primary">{delivery.etaMinutes} minutes</Text>
          </View>
          <Pressable className="w-11 h-11 bg-primary rounded-full items-center justify-center">
            <Phone size={18} color="white" />
          </Pressable>
        </View>

        <View className="flex-row items-center mb-6">
          <Avatar name={delivery.driverName} size={40} />
          <View className="ml-3">
            <Text className="font-semibold text-text-primary">{delivery.driverName}</Text>
            <Text className="text-xs text-text-secondary">Driver · {delivery.vehicle}</Text>
          </View>
        </View>

        {delivery.steps.map((step, i) => (
          <View key={i} className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View
                className={`w-5 h-5 rounded-full items-center justify-center mr-3 ${
                  step.done ? "bg-primary" : "bg-border"
                }`}
              >
                {step.done ? <Check size={12} color="white" /> : null}
              </View>
              <Text className={step.done ? "text-text-primary" : "text-text-secondary"}>{step.label}</Text>
            </View>
            <Text className="text-xs text-text-secondary">{step.time}</Text>
          </View>
        ))}
      </View>

      <BottomTabBar activeTab="Delivery" />
    </View>
  );
}
