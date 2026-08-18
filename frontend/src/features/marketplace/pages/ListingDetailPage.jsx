import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { Alert } from "../../../lib/alert.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

import { Button } from "../../../components/ui/Button.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { SectionLabel } from "../../../components/ui/SectionHeader.jsx";
import { LoadingState, ErrorState } from "../../../components/ui/ScreenState.jsx";
import { useListing } from "../hooks/marketplaceHooks.js";
import { useCreateOrder } from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import {
  useExpressedInterestIds,
  useExpressInterest,
  useWithdrawInterest,
} from "../hooks/listingInterestHooks.js";
import {
  useSavedListingIds,
  useSaveListing,
  useUnsaveListing,
} from "../hooks/savedListingHooks.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";

const SCREEN_WIDTH = Dimensions.get("window").width;

const STATUS_STYLES = {
  ACTIVE: { bg: "bg-success-muted", text: "text-success", label: "Available" },
  SOLD: { bg: "bg-info-muted", text: "text-info", label: "Sold Out" },
  REMOVED: { bg: "bg-line", text: "text-ink-muted", label: "Unavailable" },
};

function formatUnit(unit) {
  if (!unit) return "";
  return unit.charAt(0) + unit.slice(1).toLowerCase();
}

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function FloatingIconButton({
  icon,
  iconSet: IconSet = Feather,
  color,
  onPress,
  accessibilityLabel,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.95 : 1 }],
        ...shadows.md,
      })}
      className="w-10 h-10 rounded-xl bg-white items-center justify-center"
    >
      <IconSet name={icon} size={18} color={color ?? colors.ink} />
    </Pressable>
  );
}

