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

import { Alert } from "../../../lib/alert.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import { formatCurrency } from "../../../lib/currency.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";

import { useProfile } from "../../auth/hooks/authHooks.js";
import { useMyListings } from "../../marketplace/hooks/marketplaceHooks.js";
import { useFarmerSummary } from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import { useInterestSummaryForFarmer } from "../../marketplace/hooks/listingInterestHooks.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";
import { ProduceCard } from "../../marketplace/components/ProduceCard.jsx";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import {
  SectionHeader,
  SectionLabel,
} from "../../../components/ui/SectionHeader.jsx";
import { StatStrip } from "../../../components/ui/StatStrip.jsx";
import { AttentionList } from "../../../components/ui/FocusCard.jsx";
import { TrustBadge } from "../../../components/ui/TrustBadge.jsx";
import { Banner } from "../../../components/ui/ScreenState.jsx";
import {
  Skeleton,
  ProduceCardSkeleton,
} from "../../../components/ui/Skeleton.jsx";

const RAIL_CARD_WIDTH = 176;

function firstName(fullName) {
  if (!fullName) return "there";
  return fullName.trim().split(/\s+/)[0];
}

function LogHarvestButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Log a new harvest"
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1, ...shadows.md })}
      className="flex-row items-center justify-center bg-primary rounded-xl px-4 min-h-[48px]"
    >
      <Feather name="plus-circle" size={19} color={colors.white} />
      <Text className="text-[15px] font-bold text-white ml-2.5">
        Log a new harvest
      </Text>
    </Pressable>
  );
}

function EarningsCard({ summary }) {
  const money = summary.data?.money ?? [];
  const m = money.find((x) => x.currency === "GHS") ?? money[0];
  const currency = m?.currency ?? "GHS";
  const paidOut = m?.paidOut ?? 0;
  const onTheWay = m?.payoutPending ?? 0;
  const inProtection = m?.inProtection ?? 0;
  const hasAny = paidOut > 0 || onTheWay > 0 || inProtection > 0;

  return (
    <View
      className="rounded-2xl bg-white border border-line/60 p-4"
      style={shadows.card}
      accessible
      accessibilityLabel={`Earnings. ${formatCurrency(paidOut, currency)} paid out. ${formatCurrency(onTheWay, currency)} on the way. ${formatCurrency(inProtection, currency)} in buyer protection.`}
    >
      <Text className="text-[11px] font-bold uppercase tracking-[1px] text-ink-muted">
        Earnings
      </Text>
      <Text
        className="text-[30px] font-extrabold text-ink mt-1 tracking-[-0.8px]"
        style={TABULAR_NUMS}
      >
        {formatCurrency(paidOut, currency)}
      </Text>
      <Text className="text-[13px] text-ink-secondary mt-0.5">
        Paid out to you so far
      </Text>

      <View className="flex-row mt-4 pt-4 border-t border-line/60">
        <View className="flex-1">
          <Text className="text-[11.5px] text-ink-muted">On the way</Text>
          <Text
            className="text-[16px] font-bold text-ink mt-0.5"
            style={TABULAR_NUMS}
          >
            {formatCurrency(onTheWay, currency)}
          </Text>
        </View>
        <View className="flex-1 items-end">
          <Text className="text-[11.5px] text-ink-muted">
            In buyer protection
          </Text>
          <Text
            className="text-[16px] font-bold text-primary-dark mt-0.5"
            style={TABULAR_NUMS}
          >
            {formatCurrency(inProtection, currency)}
          </Text>
        </View>
      </View>
      {!hasAny ? (
        <Text className="text-[12.5px] text-ink-muted mt-3 leading-[18px]">
          Earnings appear here after your first delivered order.
        </Text>
      ) : null}
    </View>
  );
}

function TrustStatusCard({ level, onPress }) {
  const verified = level >= 1;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        verified
          ? "You are a verified farmer. View verification status."
          : "Get verified. Verified farmers show a badge on every listing."
      }
      style={({ pressed }) => ({
        opacity: pressed ? 0.92 : 1,
        ...shadows.card,
      })}
      className={`flex-row items-center rounded-2xl border p-4 ${
        verified
          ? "bg-white border-line/60"
          : "bg-accent-light border-accent/30"
      }`}
    >
      <View className="flex-1 mr-3">
        {verified ? (
          <>
            <TrustBadge type="verifiedFarmer" />
            <Text className="text-[13px] text-ink-secondary mt-2 leading-[19px]">
              Buyers see a verified badge on all your listings.
            </Text>
          </>
        ) : (
          <>
            <Text className="text-[15px] font-bold text-ink">Get verified</Text>
            <Text className="text-[13px] text-ink-secondary mt-1 leading-[19px]">
              Verified farmers show a badge on every listing, which helps buyers
              trust your produce.
            </Text>
          </>
        )}
      </View>
      <Feather name="chevron-right" size={18} color={colors.inkMuted} />
    </Pressable>
  );
}

