import { memo } from "react";
import { View, Pressable } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { Feather, Ionicons } from "@expo/vector-icons";
import { PriceText } from "../../../components/ui/PriceText.jsx";
import { RemoteImage } from "../../../components/ui/RemoteImage.jsx";
import { TrustBadge } from "../../../components/ui/TrustBadge.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { formatUnit, harvestLabel } from "../lib/listingFormat.js";

function SaveButton({ saved, onPress, title }) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePress() {
    if (!reduceMotion && !saved) {
      scale.value = withSequence(
        withSpring(1.3, { damping: 6 }),
        withSpring(1),
      );
    }
    onPress();
  }

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={
        saved ? `Remove ${title} from saved` : `Save ${title}`
      }
      accessibilityState={{ selected: saved }}
      style={shadows.sm}
      className="w-9 h-9 rounded-full bg-white/95 items-center justify-center"
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={saved ? "heart" : "heart-outline"}
          size={19}
          color={saved ? colors.danger : colors.inkSecondary}
        />
      </Animated.View>
    </Pressable>
  );
}

export const ProduceCard = memo(function ProduceCard({
  listing,
  isSaved = false,
  onPress,
  onToggleSave,
  width,
  badge,
}) {
  const unavailable = listing.status !== "ACTIVE";
  const freshness = unavailable ? null : harvestLabel(listing.harvestDate);
  const unit = formatUnit(listing.quantityUnit).toLowerCase();
  const farmer = listing.farmer;
  const rating = farmer?.rating;

  const a11yLabel = [
    listing.title,
    `${listing.pricePerUnit} cedis per ${unit}`,
    farmer?.name && `sold by ${farmer.name}`,
    farmer?.isVerified && "verified farmer",
    listing.location,
    unavailable && (listing.status === "SOLD" ? "sold out" : "unavailable"),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={width ? { width } : { flex: 1 }}>
      <Pressable
        onPress={() => onPress(listing)}
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
          ...shadows.card,
        })}
        className="bg-white rounded-2xl border border-line/60 overflow-hidden"
      >
        <View style={{ aspectRatio: 1.15 }} className="bg-primary-light">
          <RemoteImage
            uri={listing.images?.[0]}
            className="w-full h-full"
            iconSize={22}
          />
          {unavailable ? (
            <View className="absolute inset-0 bg-white/60 items-center justify-center">
              <View className="rounded-full bg-ink px-3 py-1">
                <Text className="text-white text-[11px] font-bold">
                  {listing.status === "SOLD" ? "Sold out" : "Unavailable"}
                </Text>
              </View>
            </View>
          ) : null}
          {badge ? (
            <View className="absolute top-2 left-2 rounded-full bg-ink/80 px-2.5 py-1">
              <Text className="text-white text-[11px] font-bold">{badge}</Text>
            </View>
          ) : null}
          {farmer?.isVerified && !unavailable ? (
            <View className="absolute bottom-2 left-2">
              <TrustBadge type="verifiedFarmer" size="sm" label="Verified" />
            </View>
          ) : null}
        </View>

        <View className="px-3 pt-2.5 pb-3">
          <Text className="text-[14px] font-bold text-ink" numberOfLines={1}>
            {listing.title}
          </Text>
          <PriceText
            amount={listing.pricePerUnit}
            size="sm"
            suffix={`/ ${unit}`}
            className="mt-1"
          />
          {freshness ? (
            <View className="flex-row items-center mt-1.5">
              <Feather name="sunrise" size={11} color={colors.primary} />
              <Text
                className="text-[11.5px] font-semibold text-primary-dark ml-1"
                numberOfLines={1}
              >
                {freshness}
              </Text>
            </View>
          ) : null}
          <View className="flex-row items-center mt-1.5">
            <Feather name="map-pin" size={11} color={colors.inkMuted} />
            <Text
              className="text-[11.5px] text-ink-muted ml-1 flex-1"
              numberOfLines={1}
            >
              {listing.location}
            </Text>
          </View>
          {farmer ? (
            <View className="flex-row items-center mt-1">
              <Text
                className="text-[11.5px] font-medium text-ink-secondary flex-1"
                numberOfLines={1}
              >
                {farmer.name}
              </Text>
              {rating != null ? (
                <View className="flex-row items-center ml-2">
                  <Ionicons name="star" size={11} color={colors.warning} />
                  <Text className="text-[11.5px] font-semibold text-ink-secondary ml-0.5">
                    {Number(rating).toFixed(1)}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </Pressable>

      {/* Sibling, not child, so screen readers can reach it separately */}
      {onToggleSave ? (
        <View className="absolute top-2 right-2">
          <SaveButton
            saved={isSaved}
            title={listing.title}
            onPress={() => onToggleSave(listing)}
          />
        </View>
      ) : null}
    </View>
  );
});
