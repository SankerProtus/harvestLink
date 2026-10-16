import { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

import { Alert } from "../../../lib/alert.js";
import { Button } from "../../../components/ui/Button.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { RemoteImage } from "../../../components/ui/RemoteImage.jsx";
import { RatingStars } from "../../../components/ui/RatingStars.jsx";
import { ReviewCard } from "../../../components/ui/ReviewCard.jsx";
import { PriceText } from "../../../components/ui/PriceText.jsx";
import { Skeleton } from "../../../components/ui/Skeleton.jsx";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { useListing } from "../hooks/marketplaceHooks.js";
import { useListingReviews } from "../../deliveryTracking/hooks/reviewHooks.js";
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
import { TONE_COLORS } from "../../deliveryTracking/lib/orderStatus.js";
import { formatDate, formatUnit, harvestLabel } from "../lib/listingFormat.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { formatCurrency } from "../../../lib/currency.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import { FONT_FAMILY } from "../../../theme/fonts.js";

const STATUS_CHIPS = {
  ACTIVE: { label: "Available", tone: "success" },
  SOLD: { label: "Sold out", tone: "info" },
  REMOVED: { label: "Unavailable", tone: "neutral" },
};

function Chip({ label, tone, icon }) {
  const t = TONE_COLORS[tone] ?? TONE_COLORS.neutral;
  return (
    <View
      className="flex-row items-center rounded-full px-2.5 py-1 mr-2"
      style={{ backgroundColor: t.bg }}
    >
      {icon ? (
        <Feather
          name={icon}
          size={12}
          color={t.fg}
          style={{ marginRight: 4 }}
        />
      ) : null}
      <Text className="text-[12px] font-bold" style={{ color: t.fg }}>
        {label}
      </Text>
    </View>
  );
}

function SectionTitle({ children, action, onAction, actionLabel }) {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text
        accessibilityRole="header"
        className="text-[17px] font-extrabold text-ink tracking-[-0.2px]"
      >
        {children}
      </Text>
      {action ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel ?? action}
          hitSlop={8}
          className="min-h-[44px] justify-center"
        >
          <Text className="text-[13px] font-bold text-primary">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function RoundButton({ onPress, label, children }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.95 : 1 }],
        ...shadows.md,
      })}
      className="w-11 h-11 rounded-full bg-white items-center justify-center"
    >
      {children}
    </Pressable>
  );
}

function HeartButton({ saved, onPress }) {
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
    <RoundButton
      onPress={handlePress}
      label={saved ? "Remove from saved" : "Save listing"}
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={saved ? "heart" : "heart-outline"}
          size={21}
          color={saved ? colors.danger : colors.inkSecondary}
        />
      </Animated.View>
    </RoundButton>
  );
}

