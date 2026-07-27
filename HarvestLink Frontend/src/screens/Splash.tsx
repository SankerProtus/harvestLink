import { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Splash() {
  const navigation = useNavigation<any>();

  // Splash only ever renders inside AuthStack. If the user is already
  // verified, RootNavigator swaps to MainStack automatically on the next
  // render (see RootNavigator.tsx) — this screen just needs to hand off
  // to onboarding for brand-new users.
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace("Onboarding1");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center mb-4">
        <Text className="text-primary text-2xl font-bold">H</Text>
      </View>
      <Text className="text-white text-2xl font-bold">HarvestLink</Text>
      <Text className="text-white/80 mt-1">From farm gate to market, faster</Text>
      <Text className="text-white/50 text-xs absolute bottom-10">v1.0 · CSM 366 KNUST</Text>
    </View>
  );
}
