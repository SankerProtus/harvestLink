import { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Alert } from "../../../lib/alert.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useListing } from "../../marketplace/hooks/marketplaceHooks.js";
import { useCreateOrder } from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import { computeMatchFit } from "../lib/matchScore.js";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";

function formatLabel(value) {
  if (!value) return "—";
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initialsOf(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function ScoreBanner({ score }) {
  const tone =
    score >= 80
      ? { bg: colors.primary, label: "High confidence match" }
      : score >= 55
        ? { bg: colors.warning, label: "Moderate confidence match" }
        : { bg: colors.danger, label: "Low confidence match" };

  return (
    <Card className="p-5 flex-row items-center">
      <View className="flex-1">
        <View className="flex-row items-baseline">
          <Text className="text-[32px] font-extrabold text-ink tracking-[-0.5px]">
            {score}%
          </Text>
          <Text className="text-[13px] font-semibold text-ink-muted ml-2">
            Fit Score
          </Text>
        </View>
        <Text className="text-[13px] font-bold mt-1" style={{ color: tone.bg }}>
          {tone.label}
        </Text>
        <Text className="text-[11.5px] text-ink-muted mt-1 leading-[16px]">
          Calculated from this listing's quantity and price against what you
          asked for.
        </Text>
      </View>
      <View
        className="w-14 h-14 rounded-full items-center justify-center ml-3"
        style={{ backgroundColor: `${tone.bg}1A` }}
      >
        <Feather name="target" size={22} color={tone.bg} />
      </View>
    </Card>
  );
}

function StatRow({ label, value, isLast = false }) {
  return (
    <View
      className={`flex-row justify-between items-center py-3 ${
        isLast ? "" : "border-b border-line/70"
      }`}
    >
      <Text className="text-[13px] text-ink-muted">{label}</Text>
      <Text className="text-[13px] font-bold text-ink">{value}</Text>
    </View>
  );
}

function SectionLabel({ children }) {
  return (
    <Text className="text-[11px] font-bold text-ink-muted/80 uppercase tracking-[0.4px] mb-2 ml-0.5">
      {children}
    </Text>
  );
}

export function MatchDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { listingId, requestedQuantity, maxPrice } = route.params ?? {};
  const { user } = useAuth();

  const listing = useListing(listingId);
  const createOrder = useCreateOrder();
  const [orderError, setOrderError] = useState(null);

  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => navigation.goBack()}
    />
  );

  if (listing.isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader title="Match Details" leftAction={backAction} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-ink-muted">Loading listing…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (listing.isError || !listing.data) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader title="Match Details" leftAction={backAction} />
        <View className="flex-1 items-center justify-center px-6">
          <Text
            className="text-danger text-center mb-4"
            accessibilityRole="alert"
          >
            {listing.isError
              ? getErrorMessage(listing.error)
              : "This listing is no longer available."}
          </Text>
          <Button
            label="Try Again"
            onPress={() => listing.refetch()}
            variant="secondary"
          />
        </View>
      </SafeAreaView>
    );
  }

  const data = listing.data;
  const fit = computeMatchFit({ listing: data, requestedQuantity, maxPrice });
  const orderQuantity = Math.min(
    Number(requestedQuantity) || Number(data.quantity),
    Number(data.quantity),
  );
  const totalCost = orderQuantity * Number(data.pricePerUnit);

  async function handleAccept() {
    setOrderError(null);
    try {
      const order = await createOrder.mutateAsync({
        listingId: data.id,
        quantity: orderQuantity,
      });
      navigation.navigate("OrderDetail", { orderId: order.id });
    } catch (error) {
      setOrderError(error);
    }
  }

  function handleReject() {
    Alert.alert("Find another match?", "This won't be saved anywhere.", [
      { text: "Cancel", style: "cancel" },
      { text: "Go Back", onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader title="Match Details" leftAction={backAction} />
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="px-5 pt-5">
          <ScoreBanner score={fit.overall} />
        </View>

        <View className="px-5 mt-4">
          <SectionLabel>Listing details</SectionLabel>
          <Card className="p-5">
            {data.images?.[0] ? (
              <View className="w-full h-[120px] rounded-xl2 overflow-hidden mb-4 bg-primary-muted">
                <Image
                  source={{ uri: data.images[0] }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            ) : null}

            <View className="flex-row items-center justify-between mb-4">
              <View className="items-center flex-1">
                <View className="w-12 h-12 rounded-full bg-primary items-center justify-center overflow-hidden">
                  {data.farmer?.avatarUrl ? (
                    <Image
                      source={{ uri: data.farmer.avatarUrl }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Text className="text-white font-bold">
                      {initialsOf(data.farmer?.name)}
                    </Text>
                  )}
                </View>
                <Text
                  className="text-[12.5px] font-bold text-ink mt-1.5"
                  numberOfLines={1}
                >
                  {data.farmer?.name ?? "Farmer"}
                </Text>
                <Text
                  className="text-[10.5px] text-ink-muted mt-0.5"
                  numberOfLines={1}
                >
                  {data.location}
                </Text>
                {data.farmer?.isVerified ? (
                  <View className="flex-row items-center mt-0.5">
                    <Feather
                      name="check-circle"
                      size={10}
                      color={colors.primary}
                    />
                    <Text className="text-[10px] text-primary ml-0.5 font-semibold">
                      Verified
                    </Text>
                  </View>
                ) : null}
              </View>

              <View className="items-center px-1">
                <View className="w-2 h-2 rounded-full bg-primary" />
                <View className="w-8 h-[1.5px] bg-line my-1" />
                <Feather name="arrow-right" size={14} color={colors.inkFaint} />
              </View>

              <View className="items-center flex-1">
                <View className="w-12 h-12 rounded-full bg-cream items-center justify-center border border-line/50">
                  <Text className="text-ink font-bold">
                    {initialsOf(user?.fullName) || "You"}
                  </Text>
                </View>
                <Text className="text-[12.5px] font-bold text-ink mt-1.5">
                  You
                </Text>
                <Text className="text-[10.5px] text-ink-muted mt-0.5">
                  Buyer
                </Text>
              </View>
            </View>

            <View className="border-t border-line/70 pt-1">
              <StatRow
                label="Commodity"
                value={`${data.quantity} ${formatLabel(data.quantityUnit)} ${formatLabel(data.cropType)}`}
              />
              {requestedQuantity ? (
                <StatRow
                  label="Your Requested Quantity"
                  value={`${orderQuantity} ${formatLabel(data.quantityUnit)}`}
                />
              ) : null}
              <StatRow
                label="Price per Unit"
                value={`GHS ${data.pricePerUnit}`}
              />
              <StatRow
                label="Total Produce Cost"
                value={`GHS ${totalCost.toLocaleString()}`}
              />
              <StatRow
                label="Harvest Date"
                value={
                  data.harvestDate
                    ? formatDate(data.harvestDate)
                    : "Not specified"
                }
              />
              <StatRow
                label="Listed"
                value={formatDate(data.createdAt)}
                isLast
              />
            </View>
          </Card>
        </View>

        {!fit.meetsQuantity ? (
          <View className="px-5 mt-4">
            <View className="rounded-2xl bg-warning/10 border border-warning/25 px-4 py-3.5 flex-row items-center gap-2.5">
              <Feather name="alert-triangle" size={16} color={colors.warning} />
              <Text className="text-[12.5px] text-ink flex-1 leading-[18px]">
                This listing has less than you requested. You can still accept
                for the available amount.
              </Text>
            </View>
          </View>
        ) : null}

        {orderError ? (
          <View className="px-5 mt-3">
            <Text className="text-sm text-danger" accessibilityRole="alert">
              {getErrorMessage(orderError)}
            </Text>
          </View>
        ) : null}

        <View className="px-5 mt-5">
          <Button
            label="Accept Match & Confirm Pickup"
            onPress={handleAccept}
            variant="primary"
            isLoading={createOrder.isPending}
            disabled={data.status !== "ACTIVE"}
          />
          <View className="h-3" />
          <Button
            label="Reject & Find Alternate"
            onPress={handleReject}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
