import { View, Text, Pressable, ScrollView } from "react-native";
import { ChevronRight, Star } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../../components/Avatar";
import { BottomTabBar } from "../../components/BottomTabBar";

const STATS = [
  { label: "Earnings", value: "GH₵2,340" },
  { label: "Orders", value: "18" },
  { label: "Rating", value: "4.9" },
];

const ACTIVITY = [
  { id: "1", title: "Maize — 80kg", subtitle: "Order #HL-1042 · Jul 15", status: "Matched" },
  { id: "2", title: "Maize — 80kg", subtitle: "Order #HL-1042 · Jul 15", status: "Matched" },
  { id: "3", title: "Maize — 80kg", subtitle: "Order #HL-1042 · Jul 15", status: "Matched" },
];

export default function ProfileDashboard() {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-14">
        <View className="items-center mb-6">
          <Avatar name="Kwaku Asante" size={64} />
          <Text className="text-lg font-bold text-text-primary mt-3">Kwaku Asante</Text>
          <View className="flex-row items-center">
            <Star size={12} color="#2F6B3C" fill="#2F6B3C" />
            <Text className="text-xs text-text-secondary ml-1">4.9 · Asante Family Farm · Ejura, Ashanti</Text>
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

        <Text className="font-semibold text-text-primary mb-3">Recent Activity</Text>
        {ACTIVITY.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => navigation.navigate("ProduceDetail", { id: item.id })}
            className="flex-row items-center justify-between border border-border rounded-card p-3 mb-3"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-primary-light rounded-card mr-3" />
              <View>
                <Text className="font-medium text-text-primary">{item.title}</Text>
                <Text className="text-xs text-text-secondary">{item.subtitle}</Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <View className="bg-primary-light px-2 py-1 rounded-full mr-2">
                <Text className="text-xs text-primary font-medium">{item.status}</Text>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <BottomTabBar activeTab="Profile" />
    </View>
  );
}
