import { View, Text, Image, Pressable } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { PriceText } from "../../../components/ui/PriceText.jsx";

const STATUS_STYLES = {
  ACTIVE: { bg: "bg-success", text: "text-white", label: "Fresh" },
  SOLD: { bg: "bg-info", text: "text-white", label: "Sold Out" },
  REMOVED: { bg: "bg-ink-faint", text: "text-white", label: "Unavailable" },
};

function formatUnit(unit) {
  if (!unit) return "";
  return unit.charAt(0) + unit.slice(1).toLowerCase();
}

function FarmerRow({ farmer, compact = false }) {
  if (!farmer) return null;

  return (
    <View className={`flex-row items-center ${compact ? "mt-1" : "mt-2"}`}>
      {farmer.avatarUrl ? (
        <Image
          source={{ uri: farmer.avatarUrl }}
          className={`rounded-full mr-1.5 bg-line ${compact ? "w-4 h-4" : "w-5 h-5"}`}
        />
      ) : (
        <View
          className={`rounded-full mr-1.5 bg-primary-muted items-center justify-center ${compact ? "w-4 h-4" : "w-5 h-5"}`}
        >
          <Feather name="user" size={compact ? 8 : 10} color={colors.primary} />
        </View>
      )}
      <Text
        className={`font-medium text-ink-muted flex-1 ${compact ? "text-[10px]" : "text-[12px]"}`}
        numberOfLines={1}
      >
        {farmer.name}
      </Text>
      {farmer.isVerified ? (
        <Feather name="check-circle" size={compact ? 10 : 12} color={colors.primary} />
      ) : null}
      {!compact && farmer.rating != null ? (
        <View className="flex-row items-center ml-auto">
          <Feather name="star" size={11} color={colors.accent} />
          <Text className="text-[11px] font-semibold text-ink-muted ml-0.5">
            {farmer.rating.toFixed(1)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function CompactCard({
  listing,
  onPress,
  onToggleSave,
  isSaved,
  statusStyle,
  imageUri,
  isDraft,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${listing.title}, ${listing.pricePerUnit} cedis per ${formatUnit(listing.quantityUnit)}`}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
        ...shadows.sm,
      })}
      className="flex-1 bg-white rounded-xl border border-line/50 overflow-hidden mb-3"
    >
      <View className="h-[108px] bg-primary-muted relative">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Feather name="image" size={20} color={colors.inkFaint} />
          </View>
        )}
        <View className="absolute top-2 left-2">
          <View className={`rounded-full px-1.5 py-0.5 ${statusStyle.bg}`}>
            <Text
              className={`text-[8px] font-bold uppercase ${statusStyle.text}`}
            >
              {statusStyle.label}
            </Text>
          </View>
        </View>
        {onToggleSave ? (
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleSave(listing);
            }}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={isSaved ? "Remove from saved" : "Save listing"}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 items-center justify-center"
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={14}
              color={isSaved ? colors.danger : colors.inkFaint}
            />
          </Pressable>
        ) : null}
      </View>

      <View className="px-2.5 pt-2 pb-2.5">
        <Text
          className="text-[13px] font-extrabold text-ink tracking-[-0.2px]"
          numberOfLines={1}
        >
          {listing.title}
        </Text>
        <PriceText
          amount={listing.pricePerUnit}
          size="sm"
          suffix={`/ ${formatUnit(listing.quantityUnit)}`}
          className="mt-0.5"
        />
        <View className="flex-row items-center mt-1">
          <Feather name="map-pin" size={10} color={colors.inkFaint} />
          <Text className="text-[10px] text-ink-muted ml-0.5 flex-1" numberOfLines={1}>
            {listing.location}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function HorizontalCard({
  listing,
  onPress,
  statusStyle,
  imageUri,
  isDraft,
  onToggleSave,
  isSaved,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${listing.title}, ${listing.pricePerUnit} cedis per ${formatUnit(listing.quantityUnit)}`}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.985 : 1 }],
        ...shadows.card,
      })}
      className="bg-white rounded-xl2 mb-3 border border-line/50 overflow-hidden flex-row"
    >
      <View className="w-[100px] h-[100px] bg-primary-muted relative">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <Feather name="image" size={20} color={colors.inkFaint} />
          </View>
        )}
        {isDraft ? (
          <View className="absolute bottom-1 left-1 rounded-full bg-accent px-1.5 py-0.5">
            <Text className="text-[8px] font-bold text-white">Draft</Text>
          </View>
        ) : null}
      </View>

      <View className="flex-1 px-3 py-2.5 justify-center">
        <View className="flex-row items-center justify-between">
          <Text
            className="text-[15px] font-extrabold text-ink flex-1 mr-2"
            numberOfLines={1}
          >
            {listing.title}
          </Text>
          <View className={`rounded-full px-2 py-0.5 ${statusStyle.bg}`}>
            <Text className={`text-[9px] font-bold ${statusStyle.text}`}>
              {statusStyle.label}
            </Text>
          </View>
        </View>
        <FarmerRow farmer={listing.farmer} compact />
        <View className="flex-row items-center justify-between mt-1.5">
          <PriceText
            amount={listing.pricePerUnit}
            size="sm"
            suffix={`/ ${formatUnit(listing.quantityUnit)}`}
          />
          {onToggleSave ? (
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                onToggleSave(listing);
              }}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={isSaved ? "Remove from saved" : "Save listing"}
            >
              <Ionicons
                name={isSaved ? "heart" : "heart-outline"}
                size={18}
                color={isSaved ? colors.danger : colors.inkFaint}
              />
            </Pressable>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export function ListingCard({
  listing,
  onPress,
  onExpressInterest,
  onRequestMatch,
  isInterested = false,
  interestCount,
  onViewInterest,
  isSaved = false,
  onToggleSave,
  variant = "default",
}) {
  const statusStyle = STATUS_STYLES[listing.status] ?? STATUS_STYLES.ACTIVE;
  const imageUri = listing.images?.[0];
  const showActions = Boolean(onExpressInterest || onRequestMatch);
  const isDraft = listing.syncStatus === "pending";

  if (variant === "compact") {
    return (
      <CompactCard
        listing={listing}
        onPress={onPress}
        onToggleSave={onToggleSave}
        isSaved={isSaved}
        statusStyle={statusStyle}
        imageUri={imageUri}
        isDraft={isDraft}
      />
    );
  }

  if (variant === "horizontal") {
    return (
      <HorizontalCard
        listing={listing}
        onPress={onPress}
        statusStyle={statusStyle}
        imageUri={imageUri}
        isDraft={isDraft}
        onToggleSave={onToggleSave}
        isSaved={isSaved}
      />
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${listing.title}, ${listing.pricePerUnit} cedis per ${formatUnit(listing.quantityUnit)}`}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.985 : 1 }],
        ...shadows.card,
      })}
      className="bg-white rounded-xl2 mb-4 border border-line/50 overflow-hidden"
    >
      <View className="h-[160px] bg-primary-muted relative">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center">
            <View className="w-14 h-14 rounded-full bg-white/80 items-center justify-center">
              <Feather name="image" size={22} color={colors.inkFaint} />
            </View>
          </View>
        )}

        <View className="absolute inset-x-0 top-0 h-16 bg-black/10" />

        <View className="absolute top-3 left-3 flex-row gap-2">
          <View className={`rounded-full px-2.5 py-1 ${statusStyle.bg}`}>
            <Text
              className={`text-[10px] font-bold uppercase tracking-wide ${statusStyle.text}`}
            >
              {statusStyle.label}
            </Text>
          </View>
          {isDraft ? (
            <View className="flex-row items-center rounded-full bg-accent px-2.5 py-1">
              <View className="w-1.5 h-1.5 rounded-full bg-white mr-1.5" />
              <Text className="text-[10px] font-bold text-white">Draft</Text>
            </View>
          ) : null}
        </View>

        {onToggleSave ? (
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleSave(listing);
            }}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={isSaved ? "Remove from saved" : "Save listing"}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, ...shadows.sm })}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white items-center justify-center"
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={17}
              color={isSaved ? colors.danger : colors.inkFaint}
            />
          </Pressable>
        ) : null}
      </View>

      <View className="px-4 pt-4 pb-4">
        <Text
          className="text-[16px] font-extrabold text-ink tracking-[-0.2px]"
          numberOfLines={1}
        >
          {listing.title}
        </Text>

        <FarmerRow farmer={listing.farmer} />

        <View className="flex-row items-center mt-2">
          <Feather name="map-pin" size={12} color={colors.inkFaint} />
          <Text
            className="text-[12px] text-ink-muted ml-1 flex-1"
            numberOfLines={1}
          >
            {listing.location}
            {listing.distanceKm != null ? ` · ${listing.distanceKm} km` : ""}
          </Text>
        </View>

        <View className="flex-row justify-between items-end mt-3.5 pt-3.5 border-t border-line/60">
          <View>
            <PriceText amount={listing.pricePerUnit} size="md" />
            <Text className="text-[11px] text-ink-muted -mt-0.5">
              per {formatUnit(listing.quantityUnit)}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-[13px] font-bold text-ink">
              {listing.quantity} {formatUnit(listing.quantityUnit)}
            </Text>
            <Text className="text-[10px] text-ink-faint uppercase tracking-wide">
              available
            </Text>
          </View>
        </View>

        {interestCount !== undefined ? (
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onViewInterest?.(listing);
            }}
            accessibilityRole="button"
            accessibilityLabel={`${interestCount} buyers interested`}
            className="flex-row items-center mt-3 pt-3 border-t border-line/60"
          >
            <View className="w-7 h-7 rounded-lg bg-primary-muted items-center justify-center mr-2">
              <Feather name="users" size={13} color={colors.primary} />
            </View>
            <Text className="text-[13px] font-semibold text-primary flex-1">
              {interestCount} buyer{interestCount === 1 ? "" : "s"} interested
            </Text>
            <Feather name="chevron-right" size={16} color={colors.primary} />
          </Pressable>
        ) : null}

        {showActions ? (
          <View
            className={`flex-row gap-2.5 mt-3 pt-3 ${
              interestCount === undefined ? "border-t border-line/60" : ""
            }`}
          >
            {onExpressInterest ? (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation?.();
                  onExpressInterest(listing);
                }}
                accessibilityRole="button"
                accessibilityLabel={
                  isInterested ? "Withdraw interest" : "Express interest"
                }
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                className={`flex-1 rounded-xl py-3 items-center justify-center border min-h-[44px] ${
                  isInterested
                    ? "bg-primary-muted border-primary/30"
                    : "bg-white border-line"
                }`}
              >
                <Text
                  className={`text-[13px] font-bold ${isInterested ? "text-primary" : "text-ink-secondary"}`}
                  numberOfLines={1}
                >
                  {isInterested ? "Interested ✓" : "Express interest"}
                </Text>
              </Pressable>
            ) : null}

            {onRequestMatch ? (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation?.();
                  onRequestMatch(listing);
                }}
                disabled={listing.status !== "ACTIVE"}
                accessibilityRole="button"
                accessibilityLabel="Request match"
                style={({ pressed }) => ({
                  opacity: listing.status !== "ACTIVE" ? 0.4 : pressed ? 0.85 : 1,
                  ...shadows.sm,
                })}
                className="flex-1 rounded-xl py-3 items-center justify-center bg-primary min-h-[44px]"
              >
                <Text
                  className="text-[13px] font-bold text-white"
                  numberOfLines={1}
                >
                  Request match
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
