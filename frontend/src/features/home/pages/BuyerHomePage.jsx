import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";

import { useSavedListingIds } from "../../marketplace/hooks/savedListingHooks.js";
import { useExpressedInterestIds } from "../../marketplace/hooks/listingInterestHooks.js";
import { useBuyerOrders } from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { SectionHeader, SectionLabel } from "../../../components/ui/SectionHeader.jsx";
import { StatStrip } from "../../../components/ui/StatStrip.jsx";
import { QuickAction, QuickActionGrid } from "../../../components/ui/QuickAction.jsx";
import { Banner, EmptyState, ErrorState, LoadingState } from "../../../components/ui/ScreenState.jsx";

const STATUS_STYLES = {
  PENDING: { dot: "bg-warning", label: "Pending" },
  CONFIRMED: { dot: "bg-info", label: "Confirmed" },
  IN_TRANSIT: { dot: "bg-primary", label: "In transit" },
  DELIVERED: { dot: "bg-success", label: "Delivered" },
  CANCELLED: { dot: "bg-ink-faint", label: "Cancelled" },
};

function firstName(fullName) {
  if (!fullName) return "there";
  return fullName.trim().split(/\s+/)[0];
}

function RecentOrderRow({ order, onPress, isLast }) {
  const style = STATUS_STYLES[order.status] ?? STATUS_STYLES.PENDING;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      className={`flex-row items-center py-3 px-4 ${isLast ? "" : "border-b border-line/50"}`}
    >
      <View className={`w-2 h-2 rounded-full mr-3 ${style.dot}`} />
      <View className="flex-1 min-w-0 mr-2">
        <Text className="text-[13.5px] font-bold text-ink" numberOfLines={1}>
          {order.listing?.title ?? "Order"}
        </Text>
        <Text className="text-[11.5px] text-ink-muted mt-0.5" numberOfLines={1}>
          {style.label} · {order.farmer?.name ?? "Farmer"}
        </Text>
      </View>
      <Feather name="chevron-right" size={16} color={colors.inkFaint} />
    </Pressable>
  );
}

export function BuyerHomePage() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const savedListingIds = useSavedListingIds();
  const expressedInterestIds = useExpressedInterestIds();
  const buyerOrders = useBuyerOrders();
  const unreadNotificationCount = useUnreadNotificationCount();
  const { isOnline } = useSyncStatus();

  const orders = buyerOrders.data?.results ?? [];
  const pendingOrders = orders.filter((o) =>
    ["PENDING", "CONFIRMED", "IN_TRANSIT"].includes(o.status),
  );
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.updatedAt ?? 0) - new Date(a.updatedAt ?? 0))
    .slice(0, 3);

  function goToTab(screen) {
    navigation.navigate("ProtectedTabs", { screen });
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title={`Welcome back, ${firstName(user?.fullName)}`}
        subtitle="Here's what's fresh today"
        leftAction={
          <HeaderActionButton
            icon="menu"
            size={20}
            accessibilityLabel="Menu"
            onPress={() => goToTab("Profile")}
          />
        }
        rightAction={
          <HeaderActionButton
            icon="bell"
            size={19}
            accessibilityLabel="Notifications"
            badgeCount={unreadNotificationCount.data ?? 0}
            onPress={() => navigation.navigate("Notifications")}
          />
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-5 pt-5">
          {!isOnline ? (
            <View className="mb-5">
              <Banner
                variant="warning"
                icon="wifi-off"
                title="You're offline"
                message="Some listings and prices may be out of date."
              />
            </View>
          ) : null}

          <SectionLabel>Overview</SectionLabel>
          <StatStrip
            className="mb-6"
            items={[
              {
                icon: "bookmark",
                value: String(savedListingIds.data?.size ?? 0),
                label: "Saved",
              },
              {
                icon: "heart",
                value: String(expressedInterestIds.data?.size ?? 0),
                label: "Interested",
                accent: "accent",
              },
              {
                icon: "truck",
                value: String(pendingOrders.length),
                label: "Active orders",
              },
            ]}
          />

          <SectionLabel>Quick actions</SectionLabel>
          <QuickActionGrid>
            <QuickAction
              icon="shopping-bag"
              label="Browse Market"
              accent="accent"
              onPress={() => goToTab("Marketplace")}
            />
            <QuickAction
              icon="search"
              label="Find Matches"
              onPress={() => goToTab("MatchSearch")}
            />
            <QuickAction
              icon="truck"
              label="My Orders"
              onPress={() => goToTab("MyOrders")}
            />
            <QuickAction
              icon="bell"
              label="Notifications"
              onPress={() => navigation.navigate("Notifications")}
            />
          </QuickActionGrid>
        </View>

        <View className="px-5 pt-6">
          <SectionHeader
            title="Recent orders"
            subtitle={`${orders.length} total`}
            actionLabel={orders.length > 0 ? "View all" : undefined}
            onAction={orders.length > 0 ? () => goToTab("MyOrders") : undefined}
          />

          {buyerOrders.isLoading ? (
            <View style={{ minHeight: 160 }}>
              <LoadingState label="Loading your orders…" />
            </View>
          ) : buyerOrders.isError ? (
            <View style={{ minHeight: 220 }}>
              <ErrorState
                title="Couldn't load your orders"
                message={getErrorMessage(buyerOrders.error)}
                onRetry={() => buyerOrders.refetch()}
              />
            </View>
          ) : recentOrders.length === 0 ? (
            <View style={{ minHeight: 220 }}>
              <EmptyState
                icon="shopping-bag"
                title="No orders yet"
                description="Browse the market or search for matches to place your first order."
              />
            </View>
          ) : (
            <View
              className="rounded-xl2 bg-white border border-line/50 overflow-hidden"
              style={shadows.card}
            >
              {recentOrders.map((order, index) => (
                <RecentOrderRow
                  key={order.id}
                  order={order}
                  isLast={index === recentOrders.length - 1}
                  onPress={() => navigation.navigate("OrderDetail", { orderId: order.id })}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
