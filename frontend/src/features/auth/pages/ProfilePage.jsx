import { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { Alert } from "../../../lib/alert.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

import {
  useProfile,
  useLogout,
  useUploadProfilePhoto,
} from "../hooks/authHooks.js";
import { useMyListings } from "../../marketplace/hooks/marketplaceHooks.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";
import { syncPendingOperations } from "../../../database/sync/SyncEngine.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { formatMoney } from "../../../lib/currency.js";
import { TopBar, TopBarButton } from "../../../components/ui/TopBar.jsx";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import {
  useBuyerOrders,
  useFarmerSummary,
} from "../../deliveryTracking/hooks/deliveryTrackingHooks.js";
import { useSavedListingIds } from "../../marketplace/hooks/savedListingHooks.js";
import { useExpressedInterestIds } from "../../marketplace/hooks/listingInterestHooks.js";

// ─── Small building blocks ───────────────────────────────────────────────

function Card({ children, className = "", style }) {
  return (
    <View
      className={`bg-white rounded-3xl border border-line/60 overflow-hidden ${className}`}
      style={[shadows.card, style]}
    >
      {children}
    </View>
  );
}

// Sentence-case section title (replaces the small grey ALL-CAPS labels).
function SectionTitle({ children }) {
  return (
    <Text
      accessibilityRole="header"
      className="text-[16px] font-extrabold text-ink tracking-[-0.2px] mb-2.5 ml-1"
    >
      {children}
    </Text>
  );
}

function NavRow({
  label,
  description,
  icon,
  value,
  valueTone = "muted",
  badgeCount,
  onPress,
  isLast = false,
  tone = "default",
}) {
  const isDanger = tone === "danger";
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : "text"}
      accessibilityLabel={value ? `${label}, ${value}` : label}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
      className={`flex-row items-center py-3.5 px-4 min-h-[60px] ${
        isLast ? "" : "border-b border-line/60"
      }`}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center mr-3.5 ${
          isDanger ? "bg-danger-muted" : "bg-primary-muted"
        }`}
      >
        <Feather
          name={icon}
          size={17}
          color={isDanger ? colors.danger : colors.primary}
        />
      </View>

      <View className="flex-1 pr-2">
        <Text
          className={`text-[15px] font-semibold ${
            isDanger ? "text-danger" : "text-ink"
          }`}
        >
          {label}
        </Text>
        {description ? (
          <Text
            className="text-[12.5px] text-ink-muted mt-0.5"
            numberOfLines={1}
          >
            {description}
          </Text>
        ) : null}
      </View>

      {badgeCount > 0 ? (
        <View className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-accent items-center justify-center mr-2">
          <Text className="text-white text-[11px] font-bold">
            {badgeCount > 9 ? "9+" : badgeCount}
          </Text>
        </View>
      ) : value ? (
        <Text
          className={`text-[13px] mr-2 ${
            valueTone === "warning"
              ? "font-bold text-warning"
              : "text-ink-muted"
          }`}
        >
          {value}
        </Text>
      ) : null}

      {onPress ? (
        <Feather name="chevron-right" size={17} color={colors.inkFaint} />
      ) : null}
    </Pressable>
  );
}

function DetailRow({ label, value, isLast = false }) {
  return (
    <View
      className={`flex-row justify-between items-center py-3.5 px-4 ${
        isLast ? "" : "border-b border-line/60"
      }`}
    >
      <Text className="text-[14px] text-ink-muted">{label}</Text>
      <Text className="text-[14px] font-semibold text-ink">{value}</Text>
    </View>
  );
}

function Stat({ label, value, isLast = false }) {
  return (
    <View
      className={`flex-1 items-center py-4 px-1 ${
        isLast ? "" : "border-r border-line/60"
      }`}
      accessible
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text
        className="text-[20px] leading-[25px] font-extrabold text-ink tracking-[-0.4px]"
        style={TABULAR_NUMS}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
      <Text
        className="text-[12px] text-ink-muted mt-0.5 text-center"
        numberOfLines={2}
      >
        {label}
      </Text>
    </View>
  );
}

// The one next step that matters most, shown right under the profile instead of
// buried three sections down.
function NextStepBanner({ icon, title, body, cta, onPress, tone = "primary" }) {
  const warn = tone === "warning";
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${body}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
      className={`flex-row items-center rounded-2xl p-4 border ${
        warn
          ? "bg-warning-muted border-warning/30"
          : "bg-primary-muted border-primary/20"
      }`}
    >
      <View
        className="items-center justify-center"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: warn ? colors.warning : colors.primary,
        }}
      >
        <Feather name={icon} size={18} color={colors.white} />
      </View>
      <View className="flex-1 mx-3">
        <Text className="text-[14.5px] font-extrabold text-ink">{title}</Text>
        <Text className="text-[12.5px] text-ink-secondary mt-0.5 leading-[18px]">
          {body}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text
          className="text-[13px] font-bold"
          style={{ color: warn ? colors.warning : colors.primaryActive }}
        >
          {cta}
        </Text>
        <Feather
          name="chevron-right"
          size={16}
          color={warn ? colors.warning : colors.primaryActive}
        />
      </View>
    </Pressable>
  );
}

// ─── Loading skeleton ────────────────────────────────────────────────────

function Shimmer({ className = "", style }) {
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
    <SafeAreaView
      className="flex-1 bg-surface"
      edges={["top", "left", "right"]}
    >
      <TopBar title="Account" />
      <View className="px-5 pt-2" accessibilityLabel="Loading your account">
        <Card>
          <View className="flex-row items-center p-5">
            <Shimmer style={{ width: 80, height: 80 }} />
            <View className="ml-4 flex-1">
              <Shimmer style={{ width: 150, height: 18 }} />
              <Shimmer className="mt-2.5" style={{ width: 100, height: 12 }} />
              <Shimmer className="mt-2" style={{ width: 120, height: 12 }} />
            </View>
          </View>
          <View className="flex-row border-t border-line/60">
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                className={`flex-1 items-center py-4 ${
                  i < 2 ? "border-r border-line/60" : ""
                }`}
              >
                <Shimmer style={{ width: 36, height: 16 }} />
                <Shimmer className="mt-2" style={{ width: 56, height: 10 }} />
              </View>
            ))}
          </View>
        </Card>
        <View className="mt-6">
          <Shimmer className="mb-3 ml-1" style={{ width: 80, height: 14 }} />
          <Card>
            {[0, 1].map((row) => (
              <View
                key={row}
                className={`flex-row items-center py-4 px-4 ${
                  row === 0 ? "border-b border-line/60" : ""
                }`}
              >
                <Shimmer style={{ width: 40, height: 40 }} />
                <Shimmer
                  className="ml-3.5"
                  style={{ width: 150, height: 13 }}
                />
              </View>
            ))}
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────

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

function verificationLabel({ isFarmer, level }) {
  if (level <= 0) return "Not verified";
  if (!isFarmer) return "Verified";
  return level >= 2 ? "Tier 2 · Trusted farmer" : "Tier 1 · Identity";
}

// ─── Screen ──────────────────────────────────────────────────────────────

export function ProfilePage() {
  const navigation = useNavigation();
  const profile = useProfile();
  const logout = useLogout();

  const isFarmer = profile.data?.role === "FARMER";
  const isAdmin = profile.data?.role === "ADMIN";

  const myListings = useMyListings();
  const farmerSummary = useFarmerSummary({ enabled: isFarmer });
  const buyerOrders = useBuyerOrders({ limit: 1 });
  const savedIds = useSavedListingIds();
  const interestIds = useExpressedInterestIds();

  const { pendingCount, isOnline, refresh } = useSyncStatus();
  const [isSyncing, setIsSyncing] = useState(false);

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
      mediaTypes: ["images"],
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
    setIsSyncing(true);
    try {
      await syncPendingOperations();
    } finally {
      setIsSyncing(false);
      refresh();
    }
  }

  if (profile.isLoading) {
    return <ProfileSkeleton />;
  }

  if (profile.isError) {
    return (
      <SafeAreaView
        className="flex-1 bg-surface"
        edges={["top", "left", "right"]}
      >
        <TopBar title="Account" />
        <ErrorState
          title="Unable to load your profile"
          message={getErrorMessage(profile.error)}
          onRetry={() => profile.refetch()}
        />
      </SafeAreaView>
    );
  }

  const user = profile.data;
  const roleLabel = isAdmin ? "Administrator" : isFarmer ? "Farmer" : "Buyer";
  const level = user.verificationLevel ?? 0;
  const maxLevel = isFarmer ? 2 : 1;
  const canUpgrade = !isAdmin && level < maxLevel;
  const phoneVerified = Boolean(user.phoneVerifiedAt);
  const appVersion = Constants.expoConfig?.version;

  let stats = [];
  if (isFarmer) {
    const money = farmerSummary.data?.money ?? [];
    const m = money.find((x) => x.currency === "GHS") ?? money[0];
    const activeListings = (myListings.data ?? []).filter(
      (l) => l.status === "ACTIVE",
    ).length;
    stats = [
      {
        label: `Paid out (${m?.currency ?? "GHS"})`,
        value: formatMoney(m?.paidOut ?? 0),
      },
      {
        label: "Deliveries",
        value: String(farmerSummary.data?.statusCounts?.DELIVERED ?? 0),
      },
      { label: "Active listings", value: String(activeListings) },
    ];
  } else if (!isAdmin) {
    stats = [
      {
        label: "Orders placed",
        value: String(buyerOrders.data?.pagination?.total ?? 0),
      },
      { label: "Saved", value: String(savedIds.data?.size ?? 0) },
      { label: "Interested", value: String(interestIds.data?.size ?? 0) },
    ];
  }

  // One banner, most important first.
  let banner = null;
  if (!phoneVerified) {
    banner = {
      icon: "smartphone",
      tone: "warning",
      title: "Verify your phone number",
      body: user.phone
        ? "Confirm your number to get verified."
        : "Add a number to get verified.",
      cta: "Verify",
      onPress: () => navigation.navigate("VerifyPhone"),
    };
  } else if (canUpgrade) {
    banner = {
      icon: "award",
      tone: "primary",
      title: isFarmer
        ? level === 0
          ? "Get verified"
          : "Upgrade to Tier 2"
        : "Verify your identity",
      body: isFarmer
        ? level === 0
          ? "Verified farmers earn more trust from buyers."
          : "Add farm-specific trust to your verified profile."
        : "Submit your identity for manual review.",
      cta: "Start",
      onPress: () => navigation.navigate("VerificationRequest"),
    };
  }

  return (
    <SafeAreaView
      className="flex-1 bg-surface"
      edges={["top", "left", "right"]}
    >
      <TopBar
        title="Account"
        right={
          <TopBarButton
            icon="bell"
            accessibilityLabel="Notifications"
            badgeCount={unreadNotificationCount.data ?? 0}
            onPress={() => navigation.navigate("Notifications")}
          />
        }
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 4,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity + numbers in one card. The photo sits INSIDE the card on a
            soft brand band, so nothing can slide under the header. (The old
            header pulled the avatar up with a negative margin, which the
            scroll view then clipped.) */}
        <Card>
          <View
            style={{ height: 88, backgroundColor: colors.primaryLight }}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <View
              style={{
                position: "absolute",
                top: -34,
                right: -22,
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: "rgba(46,125,50,0.10)",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: -40,
                left: -26,
                width: 110,
                height: 110,
                borderRadius: 55,
                backgroundColor: "rgba(46,125,50,0.07)",
              }}
            />
          </View>

          <View className="items-center px-5 pb-5" style={{ marginTop: -48 }}>
            <Pressable
              onPress={handleChoosePhoto}
              accessibilityRole="button"
              accessibilityLabel="Change profile photo"
              disabled={uploadProfilePhoto.isPending}
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            >
              <View
                className="w-[96px] h-[96px] rounded-full bg-primary items-center justify-center overflow-hidden border-[4px] border-white"
                style={shadows.md}
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
                  <Text className="text-[30px] font-extrabold text-white">
                    {initialsOf(user.fullName)}
                  </Text>
                )}
              </View>
              <View className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-accent items-center justify-center border-[3px] border-white">
                {uploadProfilePhoto.isPending ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Feather name="camera" size={14} color="#FFFFFF" />
                )}
              </View>
            </Pressable>

            <View className="flex-row items-center justify-center mt-3.5">
              <Text
                className="text-[22px] leading-[28px] font-extrabold text-ink tracking-[-0.5px] shrink text-center"
                numberOfLines={2}
              >
                {user.fullName}
              </Text>
            </View>

            <Text
              className="text-[14px] text-ink-muted mt-0.5"
              numberOfLines={1}
            >
              {user.phone ?? "No phone number"}
            </Text>

            <View
              className="flex-row flex-wrap justify-center mt-3.5"
              style={{ gap: 8 }}
            >
              <View className="rounded-full bg-primary-muted px-3 py-1.5">
                <Text
                  className="text-[12.5px] font-bold"
                  style={{ color: colors.primaryActive }}
                >
                  {roleLabel}
                </Text>
              </View>
              <View
                className={`flex-row items-center rounded-full px-3 py-1.5 ${
                  phoneVerified ? "bg-primary-muted" : "bg-warning-muted"
                }`}
                accessible
                accessibilityLabel={
                  phoneVerified ? "Phone verified" : "Phone not verified"
                }
              >
                <Feather
                  name={phoneVerified ? "check-circle" : "clock"}
                  size={12}
                  color={phoneVerified ? colors.primary : colors.warning}
                />
                <Text
                  className="text-[12.5px] font-bold ml-1.5"
                  style={{
                    color: phoneVerified
                      ? colors.primaryActive
                      : colors.warning,
                  }}
                >
                  {phoneVerified ? "Phone verified" : "Phone not verified"}
                </Text>
              </View>
              {!isAdmin && level >= 1 ? (
                <View className="flex-row items-center rounded-full bg-primary-muted px-3 py-1.5">
                  <Ionicons
                    name="shield-checkmark"
                    size={13}
                    color={colors.primary}
                  />
                  <Text
                    className="text-[12.5px] font-bold ml-1.5"
                    style={{ color: colors.primaryActive }}
                  >
                    {isFarmer ? "Verified farmer" : "Verified"}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {stats.length > 0 ? (
            <View className="flex-row border-t border-line/60">
              {stats.map((s, i) => (
                <Stat
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  isLast={i === stats.length - 1}
                />
              ))}
            </View>
          ) : null}
        </Card>

        {banner ? (
          <View className="mt-4">
            <NextStepBanner {...banner} />
          </View>
        ) : null}

        <View className="mt-7">
          <SectionTitle>Activity</SectionTitle>
          <Card>
            {isFarmer ? (
              <NavRow
                label="My listings"
                description="Manage what you're selling"
                icon="package"
                onPress={() => navigation.navigate("Listings")}
              />
            ) : !isAdmin ? (
              <NavRow
                label="Saved listings"
                description="Products you've bookmarked"
                icon="bookmark"
                value={
                  savedIds.data?.size ? String(savedIds.data.size) : undefined
                }
                onPress={() => navigation.navigate("SavedListings")}
              />
            ) : null}
            <NavRow
              label="My orders"
              description={
                isFarmer ? "Orders from buyers" : "Track what you've bought"
              }
              icon="clipboard"
              onPress={() => navigation.navigate("MyOrders")}
            />
            <NavRow
              label="My disputes"
              description="Track issues on your orders"
              icon="alert-circle"
              onPress={() => navigation.navigate("MyDisputes")}
              isLast={!isAdmin}
            />
            {isAdmin ? (
              <NavRow
                label="Admin moderation"
                description="Verification, pricing, disputes"
                icon="sliders"
                onPress={() => navigation.navigate("AdminModeration")}
                isLast
              />
            ) : null}
          </Card>
        </View>

        <View className="mt-7">
          <SectionTitle>Account</SectionTitle>
          <Card>
            <DetailRow label="Phone" value={user.phone ?? "Not set"} />
            {!isAdmin ? (
              canUpgrade && phoneVerified ? (
                <NavRow
                  label="Verification"
                  icon="award"
                  value={verificationLabel({ isFarmer, level })}
                  onPress={() => navigation.navigate("VerificationRequest")}
                />
              ) : (
                <DetailRow
                  label="Verification"
                  value={verificationLabel({ isFarmer, level })}
                />
              )
            ) : null}
            {user.accountStatus && user.accountStatus !== "ACTIVE" ? (
              <DetailRow
                label="Account status"
                value={formatAccountStatus(user.accountStatus)}
              />
            ) : null}
            <DetailRow
              label="Member since"
              value={formatDate(user.createdAt)}
              isLast
            />
          </Card>
        </View>

        <View className="mt-7">
          <SectionTitle>Sync and security</SectionTitle>
          <Card>
            <View
              className="flex-row items-center py-3.5 px-4 min-h-[64px] border-b border-line/60"
              accessible
              accessibilityLabel={`${isOnline ? "Connected" : "Offline"}, ${pendingCount} pending`}
            >
              <View
                className="items-center justify-center mr-3.5"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isOnline
                    ? colors.primaryLight
                    : colors.dangerMuted,
                }}
              >
                <Feather
                  name={isOnline ? "wifi" : "wifi-off"}
                  size={17}
                  color={isOnline ? colors.primary : colors.danger}
                />
              </View>
              <View className="flex-1 pr-2">
                <Text className="text-[15px] font-semibold text-ink">
                  {isOnline ? "Connected" : "Offline"}
                </Text>
                <Text className="text-[12.5px] text-ink-muted mt-0.5">
                  {pendingCount > 0
                    ? `${pendingCount} ${pendingCount === 1 ? "change" : "changes"} waiting to sync`
                    : "Everything is up to date"}
                </Text>
              </View>
              <Pressable
                onPress={handleForceSyncPress}
                disabled={isSyncing}
                accessibilityRole="button"
                accessibilityLabel="Sync now"
                accessibilityState={{ busy: isSyncing, disabled: isSyncing }}
                style={({ pressed }) => ({
                  opacity: pressed || isSyncing ? 0.6 : 1,
                })}
                className="flex-row items-center rounded-full bg-primary-muted px-3.5 py-2"
              >
                {isSyncing ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Feather
                    name="refresh-cw"
                    size={13}
                    color={colors.primaryActive}
                  />
                )}
                <Text
                  className="text-[13px] font-bold ml-1.5"
                  style={{ color: colors.primaryActive }}
                >
                  Sync
                </Text>
              </Pressable>
            </View>
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
          </Card>
        </View>

        <Pressable
          onPress={handleLogoutPress}
          disabled={logout.isPending}
          accessibilityRole="button"
          accessibilityLabel="Log out"
          style={({ pressed }) => ({
            opacity: pressed || logout.isPending ? 0.7 : 1,
          })}
          className="flex-row items-center justify-center min-h-[52px] rounded-2xl bg-white border border-line mt-8"
        >
          {logout.isPending ? (
            <ActivityIndicator size="small" color={colors.danger} />
          ) : (
            <Feather name="log-out" size={17} color={colors.danger} />
          )}
          <Text className="ml-2.5 text-[15px] font-bold text-danger">
            Log out
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("AccountDelete")}
          accessibilityRole="button"
          accessibilityLabel="Delete account"
          hitSlop={8}
          className="items-center justify-center min-h-[44px] mt-2"
        >
          <Text className="text-[13px] font-semibold text-ink-muted">
            Delete account
          </Text>
        </Pressable>

        <Text className="text-[12px] text-ink-faint text-center mt-3">
          HarvestLink{appVersion ? ` · Version ${appVersion}` : ""}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
