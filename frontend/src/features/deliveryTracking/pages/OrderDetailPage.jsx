import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  Share,
  Pressable,
  TextInput,
} from "react-native";
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
import { SectionLabel } from "../../../components/ui/SectionHeader.jsx";
import {
  LoadingState,
  ErrorState,
} from "../../../components/ui/ScreenState.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { shadows } from "../../../theme/shadows.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  useOrder,
  useUpdateOrderStatus,
  useReportLocation,
} from "../hooks/deliveryTrackingHooks.js";
import { useReviewForOrder, useCreateReview } from "../hooks/reviewHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { colors } from "../../../theme/colors.js";
import {
  OSM_RASTER_STYLE,
  DEFAULT_DELIVERY_MAP_ZOOM,
} from "../../../lib/mapStyle.js";

const TRANSITIONS = [
  { from: "PENDING", to: "CONFIRMED", actor: "farmer", label: "Confirm Order" },
  {
    from: "CONFIRMED",
    to: "IN_TRANSIT",
    actor: "farmer",
    label: "Start Delivery",
  },
  {
    from: "IN_TRANSIT",
    to: "DELIVERED",
    actor: "farmer",
    label: "Mark Delivered",
  },
  { from: "PENDING", to: "CANCELLED", actor: "either", label: "Cancel Order" },
  {
    from: "CONFIRMED",
    to: "CANCELLED",
    actor: "either",
    label: "Cancel Order",
  },
  {
    from: "IN_TRANSIT",
    to: "CANCELLED",
    actor: "either",
    label: "Cancel Order",
  },
];

const STEP_ORDER = ["PENDING", "CONFIRMED", "IN_TRANSIT", "DELIVERED"];
const STEP_LABELS = {
  PENDING: "Requested",
  CONFIRMED: "Confirmed",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
};

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

