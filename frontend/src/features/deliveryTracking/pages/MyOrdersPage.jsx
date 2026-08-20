import { useMemo, useState } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import { Button } from "../../../components/ui/Button.jsx";

import { SegmentedControl } from "../../../components/ui/SegmentedControl.jsx";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";

import { PriceText } from "../../../components/ui/PriceText.jsx";

import {
  useBuyerOrders,
  useFarmerOrders,
} from "../hooks/deliveryTrackingHooks.js";

import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";

import { getErrorMessage } from "../../../lib/errorMap.js";

import { colors } from "../../../theme/colors.js";

import { shadows } from "../../../theme/shadows.js";

import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../../components/ui/ScreenState.jsx";

const TABS = { BUYER: "buyer", FARMER: "farmer" };

const STATUS_STYLES = {
  PENDING: { dot: "bg-warning", line: "bg-warning/40", label: "Pending" },

  CONFIRMED: { dot: "bg-info", line: "bg-info/40", label: "Confirmed" },

  IN_TRANSIT: { dot: "bg-primary", line: "bg-primary/40", label: "In transit" },

  DELIVERED: { dot: "bg-success", line: "bg-success/40", label: "Delivered" },

  CANCELLED: { dot: "bg-ink-faint", line: "bg-line", label: "Cancelled" },
};

const SUMMARY_GROUPS = [
  { key: "pending", label: "Pending", statuses: ["PENDING", "CONFIRMED"] },

  { key: "inTransit", label: "In transit", statuses: ["IN_TRANSIT"] },

  { key: "delivered", label: "Delivered", statuses: ["DELIVERED"] },
];

function formatDate(isoString) {
  if (!isoString) return "—";

  return new Date(isoString).toLocaleDateString("en-GB", {
    month: "short",

    day: "numeric",
  });
}

function StatusMetricPill({ label, count, dotClass }) {
  return (
    <View
      className="flex-row items-center gap-1.5 rounded-full bg-white border border-line/50 px-3 py-1 mr-2"
      style={shadows.sm}
    >
      <View className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />

      <Text className="text-[11.5px] font-bold text-ink">{count}</Text>

      <Text className="text-[10.5px] font-medium text-ink-muted">{label}</Text>
    </View>
  );
}

function StatusSummaryStrip({ orders }) {
  const counts = useMemo(() => {
    const tally = { pending: 0, inTransit: 0, delivered: 0 };

    for (const order of orders) {
      for (const group of SUMMARY_GROUPS) {
        if (group.statuses.includes(order.status)) {
          tally[group.key] += 1;

          break;
        }
      }
    }

    return tally;
  }, [orders]);

  const pills = [
    { ...SUMMARY_GROUPS[0], count: counts.pending, dot: "bg-warning" },

    { ...SUMMARY_GROUPS[1], count: counts.inTransit, dot: "bg-primary" },

    { ...SUMMARY_GROUPS[2], count: counts.delivered, dot: "bg-success" },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 6 }}
    >
      {pills.map((pill) => (
        <StatusMetricPill
          key={pill.key}
          label={pill.label}
          count={pill.count}
          dotClass={pill.dot}
        />
      ))}
    </ScrollView>
  );
}

function OrderRow({ order, activeTab, onPress, isLast }) {
  const statusStyle = STATUS_STYLES[order.status] ?? STATUS_STYLES.PENDING;

  const imageUri = order.listing?.images?.[0];

  const total = Number(order.quantity) * Number(order.pricePerUnitAtOrder);

  const counterpart = activeTab === TABS.BUYER ? order.farmer : order.buyer;

  const counterpartPrefix = activeTab === TABS.BUYER ? "From" : "To";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Order, ${order.listing?.title ?? "listing"}, status ${statusStyle.label}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
      className="flex-row mb-1"
    >
      <View className="w-5 items-center mr-3 pt-1">
        <View className={`w-2.5 h-2.5 rounded-full ${statusStyle.dot}`} />

        {!isLast ? (
          <View
            className={`w-[2px] flex-1 mt-1.5 rounded-full ${statusStyle.line}`}
          />
        ) : null}
      </View>

      <View
        className="flex-1 flex-row gap-3 pb-3 mb-1 border-b border-line/40"
        style={
          isLast
            ? { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }
            : undefined
        }
      >
        <View className="w-12 h-12 rounded-xl overflow-hidden bg-primary-muted">
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Feather name="package" size={18} color={colors.inkFaint} />
            </View>
          )}
        </View>

        <View className="flex-1 min-w-0">
          <View className="flex-row justify-between items-start gap-2">
            <Text
              className="text-[14px] font-extrabold text-ink flex-1 tracking-[-0.2px]"
              numberOfLines={1}
            >
              {order.listing?.title ?? "Order"}
            </Text>

            <Text className="text-[10px] font-bold text-ink-muted uppercase tracking-wide">
              {statusStyle.label}
            </Text>
          </View>

          {counterpart ? (
            <Text
              className="text-[11px] text-ink-muted mt-0.5"
              numberOfLines={1}
            >
              {counterpartPrefix} {counterpart.name}
            </Text>
          ) : null}

          <View className="flex-row justify-between items-end mt-1.5">
            <PriceText amount={total} size="sm" />

            <Text className="text-[10px] text-ink-faint font-medium">
              {formatDate(order.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export function MyOrdersPage() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState(TABS.BUYER);

  const buyerOrders = useBuyerOrders();

  const farmerOrders = useFarmerOrders();

  const unreadNotificationCount = useUnreadNotificationCount();

  const activeQuery = activeTab === TABS.BUYER ? buyerOrders : farmerOrders;

  const results = activeQuery.data?.results ?? [];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="Orders"
        subtitle="Track your transactions"
        leftAction={
          <HeaderActionButton
            icon="menu"
            size={20}
            accessibilityLabel="Menu"
            onPress={() => navigation.navigate("Profile")}
          />
        }
        rightAction={
          <HeaderActionButton
            icon="bell"
            size={18}
            accessibilityLabel="Notifications"
            badgeCount={unreadNotificationCount.data ?? 0}
            onPress={() => navigation.navigate("Notifications")}
          />
        }
      />

      <View className="px-5 pb-3">
        <SegmentedControl
          options={[
            { value: TABS.BUYER, label: "As buyer" },

            { value: TABS.FARMER, label: "As farmer" },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />
      </View>

      {activeQuery.isLoading ? (
        <LoadingState label="Loading orders…" />
      ) : activeQuery.isError ? (
        <ErrorState
          title="Couldn't load orders"
          message={getErrorMessage(activeQuery.error)}
          onRetry={() => activeQuery.refetch()}
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon="package"
          title={
            activeTab === TABS.BUYER
              ? "No orders yet"
              : "No orders on your listings"
          }
          description={
            activeTab === TABS.BUYER
              ? "Orders you place with farmers will show up here."
              : "Orders buyers place on your listings will show up here."
          }
          action={
            <Button
              label={
                activeTab === TABS.BUYER ? "Browse market" : "Create listing"
              }
              onPress={() =>
                navigation.navigate(
                  activeTab === TABS.BUYER ? "Marketplace" : "CreateListing",
                )
              }
              variant="secondary"
            />
          }
        />
      ) : (
        <>
          <StatusSummaryStrip orders={results} />

          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 20,

              paddingBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <OrderRow
                order={item}
                activeTab={activeTab}
                isLast={index === results.length - 1}
                onPress={() =>
                  navigation.navigate("OrderDetail", { orderId: item.id })
                }
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}
