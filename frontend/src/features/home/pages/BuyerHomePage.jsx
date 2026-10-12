import { useCallback } from "react";
import {
  View,
  ScrollView,
  Pressable,
  FlatList,
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
import { useSyncStatus } from "../../../lib/useSyncStatus.js";

import { useExpressedInterestIds } from "../../marketplace/hooks/listingInterestHooks.js";
import { useListings } from "../../marketplace/hooks/marketplaceHooks.js";
import { useToggleSaveListing } from "../../marketplace/hooks/useToggleSaveListing.js";
import { ProduceCard } from "../../marketplace/components/ProduceCard.jsx";
import { CROP_LIST } from "../../marketplace/lib/cropMeta.js";
import { useBuyerOrders } from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import {
  getOrderStatusCopy,
  getOrderStatusMeta,
} from "../../deliveryTracking/lib/orderStatus.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { SectionHeader } from "../../../components/ui/SectionHeader.jsx";
import { StatStrip } from "../../../components/ui/StatStrip.jsx";
import { FocusCard } from "../../../components/ui/FocusCard.jsx";
import { ProduceCardSkeleton } from "../../../components/ui/Skeleton.jsx";
import { Banner } from "../../../components/ui/ScreenState.jsx";

const HOME_FEED_FILTERS = { page: 1, limit: 8 };
const RAIL_CARD_WIDTH = 176;
const IN_PROGRESS = [
  "PENDING",
  "CONFIRMED",
  "IN_TRANSIT",
  "DISPUTED",
  "CANCELLATION_REQUESTED",
];

function firstName(fullName) {
  if (!fullName) return "there";
  return fullName.trim().split(/\s+/)[0];
}

function SearchPill({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Search fresh produce"
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1, ...shadows.md })}
      className="flex-row items-center bg-white rounded-xl px-4 min-h-[48px]"
    >
      <Feather name="search" size={18} color={colors.inkMuted} />
      <Text className="text-[14.5px] text-ink-muted ml-3">
        Search tomatoes, maize, yam…
      </Text>
    </Pressable>
  );
}

