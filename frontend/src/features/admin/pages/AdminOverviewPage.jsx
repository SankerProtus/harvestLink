import { View, ScrollView, RefreshControl, Pressable } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { Skeleton } from "../../../components/ui/Skeleton.jsx";
import { TopBar, TopBarButton } from "../../../components/ui/TopBar.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import { formatCurrency } from "../../../lib/currency.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useAdminOverview } from "../hooks/adminHooks.js";
import {
  Group,
  IconBubble,
  Row,
  SectionTitle,
  ageLabel,
  humanize,
} from "../components/AdminUI.jsx";

const ON_DARK = "rgba(255,255,255,0.82)";
const ON_DARK_FAINT = "rgba(255,255,255,0.6)";
const ON_DARK_FILL = "rgba(255,255,255,0.14)";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// The one thing an admin opens this screen for: "is anything waiting on me?"
// It is the strongest element on the page, and its button goes straight to the
// first queue that has work in it.
function ReviewHero({ total, activeQueues, updatedText, onStart }) {
  const clear = total === 0;
  return (
    <View
      className="mx-5 rounded-3xl p-5"
      style={{ backgroundColor: colors.primaryActive, ...shadows.md }}
      accessible
      accessibilityLabel={
        clear
          ? "All clear. Nothing is waiting for review."
          : `${total} ${total === 1 ? "item needs" : "items need"} your review`
      }
    >
      <View className="flex-row items-center">
        <View
          className="items-center justify-center"
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: ON_DARK_FILL,
          }}
        >
          <Feather
            name={clear ? "check" : "inbox"}
            size={16}
            color={colors.white}
          />
        </View>
        <Text
          className="ml-2.5 text-[13.5px] font-semibold"
          style={{ color: ON_DARK }}
        >
          Review queue
        </Text>
      </View>

      <Text
        className="text-[42px] leading-[48px] font-extrabold text-white mt-4 tracking-[-1.2px]"
        style={TABULAR_NUMS}
      >
        {clear ? "All clear" : total}
      </Text>
      <Text className="text-[14.5px] mt-0.5" style={{ color: ON_DARK }}>
        {clear
          ? "Nothing is waiting for review."
          : `${total === 1 ? "item needs" : "items need"} your attention`}
      </Text>

      {!clear ? (
        <>
          <View className="flex-row flex-wrap mt-4" style={{ gap: 8 }}>
            {activeQueues.map((q) => (
              <View
                key={q.key}
                className="flex-row items-center rounded-full px-3 py-1.5"
                style={{ backgroundColor: ON_DARK_FILL }}
              >
                <Text className="text-[12.5px] font-semibold text-white">
                  {q.label}
                </Text>
                <Text
                  className="text-[12.5px] font-extrabold text-white ml-1.5"
                  style={TABULAR_NUMS}
                >
                  {q.count}
                </Text>
              </View>
            ))}
          </View>
          <Pressable
            onPress={onStart}
            accessibilityRole="button"
            accessibilityLabel="Start reviewing"
            style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
            className="flex-row items-center justify-center bg-white rounded-xl mt-5 min-h-[48px]"
          >
            <Text
              className="text-[15px] font-bold"
              style={{ color: colors.primaryActive }}
            >
              Start reviewing
            </Text>
            <Feather
              name="arrow-right"
              size={16}
              color={colors.primaryActive}
              style={{ marginLeft: 8 }}
            />
          </Pressable>
        </>
      ) : null}

      {updatedText ? (
        <Text className="text-[11.5px] mt-4" style={{ color: ON_DARK_FAINT }}>
          {updatedText}
        </Text>
      ) : null}
    </View>
  );
}

