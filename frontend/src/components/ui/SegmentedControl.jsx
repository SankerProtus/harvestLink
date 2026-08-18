import { View, Text, Pressable } from "react-native";
import { shadows } from "../../theme/shadows.js";

export function SegmentedControl({ options, value, onChange }) {
  return (
    <View
      className="flex-row bg-white rounded-xl2 p-1 border border-line/60"
      style={shadows.sm}
    >
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={option.label}
            style={({ pressed }) => ({
              opacity: pressed && !isActive ? 0.7 : 1,
            })}
            className={`flex-1 items-center justify-center py-2.5 rounded-xl ${
              isActive ? "bg-primary" : ""
            }`}
          >
            <Text
              className={`text-[13px] font-semibold ${
                isActive ? "text-white" : "text-ink-muted"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
