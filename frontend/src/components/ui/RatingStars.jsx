import { View, Pressable } from "react-native";
import { Text } from "./AppText.jsx";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";

export function RatingStars({
  rating = 0,
  value,
  onChange,
  interactive = false,
  size = 16,
  reviewCount,
  showValue = false,
  emptyLabel = "No reviews yet",
}) {
  const displayRating = interactive ? value : rating;

  if (!interactive && (displayRating == null || reviewCount === 0)) {
    return (
      <Text
        className="text-[12.5px] text-ink-faint italic"
        style={{ fontSize: size * 0.78 }}
      >
        {emptyLabel}
      </Text>
    );
  }

  return (
    <View className="flex-row items-center">
      <View className="flex-row" style={{ gap: interactive ? size * 0.28 : 2 }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = displayRating >= star;
          const half = !filled && displayRating >= star - 0.5;
          const iconName = interactive
            ? filled
              ? "star"
              : "star-outline"
            : filled
              ? "star"
              : half
                ? "star-half"
                : "star-outline";

          const StarGlyph = (
            <Ionicons
              name={iconName}
              size={size}
              color={filled || half ? colors.warning : colors.lineStrong}
            />
          );

          if (!interactive) {
            return <View key={star}>{StarGlyph}</View>;
          }

          return (
            <Pressable
              key={star}
              onPress={() => onChange?.(star)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`Rate ${star} star${star === 1 ? "" : "s"}`}
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.88 : 1 }],
              })}
            >
              {StarGlyph}
            </Pressable>
          );
        })}
      </View>

      {showValue && displayRating != null ? (
        <Text
          className="font-bold text-ink ml-1.5"
          style={{ fontSize: size * 0.82 }}
        >
          {displayRating.toFixed(1)}
        </Text>
      ) : null}

      {reviewCount != null && reviewCount > 0 ? (
        <Text className="text-ink-muted ml-1" style={{ fontSize: size * 0.72 }}>
          ({reviewCount})
        </Text>
      ) : null}
    </View>
  );
}
