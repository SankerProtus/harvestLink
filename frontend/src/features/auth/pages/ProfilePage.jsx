import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Alert } from "../../../lib/alert.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { AuthButton } from "../components/AuthButton.jsx";
import { useProfile, useLogout } from "../hooks/authHooks.js";
import { useMyListings } from "../../marketplace/hooks/marketplaceHooks.js";
import {
  useBuyerOrders,
  useFarmerOrders,
} from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";
import { syncPendingOperations } from "../../../database/sync/SyncEngine.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { formatMoney } from "../../../lib/currency.js";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { SectionLabel } from "../../../components/ui/SectionHeader.jsx";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";

import * as ImagePicker from "expo-image-picker";
import { useUploadProfilePhoto } from "../hooks/authHooks.js";

function GroupCard({ children }) {
  return (
    <View
      className="bg-card rounded-xl2 border border-line/50 overflow-hidden"
      style={shadows.card}
    >
      {children}
    </View>
  );
}

function InfoRow({ label, value, isLast = false }) {
  return (
    <View
      className={`flex-row justify-between items-center py-3 px-4 ${
        isLast ? "" : "border-b border-line/60"
      }`}
    >
      <Text className="text-[12.5px] text-ink-muted">{label}</Text>
      <Text className="text-[12.5px] font-semibold text-ink">{value}</Text>
    </View>
  );
}

// Extended nav row: icon + title + optional one-line description on the
// left, an optional trailing value/badge before the chevron. All props
// beyond `label` and `onPress` are optional so existing simple usages
// (icon-less, description-less) keep working unchanged.
function NavRow({
  label,
  description,
  icon,
  value,
  badgeCount,
  onPress,
  isLast = false,
  tone = "default",
}) {
  const isDanger = tone === "danger";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
      className={`flex-row items-center py-3.5 px-4 min-h-[52px] ${
        isLast ? "" : "border-b border-line/60"
      }`}
    >
      {icon ? (
        <View
          className={`w-10 h-10 rounded-xl2 items-center justify-center mr-3 ${
            isDanger ? "bg-danger-muted" : "bg-primary-muted"
          }`}
        >
          <Feather
            name={icon}
            size={16}
            color={isDanger ? colors.danger : colors.primary}
          />
        </View>
      ) : null}

      <View className="flex-1 pr-2">
        <Text
          className={`text-[13.5px] font-semibold ${
            isDanger ? "text-danger" : "text-ink"
          }`}
        >
          {label}
        </Text>
        {description ? (
          <Text
            className="text-[11.5px] text-ink-muted mt-0.5"
            numberOfLines={1}
          >
            {description}
          </Text>
        ) : null}
      </View>

      {badgeCount > 0 ? (
        <View className="min-w-[20px] h-5 px-1.5 rounded-full bg-accent items-center justify-center mr-2">
          <Text className="text-white text-[10.5px] font-bold">
            {badgeCount > 9 ? "9+" : badgeCount}
          </Text>
        </View>
      ) : value ? (
        <Text className="text-[12px] text-ink-muted mr-2">{value}</Text>
      ) : null}

      <Feather name="chevron-right" size={16} color={colors.inkFaint} />
    </Pressable>
  );
}