export function FarmerHomePage() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const profile = useProfile();
  const myListings = useMyListings();
  const summary = useFarmerSummary();
  const interestSummary = useInterestSummaryForFarmer();
  const unreadNotificationCount = useUnreadNotificationCount();
  const { pendingCount, isOnline } = useSyncStatus();

  const goToTab = useCallback(
    (screen) => navigation.navigate("ProtectedTabs", { screen }),
    [navigation],
  );

  const listings = myListings.data ?? [];
  const activeListings = listings.filter((l) => l.status === "ACTIVE");
  const totalInterest = (interestSummary.data ?? []).reduce(
    (sum, row) => sum + (row.interestCount ?? 0),
    0,
  );
  const counts = summary.data?.statusCounts ?? {};
  const delivered = counts.DELIVERED ?? 0;

  const attentionItems = [
    {
      key: "pending",
      icon: "inbox",
      label: "New orders to confirm",
      hint: "Buyers are waiting for you",
      count: counts.PENDING ?? 0,
    },
    {
      key: "confirmed",
      icon: "truck",
      label: "Ready to deliver",
      hint: "Start delivery when you set off",
      count: counts.CONFIRMED ?? 0,
    },
    {
      key: "transit",
      icon: "navigation",
      label: "Out for delivery",
      hint: "Share the handover code at drop-off",
      count: counts.IN_TRANSIT ?? 0,
    },
    {
      key: "cancel",
      icon: "x-circle",
      label: "Cancellations in progress",
      hint: "Open the order to respond",
      count: counts.CANCELLATION_REQUESTED ?? 0,
    },
    {
      key: "disputed",
      icon: "alert-circle",
      label: "Disputes under review",
      hint: "Payout is paused until resolved",
      count: counts.DISPUTED ?? 0,
    },
  ]
    .filter((item) => item.count > 0)
    .map((item) => ({ ...item, onPress: () => goToTab("MyOrders") }));

  const railListings = [...listings]
    .sort((a, b) => new Date(b.updatedAt ?? 0) - new Date(a.updatedAt ?? 0))
    .slice(0, 8);

  const openListing = useCallback(
    (listing) => {
      if (listing.syncStatus === "pending") {
        Alert.alert(
          "Still syncing",
          "This listing was saved on this device and hasn't synced yet, so it can't be edited until it does. It will sync automatically once you're online.",
        );
        return;
      }
      navigation.navigate("EditListing", { listingId: listing.id });
    },
    [navigation],
  );

  const refreshing =
    (summary.isRefetching || myListings.isRefetching) &&
    !summary.isLoading &&
    !myListings.isLoading;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <ScreenHeader
        title={`Hi, ${firstName(user?.fullName)}`}
        tone="tinted"
        subtitle="Here's your farm at a glance"
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
        <LogHarvestButton onPress={() => goToTab("Sell")} />
      </ScreenHeader>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() =>
              Promise.all([
                summary.refetch(),
                myListings.refetch(),
                interestSummary.refetch(),
              ])
            }
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
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

          <SectionLabel>Needs your attention</SectionLabel>
          <View className="mb-6">
            {summary.isError ? (
              <Banner
                variant="warning"
                icon="alert-triangle"
                title="Couldn't load your orders"
                message={`${getErrorMessage(summary.error)} Pull down to try again.`}
              />
            ) : summary.isLoading ? (
              <Skeleton height={72} radius={16} />
            ) : (
              <AttentionList
                items={attentionItems}
                allClearTitle="You're all caught up"
                allClearBody="New orders will appear here the moment they arrive."
              />
            )}
          </View>

          <SectionLabel>Earnings</SectionLabel>
          <View className="mb-6">
            {summary.isLoading ? (
              <Skeleton height={150} radius={16} />
            ) : summary.isError ? null : (
              <EarningsCard summary={summary} />
            )}
          </View>

          <SectionLabel>Your standing</SectionLabel>
          <View className="mb-6">
            {profile.data ? (
              <TrustStatusCard
                level={profile.data.verificationLevel ?? 0}
                onPress={() => navigation.navigate("VerificationRequest")}
              />
            ) : (
              <Skeleton height={84} radius={16} />
            )}
          </View>

          <SectionLabel>Business at a glance</SectionLabel>
          <StatStrip
            items={[
              {
                icon: "package",
                value: String(activeListings.length),
                label: "Listed",
              },
              {
                icon: "users",
                value: String(totalInterest),
                label: "Interested",
                accent: "accent",
              },
              {
                icon: "check-circle",
                value: String(delivered),
                label: "Delivered",
              },
            ]}
          />
        </View>

        <View className="pt-7">
          <View className="px-5">
            <SectionHeader
              title="Your listings"
              subtitle="How buyers see your produce"
              actionLabel={listings.length > 0 ? "Manage" : undefined}
              onAction={
                listings.length > 0 ? () => goToTab("Listings") : undefined
              }
            />
          </View>

          {myListings.isLoading ? (
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
          ) : myListings.isError ? (
            <View className="mx-5 rounded-2xl bg-white border border-line/60 p-4">
              <Text className="text-[13.5px] text-ink-secondary">
                {getErrorMessage(myListings.error)}
              </Text>
              <Pressable
                onPress={() => myListings.refetch()}
                accessibilityRole="button"
                accessibilityLabel="Try loading your listings again"
                className="self-start min-h-[44px] justify-center"
              >
                <Text className="text-[13.5px] font-bold text-primary">
                  Try again
                </Text>
              </Pressable>
            </View>
          ) : railListings.length === 0 ? (
            <Pressable
              onPress={() => goToTab("Sell")}
              accessibilityRole="button"
              accessibilityLabel="List your first harvest"
              style={shadows.card}
              className="mx-5 flex-row items-center rounded-2xl bg-white border border-line/60 p-4"
            >
              <View className="w-11 h-11 rounded-full bg-primary-light items-center justify-center mr-3">
                <Feather name="plus" size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-ink">
                  List your first harvest
                </Text>
                <Text className="text-[13px] text-ink-secondary mt-0.5">
                  Add photos and a price so buyers can find you.
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.inkMuted} />
            </Pressable>
          ) : (
            <FlatList
              horizontal
              data={railListings}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
              renderItem={({ item }) => (
                <ProduceCard
                  listing={item}
                  width={RAIL_CARD_WIDTH}
                  onPress={openListing}
                  badge={item.syncStatus === "pending" ? "Syncing…" : undefined}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
