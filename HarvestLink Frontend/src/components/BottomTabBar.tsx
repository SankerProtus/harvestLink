import { View, Text, Pressable } from "react-native";
import { Home, List, Truck, User } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const TABS = [
  { key: "Marketplace", label: "Marketplace", icon: Home },
  { key: "MyListings", label: "My Listings", icon: List },
  { key: "Delivery", label: "Delivery", icon: Truck },
  { key: "Profile", label: "Profile", icon: User },
];

export function BottomTabBar({ activeTab }: { activeTab: string }) {
  const navigation = useNavigation<any>();
  return (
    <View className="flex-row border-t border-border py-2 bg-white">
      {TABS.map(({ key, label, icon: Icon }) => {
        const active = activeTab === key;
        return (
          <Pressable
            key={key}
            onPress={() => navigation.navigate(key)}
            className="flex-1 items-center"
          >
            <Icon size={20} color={active ? "#2F6B3C" : "#9CA3AF"} />
            <Text className={`text-[10px] mt-1 ${active ? "text-primary font-medium" : "text-text-secondary"}`}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