// Two equal-width tiles per row. (The old flex-wrap grid gave the second row
// narrower, uneven tiles.)
function StatTile({ icon, label, value, hint, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}${hint ? `, ${hint}` : ""}`}
      style={({ pressed }) => ({
        flex: 1,
        opacity: pressed ? 0.92 : 1,
        ...shadows.card,
      })}
      className="bg-white rounded-2xl border border-line/60 p-4"
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[13px] font-semibold text-ink-secondary flex-1 pr-2"
          numberOfLines={1}
        >
          {label}
        </Text>
        <View className="w-8 h-8 rounded-full bg-primary-light items-center justify-center">
          <Feather name={icon} size={15} color={colors.primary} />
        </View>
      </View>
      <Text
        className="text-[30px] leading-[36px] font-extrabold text-ink mt-2 tracking-[-0.8px]"
        style={TABULAR_NUMS}
      >
        {value}
      </Text>
      <Text className="text-[12px] text-ink-muted mt-0.5" numberOfLines={1}>
        {hint ?? "\u00A0"}
      </Text>
    </Pressable>
  );
}

function Trend({ icon, label, value }) {
  return (
    <View
      className="flex-1 flex-row items-center p-4"
      accessible
      accessibilityLabel={`${label}: ${value}`}
    >
      <IconBubble name={icon} />
      <View className="ml-3">
        <Text
          className="text-[22px] leading-[26px] font-extrabold text-ink tracking-[-0.5px]"
          style={TABULAR_NUMS}
        >
          {value}
        </Text>
        <Text className="text-[12.5px] text-ink-muted">{label}</Text>
      </View>
    </View>
  );
}

function FundsCard({ currency, held, released }) {
  const total = held + released;
  const releasedPct = total > 0 ? Math.round((released / total) * 100) : 0;

  return (
    <View
      className="mx-5 bg-white rounded-2xl border border-line/60 p-4 mb-3"
      style={shadows.card}
    >
      <View className="flex-row items-end justify-between">
        <View>
          <Text className="text-[12.5px] text-ink-muted">Total processed</Text>
          <Text
            className="text-[26px] leading-[32px] font-extrabold text-ink mt-0.5 tracking-[-0.6px]"
            style={TABULAR_NUMS}
          >
            {formatCurrency(total, currency)}
          </Text>
        </View>
        {total > 0 ? (
          <Text className="text-[12.5px] font-bold text-primary-dark pb-1">
            {releasedPct}% released
          </Text>
        ) : null}
      </View>

      <View
        className="flex-row h-2.5 rounded-full overflow-hidden mt-4"
        style={{ backgroundColor: colors.skeleton }}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <View style={{ flex: released, backgroundColor: colors.primary }} />
        <View style={{ flex: held, backgroundColor: colors.accent }} />
      </View>

      <View className="flex-row mt-4">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.primary,
              }}
            />
            <Text className="ml-1.5 text-[12.5px] text-ink-muted">
              Released to farmers
            </Text>
          </View>
          <Text
            className="text-[16px] font-extrabold text-ink mt-1"
            style={TABULAR_NUMS}
          >
            {formatCurrency(released, currency)}
          </Text>
        </View>
        <View className="flex-1 items-end">
          <View className="flex-row items-center">
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.accent,
              }}
            />
            <Text className="ml-1.5 text-[12.5px] text-ink-muted">
              Held in protection
            </Text>
          </View>
          <Text
            className="text-[16px] font-extrabold text-ink mt-1"
            style={TABULAR_NUMS}
          >
            {formatCurrency(held, currency)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function AdminOverviewPage() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const query = useAdminOverview();
  const data = query.data;
  const counts = data?.counts ?? {};
  const oldest = data?.oldest ?? {};
  const trends = data?.trends ?? {};
  const events = (data?.auditEvents ?? []).slice(0, 4);
  const firstName = user?.fullName?.split(" ")[0];

  const disputes =
    (counts.openDisputes ?? 0) + (counts.underReviewDisputes ?? 0);
  const queues = [
    {
      key: "disputes",
      icon: "alert-circle",
      label: "Disputes",
      count: disputes,
      oldest: oldest.dispute,
      to: ["Review", { queue: "disputes" }],
    },
    {
      key: "verification",
      icon: "award",
      label: "Farmer verification",
      count: counts.pendingVerifications ?? 0,
      oldest: oldest.verification,
      to: ["Review", { queue: "verification" }],
    },
    {
      key: "reports",
      icon: "flag",
      label: "Account reports",
      count: counts.openReports ?? 0,
      oldest: oldest.report,
      to: ["Review", { queue: "reports" }],
    },
    {
      key: "price",
      icon: "tag",
      label: "Price flags",
      count: counts.flaggedListings ?? 0,
      to: ["Review", { queue: "price" }],
    },
    {
      key: "refunds",
      icon: "rotate-ccw",
      label: "Refunds pending",
      count: counts.refundPending ?? 0,
      to: ["Operations", { section: "payments" }],
    },
  ];
  const total = queues.reduce((sum, q) => sum + q.count, 0);
  // Only queues with work in them get a row; the rest collapse to one line
  // instead of five rows that mostly said "Clear".
  const activeQueues = queues.filter((q) => q.count > 0);
  const clearQueues = queues.filter((q) => q.count === 0);

  const byCurrency = {};
  for (const f of data?.funds ?? []) {
    const entry = (byCurrency[f.currency] ??= { held: 0, released: 0 });
    if (f.status === "RELEASED") entry.released += f.amount;
    else entry.held += f.amount;
  }

  const go = (screen, params) => navigation.navigate(screen, params);
  const updatedText = data?.generatedAt
    ? `Updated ${ageLabel(data.generatedAt)} ago · pull down to refresh`
    : "";

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <TopBar
        title="Command center"
        subtitle={`${greeting()}${firstName ? `, ${firstName}` : ""}`}
        right={
          <TopBarButton
            icon="refresh-cw"
            accessibilityLabel="Refresh overview"
            onPress={() => query.refetch()}
          />
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={query.isRefetching && !query.isLoading}
            onRefresh={() => query.refetch()}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {query.isLoading ? (
          <View
            className="px-5"
            style={{ gap: 12 }}
            accessibilityLabel="Loading overview"
          >
            <Skeleton height={230} radius={24} />
            <View className="flex-row" style={{ gap: 12 }}>
              <View className="flex-1">
                <Skeleton height={112} radius={16} />
              </View>
              <View className="flex-1">
                <Skeleton height={112} radius={16} />
              </View>
            </View>
            <Skeleton height={90} radius={16} />
            <Skeleton height={150} radius={16} />
          </View>
        ) : query.isError ? (
          <ErrorState
            message={getErrorMessage(query.error)}
            onRetry={() => query.refetch()}
          />
        ) : (
          <>
            <ReviewHero
              total={total}
              activeQueues={activeQueues}
              updatedText={updatedText}
              onStart={() => activeQueues[0] && go(...activeQueues[0].to)}
            />

            {activeQueues.length > 0 ? (
              <>
                <SectionTitle title="Needs review" />
                <Group>
                  {activeQueues.map((q, i) => (
                    <Row
                      key={q.key}
                      leading={<IconBubble name={q.icon} tone="accent" />}
                      title={q.label}
                      subtitle={
                        q.oldest
                          ? `Oldest waiting ${ageLabel(q.oldest)}`
                          : "Waiting for review"
                      }
                      pill={{ label: String(q.count), tone: "accent" }}
                      onPress={() => go(...q.to)}
                      isLast={i === activeQueues.length - 1}
                    />
                  ))}
                </Group>
                {clearQueues.length > 0 ? (
                  <View className="flex-row items-center px-6 mt-2.5">
                    <Feather
                      name="check-circle"
                      size={14}
                      color={colors.primary}
                    />
                    <Text
                      className="flex-1 ml-2 text-[12.5px] text-ink-muted"
                      numberOfLines={2}
                    >
                      Clear: {clearQueues.map((q) => q.label).join(", ")}
                    </Text>
                  </View>
                ) : null}
              </>
            ) : null}

            <SectionTitle title="Marketplace" />
            <View className="px-5" style={{ gap: 12 }}>
              <View className="flex-row" style={{ gap: 12 }}>
                <StatTile
                  icon="users"
                  label="Users"
                  value={counts.users ?? 0}
                  hint={`${counts.farmers ?? 0} farmers · ${counts.buyers ?? 0} buyers`}
                  onPress={() => go("Users")}
                />
                <StatTile
                  icon="shopping-bag"
                  label="Active listings"
                  value={counts.activeListings ?? 0}
                  onPress={() => go("Operations", { section: "listings" })}
                />
              </View>
              <View className="flex-row" style={{ gap: 12 }}>
                <StatTile
                  icon="package"
                  label="Orders"
                  value={counts.orders ?? 0}
                  hint={`${trends.deliveredOrders ?? 0} delivered`}
                  onPress={() => go("Operations", { section: "orders" })}
                />
                <StatTile
                  icon="lock"
                  label="Payments held"
                  value={counts.heldPayments ?? 0}
                  hint="in buyer protection"
                  onPress={() => go("Operations", { section: "payments" })}
                />
              </View>
            </View>

            <SectionTitle title="Last 7 days" />
            <View
              className="mx-5 bg-white rounded-2xl border border-line/60 flex-row"
              style={shadows.card}
            >
              <Trend
                icon="user-plus"
                label="New users"
                value={trends.newUsers7d ?? 0}
              />
              <View className="w-px bg-line/70 my-3" />
              <Trend
                icon="shopping-cart"
                label="New orders"
                value={trends.orders7d ?? 0}
              />
            </View>

            <SectionTitle title="Payment protection" />
            {Object.keys(byCurrency).length === 0 ? (
              <View className="mx-5 rounded-2xl bg-white border border-line/60 p-4">
                <Text className="text-[13.5px] text-ink-secondary">
                  No escrow activity yet.
                </Text>
              </View>
            ) : (
              Object.entries(byCurrency).map(([currency, v]) => (
                <FundsCard
                  key={currency}
                  currency={currency}
                  held={v.held}
                  released={v.released}
                />
              ))
            )}

            <SectionTitle
              title="Recent activity"
              action="View all"
              onAction={() => go("Operations", { section: "audit" })}
            />
            {events.length === 0 ? (
              <View className="mx-5 rounded-2xl bg-white border border-line/60 p-4">
                <Text className="text-[13.5px] text-ink-secondary">
                  No admin activity recorded yet.
                </Text>
              </View>
            ) : (
              <Group>
                {events.map((e, i) => (
                  <Row
                    key={e.id}
                    leading={<IconBubble name="file-text" tone="neutral" />}
                    title={humanize(e.action)}
                    subtitle={`${e.actor?.fullName ?? "System"} · ${humanize(e.entityType)}`}
                    meta={`${ageLabel(e.createdAt)} ago`}
                    isLast={i === events.length - 1}
                  />
                ))}
              </Group>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
