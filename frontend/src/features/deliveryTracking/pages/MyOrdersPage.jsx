import { memo, useCallback, useMemo, useState } from "react";
import {
  View,
  FlatList,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { getErrorMessage } from "../../../lib/errorMap.js";

import { Button } from "../../../components/ui/Button.jsx";
import { Chip } from "../../../components/ui/Chip.jsx";
import { PriceText } from "../../../components/ui/PriceText.jsx";
import { RemoteImage } from "../../../components/ui/RemoteImage.jsx";
import { SegmentedControl } from "../../../components/ui/SegmentedControl.jsx";
import { Skeleton } from "../../../components/ui/Skeleton.jsx";
import { StatusPill } from "../../../components/ui/StatusPill.jsx";
import { TrustBadge } from "../../../components/ui/TrustBadge.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { EmptyState, ErrorState } from "../../../components/ui/ScreenState.jsx";

import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";
import {
  useFarmerSummary,
  useInfiniteBuyerOrders,
  useInfiniteFarmerOrders,
} from "../hooks/deliveryTrackingHooks.js";
import { getOrderStatusCopy, getOrderStatusMeta } from "../lib/orderStatus.js";

const TABS = { BUYER: "buyer", FARMER: "farmer" };
const PAGE_SIZE = 20;

const FILTERS = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "IN_TRANSIT", label: "In transit" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLATION_REQUESTED", label: "Cancellation" },
  { value: "DISPUTED", label: "Disputed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

const OrderRow = memo(function OrderRow({ order, activeTab, onPress }) {
  const isFarmerView = activeTab === TABS.FARMER;
  const meta = getOrderStatusMeta(order.status);
  const copy = getOrderStatusCopy({
    status: order.status,
    isFarmer: isFarmerView,
  });
  const total = Number(order.quantity) * Number(order.pricePerUnitAtOrder);
  const counterpart = isFarmerView ? order.buyer : order.farmer;
  const protectedPayment = ["FUNDED", "FROZEN"].includes(order.escrow?.status);

  return (
    <Pressable
      onPress={() => onPress(order)}
      accessibilityRole="button"
      accessibilityLabel={`${order.listing?.title ?? "Order"}, ${meta.label}${
        copy.actionNeeded ? ", action needed" : ""
      }, total ${total.toFixed(2)} cedis`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.94 : 1,
        transform: [{ scale: pressed ? 0.99 : 1 }],
        ...shadows.card,
      })}
      className="bg-white rounded-2xl border border-line/60 mb-3 overflow-hidden"
    >
      <View className="flex-row p-3.5">
        <View className="w-14 h-14 rounded-xl overflow-hidden bg-primary-light mr-3">
          <RemoteImage
            uri={order.listing?.images?.[0]}
            className="w-full h-full"
            iconSize={18}
            icon="package"
          />
        </View>
        <View className="flex-1 min-w-0">
          <View
            className="flex-row items-start justify-between"
            style={{ gap: 8 }}
          >
            <Text
              className="text-[15px] font-extrabold text-ink flex-1 tracking-[-0.2px]"
              numberOfLines={1}
            >
              {order.listing?.title ?? "Order"}
            </Text>
            <StatusPill label={meta.label} tone={meta.tone} />
          </View>
          <Text
            className="text-[12.5px] text-ink-muted mt-0.5"
            numberOfLines={1}
          >
            {isFarmerView ? "To" : "From"} {counterpart?.name ?? "—"} · Qty{" "}
            {order.quantity}
          </Text>
          <View className="flex-row items-end justify-between mt-2">
            <PriceText amount={total} size="sm" />
            <Text className="text-[11.5px] text-ink-muted">
              {formatDate(order.createdAt)}
            </Text>
          </View>
        </View>
      </View>

      {copy.actionNeeded ? (
        <View className="flex-row items-center px-3.5 py-2.5 bg-accent-light border-t border-accent/20">
          <Feather name="alert-circle" size={14} color={colors.accentDark} />
          <Text
            className="text-[12.5px] font-bold text-accent-dark ml-2 flex-1"
            numberOfLines={1}
          >
            Action needed · {copy.title}
          </Text>
        </View>
      ) : protectedPayment ? (
        <View className="px-3.5 pb-3">
          <TrustBadge type="paymentProtected" size="sm" />
        </View>
      ) : null}
    </Pressable>
  );
});

