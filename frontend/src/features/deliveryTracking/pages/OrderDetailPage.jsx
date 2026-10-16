import { useState } from "react";
import {
  View,
  ScrollView,
  Linking,
  Pressable,
  Share,
} from "react-native";
import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { Alert } from "../../../lib/alert.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Map, Camera, Marker } from "@maplibre/maplibre-react-native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";

import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { MapPin } from "../../../components/ui/MapPin.jsx";
import { RatingStars } from "../../../components/ui/RatingStars.jsx";
import {
  LoadingState,
  ErrorState,
} from "../../../components/ui/ScreenState.jsx";
import { TopBar, TopBarButton } from "../../../components/ui/TopBar.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  useOrder,
  useUpdateOrderStatus,
  useReportLocation,
} from "../hooks/deliveryTrackingHooks.js";
import { useReviewForOrder, useCreateReview } from "../hooks/reviewHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { formatCurrency } from "../../../lib/currency.js";
import {
  OSM_RASTER_STYLE,
  DEFAULT_DELIVERY_MAP_ZOOM,
} from "../../../lib/mapStyle.js";
import { OrderTrustPanel } from "../../trust/components/OrderTrustPanel.jsx";
import { OrderStatusHero } from "../components/OrderStatusHero.jsx";
import { PaymentProtectionCard } from "../../trust/components/PaymentProtectionCard.jsx";
import { getOrderStatusMeta } from "../lib/orderStatus.js";

const TRANSITIONS = [
  { from: "PENDING", to: "CONFIRMED", actor: "farmer", label: "Confirm Order" },
  {
    from: "CONFIRMED",
    to: "IN_TRANSIT",
    actor: "farmer",
    label: "Start Delivery",
  },
  { from: "PENDING", to: "CANCELLED", actor: "either", label: "Cancel Order" },
  {
    from: "CONFIRMED",
    to: "CANCELLED",
    actor: "either",
    label: "Cancel Order",
  },
];

const BUYER_CANCEL_GRACE_MS = 30 * 60 * 1000;

function buyerWithinCancelGrace(confirmedAt) {
  if (!confirmedAt) return false;
  return Date.now() - new Date(confirmedAt).getTime() <= BUYER_CANCEL_GRACE_MS;
}

const STATUS_SHARE_ICONS = {
  PENDING: "🕒",
  CONFIRMED: "✅",
  IN_TRANSIT: "🚚",
  DELIVERED: "📦",
  CANCELLED: "❌",
};

function shortOrderRef(id) {
  if (!id) return "———";
  return id.replace(/-/g, "").slice(-8).toUpperCase();
}

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(isoString) {
  if (!isoString) return "";
  const diffMs = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return formatDate(isoString);
}