function CategoryRail({ onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
    >
      {CROP_LIST.map((crop) => (
        <Pressable
          key={crop.value}
          onPress={() => onSelect(crop.value)}
          accessibilityRole="button"
          accessibilityLabel={`Browse ${crop.label}`}
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
          className="items-center w-[68px]"
        >
          <View
            className="w-16 h-16 rounded-full bg-white border border-line/60 items-center justify-center"
            style={shadows.sm}
          >
            <Text
              style={{ fontSize: 28 }}
              allowFontScaling={false}
              accessible={false}
            >
              {crop.emoji}
            </Text>
          </View>
          <Text
            className="text-[12px] font-semibold text-ink-secondary mt-1.5"
            numberOfLines={1}
          >
            {crop.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function RecentOrderRow({ order, onPress, isLast }) {
  const meta = getOrderStatusMeta(order.status);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${order.listing?.title ?? "Order"}, ${meta.label}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      className={`flex-row items-center py-3.5 px-4 min-h-[56px] ${isLast ? "" : "border-b border-line/50"}`}
    >
      <View className={`w-2 h-2 rounded-full mr-3 ${meta.dot}`} />
      <View className="flex-1 min-w-0 mr-2">
        <Text className="text-[14px] font-bold text-ink" numberOfLines={1}>
          {order.listing?.title ?? "Order"}
        </Text>
        <Text className="text-[12px] text-ink-muted mt-0.5" numberOfLines={1}>
          {meta.label} · {order.farmer?.name ?? "Farmer"}
        </Text>
      </View>
      <Feather name="chevron-right" size={16} color={colors.inkMuted} />
    </Pressable>
  );
}

export function BuyerHomePage() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { savedIds, isSaved, toggle } = useToggleSaveListing();
  const expressedInterestIds = useExpressedInterestIds();
  const buyerOrders = useBuyerOrders();
  const unreadNotificationCount = useUnreadNotificationCount();
  const listings = useListings(HOME_FEED_FILTERS);
  const { isOnline } = useSyncStatus();

  const goToTab = useCallback(
    (screen, params) =>
      navigation.navigate("ProtectedTabs", { screen, params }),
    [navigation],
  );
  const openListing = useCallback(
    (listing) =>
      navigation.navigate("ListingDetail", { listingId: listing.id }),
    [navigation],
  );

  const orders = buyerOrders.data?.results ?? [];
  const activeOrders = orders.filter((o) =>
    ["PENDING", "CONFIRMED", "IN_TRANSIT"].includes(o.status),
  );
  const focusOrder = [...orders]
    .filter((o) => IN_PROGRESS.includes(o.status))
    .sort((a, b) => new Date(b.updatedAt ?? 0) - new Date(a.updatedAt ?? 0))[0];
  const focusMeta = focusOrder ? getOrderStatusMeta(focusOrder.status) : null;
  const focusCopy = focusOrder
    ? getOrderStatusCopy({ status: focusOrder.status, isFarmer: false })
    : null;
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.updatedAt ?? 0) - new Date(a.updatedAt ?? 0))
    .slice(0, 3);

  const railItems = listings.data?.results ?? [];
  const refreshing =
    (listings.isRefetching || buyerOrders.isRefetching) &&
    !listings.isLoading &&
    !buyerOrders.isLoading;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <ScreenHeader
        title={`Hi, ${firstName(user?.fullName)}`}
        tone="tinted"
        subtitle="Here's what's fresh today"
        rightAction={
          <HeaderActionButton
            icon="bell"
            size={19}
            accessibilityLabel="Notifications"
            badgeCount={unreadNotificationCount.data ?? 0}
            onPress={() => navigation.navigate("Notifications")}
          />
        }
      >
        <SearchPill
          onPress={() => goToTab("Marketplace", { focusSearch: true })}
        />
      </ScreenHeader>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() =>
              Promise.all([listings.refetch(), buyerOrders.refetch()])
            }
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {!isOnline ? (
          <View className="px-5 pt-5">
            <Banner
              variant="warning"
              icon="wifi-off"
              title="You're offline"
              message="Some listings and prices may be out of date."
            />
          </View>
        ) : null}

        {focusOrder ? (
          <View className="px-5 pt-5">
            <FocusCard
              icon={focusMeta.icon}
              eyebrow={`${focusMeta.label} · ${focusOrder.listing?.title ?? "Order"}`}
              title={focusCopy.title}
              subtitle={focusCopy.next}
              tone={focusCopy.actionNeeded ? "accent" : "primary"}
              onPress={() =>
                navigation.navigate("OrderDetail", { orderId: focusOrder.id })
              }
            />
          </View>
        ) : null}

        <View className="pt-6">
          <View className="px-5">
            <SectionHeader title="Shop by crop" />
          </View>
          <CategoryRail
            onSelect={(cropType) => goToTab("Marketplace", { cropType })}
          />
        </View>

        <View className="pt-7">
          <View className="px-5">
            <SectionHeader
              title="Just listed"
              subtitle="Newest produce from farmers"
              actionLabel="See all"
              onAction={() => goToTab("Marketplace")}
            />
          </View>

          {listings.isLoading ? (
            <ScrollView
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            >
              {[0, 1, 2].map((i) => (
                <ProduceCardSkeleton key={i} width={RAIL_CARD_WIDTH} />
              ))}
            </ScrollView>
          ) : listings.isError ? (
            <View className="mx-5 rounded-2xl bg-white border border-line/60 p-4">
              <Text className="text-[13.5px] text-ink-secondary">
                {getErrorMessage(listings.error)}
              </Text>
              <Pressable
                onPress={() => listings.refetch()}
                accessibilityRole="button"
                accessibilityLabel="Try loading listings again"
                className="self-start min-h-[44px] justify-center"
              >
                <Text className="text-[13.5px] font-bold text-primary">
                  Try again
                </Text>
              </Pressable>
            </View>
          ) : railItems.length === 0 ? (
            <View className="mx-5 rounded-2xl bg-white border border-line/60 p-4">
              <Text className="text-[13.5px] text-ink-secondary">
                No produce is listed yet. New listings will appear here as
                farmers add them.
              </Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={railItems}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
              renderItem={({ item }) => (
                <ProduceCard
                  listing={item}
                  width={RAIL_CARD_WIDTH}
                  isSaved={isSaved(item.id)}
                  onPress={openListing}
                  onToggleSave={toggle}
                />
              )}
            />
          )}
        </View>

        <View className="px-5 pt-7">
          <SectionHeader title="Your activity" />
          <StatStrip
            items={[
              {
                icon: "bookmark",
                value: String(savedIds.data?.size ?? 0),
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
                value: String(activeOrders.length),
                label: "Active orders",
              },
            ]}
          />
        </View>

        <View className="px-5 pt-7">
          <SectionHeader
            title="Recent orders"
            actionLabel={orders.length > 0 ? "View all" : undefined}
            onAction={orders.length > 0 ? () => goToTab("MyOrders") : undefined}
          />
          {buyerOrders.isError ? (
            <Banner
              variant="warning"
              icon="alert-triangle"
              title="Couldn't load your orders"
              message="Pull down to try again."
            />
          ) : buyerOrders.isLoading ? null : recentOrders.length === 0 ? (
            <Pressable
              onPress={() => goToTab("Marketplace")}
              accessibilityRole="button"
              accessibilityLabel="Browse the market to place your first order"
              style={shadows.card}
              className="flex-row items-center rounded-2xl bg-white border border-line/60 p-4"
            >
              <View className="w-11 h-11 rounded-full bg-primary-light items-center justify-center mr-3">
                <Feather name="shopping-bag" size={19} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-ink">
                  Place your first order
                </Text>
                <Text className="text-[13px] text-ink-secondary mt-0.5">
                  Browse the market and buy direct from farmers.
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.inkMuted} />
            </Pressable>
          ) : (
            <View
              className="rounded-2xl bg-white border border-line/50 overflow-hidden"
              style={shadows.card}
            >
              {recentOrders.map((order, index) => (
                <RecentOrderRow
                  key={order.id}
                  order={order}
                  isLast={index === recentOrders.length - 1}
                  onPress={() =>
                    navigation.navigate("OrderDetail", { orderId: order.id })
                  }
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
