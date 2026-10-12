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

import { Alert } from "../../../lib/alert.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";

import { Button } from "../../../components/ui/Button.jsx";
import { Chip } from "../../../components/ui/Chip.jsx";
import { PriceText } from "../../../components/ui/PriceText.jsx";
import { RemoteImage } from "../../../components/ui/RemoteImage.jsx";
import { Skeleton } from "../../../components/ui/Skeleton.jsx";
import { StatusPill } from "../../../components/ui/StatusPill.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import {
  Banner,
  EmptyState,
  ErrorState,
} from "../../../components/ui/ScreenState.jsx";

import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";
import { useInterestSummaryForFarmer } from "../hooks/listingInterestHooks.js";
import { useMyListings } from "../hooks/marketplaceHooks.js";
import { formatUnit, harvestLabel } from "../lib/listingFormat.js";

const FILTERS = [
  { value: "ALL", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "SOLD", label: "Sold" },
  { value: "REMOVED", label: "Removed" },
];

const STATUS_PILL = {
  ACTIVE: { label: "Active", tone: "success" },
  SOLD: { label: "Sold out", tone: "info" },
  REMOVED: { label: "Removed", tone: "neutral" },
};

const ManageListingCard = memo(function ManageListingCard({
  listing,
  interestCount,
  onEdit,
  onViewInterest,
}) {
  const pill = STATUS_PILL[listing.status] ?? STATUS_PILL.ACTIVE;
  const unit = formatUnit(listing.quantityUnit).toLowerCase();
  const syncing = listing.syncStatus === "pending";
  const freshness =
    listing.status === "ACTIVE" ? harvestLabel(listing.harvestDate) : null;

  return (
    <View
      className="bg-white rounded-2xl border border-line/60 mb-3 overflow-hidden"
      style={shadows.card}
    >
      <Pressable
        onPress={() => onEdit(listing)}
        accessibilityRole="button"
        accessibilityLabel={`${listing.title}, ${syncing ? "syncing" : pill.label}. Double tap to edit.`}
        style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
        className="flex-row p-3.5"
      >
        <View className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-primary-light mr-3">
          <RemoteImage
            uri={listing.images?.[0]}
            className="w-full h-full"
            iconSize={20}
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
              {listing.title}
            </Text>
            <StatusPill
              label={syncing ? "Syncing…" : pill.label}
              tone={syncing ? "warning" : pill.tone}
            />
          </View>
          <PriceText
            amount={listing.pricePerUnit}
            size="sm"
            suffix={`/ ${unit}`}
            className="mt-1"
          />
          <Text className="text-[12.5px] text-ink-muted mt-0.5">
            {listing.quantity} {unit} available
          </Text>
          {freshness ? (
            <View className="flex-row items-center mt-1">
              <Feather name="sunrise" size={11} color={colors.primary} />
              <Text className="text-[11.5px] font-semibold text-primary-dark ml-1">
                {freshness}
              </Text>
            </View>
          ) : null}
        </View>
      </Pressable>

      {listing.status === "ACTIVE" && !syncing ? (
        <Pressable
          onPress={() => onViewInterest(listing)}
          accessibilityRole="button"
          accessibilityLabel={`${interestCount} interested ${interestCount === 1 ? "buyer" : "buyers"}. View.`}
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
          className="flex-row items-center justify-between px-4 min-h-[48px] border-t border-line/60 bg-surface"
        >
          <View className="flex-row items-center">
            <Feather
              name="heart"
              size={14}
              color={interestCount > 0 ? colors.accentDark : colors.inkMuted}
            />
            <Text
              className={`text-[13px] ml-2 ${
                interestCount > 0 ? "font-bold text-ink" : "text-ink-muted"
              }`}
            >
              {interestCount > 0
                ? `${interestCount} interested`
                : "No interest yet"}
            </Text>
          </View>
          <Feather name="chevron-right" size={16} color={colors.inkMuted} />
        </Pressable>
      ) : null}
    </View>
  );
});

