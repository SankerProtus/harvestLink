import { View, Text, FlatList } from "react-native";
import { Alert } from "../../../lib/alert.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import { useInterestSummaryForFarmer } from "../hooks/listingInterestHooks.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";
import { Button } from "../../../components/ui/Button.jsx";
import {
  SectionHeader,
  SectionLabel,
} from "../../../components/ui/SectionHeader.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { ListingCard } from "../components/ListingCard.jsx";
import { useMyListings } from "../hooks/marketplaceHooks.js";
import { useFarmerOrders } from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { formatMoney } from "../../../lib/currency.js";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  Banner,
} from "../../../components/ui/ScreenState.jsx";

// A single, compact stat strip — one card, three columns divided by thin
// rules — instead of three separately-padded MetricCards. Production
// dashboards (order-management apps, POS home screens) favor this dense
// row so the "overview" reads at a glance without pushing the actual
// content (the listings list) below the fold.
function OverviewStat({
  icon,
  value,
  label,
  accent = "primary",
  isLast = false,
}) {
  const iconBg = accent === "accent" ? "bg-accent-light" : "bg-primary-muted";
  const iconColor = accent === "accent" ? colors.accent : colors.primary;

  return (
    <View
      className={`flex-1 flex-row items-center gap-2.5 py-3 px-3 ${
        isLast ? "" : "border-r border-line/60"
      }`}
    >
      <View
        className={`w-8 h-8 rounded-xl items-center justify-center ${iconBg}`}
      >
        <Feather name={icon} size={14} color={iconColor} />
      </View>
      <View className="flex-1 min-w-0">
        <Text
          className="text-[15px] font-extrabold text-ink tracking-[-0.2px]"
          numberOfLines={1}
        >
          {value}
        </Text>
        <Text
          className="text-[9.5px] font-semibold text-ink-muted uppercase tracking-wide"
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}

export function MyListingsPage() {
  const navigation = useNavigation();
  const myListings = useMyListings();
  const farmerOrders = useFarmerOrders();
  const { pendingCount, isOnline } = useSyncStatus();
  const interestSummary = useInterestSummaryForFarmer();
  const unreadNotificationCount = useUnreadNotificationCount();
  const interestCountByListingId = new Map(
    (interestSummary.data ?? []).map((row) => [
      row.listingId,
      row.interestCount,
    ]),
  );

  const listings = myListings.data ?? [];
  const activeListings = listings.filter((l) => l.status === "ACTIVE");
  const estimatedValue = activeListings.reduce(
    (sum, l) => sum + (Number(l.pricePerUnit) || 0) * (Number(l.quantity) || 0),
    0,
  );

  const pendingOrders = (farmerOrders.data?.results ?? []).filter((o) =>
    ["PENDING", "CONFIRMED"].includes(o.status),
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="Farmer Dashboard"
        subtitle="Manage your harvest listings"
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
            size={19}
            accessibilityLabel="Notifications"
            badgeCount={unreadNotificationCount.data ?? 0}
            onPress={() => navigation.navigate("Notifications")}
          />
        }
      />

      <View className="px-5 pt-5 pb-3">
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
        <View
          className="flex-row rounded-xl2 bg-white border border-line/50 mb-5"
          style={shadows.card}
        >
          <OverviewStat
            icon="package"
            value={String(activeListings.length)}
            label="Listed"
          />
          <OverviewStat
            icon="trending-up"
            value={`₵${formatMoney(estimatedValue)}`}
            label="Earnings"
            accent="accent"
          />
          <OverviewStat
            icon="users"
            value={String(pendingOrders.length)}
            label="Matches"
            isLast
          />
        </View>

        <SectionHeader
          title="Your listings"
          subtitle={`${listings.length} total`}
        />
      </View>

      {myListings.isLoading ? (
        <LoadingState label="Loading your listings…" />
      ) : myListings.isError ? (
        <ErrorState
          title="Couldn't load your listings"
          message={getErrorMessage(myListings.error)}
          onRetry={() => myListings.refetch()}
        />
      ) : listings.length === 0 ? (
        <EmptyState
          icon="package"
          title="No listings yet"
          description="Start selling by logging your first harvest."
          action={
            <Button
              label="Log New Harvest"
              icon="plus"
              onPress={() => navigation.navigate("CreateListing")}
            />
          }
        />
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ListingCard
              listing={item}
              interestCount={interestCountByListingId.get(item.id) ?? 0}
              onViewInterest={(listing) =>
                navigation.navigate("ListingInterest", {
                  listingId: listing.id,
                  listingTitle: listing.title,
                })
              }
              onPress={() => {
                if (item.syncStatus === "pending") {
                  Alert.alert(
                    "Still syncing",
                    "This listing was saved on this device and hasn't synced to the server yet, so it can't be edited until it does. It will sync automatically once you're online.",
                  );
                  return;
                }
                navigation.navigate("EditListing", { listingId: item.id });
              }}
            />
          )}
        />
      )}

      {listings.length > 0 ? (
        <View className="px-5 pt-2 pb-5 bg-surface">
          <Button
            label="Log New Harvest"
            icon="plus"
            onPress={() => navigation.navigate("CreateListing")}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
