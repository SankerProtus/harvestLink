import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { User, Truck } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";

type Role = "farmer" | "buyer";

export default function RoleSelect() {
  const [role, setRole] = useState<Role | null>(null);
  const navigation = useNavigation<any>();

  const options: { key: Role; icon: any; title: string; subtitle: string }[] = [
    { key: "farmer", icon: User, title: "I'm a Farmer", subtitle: "List produce and find buyers near you" },
    { key: "buyer", icon: Truck, title: "I'm a Buyer", subtitle: "Browse produce and arrange delivery" },
  ];

  return (
    <View className="flex-1 bg-white px-5 pt-16">
      <View className="w-14 h-14 bg-primary rounded-2xl items-center justify-center mb-6">
        <Text className="text-white text-2xl font-bold">H</Text>
      </View>
      <Text className="text-2xl font-bold text-text-primary mb-1">Welcome to HarvestLink</Text>
      <Text className="text-text-secondary mb-6">
        Tell us who you are to get started connecting harvests with buyers.
      </Text>

      {options.map((opt) => {
        const Icon = opt.icon;
        const selected = role === opt.key;
        return (
          <Pressable
            key={opt.key}
            onPress={() => setRole(opt.key)}
            className={`flex-row items-center border rounded-card p-4 mb-3 ${
              selected ? "border-primary bg-primary-light" : "border-border"
            }`}
          >
            <Icon size={20} color="#1A1A1A" />
            <View className="ml-3">
              <Text className="font-semibold text-text-primary">{opt.title}</Text>
              <Text className="text-xs text-text-secondary">{opt.subtitle}</Text>
            </View>
          </Pressable>
        );
      })}

      <View className="mt-4">
        <Button
          label="Continue"
          disabled={!role}
          onPress={() => navigation.navigate(role === "farmer" ? "FarmerSignUp" : "BuyerSignUp")}
        />
      </View>

      <Pressable onPress={() => navigation.navigate("Login")} className="items-center mt-4">
        <Text className="text-primary font-medium">Already have an account? Log in</Text>
      </Pressable>
    </View>
  );
}