function StatCell({ label, value, icon, isLast = false }) {
  return (
    <View
      className={`flex-1 items-center py-5 ${
        isLast ? "" : "border-r border-line/60"
      }`}
    >
      {icon ? (
        <View className="w-8 h-8 rounded-xl bg-primary-muted items-center justify-center mb-2">
          <Feather name={icon} size={14} color={colors.primary} />
        </View>
      ) : null}
      <Text
        className="text-[18px] font-extrabold text-ink tracking-[-0.3px]"
        numberOfLines={1}
      >
        {value}
      </Text>
      <Text
        className="text-[10px] text-ink-muted mt-1 text-center px-1 uppercase tracking-wide font-semibold"
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

// Small trust/status pill under the name — the only account-status signal
// shown, and it's built entirely from real fields already on the user
// record (phoneVerifiedAt, accountStatus). No fabricated "profile
// strength" percentage: the profile has exactly one optional field
// (photo), which isn't enough real signal to justify a progress meter.
function StatusPill({ isVerified }) {
  return (
    <View
      className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full mt-2.5 ${
        isVerified ? "bg-primary-muted" : "bg-warning-muted"
      }`}
    >
      <Feather
        name={isVerified ? "check-circle" : "clock"}
        size={11}
        color={isVerified ? colors.primary : colors.warning}
      />
      <Text
        className="text-[11px] font-semibold"
        style={{ color: isVerified ? colors.primary : colors.warning }}
      >
        {isVerified ? "Verified account" : "Verification pending"}
      </Text>
    </View>
  );
}

// --- Loading skeleton ---------------------------------------------
// Mirrors the real layout (header, avatar, stat row, two list blocks)
// so the screen doesn't jump when data arrives, per production loading-
// state guidance — no bare "Loading…" text.

function Shimmer({ className, style }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={`bg-line rounded-full ${className}`}
      style={[{ opacity }, style]}
    />
  );
}

function ProfileSkeleton() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader title="My account" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center" style={{ marginTop: -34 }}>
          <Shimmer
            className="rounded-full"
            style={{
              width: 84,
              height: 84,
              borderWidth: 4,
              borderColor: colors.surface,
            }}
          />
          <Shimmer className="mt-3" style={{ width: 130, height: 16 }} />
          <Shimmer className="mt-2" style={{ width: 90, height: 12 }} />
        </View>

        <View className="px-5 mt-5">
          <GroupCard>
            <View className="flex-row">
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  className={`flex-1 items-center py-4 ${
                    i < 2 ? "border-r border-line/60" : ""
                  }`}
                >
                  <Shimmer style={{ width: 36, height: 16 }} />
                  <Shimmer className="mt-2" style={{ width: 52, height: 9 }} />
                </View>
              ))}
            </View>
          </GroupCard>

          {[0, 1].map((block) => (
            <View className="mt-6" key={block}>
              <Shimmer
                style={{ width: 80, height: 10 }}
                className="mb-2 ml-0.5"
              />
              <GroupCard>
                {[0, 1].map((row) => (
                  <View
                    key={row}
                    className={`flex-row items-center py-3.5 px-4 ${
                      row === 0 ? "border-b border-line/60" : ""
                    }`}
                  >
                    <Shimmer
                      style={{ width: 36, height: 36, borderRadius: 12 }}
                    />
                    <Shimmer
                      className="ml-3"
                      style={{ width: 140, height: 12 }}
                    />
                  </View>
                ))}
              </GroupCard>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatAccountStatus(status) {
  if (!status) return "—";
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function initialsOf(fullName) {
  if (!fullName) return "?";
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ProfilePage() {
  const navigation = useNavigation();
  const profile = useProfile();
  const logout = useLogout();

  const isFarmer = profile.data?.role === "FARMER";

  const myListings = useMyListings();
  const farmerOrders = useFarmerOrders();
  const buyerOrders = useBuyerOrders();

  const { pendingCount, isOnline, refresh } = useSyncStatus();

  const uploadProfilePhoto = useUploadProfilePhoto();
  const unreadNotificationCount = useUnreadNotificationCount();
  const [failedAvatarUri, setFailedAvatarUri] = useState(null);

  async function handleChoosePhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Allow photo library access to set a profile picture.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    try {
      await uploadProfilePhoto.mutateAsync(result.assets[0].uri);
    } catch (err) {
      Alert.alert("Upload failed", getErrorMessage(err));
    }
  }

  function handleLogoutPress() {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => {
          logout.mutate();
        },
      },
    ]);
  }

  async function handleForceSyncPress() {
    if (!isOnline) {
      Alert.alert("Offline", "Connect to the internet to sync.");
      return;
    }
    await syncPendingOperations();
    refresh();
  }

  if (profile.isLoading) {
    return <ProfileSkeleton />;
  }

  if (profile.isError) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader title="My account" />
        <ErrorState
          title="Unable to load your profile"
          message={getErrorMessage(profile.error)}
          onRetry={() => profile.refetch()}
        />
      </SafeAreaView>
    );
  }

  const user = profile.data;
  const isVerified =
    Boolean(user.phoneVerifiedAt) && user.accountStatus === "ACTIVE";

  // Real, computed stats — no placeholders. Farmers see revenue/deliveries
  // from their own DELIVERED orders; buyers see spend/orders from theirs.
  let stats;
  if (isFarmer) {
    const orders = farmerOrders.data?.results ?? [];
    const delivered = orders.filter((o) => o.status === "DELIVERED");
    const revenue = delivered.reduce(
      (sum, o) => sum + Number(o.quantity) * Number(o.pricePerUnitAtOrder),
      0,
    );
    const activeListings = (myListings.data ?? []).filter(
      (l) => l.status === "ACTIVE",
    ).length;
    stats = [
      {
        label: "Revenue, GHS",
        value: formatMoney(revenue),
        icon: "trending-up",
      },
      { label: "Deliveries", value: String(delivered.length), icon: "truck" },
      {
        label: "Active listings",
        value: String(activeListings),
        icon: "package",
      },
    ];
  } else {
    const orders = buyerOrders.data?.results ?? [];
    const delivered = orders.filter((o) => o.status === "DELIVERED");
    const spent = delivered.reduce(
      (sum, o) => sum + Number(o.quantity) * Number(o.pricePerUnitAtOrder),
      0,
    );
    const pending = orders.filter((o) =>
      ["PENDING", "CONFIRMED", "IN_TRANSIT"].includes(o.status),
    ).length;
    stats = [
      {
        label: "Spent, GHS",
        value: formatMoney(spent),
        icon: "credit-card",
      },
      {
        label: "Orders completed",
        value: String(delivered.length),
        icon: "check-circle",
      },
      { label: "Orders pending", value: String(pending), icon: "clock" },
    ];
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="My account"
        subtitle={isFarmer ? "Farmer profile" : "Buyer profile"}
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

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="items-center"
          style={{ marginTop: -40, zIndex: 10, elevation: 10 }}
        >
          <Pressable
            onPress={handleChoosePhoto}
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
            disabled={uploadProfilePhoto.isPending}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            className="relative"
          >
            <View
              className="w-[96px] h-[96px] rounded-full bg-primary items-center justify-center overflow-hidden border-[4px] border-surface"
              style={shadows.lg}
            >
              {user.profileImageUrl &&
              failedAvatarUri !== user.profileImageUrl ? (
                <Image
                  source={{ uri: user.profileImageUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                  onError={() => setFailedAvatarUri(user.profileImageUrl)}
                />
              ) : (
                <Text className="text-2xl font-extrabold text-white">
                  {initialsOf(user.fullName)}
                </Text>
              )}
            </View>

            <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent items-center justify-center border-[3px] border-surface">
              {uploadProfilePhoto.isPending ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Feather name="camera" size={13} color="#FFFFFF" />
              )}
            </View>
          </Pressable>

          <Text
            className="text-[20px] font-extrabold text-ink mt-4 tracking-[-0.3px]"
            numberOfLines={1}
          >
            {user.fullName}
          </Text>
          <Text className="text-[13px] text-ink-muted mt-0.5">
            {isFarmer ? "Farmer" : "Buyer"} · HarvestLink
          </Text>

          <StatusPill isVerified={isVerified} />
        </View>

        <View className="px-5 mt-6">
          <GroupCard>
            <View className="flex-row">
              {stats.map((stat, index) => (
                <StatCell
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  isLast={index === stats.length - 1}
                />
              ))}
            </View>
          </GroupCard>

          <View className="mt-6">
            <SectionLabel>Activity</SectionLabel>
            <GroupCard>
              {isFarmer ? (
                <NavRow
                  label="My Listings"
                  description="Manage what you're selling"
                  icon="package"
                  onPress={() => navigation.navigate("Listings")}
                />
              ) : null}
              <NavRow
                label="My Orders"
                description={
                  isFarmer ? "Orders from buyers" : "Track what you've bought"
                }
                icon="clipboard"
                onPress={() => navigation.navigate("MyOrders")}
                isLast
              />
            </GroupCard>
          </View>

          <View className="mt-6">
            <SectionLabel>Offline sync</SectionLabel>
            <GroupCard>
              <View className="p-4">
                <View className="flex-row items-center justify-between mb-3.5">
                  <View className="flex-row items-center">
                    <View
                      className="w-[7px] h-[7px] rounded-full mr-1.5"
                      style={{
                        backgroundColor: isOnline
                          ? colors.success
                          : colors.danger,
                      }}
                    />
                    <Text
                      className="text-[12.5px] font-semibold"
                      style={{
                        color: isOnline ? colors.success : colors.danger,
                      }}
                    >
                      {isOnline ? "Connected" : "Offline"}
                    </Text>
                  </View>
                  <Text className="text-[12px] text-ink-muted">
                    {pendingCount} pending
                  </Text>
                </View>
                <AuthButton
                  label="Force sync now"
                  onPress={handleForceSyncPress}
                  variant="secondary"
                />
              </View>
            </GroupCard>
          </View>

          <View className="mt-6">
            <SectionLabel>Account details</SectionLabel>
            <GroupCard>
              <InfoRow label="Phone" value={user.phone ?? "Not set"} />
              <InfoRow
                label="Phone verified"
                value={user.phoneVerifiedAt ? "Yes" : "No"}
              />
              <InfoRow
                label="Account status"
                value={formatAccountStatus(user.accountStatus)}
              />
              <InfoRow
                label="Member since"
                value={formatDate(user.createdAt)}
                isLast
              />
            </GroupCard>
          </View>

          <View className="mt-6">
            <SectionLabel>Security</SectionLabel>
            <GroupCard>
              <NavRow
                label="Devices and sessions"
                description="See where you're signed in"
                icon="smartphone"
                onPress={() => navigation.navigate("Sessions")}
              />
              <NavRow
                label="Sync diagnostics"
                description="Inspect the local sync queue"
                icon="activity"
                onPress={() => navigation.navigate("SyncDiagnostics")}
                isLast
              />
            </GroupCard>
          </View>

          <View className="mt-7">
            <AuthButton
              label="Log out"
              onPress={handleLogoutPress}
              variant="danger"
              isLoading={logout.isPending}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
