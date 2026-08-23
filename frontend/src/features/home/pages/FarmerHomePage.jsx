import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { formatMoney } from "../../../lib/currency.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";

import { useMyListings } from "../../marketplace/hooks/marketplaceHooks.js";
import { useFarmerOrders } from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import { useInterestSummaryForFarmer } from "../../marketplace/hooks/listingInterestHooks.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { SectionHeader, SectionLabel } from "../../../components/ui/SectionHeader.jsx";
import { StatStrip } from "../../../components/ui/StatStrip.jsx";
import { QuickAction, QuickActionGrid } from "../../../components/ui/QuickAction.jsx";
import { Banner, EmptyState, ErrorState, LoadingState } from "../../../components/ui/ScreenState.jsx";

const STATUS_DOT = {
  ACTIVE: "bg-success",
  SOLD: "bg-info",
  REMOVED: "bg-ink-faint",
};

function firstName(fullName) {
  if (!fullName) return "there";
  return fullName.trim().split(/\s+/)[0];
}

function RecentListingRow({ listing, onPress, isLast }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      className={`flex-row items-center py-3 px-4 ${isLast ? "" : "border-b border-line/50"}`}
    >
      <View
        className={`w-2 h-2 rounded-full mr-3 ${STATUS_DOT[listing.status] ?? "bg-ink-faint"}`}
      />
      <View className="flex-1 min-w-0 mr-2">
        <Text className="text-[13.5px] font-bold text-ink" numberOfLines={1}>
          {listing.title}
        </Text>
        <Text className="text-[11.5px] text-ink-muted mt-0.5" numberOfLines={1}>
          {listing.quantity} {listing.quantityUnit?.toLowerCase()} · ₵
          {formatMoney(listing.pricePerUnit)}/unit
        </Text>
      </View>
      <Feather name="chevron-right" size={16} color={colors.inkFaint} />
    </Pressable>
  );
}

export function FarmerHomePage() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const myListings = useMyListings();
  const farmerOrders = useFarmerOrders();
  const interestSummary = useInterestSummaryForFarmer();
  const unreadNotificationCount = useUnreadNotificationCount();
  const { pendingCount, isOnline } = useSyncStatus();

  const listings = myListings.data ?? [];
  const activeListings = listings.filter((l) => l.status === "ACTIVE");
  const estimatedValue = activeListings.reduce(
    (sum, l) => sum + (Number(l.pricePerUnit) || 0) * (Number(l.quantity) || 0),
    0,
  );
  const pendingOrders = (farmerOrders.data?.results ?? []).filter((o) =>
    ["PENDING", "CONFIRMED"].includes(o.status),
  );
  const totalInterest = (interestSummary.data ?? []).reduce(
    (sum, row) => sum + (row.interestCount ?? 0),
    0,
  );

  const recentListings = [...listings]
    .sort((a, b) => new Date(b.updatedAt ?? 0) - new Date(a.updatedAt ?? 0))
    .slice(0, 3);

  function goToTab(screen) {
    navigation.navigate("ProtectedTabs", { screen });
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title={`Welcome back, ${firstName(user?.fullName)}`}
        subtitle="Here's your farm at a glance"
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
          {!isOnline || pendingCount > 0 ? (
            <View className="mb-5">
              <Banner
                variant="warning"
                icon="wifi-off"
                title={
                  pendingCount > 0
                    ? `${pendingCount} harvest${pendingCount === 1 ? "" : "es"} stored offline`
                    : "You're offline"
                }
                message={
                  pendingCount > 0
                    ? "They will sync automatically when you're back online."
                    : "New listings will be saved on this device for now."
                }
              />
            </View>
          ) : null}

          <SectionLabel>Overview</SectionLabel>
          <StatStrip
            className="mb-6"
            items={[
              { icon: "package", value: String(activeListings.length), label: "Listed" },
              {
                icon: "trending-up",
                value: `₵${formatMoney(estimatedValue)}`,
                label: "Earnings",
                accent: "accent",
              },
              { icon: "users", value: String(totalInterest), label: "Interest" },
            ]}
          />

          <SectionLabel>Quick actions</SectionLabel>
          <QuickActionGrid>
            <QuickAction
              icon="plus-circle"
              label="Log Harvest"
              accent="accent"
              onPress={() => goToTab("Sell")}
            />
            <QuickAction
              icon="grid"
              label="My Listings"
              onPress={() => goToTab("Listings")}
            />
            <QuickAction
              icon="truck"
              label="Orders"
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
            title="Recent listings"
            subtitle={`${listings.length} total`}
            actionLabel={listings.length > 0 ? "View all" : undefined}
            onAction={listings.length > 0 ? () => goToTab("Listings") : undefined}
          />

          {myListings.isLoading ? (
            <View style={{ minHeight: 160 }}>
              <LoadingState label="Loading your listings…" />
            </View>
          ) : myListings.isError ? (
            <View style={{ minHeight: 220 }}>
              <ErrorState
                title="Couldn't load your listings"
                message={getErrorMessage(myListings.error)}
                onRetry={() => myListings.refetch()}
              />
            </View>
          ) : recentListings.length === 0 ? (
            <View style={{ minHeight: 220 }}>
              <EmptyState
                icon="package"
                title="No listings yet"
                description="Start selling by logging your first harvest."
              />
            </View>
          ) : (
            <View
              className="rounded-xl2 bg-white border border-line/50 overflow-hidden"
              style={shadows.card}
            >
              {recentListings.map((listing, index) => (
                <RecentListingRow
                  key={listing.id}
                  listing={listing}
                  isLast={index === recentListings.length - 1}
                  onPress={() => {
                    if (listing.syncStatus === "pending") return;
                    navigation.navigate("EditListing", { listingId: listing.id });
                  }}
                />
              ))}
            </View>
          )}

          {pendingOrders.length > 0 ? (
            <View className="mt-6">
              <Banner
                variant="info"
                icon="clock"
                title={`${pendingOrders.length} order${pendingOrders.length === 1 ? "" : "s"} need attention`}
                message="Tap Orders to review and confirm pending buyer orders."
              />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