function OrderListSkeleton() {
  return (
    <View className="px-5" accessibilityLabel="Loading orders">
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          className="bg-white rounded-2xl border border-line/60 p-3.5 mb-3 flex-row"
        >
          <Skeleton width={56} height={56} radius={12} />
          <View className="flex-1 ml-3">
            <Skeleton width="60%" height={15} />
            <Skeleton width="40%" height={12} style={{ marginTop: 8 }} />
            <Skeleton width="30%" height={15} style={{ marginTop: 10 }} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function MyOrdersPage() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const isBuyerRole = user?.role === "BUYER";

  const [activeTab, setActiveTab] = useState(
    isBuyerRole ? TABS.BUYER : TABS.FARMER,
  );
  const [statusFilter, setStatusFilter] = useState("ALL");
  const unreadNotificationCount = useUnreadNotificationCount();

  const filters = useMemo(
    () => ({
      limit: PAGE_SIZE,
      ...(statusFilter !== "ALL" ? { status: statusFilter } : {}),
    }),
    [statusFilter],
  );

  const buyerOrders = useInfiniteBuyerOrders(filters, {
    enabled: activeTab === TABS.BUYER,
  });
  const farmerOrders = useInfiniteFarmerOrders(filters, {
    enabled: activeTab === TABS.FARMER,
  });
  const summary = useFarmerSummary({ enabled: !isBuyerRole });

  const query = activeTab === TABS.BUYER ? buyerOrders : farmerOrders;

  const results = useMemo(() => {
    const seen = new Set();
    return (query.data?.pages ?? [])
      .flatMap((page) => page.results)
      .filter((item) => !seen.has(item.id) && seen.add(item.id));
  }, [query.data]);

  // Exact counts are only available for the farmer side (server-side totals).
  const statusCounts =
    activeTab === TABS.FARMER ? summary.data?.statusCounts : undefined;
  const totalOrders = statusCounts
    ? Object.values(statusCounts).reduce((sum, n) => sum + n, 0)
    : undefined;

  const openOrder = useCallback(
    (order) => navigation.navigate("OrderDetail", { orderId: order.id }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <OrderRow order={item} activeTab={activeTab} onPress={openOrder} />
    ),
    [activeTab, openOrder],
  );

  function handleTabChange(tab) {
    setActiveTab(tab);
    setStatusFilter("ALL");
  }

  function handleEndReached() {
    if (
      query.hasNextPage &&
      !query.isFetchingNextPage &&
      !query.isFetchNextPageError
    ) {
      query.fetchNextPage();
    }
  }

  const filterLabel =
    FILTERS.find((f) => f.value === statusFilter)?.label ?? "";

  const chips = (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}
    >
      {FILTERS.map((f) => {
        const count = f.value === "ALL" ? totalOrders : statusCounts?.[f.value];
        return (
          <Chip
            key={f.value}
            label={count ? `${f.label} · ${count}` : f.label}
            isSelected={statusFilter === f.value}
            onPress={() => setStatusFilter(f.value)}
          />
        );
      })}
    </ScrollView>
  );

  let body;
  if (query.isLoading) {
    body = <OrderListSkeleton />;
  } else if (query.isError) {
    body = (
      <ErrorState
        title="Couldn't load orders"
        message={getErrorMessage(query.error)}
        onRetry={() => query.refetch()}
      />
    );
  } else if (results.length === 0) {
    body =
      statusFilter !== "ALL" ? (
        <EmptyState
          icon="inbox"
          title={`No ${filterLabel.toLowerCase()} orders`}
          description="Orders with this status will appear here."
          action={
            <Button
              label="Show all orders"
              variant="secondary"
              onPress={() => setStatusFilter("ALL")}
            />
          }
        />
      ) : (
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
              variant="secondary"
              onPress={() => {
                if (activeTab === TABS.BUYER) {
                  // Farmers have no Marketplace tab, so they use the standalone browse screen.
                  if (isBuyerRole) {
                    navigation.navigate("ProtectedTabs", {
                      screen: "Marketplace",
                    });
                  } else {
                    navigation.navigate("MarketplaceBrowse");
                  }
                } else {
                  navigation.navigate("CreateListing");
                }
              }}
            />
          }
        />
      );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <ScreenHeader
        title="Orders"
        subtitle="Track your transactions"
        leftAction={
          <HeaderActionButton
            icon="user"
            size={20}
            accessibilityLabel="Profile"
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

      {isBuyerRole ? null : (
        <View className="px-5 pt-4 pb-3">
          <SegmentedControl
            options={[
              { value: TABS.BUYER, label: "As buyer" },
              { value: TABS.FARMER, label: "As farmer" },
            ]}
            value={activeTab}
            onChange={handleTabChange}
          />
        </View>
      )}

      <View className={isBuyerRole ? "pt-4" : ""}>{chips}</View>

      {body && !query.isLoading ? (
        <View className="flex-1">{body}</View>
      ) : query.isLoading ? (
        body
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.6}
          initialNumToRender={8}
          windowSize={7}
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              refreshing={query.isRefetching && !query.isFetchingNextPage}
              onRefresh={() => {
                query.refetch();
                if (activeTab === TABS.FARMER) summary.refetch();
              }}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          ListFooterComponent={
            query.isFetchingNextPage ? (
              <Skeleton height={88} radius={16} style={{ marginTop: 4 }} />
            ) : query.isFetchNextPageError ? (
              <Pressable
                onPress={() => query.fetchNextPage()}
                accessibilityRole="button"
                accessibilityLabel="Couldn't load more orders. Tap to retry."
                className="items-center justify-center min-h-[56px]"
              >
                <Text className="text-[13.5px] font-bold text-primary">
                  Couldn't load more. Tap to retry
                </Text>
              </Pressable>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}
