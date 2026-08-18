import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { USER_ROLES } from "../schemas/authSchemas.js";

const ROLE_OPTIONS = [
  {
    value: USER_ROLES.FARMER,
    label: "Farmer",
    description: "I grow and sell produce",
    icon: "sprout-outline",
  },
  {
    value: USER_ROLES.BUYER,
    label: "Buyer",
    description: "I want to buy produce",
    icon: "cart-outline",
  },
];

export function RoleSelector({ value, onChange, error }) {
  return (
    <View className="w-full">
      <Text className="text-sm font-semibold text-ink mb-2">I am a...</Text>
      <View className="flex-row gap-3" accessibilityRole="radiogroup">
        {ROLE_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              accessibilityRole="radio"
              accessibilityLabel={option.label}
              accessibilityState={{ selected: isSelected }}
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              className={`
                flex-1 rounded-2xl border px-4 py-4 min-h-[78px] shadow-sm
                ${isSelected ? "border-primary bg-primary" : "border-line bg-white"}
              `}
            >
              <View className="flex-row items-center justify-between mb-1">
                <View className="flex-row items-center flex-1 pr-1">
                  <MaterialCommunityIcons
                    name={option.icon}
                    size={16}
                    color={isSelected ? "#FFFFFF" : "#2F7A35"}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    className={`text-[16px] font-bold ${isSelected ? "text-white" : "text-ink"}`}
                  >
                    {option.label}
                  </Text>
                </View>
                <View
                  className={`h-4 w-4 rounded-full border items-center justify-center ${isSelected ? "border-white bg-white" : "border-line"}`}
                >
                  {isSelected ? (
                    <View className="h-2 w-2 rounded-full bg-primary" />
                  ) : null}
                </View>
              </View>
              <Text
                className={`text-[12px] ${isSelected ? "text-white/82" : "text-ink-muted"}`}
              >
                {option.description}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {error ? (
        <Text className="text-sm text-danger mt-1" accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