function Gallery({ images, title, width, height }) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  function handleScrollEnd(event) {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  }

  if (images.length === 0) {
    return (
      <View
        style={{ width, height }}
        className="bg-primary-light items-center justify-center"
      >
        <View className="w-16 h-16 rounded-full bg-white/80 items-center justify-center">
          <Feather name="image" size={26} color={colors.inkMuted} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ width, height }} className="bg-primary-light">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {images.map((uri, i) => (
          <Pressable
            key={`${uri}-${i}`}
            onPress={() => setViewerOpen(true)}
            accessibilityRole="imagebutton"
            accessibilityLabel={`${title} photo ${i + 1} of ${images.length}. Double tap to view full screen.`}
          >
            <RemoteImage
              uri={uri}
              style={{ width, height }}
              iconWrapperStyle={{ width, height }}
              iconSize={26}
            />
          </Pressable>
        ))}
      </ScrollView>

      {images.length > 1 ? (
        <View
          pointerEvents="none"
          accessible
          accessibilityLabel={`Photo ${index + 1} of ${images.length}`}
          className="absolute left-0 right-0 flex-row justify-center"
          style={{ bottom: 38, gap: 6 }}
        >
          {images.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  i === index ? colors.white : "rgba(255,255,255,0.55)",
              }}
            />
          ))}
        </View>
      ) : null}

      {viewerOpen ? (
        <Modal
          visible
          transparent
          statusBarTranslucent
          animationType="fade"
          onRequestClose={() => setViewerOpen(false)}
        >
          <View style={{ flex: 1, backgroundColor: "#000000" }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentOffset={{ x: index * width, y: 0 }}
              onMomentumScrollEnd={handleScrollEnd}
            >
              {images.map((uri, i) => (
                <View
                  key={`viewer-${uri}-${i}`}
                  style={{ width, height: "100%", justifyContent: "center" }}
                >
                  <RemoteImage
                    uri={uri}
                    style={{ width, height: "100%" }}
                    resizeMode="contain"
                    iconWrapperStyle={{ width, height: "100%" }}
                    iconSize={32}
                    accessibilityLabel={`${title} photo ${i + 1} of ${images.length}, full screen`}
                  />
                </View>
              ))}
            </ScrollView>

            <Pressable
              onPress={() => setViewerOpen(false)}
              accessibilityRole="button"
              accessibilityLabel="Close full screen photo viewer"
              hitSlop={10}
              className="absolute left-4 w-11 h-11 rounded-full items-center justify-center"
              style={{
                top: insets.top + 8,
                backgroundColor: "rgba(255,255,255,0.18)",
              }}
            >
              <Feather name="x" size={22} color="#FFFFFF" />
            </Pressable>
            <View
              className="absolute right-4 rounded-full px-3 py-1.5"
              style={{ top: insets.top + 16, backgroundColor: colors.overlay }}
            >
              <Text className="text-white text-[12px] font-bold">
                {index + 1} / {images.length}
              </Text>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

function Fact({ label, value, isLast }) {
  return (
    <View
      accessible
      accessibilityLabel={`${label}: ${value}`}
      className={`flex-1 px-2 py-3.5 items-center ${isLast ? "" : "border-r border-line/60"}`}
    >
      <Text className="text-[12px] font-medium text-ink-muted">{label}</Text>
      <Text
        className="text-[14.5px] font-extrabold text-ink mt-0.5"
        numberOfLines={1}
        style={TABULAR_NUMS}
      >
        {value}
      </Text>
    </View>
  );
}

function Description({ text }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 180;
  return (
    <View className="mt-7">
      <SectionTitle>About this produce</SectionTitle>
      <Text
        numberOfLines={expanded || !isLong ? undefined : 4}
        className="text-[14.5px] leading-[23px] text-ink-secondary"
      >
        {text}
      </Text>
      {isLong ? (
        <Pressable
          onPress={() => setExpanded((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={expanded ? "Show less" : "Read more"}
          className="self-start min-h-[44px] justify-center"
        >
          <Text className="text-[13.5px] font-bold text-primary">
            {expanded ? "Show less" : "Read more"}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function StepButton({ icon, label, disabled, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => ({
        opacity: disabled ? 0.35 : pressed ? 0.7 : 1,
      })}
      className="w-11 h-11 rounded-full items-center justify-center"
    >
      <Feather name={icon} size={18} color={colors.ink} />
    </Pressable>
  );
}

function QuantityStepper({ value, onChange, max, unit }) {
  return (
    <View className="flex-row items-center rounded-full border border-line bg-white">
      <StepButton
        icon="minus"
        label="Decrease quantity"
        disabled={value <= 1}
        onPress={() => onChange(Math.max(1, value - 1))}
      />
      <View
        className="min-w-[52px] items-center"
        accessible
        accessibilityLabel={`${value} ${unit}`}
      >
        <Text
          className="text-[17px] font-extrabold text-ink"
          style={TABULAR_NUMS}
        >
          {value}
        </Text>
        <Text className="text-[10px] text-ink-muted -mt-0.5">{unit}</Text>
      </View>
      <StepButton
        icon="plus"
        label="Increase quantity"
        disabled={value >= max}
        onPress={() => onChange(Math.min(max, value + 1))}
      />
    </View>
  );
}

function DetailSkeleton({ width, heroHeight }) {
  return (
    <View accessibilityLabel="Loading listing">
      <Skeleton width={width} height={heroHeight} radius={0} />
      <View className="-mt-6 pt-6 px-5 bg-surface rounded-t-[28px]">
        <Skeleton width={110} height={24} radius={12} />
        <Skeleton width="75%" height={28} style={{ marginTop: 14 }} />
        <Skeleton width="45%" height={14} style={{ marginTop: 10 }} />
        <Skeleton width="40%" height={34} style={{ marginTop: 18 }} />
        <Skeleton height={76} radius={16} style={{ marginTop: 20 }} />
        <Skeleton height={64} radius={16} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

export function ListingDetailPage() {
  const navigation = useNavigation();
  const { listingId } = useRoute().params;
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const heroHeight = Math.round(Math.min(Math.max(width * 0.85, 280), 420));

  const listing = useListing(listingId);
  const listingReviews = useListingReviews(listingId, { page: 1, limit: 3 });
  const createOrder = useCreateOrder();
  const expressedInterestIds = useExpressedInterestIds();
  const expressInterest = useExpressInterest();
  const withdrawInterest = useWithdrawInterest();
  const savedListingIds = useSavedListingIds();
  const saveListing = useSaveListing();
  const unsaveListing = useUnsaveListing();

  const [requestedQuantity, setRequestedQuantity] = useState(1);

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const fadeStart = heroHeight - 150;
  const fadeEnd = heroHeight - 90;
  const barStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [fadeStart, fadeEnd],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const backButton = (
    <RoundButton onPress={() => navigation.goBack()} label="Go back">
      <Feather name="arrow-left" size={20} color={colors.ink} />
    </RoundButton>
  );
  const floatingBack = (
    <View className="absolute left-4 z-10" style={{ top: insets.top + 6 }}>
      {backButton}
    </View>
  );

  if (listing.isLoading) {
    return (
      <View className="flex-1 bg-surface">
        <ScrollView scrollEnabled={false}>
          <DetailSkeleton width={width} heroHeight={heroHeight} />
        </ScrollView>
        {floatingBack}
      </View>
    );
  }

  if (listing.isError) {
    return (
      <View className="flex-1 bg-surface">
        {floatingBack}
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
        {floatingBack}
        <ErrorState
          icon="file-minus"
          title="Listing unavailable"
          message="This listing may have been removed or sold."
        />
      </View>
    );
  }

  const status = STATUS_CHIPS[data.status] ?? STATUS_CHIPS.ACTIVE;
  const images = data.images ?? [];
  const isOwnListing = user?.id === data.farmerId;
  const isInterested = expressedInterestIds.data?.has(data.id) ?? false;
  const isSaved = savedListingIds.data?.has(data.id) ?? false;
  const canOrder = data.status === "ACTIVE" && !isOwnListing;
  const freshness =
    data.status === "ACTIVE" ? harvestLabel(data.harvestDate) : null;

  const unit = formatUnit(data.quantityUnit);
  const maxQty = Math.max(1, Math.floor(Number(data.quantity)));
  const qty = Math.min(requestedQuantity, maxQty);
  const total = Number(data.pricePerUnit) * qty;

  const facts = [
    { label: "Available", value: `${data.quantity} ${unit}` },
    data.harvestDate && {
      label: "Harvested",
      value: formatDate(data.harvestDate, true),
    },
    { label: "Listed", value: formatDate(data.createdAt, true) },
  ].filter(Boolean);

  const reviewTotal = listingReviews.data?.pagination?.total ?? 0;
  const reviewItems = listingReviews.data?.results ?? [];
  const openFarmer = () =>
    navigation.navigate("FarmerProfile", { farmerId: data.farmer?.id });

  function handleToggleInterest() {
    const mutation = isInterested ? withdrawInterest : expressInterest;
    mutation.mutate(data.id, {
      onError: (err) =>
        Alert.alert("Couldn't update interest", getErrorMessage(err)),
    });
  }

  function handleToggleSave() {
    const mutation = isSaved ? unsaveListing : saveListing;
    mutation.mutate(data.id, {
      onError: (err) =>
        Alert.alert("Couldn't update saved listings", getErrorMessage(err)),
    });
  }

  async function placeOrder() {
    try {
      const order = await createOrder.mutateAsync({
        listingId: data.id,
        quantity: qty,
      });
      navigation.navigate("OrderDetail", { orderId: order.id });
    } catch (err) {
      Alert.alert("Couldn't place order", getErrorMessage(err));
    }
  }

  function handleRequestOrder() {
    Alert.alert(
      "Request this order?",
      `${qty} ${unit} of ${data.title} · ${formatCurrency(total)}. The farmer will be asked to confirm.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Request order", onPress: placeOrder },
      ],
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
      >
        <Gallery
          images={images}
          title={data.title}
          width={width}
          height={heroHeight}
        />

        <View className="-mt-6 pt-6 px-5 bg-surface rounded-t-[28px]">
          <View className="flex-row flex-wrap">
            <Chip label={status.label} tone={status.tone} />
            {freshness ? (
              <Chip label={freshness} tone="primary" icon="sunrise" />
            ) : null}
          </View>

          <Text
            accessibilityRole="header"
            className="text-[26px] leading-[31px] font-extrabold text-ink mt-3 tracking-[-0.5px]"
          >
            {data.title}
          </Text>

          <View className="flex-row items-center mt-2">
            <Feather name="map-pin" size={14} color={colors.inkMuted} />
            <Text className="text-[14px] text-ink-secondary ml-1.5 flex-1">
              {data.location}
            </Text>
          </View>

          <View className="flex-row items-end mt-4">
            <PriceText amount={data.pricePerUnit} size="lg" />
            <Text className="text-[14px] text-ink-muted ml-1.5 mb-1">
              / {unit.toLowerCase()}
            </Text>
          </View>

          {data.farmer ? (
            <Pressable
              onPress={openFarmer}
              accessibilityRole="button"
              accessibilityLabel={`Sold by ${data.farmer.name}. View profile.`}
              style={({ pressed }) => ({
                opacity: pressed ? 0.92 : 1,
                ...shadows.card,
              })}
              className="flex-row items-center bg-white rounded-2xl border border-line/60 p-3.5 mt-5"
            >
              <Avatar
                uri={data.farmer.avatarUrl}
                name={data.farmer.name}
                size="md"
                className="mr-3"
              />
              <View className="flex-1">
                <Text className="text-[12px] text-ink-muted">Sold by</Text>
                <View className="flex-row items-center mt-0.5">
                  <Text
                    className="text-[15.5px] font-extrabold text-ink shrink"
                    numberOfLines={1}
                  >
                    {data.farmer.name}
                  </Text>
                  {data.farmer.isVerified ? (
                    <Ionicons
                      name="shield-checkmark"
                      size={16}
                      color={colors.primary}
                      style={{ marginLeft: 5 }}
                      accessibilityLabel="Verified farmer"
                    />
                  ) : null}
                </View>
                <View className="mt-1">
                  <RatingStars
                    rating={data.farmer.rating}
                    reviewCount={data.farmer.reviewCount}
                    size={13}
                    showValue={data.farmer.rating != null}
                    emptyLabel="No ratings yet"
                  />
                </View>
              </View>
              <Feather name="chevron-right" size={18} color={colors.inkMuted} />
            </Pressable>
          ) : null}

          <View
            className="flex-row bg-white rounded-2xl border border-line/60 mt-4"
            style={shadows.card}
          >
            {facts.map((fact, i) => (
              <Fact
                key={fact.label}
                label={fact.label}
                value={fact.value}
                isLast={i === facts.length - 1}
              />
            ))}
          </View>

          {canOrder ? (
            <View
              className="bg-white rounded-2xl border border-line/60 mt-4 p-4"
              style={shadows.card}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-[15px] font-bold text-ink">
                    How many {unit.toLowerCase()}s?
                  </Text>
                  <Text className="text-[12.5px] text-ink-muted mt-0.5">
                    {maxQty} available
                  </Text>
                </View>
                <QuantityStepper
                  value={qty}
                  onChange={setRequestedQuantity}
                  max={maxQty}
                  unit={unit}
                />
              </View>
              <View className="h-px bg-line/70 my-3.5" />
              <Pressable
                onPress={handleToggleInterest}
                disabled={expressInterest.isPending || withdrawInterest.isPending}
                accessibilityRole="button"
                accessibilityLabel={
                  isInterested ? "Withdraw interest" : "Express interest"
                }
                className="flex-row items-center min-h-[40px]"
              >
                <Feather
                  name={isInterested ? "check-circle" : "bell"}
                  size={17}
                  color={isInterested ? colors.primary : colors.inkSecondary}
                />
                <Text className="flex-1 ml-2.5 text-[13.5px] text-ink-secondary">
                  {isInterested
                    ? "The farmer knows you're interested"
                    : "Not ready to order? Let the farmer know you're interested."}
                </Text>
                <Text className="text-[13px] font-bold text-primary">
                  {isInterested ? "Undo" : "Notify"}
                </Text>
              </Pressable>
            </View>
          ) : null}

          {data.description ? <Description text={data.description} /> : null}

          <View className="mt-7">
            <SectionTitle
              action={reviewTotal > 0 && data.farmer ? "See all" : undefined}
              onAction={openFarmer}
              actionLabel="See all reviews for this farmer"
            >
              Reviews
            </SectionTitle>
            {listingReviews.isLoading ? (
              <View accessibilityLabel="Loading reviews" className="gap-3">
                <Skeleton height={84} radius={16} />
                <Skeleton height={84} radius={16} />
              </View>
            ) : reviewItems.length === 0 ? (
              <Card className="p-4 flex-row items-center">
                <Feather name="star" size={18} color={colors.inkMuted} />
                <Text className="text-[13.5px] text-ink-secondary ml-3 flex-1">
                  No reviews for this product yet. Reviews appear after a
                  delivered order.
                </Text>
              </Card>
            ) : (
              reviewItems.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </View>
        </View>
      </Animated.ScrollView>

      {/* Header: transparent over the photo, solid once you scroll past it */}
      <View
        pointerEvents="box-none"
        className="absolute top-0 left-0 right-0 z-10"
        style={{ paddingTop: insets.top + 6, paddingBottom: 6 }}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.white,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.line,
            },
            barStyle,
          ]}
        />
        <View className="flex-row items-center px-4" style={{ gap: 12 }}>
          {backButton}
          <Animated.Text
            numberOfLines={1}
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={[
              {
                flex: 1,
                fontSize: 16,
                fontFamily: FONT_FAMILY.extrabold,
                color: colors.ink,
              },
              barStyle,
            ]}
          >
            {data.title}
          </Animated.Text>
          {isOwnListing ? (
            <RoundButton
              onPress={() =>
                navigation.navigate("EditListing", { listingId: data.id })
              }
              label="Edit listing"
            >
              <Feather name="edit-2" size={18} color={colors.ink} />
            </RoundButton>
          ) : (
            <HeartButton saved={isSaved} onPress={handleToggleSave} />
          )}
        </View>
      </View>

      {canOrder ? (
        <View
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-line/60 px-5 pt-3"
          style={{ paddingBottom: insets.bottom + 12, ...shadows.md }}
        >
          <View className="flex-row items-center" style={{ gap: 16 }}>
            <View>
              <Text className="text-[12px] text-ink-muted">
                {qty} {unit.toLowerCase()}
                {qty === 1 ? "" : "s"}
              </Text>
              <Text
                accessibilityLiveRegion="polite"
                className="text-[22px] leading-[27px] font-extrabold text-ink tracking-[-0.5px]"
                style={TABULAR_NUMS}
              >
                {formatCurrency(total)}
              </Text>
            </View>
            <View className="flex-1">
              <Button
                label="Request order"
                onPress={handleRequestOrder}
                variant="primary"
                size="lg"
                isLoading={createOrder.isPending}
              />
            </View>
          </View>
        </View>
      ) : (
        <View
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-line/60 px-5 pt-3"
          style={{ paddingBottom: insets.bottom + 12, ...shadows.md }}
        >
          {isOwnListing ? (
            <Button
              label="Edit listing"
              variant="primary"
              size="md"
              onPress={() =>
                navigation.navigate("EditListing", { listingId: data.id })
              }
            />
          ) : (
            <Text className="text-[14px] text-ink-secondary text-center py-2">
              {data.status === "SOLD"
                ? "This listing is sold out."
                : "This listing is no longer available."}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