function ListSkeleton() {
  return (
    <View className="px-5" accessibilityLabel="Loading your listings">
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          className="bg-white rounded-2xl border border-line/60 p-3.5 mb-3 flex-row"
        >
          <Skeleton width={72} height={72} radius={12} />
          <View className="flex-1 ml-3">
            <Skeleton width="60%" height={15} />
            <Skeleton width="40%" height={13} style={{ marginTop: 10 }} />
            <Skeleton width="50%" height={12} style={{ marginTop: 8 }} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function MyListingsPage() {
  const navigation = useNavigation();
  const myListings = useMyListings();
  const { pendingCount, isOnline } = useSyncStatus();
  const interestSummary = useInterestSummaryForFarmer();
  const unreadNotificationCount = useUnreadNotificationCount();
  const [filter, setFilter] = useState("ALL");

  const listings = myListings.data ?? [];
  const interestByListingId = useMemo(
    () =>
      new Map(
        (interestSummary.data ?? []).map((r) => [r.listingId, r.interestCount]),
      ),
    [interestSummary.data],
  );

  const counts = useMemo(() => {
    const tally = { ALL: listings.length, ACTIVE: 0, SOLD: 0, REMOVED: 0 };
    for (const l of listings)
      if (tally[l.status] !== undefined) tally[l.status] += 1;
    return tally;
  }, [listings]);

  const visible = useMemo(
    () =>
      filter === "ALL" ? listings : listings.filter((l) => l.status === filter),
    [listings, filter],
  );

  const handleEdit = useCallback(
    (listing) => {
      if (listing.syncStatus === "pending") {
        Alert.alert(
          "Still syncing",
          "This listing was saved on this device and hasn't synced to the server yet, so it can't be edited until it does. It will sync automatically once you're online.",
        );
        return;
      }
      navigation.navigate("EditListing", { listingId: listing.id });
    },
    [navigation],
  );

  const handleViewInterest = useCallback(
    (listing) =>
      navigation.navigate("ListingInterest", {
        listingId: listing.id,
        listingTitle: listing.title,
      }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <ManageListingCard
        listing={item}
        interestCount={interestByListingId.get(item.id) ?? 0}
        onEdit={handleEdit}
        onViewInterest={handleViewInterest}
      />
    ),
    [interestByListingId, handleEdit, handleViewInterest],
  );

  let body = null;
  if (myListings.isLoading) {
    body = <ListSkeleton />;
  } else if (myListings.isError) {
    body = (
      <ErrorState
        title="Couldn't load your listings"
        message={getErrorMessage(myListings.error)}
        onRetry={() => myListings.refetch()}
      />
    );
  } else if (listings.length === 0) {
    body = (
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
    );
  } else if (visible.length === 0) {
    body = (
      <EmptyState
        icon="inbox"
        title={`No ${FILTERS.find((f) => f.value === filter)?.label.toLowerCase()} listings`}
        description="Listings with this status will appear here."
        action={
          <Button
            label="Show all"
            variant="secondary"
            onPress={() => setFilter("ALL")}
          />
        }
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <ScreenHeader
        title="My Listings"
        subtitle="Manage and track your harvests"
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
            size={19}
            accessibilityLabel="Notifications"
            badgeCount={unreadNotificationCount.data ?? 0}
            onPress={() => navigation.navigate("Notifications")}
          />
        }
      />

      {!isOnline || pendingCount > 0 ? (
        <View className="px-5 pt-4">
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

      {listings.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 12,
          }}
        >
          {FILTERS.map((f) => (
            <Chip
              key={f.value}
              label={
                counts[f.value] ? `${f.label} · ${counts[f.value]}` : f.label
              }
              isSelected={filter === f.value}
              onPress={() => setFilter(f.value)}
            />
          ))}
        </ScrollView>
      ) : null}

      {body ? (
        <View className="flex-1">{body}</View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          windowSize={7}
          refreshControl={
            <RefreshControl
              refreshing={myListings.isRefetching && !myListings.isLoading}
              onRefresh={() => {
                myListings.refetch();
                interestSummary.refetch();
              }}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
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