const RATING_LABELS = {
  0: "Tap a star to rate",
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

function InfoRow({ label, value, isLast = false, strong = false }) {
  return (
    <View
      className={`flex-row justify-between items-center py-3 px-4 ${
        isLast ? "" : "border-b border-line/70"
      }`}
    >
      <Text
        className={
          strong
            ? "text-[14px] font-bold text-ink"
            : "text-[13.5px] text-ink-muted"
        }
      >
        {label}
      </Text>
      <Text
        className={
          strong
            ? "text-[16px] font-extrabold text-ink"
            : "text-[13.5px] font-semibold text-ink"
        }
      >
        {value}
      </Text>
    </View>
  );
}

// Sentence-case section title (replaces the small grey ALL-CAPS labels).
function Heading({ children }) {
  return (
    <Text
      accessibilityRole="header"
      className="text-[17px] font-extrabold text-ink tracking-[-0.2px] mb-3"
    >
      {children}
    </Text>
  );
}

export function OrderDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  const { user } = useAuth();

  const order = useOrder(orderId);
  const updateStatus = useUpdateOrderStatus();
  const reportLocation = useReportLocation();

  const isBuyerOfOrder = user?.id === order.data?.buyerId;
  const isFarmerOfOrder = user?.id === order.data?.farmerId;
  const isDelivered = order.data?.status === "DELIVERED";

  const review = useReviewForOrder(orderId, {
    enabled: isDelivered && (isBuyerOfOrder || isFarmerOfOrder),
  });
  const createReview = useCreateReview();

  const [locationError, setLocationError] = useState(null);
  const [draftRating, setDraftRating] = useState(0);
  const [draftComment, setDraftComment] = useState("");

  const goBack = () => navigation.goBack();

  if (order.isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <TopBar title="Order details" onBack={goBack} />
        <LoadingState label="Loading order…" />
      </SafeAreaView>
    );
  }

  if (order.isError) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <TopBar title="Order details" onBack={goBack} />
        <ErrorState
          title="Couldn't load order"
          message={getErrorMessage(order.error)}
          onRetry={() => order.refetch()}
          retryLabel="Try again"
        />
      </SafeAreaView>
    );
  }

  const data = order.data;

  if (!data) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <TopBar title="Order details" onBack={goBack} />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-ink-muted text-center">
            This order is not available.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isBuyer = user?.id === data.buyerId;
  const isFarmer = user?.id === data.farmerId;

  const availableActions = TRANSITIONS.filter((t) => {
    if (t.from !== data.status) return false;
    if (data.status === "CANCELLATION_REQUESTED") return false;
    if (t.actor === "farmer") return isFarmer;
    if (
      t.to === "CANCELLED" &&
      t.from === "CONFIRMED" &&
      isBuyer &&
      !isFarmer
    ) {
      return buyerWithinCancelGrace(data.confirmedAt);
    }
    return isBuyer || isFarmer;
  });

  const canReportLocation = isFarmer && data.status === "IN_TRANSIT";
  const hasLocation = data.latitude !== null && data.longitude !== null;
  const counterpart = isBuyer ? data.farmer : isFarmer ? data.buyer : null;
  const total = Number(data.quantity) * Number(data.pricePerUnitAtOrder);

  function handleTransitionPress(action) {
    const confirmLabel =
      action.to === "CANCELLED" ? "Cancel Order" : action.label;
    const confirmMessage =
      action.to === "CANCELLED"
        ? "Are you sure you want to cancel this order? This cannot be undone."
        : `Confirm: ${action.label}?`;

    Alert.alert(confirmLabel, confirmMessage, [
      { text: "Back", style: "cancel" },
      {
        text: confirmLabel,
        style: action.to === "CANCELLED" ? "destructive" : "default",
        onPress: () => updateStatus.mutate({ orderId, status: action.to }),
      },
    ]);
  }

  async function handleReportLocationPress() {
    setLocationError(null);
    try {
      const { status: permissionStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (permissionStatus !== "granted") {
        setLocationError({
          code: "LOCATION_PERMISSION_DENIED",
          message: "Location permission is required.",
        });
        return;
      }
      const position = await Location.getCurrentPositionAsync({});
      reportLocation.mutate(
        {
          orderId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        { onError: (error) => setLocationError(error) },
      );
    } catch {
      setLocationError({
        code: "LOCATION_UNAVAILABLE",
        message: "Could not determine your current location.",
      });
    }
  }

  async function handleSharePress() {
    const statusLabel = getOrderStatusMeta(data.status).label;
    const statusIcon = STATUS_SHARE_ICONS[data.status] ?? "•";
    const ref = shortOrderRef(data.id);
    const counterpartLine = counterpart
      ? `${isBuyer ? "Farmer" : "Buyer"}:  ${counterpart.name}\n`
      : "";

    const message =
      `🌾 HarvestLink Order #${ref}\n` +
      `─────────────────────\n` +
      `${data.listing?.title ?? "Order"}\n` +
      `Qty:  ${data.quantity}\n` +
      `Total:  ${formatCurrency(total)}\n` +
      `Status:  ${statusIcon} ${statusLabel}\n\n` +
      counterpartLine +
      `Ordered:  ${formatDate(data.createdAt)}\n\n` +
      `Sent via HarvestLink`;

    try {
      await Share.share({
        title: `HarvestLink Order #${ref}`,
        message,
      });
    } catch {
      // User dismissed the share sheet — nothing to do.
    }
  }

  function handleSubmitReview() {
    if (draftRating < 1) return;
    createReview.mutate({
      orderId,
      rating: draftRating,
      comment: draftComment.trim() || undefined,
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <TopBar
        title="Order details"
        onBack={goBack}
        right={
          <TopBarButton
            icon="share-2"
            accessibilityLabel="Share order"
            onPress={handleSharePress}
          />
        }
      />
      <KeyboardAvoider
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-5 pt-4 gap-3">
            <OrderStatusHero
              order={data}
              total={total}
              isFarmer={isFarmer}
              orderRef={shortOrderRef(data.id)}
              dateLabel={formatDate(data.createdAt)}
            />
            <PaymentProtectionCard order={data} isBuyer={isBuyer} />
          </View>

          <View className="px-5 mt-6">
            <Heading>Order summary</Heading>
            <Card padded={false}>
              <InfoRow label="Quantity" value={data.quantity} />
              <InfoRow
                label="Price per unit"
                value={formatCurrency(data.pricePerUnitAtOrder)}
              />
              <InfoRow label="Total" value={formatCurrency(total)} strong isLast />
            </Card>
          </View>

          {counterpart ? (
            <View className="px-5 mt-6">
              <Heading>{isBuyer ? "Farmer" : "Buyer"}</Heading>
              <Card className="flex-row items-center p-4">
                <Avatar
                  uri={counterpart.avatarUrl}
                  name={counterpart.name}
                  size="md"
                  className="mr-3"
                />
                <View className="flex-1">
                  <Text
                    className="text-[14.5px] font-bold text-ink"
                    numberOfLines={1}
                  >
                    {counterpart.name}
                  </Text>
                  <Text className="text-[12.5px] text-ink-muted mt-0.5">
                    {counterpart.phone ?? (isBuyer ? "Farmer" : "Buyer")}
                  </Text>
                </View>
                {counterpart.phone ? (
                  <Pressable
                    onPress={() => Linking.openURL(`tel:${counterpart.phone}`)}
                    accessibilityRole="button"
                    accessibilityLabel={`Call ${counterpart.name}`}
                    hitSlop={6}
                    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                    className="w-11 h-11 rounded-full bg-primary-light items-center justify-center"
                  >
                    <Feather name="phone" size={18} color={colors.primaryActive} />
                  </Pressable>
                ) : null}
              </Card>
            </View>
          ) : null}

          {hasLocation || canReportLocation || data.status === "IN_TRANSIT" ? (
          <View className="px-5 mt-6">
            <Heading>Delivery location</Heading>
            <Card className="p-3">
              {hasLocation ? (
                <>
                  <View
                    style={{
                      width: "100%",
                      height: 170,
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <Map
                      style={{ flex: 1 }}
                      mapStyle={OSM_RASTER_STYLE}
                      attribution
                      logo={false}
                    >
                      <Camera
                        initialViewState={{
                          center: [data.longitude, data.latitude],
                          zoom: DEFAULT_DELIVERY_MAP_ZOOM,
                        }}
                      />
                      <Marker lngLat={[data.longitude, data.latitude]}>
                        <MapPin />
                      </Marker>
                    </Map>
                  </View>
                  <Text className="text-[11.5px] text-ink-muted mt-2.5">
                    Last updated {formatDate(data.locationReportedAt)}
                  </Text>
                </>
              ) : (
                <View className="h-[150px] rounded-xl2 bg-cream items-center justify-center border border-line/50">
                  <Feather name="map-pin" size={22} color={colors.inkFaint} />
                  <Text className="text-[13px] text-ink-muted mt-2">
                    No location reported yet.
                  </Text>
                </View>
              )}

              {locationError ? (
                <Text
                  className="text-[12.5px] text-danger mt-2"
                  accessibilityRole="alert"
                >
                  {getErrorMessage(locationError)}
                </Text>
              ) : null}

              {canReportLocation ? (
                <>
                  <View className="h-3" />
                  <Button
                    label="Report My Current Location"
                    icon="navigation"
                    onPress={handleReportLocationPress}
                    variant="secondary"
                    isLoading={reportLocation.isPending}
                  />
                </>
              ) : null}
            </Card>
          </View>
          ) : null}

          <OrderTrustPanel
            orderId={orderId}
            orderStatus={data.status}
            userId={user?.id}
            isBuyer={isBuyer}
            isFarmer={isFarmer}
            onDisputePress={() =>
              navigation.navigate("OpenDispute", { orderId })
            }
            onOrderUpdated={() => order.refetch()}
          />

          {data.status === "DELIVERED" && (isBuyer || isFarmer) ? (
            <View className="px-5 mt-6">
              <Heading>Rating</Heading>
              <Card className="p-5">
                {review.isLoading ? (
                  <View className="flex-row items-center py-2">
                    <Feather name="loader" size={14} color={colors.inkFaint} />
                    <Text className="text-[13px] text-ink-muted ml-2">
                      Loading review…
                    </Text>
                  </View>
                ) : review.data ? (
                  <View>
                    <View className="flex-row items-center">
                      <Avatar
                        uri={
                          isBuyer
                            ? user?.profileImageUrl
                            : counterpart?.avatarUrl
                        }
                        name={isBuyer ? user?.fullName : counterpart?.name}
                        size="sm"
                        className="mr-2.5"
                      />
                      <View className="flex-1">
                        <Text className="text-[13.5px] font-bold text-ink">
                          {isBuyer
                            ? "Your rating"
                            : (counterpart?.name ?? "Buyer")}
                        </Text>
                        <Text className="text-[11px] text-ink-muted mt-0.5">
                          {timeAgo(review.data.createdAt)}
                        </Text>
                      </View>
                      <RatingStars rating={review.data.rating} size={14} />
                    </View>

                    {review.data.comment ? (
                      <View className="mt-3.5 pl-[42px]">
                        <Text className="text-[13.5px] text-ink leading-[19px]">
                          {review.data.comment}
                        </Text>
                      </View>
                    ) : (
                      <View className="mt-3.5 pl-[42px]">
                        <Text className="text-[12.5px] text-ink-faint italic">
                          No written comment was left.
                        </Text>
                      </View>
                    )}
                  </View>
                ) : isBuyer ? (
                  <View>
                    <Text className="text-[14.5px] font-bold text-ink mb-1">
                      Rate this delivery
                    </Text>
                    <Text className="text-[12.5px] text-ink-muted mb-4">
                      Your rating helps other buyers trust{" "}
                      {counterpart?.name ?? "this farmer"}.
                    </Text>

                    <View className="items-center py-1">
                      <RatingStars
                        interactive
                        value={draftRating}
                        onChange={setDraftRating}
                        size={34}
                      />
                      <Text className="text-[12.5px] font-semibold text-ink-muted mt-2.5">
                        {RATING_LABELS[draftRating]}
                      </Text>
                    </View>

                    <TextInput
                      placeholder="Add a comment (optional)"
                      placeholderTextColor={colors.inkFaint}
                      value={draftComment}
                      onChangeText={setDraftComment}
                      multiline
                      maxLength={500}
                      className="mt-4 rounded-xl2 bg-cream border border-line/50 px-4 py-3 text-[13.5px] text-ink min-h-[70px]"
                      textAlignVertical="top"
                    />
                    <Text className="text-[10.5px] text-ink-faint text-right mt-1">
                      {draftComment.length}/500
                    </Text>

                    {createReview.isError ? (
                      <Text
                        className="text-[12.5px] text-danger mt-1"
                        accessibilityRole="alert"
                      >
                        {getErrorMessage(createReview.error)}
                      </Text>
                    ) : null}

                    <View className="mt-3">
                      <Button
                        label="Submit Rating"
                        onPress={handleSubmitReview}
                        disabled={draftRating < 1}
                        isLoading={createReview.isPending}
                      />
                    </View>
                  </View>
                ) : (
                  <View className="items-center py-3">
                    <View className="w-11 h-11 rounded-full bg-primary-muted items-center justify-center mb-2.5">
                      <Feather name="star" size={18} color={colors.primary} />
                    </View>
                    <Text className="text-[13px] font-semibold text-ink">
                      Awaiting the buyer's rating
                    </Text>
                    <Text className="text-[12px] text-ink-muted text-center mt-1">
                      {counterpart?.name ?? "The buyer"} hasn't rated this
                      delivery yet.
                    </Text>
                  </View>
                )}
              </Card>
            </View>
          ) : null}
        </ScrollView>

        {availableActions.length > 0 ? (
          <View
            className="bg-white border-t border-line/60 px-5 pt-3 pb-3"
            style={shadows.md}
          >
            {updateStatus.isError ? (
              <Text
                className="text-[13px] text-danger mb-2"
                accessibilityRole="alert"
              >
                {getErrorMessage(updateStatus.error)}
              </Text>
            ) : null}
            {availableActions
              .filter((a) => a.to !== "CANCELLED")
              .map((action) => (
                <Button
                  key={action.to}
                  label={action.label}
                  size="lg"
                  onPress={() => handleTransitionPress(action)}
                  isLoading={updateStatus.isPending}
                />
              ))}
            {availableActions.some((a) => a.to === "CANCELLED") ? (
              <Pressable
                onPress={() =>
                  handleTransitionPress(
                    availableActions.find((a) => a.to === "CANCELLED"),
                  )
                }
                disabled={updateStatus.isPending}
                accessibilityRole="button"
                accessibilityLabel="Cancel order"
                hitSlop={8}
                className="items-center justify-center min-h-[44px]"
              >
                <Text className="text-[14px] font-bold text-danger">
                  Cancel order
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </KeyboardAvoider>
    </SafeAreaView>
  );
}
