import { View, Text, Pressable } from "react-native";

type Props = {
  Icon: any;
  title: string;
  description: string;
  step: number; // 0, 1, 2
  ctaLabel: string;
  onNext: () => void;
  onSkip?: () => void;
};

export function OnboardingSlide({ Icon, title, description, step, ctaLabel, onNext, onSkip }: Props) {
  return (
    <View className="flex-1 bg-white px-6 pt-14">
      {onSkip ? (
        <Pressable onPress={onSkip} className="self-end mb-6">
          <Text className="text-text-secondary">Skip</Text>
        </Pressable>
      ) : (
        <View className="h-8 mb-6" />
      )}

      <View className="items-center mt-10">
        <View className="w-24 h-24 bg-primary-light rounded-full items-center justify-center mb-8">
          <Icon size={36} color="#2F6B3C" />
        </View>
        <Text className="text-2xl font-bold text-text-primary text-center mb-3">{title}</Text>
        <Text className="text-text-secondary text-center px-4">{description}</Text>
      </View>

      <View className="flex-row justify-center mt-10 mb-auto">
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            className={`h-1.5 rounded-full mx-1 ${
              i === step ? "w-6 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </View>

      <View className="mb-10">
        <Pressable onPress={onNext} className="w-full rounded-input py-4 items-center bg-primary">
          <Text className="text-white font-semibold">{ctaLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}