function ImageCarousel({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScrollEnd(event) {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  }

  if (images.length === 0) {
    return (
      <View className="w-full h-[300px] bg-primary-muted items-center justify-center">
        <View className="w-16 h-16 rounded-full bg-white/80 items-center justify-center">
          <Feather name="image" size={26} color={colors.inkFaint} />
        </View>
      </View>
    );
  }

  return (
    <View className="w-full h-[300px] bg-primary-muted">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {images.map((uri, index) => (
          <Image
            key={`${uri}-${index}`}
            source={{ uri }}
            style={{ width: SCREEN_WIDTH, height: 300 }}
            resizeMode="cover"
            accessibilityLabel={`${title} photo ${index + 1} of ${images.length}`}
          />
        ))}
      </ScrollView>

      {images.length > 1 ? (
        <>
          <View
            className="absolute bottom-4 right-4 rounded-full px-3 py-1.5"
            style={{ backgroundColor: colors.overlay }}
          >
            <Text className="text-white text-[11px] font-bold">
              {activeIndex + 1} / {images.length}
            </Text>
          </View>
          <View className="absolute bottom-[18px] left-0 right-0 flex-row justify-center gap-1.5">
            {images.map((_, index) => (
              <View
                key={index}
                className={`h-1.5 rounded-full ${
                  index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}

function QuantityStepper({ value, onChange, max }) {
  return (
    <View className="flex-row items-center justify-between bg-cream rounded-xl2 px-2 py-2 border border-line/50">
      <Pressable
        onPress={() => onChange(Math.max(1, value - 1))}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        disabled={value <= 1}
        style={({ pressed }) => ({
          opacity: value <= 1 ? 0.4 : pressed ? 0.8 : 1,
          ...shadows.sm,
        })}
        className="w-11 h-11 rounded-xl bg-white items-center justify-center border border-line/60"
      >
        <Feather
          name="minus"
          size={16}
          color={value <= 1 ? colors.inkFaint : colors.ink}
        />
      </Pressable>
      <Text className="text-[18px] font-extrabold text-ink tracking-[-0.3px]">
        {value}
      </Text>
      <Pressable
        onPress={() => onChange(Math.min(max, value + 1))}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        disabled={value >= max}
        style={({ pressed }) => ({
          opacity: value >= max ? 0.4 : pressed ? 0.8 : 1,
          ...shadows.sm,
        })}
        className="w-11 h-11 rounded-xl bg-white items-center justify-center border border-line/60"
      >
        <Feather
          name="plus"
          size={16}
          color={value >= max ? colors.inkFaint : colors.ink}
        />
      </Pressable>
    </View>
  );
}

export function ListingDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { listingId } = route.params;
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const listing = useListing(listingId);
  const createOrder = useCreateOrder();
  const expressedInterestIds = useExpressedInterestIds();
  const expressInterest = useExpressInterest();
  const withdrawInterest = useWithdrawInterest();
  const savedListingIds = useSavedListingIds();
  const saveListing = useSaveListing();
  const unsaveListing = useUnsaveListing();

  const [requestedQuantity, setRequestedQuantity] = useState(1);

  const floatingHeader = (topInset) => (
    <View
      className="absolute left-5 right-5 flex-row justify-between z-10"
      style={{ top: topInset + 10 }}
    >
      <FloatingIconButton
        icon="arrow-left"
        accessibilityLabel="Go back"
        onPress={() => navigation.goBack()}
      />
      <View />
    </View>
  );

  if (listing.isLoading) {
    return (
      <View className="flex-1 bg-surface">
        {floatingHeader(insets.top)}
        <LoadingState label="Loading listing…" />
      </View>
    );
  }

  if (listing.isError) {
    return (
      <View className="flex-1 bg-surface">
        {floatingHeader(insets.top)}
        <ErrorState
          title="Couldn't load listing"
          message={getErrorMessage(listing.error)}
          onRetry={() => listing.refetch()}
        />
      </View>
    );
  }

  const data = listing.data;

  if (!data) {
    return (
      <View className="flex-1 bg-surface">
        {floatingHeader(insets.top)}
        <ErrorState
          icon="file-minus"
          title="Listing unavailable"
          message="This listing may have been removed or sold."
        />
      </View>
    );
  }

  const statusStyle = STATUS_STYLES[data.status] ?? STATUS_STYLES.ACTIVE;
  const images = data.images ?? [];
  const isOwnListing = user?.id === data.farmerId;
  const isInterested = expressedInterestIds.data?.has(data.id) ?? false;
  const isSaved = savedListingIds.data?.has(data.id) ?? false;
  const canOrder = data.status === "ACTIVE" && !isOwnListing;

  function handleToggleInterest() {
    const mutation = isInterested ? withdrawInterest : expressInterest;
    mutation.mutate(data.id, {
      onError: (err) => {
        Alert.alert("Couldn't update interest", getErrorMessage(err));
      },
    });
  }

  function handleToggleSave() {
    const mutation = isSaved ? unsaveListing : saveListing;
    mutation.mutate(data.id, {
      onError: (err) => {
        Alert.alert("Couldn't update saved listings", getErrorMessage(err));
      },
    });
  }

  async function handleRequestMatch() {
    try {
      const order = await createOrder.mutateAsync({
        listingId: data.id,
        quantity: requestedQuantity,
      });
      navigation.navigate("OrderDetail", { orderId: order.id });
    } catch (err) {
      Alert.alert("Couldn't place order", getErrorMessage(err));
    }
  }

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        contentContainerStyle={{ paddingBottom: canOrder ? 120 : 24 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageCarousel images={images} title={data.title} />

        <View className="px-5 pt-5 -mt-5">
          <Card className="p-5">
            <View className="flex-row justify-between items-start gap-3">
              <Text className="text-[22px] font-extrabold text-ink flex-1 tracking-[-0.3px]">
                {data.title}
              </Text>
              <View className={`rounded-full px-3 py-1.5 ${statusStyle.bg}`}>
                <Text className={`text-[11px] font-bold ${statusStyle.text}`}>
                  {statusStyle.label}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mt-2.5">
              <Feather name="map-pin" size={13} color={colors.inkFaint} />
              <Text className="text-[13px] text-ink-muted ml-1.5">
                {data.location}
              </Text>
            </View>

            {data.farmer ? (
              <View className="flex-row items-center mt-4 pt-4 border-t border-line/60">
                <Avatar
                  uri={data.farmer.avatarUrl}
                  name={data.farmer.name}
                  size="sm"
                  className="mr-3"
                />
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-[14px] font-bold text-ink mr-1">
                      {data.farmer.name}
                    </Text>
                    {data.farmer.isVerified ? (
                      <Feather
                        name="check-circle"
                        size={13}
                        color={colors.primary}
                      />
                    ) : null}
                  </View>
                  <Text className="text-[12px] text-ink-muted mt-0.5">
                    Farmer
                  </Text>
                </View>
              </View>
            ) : null}
          </Card>
        </View>

        <View className="px-5 mt-4">
          <Card className="p-5">
            <View className="flex-row justify-between items-baseline">
              <View>
                <Text className="text-[26px] font-extrabold text-primary tracking-[-0.4px]">
                  GHS {data.pricePerUnit}
                </Text>
                <Text className="text-[12px] text-ink-muted mt-0.5">
                  per {formatUnit(data.quantityUnit)}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-[15px] font-bold text-ink">
                  {data.quantity} {formatUnit(data.quantityUnit)}
                </Text>
                <Text className="text-[10px] text-ink-faint uppercase tracking-wide font-semibold mt-0.5">
                  available
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {data.description ? (
          <View className="px-5 mt-5">
            <SectionLabel>Description</SectionLabel>
            <Card className="p-4">
              <Text className="text-[14px] text-ink-secondary leading-[22px]">
                {data.description}
              </Text>
            </Card>
          </View>
        ) : null}

        <View className="px-5 mt-5">
          <SectionLabel>Details</SectionLabel>
          <Card padded={false}>
            {data.harvestDate ? (
              <View className="flex-row justify-between items-center py-3.5 px-4 border-b border-line/60">
                <Text className="text-[13px] text-ink-muted">Harvest date</Text>
                <Text className="text-[13px] font-semibold text-ink">
                  {formatDate(data.harvestDate)}
                </Text>
              </View>
            ) : null}
            <View className="flex-row justify-between items-center py-3.5 px-4">
              <Text className="text-[13px] text-ink-muted">Listed on</Text>
              <Text className="text-[13px] font-semibold text-ink">
                {formatDate(data.createdAt)}
              </Text>
            </View>
          </Card>
        </View>

        {canOrder ? (
          <View className="px-5 mt-5">
            <SectionLabel>Quantity</SectionLabel>
            <QuantityStepper
              value={requestedQuantity}
              onChange={setRequestedQuantity}
              max={Math.max(1, Math.floor(Number(data.quantity)))}
            />
          </View>
        ) : null}
      </ScrollView>

      <View
        className="absolute left-5 right-5 flex-row justify-between z-10"
        style={{ top: insets.top + 10 }}
      >
        <FloatingIconButton
          icon="arrow-left"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
        />
        {isOwnListing ? (
          <View />
        ) : (
          <Pressable
            onPress={handleToggleSave}
            accessibilityRole="button"
            accessibilityLabel={isSaved ? "Remove from saved" : "Save listing"}
            hitSlop={8}
            style={({ pressed }) => ({
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
              ...shadows.md,
            })}
            className="w-10 h-10 rounded-xl bg-white items-center justify-center"
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={18}
              color={isSaved ? colors.danger : colors.inkFaint}
            />
          </Pressable>
        )}
      </View>

      {canOrder ? (
        <View
          className="absolute bottom-0 left-0 right-0 px-5 pt-3 bg-white border-t border-line/60"
          style={{
            paddingBottom: insets.bottom + 12,
            ...shadows.md,
          }}
        >
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button
                label={isInterested ? "Interested ✓" : "Express interest"}
                onPress={handleToggleInterest}
                variant={isInterested ? "primary" : "secondary"}
                size="md"
                isLoading={
                  expressInterest.isPending || withdrawInterest.isPending
                }
              />
            </View>
            <View className="flex-1">
              <Button
                label="Request match"
                onPress={handleRequestMatch}
                variant="primary"
                size="md"
                isLoading={createOrder.isPending}
              />
            </View>
          </View>
        </View>
      ) : isOwnListing ? (
        <View
          className="absolute bottom-0 left-0 right-0 px-5 pt-3 bg-white border-t border-line/60"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          <Text className="text-[13px] text-ink-muted text-center">
            This is your own listing.
          </Text>
        </View>
      ) : null}
    </View>
  );
}
