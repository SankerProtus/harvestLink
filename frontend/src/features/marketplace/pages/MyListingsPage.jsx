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
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { ListingCard } from "../components/ListingCard.jsx";
import { useMyListings } from "../hooks/marketplaceHooks.js";
import { useFarmerOrders } from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  Banner,
} from "../../../components/ui/ScreenState.jsx";

// Compact, single-row overview strip. Modelled on the stat-bar pattern used
// by production fintech/marketplace dashboards (Stripe, Cash App) — one flat
// card with vertical dividers, rather than three separately-padded/shadowed
// cards stacked with gaps. Cuts the overview's vertical footprint roughly in
// half so the listings below are visible without scrolling past it.
function OverviewCell({
  label,
  value,
  icon,
  accent = "primary",
  isLast = false,
}) {
  const iconBg = accent === "accent" ? "bg-accent-light" : "bg-primary-muted";
  const iconColor = accent === "accent" ? colors.accent : colors.primary;

  return (
    <View
      className={`flex-1 flex-row items-center py-3 px-3 ${
        isLast ? "" : "border-r border-line/60"
      }`}
    >
      <View
        className={`w-7 h-7 rounded-lg items-center justify-center mr-2 ${iconBg}`}
      >
        <Feather name={icon} size={12} color={iconColor} />
      </View>
      <View className="flex-shrink">
        <Text
          className="text-[14px] leading-[16px] font-extrabold text-ink tracking-[-0.2px]"
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

function OverviewStrip({ listed, earnings, matches }) {
  return (
    <View
      className="flex-row rounded-xl2 bg-white border border-line/50 mb-6"
      style={shadows.card}
    >
      <OverviewCell label="Listed" value={listed} icon="package" />
      <OverviewCell
        label="Earnings"
        value={earnings}
        icon="trending-up"
        accent="accent"
      />
      <OverviewCell label="Matches" value={matches} icon="users" isLast />
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

        <OverviewStrip
          listed={String(activeListings.length)}
          earnings={`₵${estimatedValue.toLocaleString()}`}
          matches={String(pendingOrders.length)}
        />

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