function StatusStepper({ status }) {
  const currentIndex = STEP_ORDER.indexOf(status);

  return (
    <View className="flex-row items-center mb-1">
      {STEP_ORDER.map((step, index) => {
        const isComplete = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <View key={step} className="flex-1 flex-row items-center">
            <View className="items-center flex-1">
              <View
                className={`w-7 h-7 rounded-full items-center justify-center ${
                  isComplete ? "bg-primary" : "bg-line"
                }`}
              >
                {isComplete ? (
                  <Feather
                    name={isCurrent ? "circle" : "check"}
                    size={13}
                    color="#FFFFFF"
                  />
                ) : null}
              </View>
              <Text
                className={`text-[10.5px] mt-1.5 font-semibold ${
                  isCurrent
                    ? "text-primary"
                    : isComplete
                      ? "text-ink"
                      : "text-ink-muted"
                }`}
                numberOfLines={1}
              >
                {STEP_LABELS[step]}
              </Text>
            </View>
            {index < STEP_ORDER.length - 1 ? (
              <View
                className={`h-[2px] flex-1 -mt-4 ${
                  index < currentIndex ? "bg-primary" : "bg-line"
                }`}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

function StarPicker({ value, onChange }) {
  return (
    <View className="flex-row gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable
          key={star}
          onPress={() => onChange(star)}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel={`Rate ${star} star${star === 1 ? "" : "s"}`}
        >
          <Feather
            name="star"
            size={30}
            color={star <= value ? colors.warning : colors.lineStrong}
            style={{ opacity: star <= value ? 1 : 0.9 }}
          />
        </Pressable>
      ))}
    </View>
  );
}

function InfoRow({ label, value, isLast = false }) {
  return (
    <View
      className={`flex-row justify-between items-center py-3 px-4 ${
        isLast ? "" : "border-b border-line/70"
      }`}
    >
      <Text className="text-[12.5px] text-ink-muted">{label}</Text>
      <Text className="text-[12.5px] font-semibold text-ink">{value}</Text>
    </View>
  );
}

function ReadOnlyStars({ rating }) {
  return (
    <View className="flex-row gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Feather
          key={star}
          name="star"
          size={16}
          color={star <= rating ? colors.warning : colors.lineStrong}
        />
      ))}
    </View>
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

  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => navigation.goBack()}
    />
  );

  if (order.isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader title="Order details" leftAction={backAction} />
        <LoadingState label="Loading order…" />
      </SafeAreaView>
    );
  }

  if (order.isError) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader title="Order details" leftAction={backAction} />
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
        <ScreenHeader title="Order details" leftAction={backAction} />
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
    if (t.actor === "farmer") return isFarmer;
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
    try {
      await Share.share({
        title: "HarvestLink Order",
        message:
          `${data.listing?.title ?? "Order"} — Status: ${STEP_LABELS[data.status] ?? data.status}\n` +
          `Quantity: ${data.quantity}\n` +
          `Ordered: ${formatDate(data.createdAt)}`,
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
      <ScreenHeader
        title="Order details"
        leftAction={backAction}
        rightAction={
          <HeaderActionButton
            icon="share-2"
            size={18}
            accessibilityLabel="Share order"
            onPress={handleSharePress}
          />
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="px-5 pt-4">
          <Card className="p-4">
            <View className="flex-row gap-3">
              <View className="w-12 h-12 rounded-xl overflow-hidden bg-primary-muted">
                {data.listing?.images?.[0] ? (
                  <Image
                    source={{ uri: data.listing.images[0] }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-full items-center justify-center">
                    <Feather name="package" size={16} color={colors.inkFaint} />
                  </View>
                )}
              </View>
              <View className="flex-1">
                <Text
                  className="text-[14.5px] font-bold text-ink"
                  numberOfLines={1}
                >
                  {data.listing?.title ?? "Order"}
                </Text>
                <Text className="text-[11.5px] text-ink-muted mt-0.5">
                  {formatDate(data.createdAt)}
                </Text>
              </View>
              <Text className="text-[17px] font-extrabold text-primary">
                GHS {total.toLocaleString()}
              </Text>
            </View>

            {data.status === "CANCELLED" ? (
              <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-line/70">
                <Text className="text-[13px] font-semibold text-ink-muted">
                  Status
                </Text>
                <View className="rounded-full px-3 py-1.5 bg-line">
                  <Text className="text-[11.5px] font-bold text-ink-muted">
                    Cancelled
                  </Text>
                </View>
              </View>
            ) : (
              <View className="mt-5 pt-4 border-t border-line/70">
                <StatusStepper status={data.status} />
              </View>
            )}
          </Card>
        </View>

        <View className="px-5 mt-6">
          <SectionLabel>Order summary</SectionLabel>
          <Card padded={false}>
            <InfoRow label="Quantity" value={data.quantity} />
            <InfoRow
              label="Price per unit"
              value={`GHS ${data.pricePerUnitAtOrder}`}
              isLast
            />
          </Card>
        </View>

        {counterpart ? (
          <View className="px-5 mt-6">
            <SectionLabel>{isBuyer ? "Farmer" : "Buyer"}</SectionLabel>
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
                <Text className="text-[12px] text-ink-muted mt-0.5">
                  {isBuyer ? "Farmer" : "Buyer"}
                </Text>
              </View>
              {counterpart.phone ? (
                <View style={{ width: 100 }}>
                  <Button
                    label="Call"
                    icon="phone"
                    variant="secondary"
                    onPress={() => Linking.openURL(`tel:${counterpart.phone}`)}
                  />
                </View>
              ) : null}
            </Card>
          </View>
        ) : null}

        <View className="px-5 mt-6">
          <SectionLabel>Delivery location</SectionLabel>
          <Card className="p-5">
            {hasLocation ? (
              <>
                <View
                  style={{
                    width: "100%",
                    height: 190,
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
              <View className="h-[190px] rounded-xl2 bg-cream items-center justify-center border border-line/50">
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

        {availableActions.length > 0 ? (
          <View className="px-5 mt-6">
            <SectionLabel>Update status</SectionLabel>
            <Card className="p-5">
              {updateStatus.isError ? (
                <Text
                  className="text-[13px] text-danger mb-3"
                  accessibilityRole="alert"
                >
                  {getErrorMessage(updateStatus.error)}
                </Text>
              ) : null}
              {availableActions.map((action, index) => (
                <View key={action.to} className={index > 0 ? "mt-2.5" : ""}>
                  <Button
                    label={action.label}
                    onPress={() => handleTransitionPress(action)}
                    variant={action.to === "CANCELLED" ? "danger" : "primary"}
                    isLoading={updateStatus.isPending}
                  />
                </View>
              ))}
            </Card>
          </View>
        ) : null}

        {data.status === "DELIVERED" && (isBuyer || isFarmer) ? (
          <View className="px-5 mt-6">
            <SectionLabel>Rating</SectionLabel>
            <Card className="p-5">
              {review.isLoading ? (
                <Text className="text-[13px] text-ink-muted">
                  Loading review…
                </Text>
              ) : review.data ? (
                <View>
                  <Text className="text-[13px] font-semibold text-ink-muted mb-2">
                    {isBuyer ? "Your Rating" : "Buyer's Rating"}
                  </Text>
                  <ReadOnlyStars rating={review.data.rating} />
                  {review.data.comment ? (
                    <Text className="text-[13.5px] text-ink mt-3 leading-[19px]">
                      "{review.data.comment}"
                    </Text>
                  ) : null}
                  <Text className="text-[11.5px] text-ink-muted mt-3">
                    Reviewed {formatDate(review.data.createdAt)}
                  </Text>
                </View>
              ) : isBuyer ? (
                <View>
                  <Text className="text-[14.5px] font-bold text-ink mb-1">
                    Rate this delivery
                  </Text>
                  <Text className="text-[12.5px] text-ink-muted mb-3">
                    Your rating helps other buyers trust{" "}
                    {counterpart?.name ?? "this farmer"}.
                  </Text>
                  <StarPicker value={draftRating} onChange={setDraftRating} />

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

                  {createReview.isError ? (
                    <Text
                      className="text-[12.5px] text-danger mt-2"
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
                <Text className="text-[13px] text-ink-muted">
                  The buyer hasn't left a rating yet.
                </Text>
              )}
            </Card>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
