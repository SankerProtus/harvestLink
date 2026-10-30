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
import { TONE_COLORS } from "../../deliveryTracking/lib/orderStatus.js";
import { useAdminOverview } from "../hooks/adminHooks.js";
import {
  Group,
  IconBubble,
  SectionTitle,
  StatusPill,
  ageLabel,
  humanize,
} from "../components/AdminUI.jsx";

const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Waiting time -> urgency. The oldest item in a queue is what an admin should
// look at first, so its age is coloured rather than just printed.
function waitTone(iso) {
  if (!iso) return "neutral";
  const hours = (Date.now() - new Date(iso).getTime()) / 3600000;
  if (hours >= 72) return "danger";
  if (hours >= 24) return "warning";
  return "neutral";
}

function waitRank(iso) {
  return iso ? Date.now() - new Date(iso).getTime() : 0;
}

// Week-over-week change. Returns null when the backend hasn't sent a
// comparison figure (older deploy), so the chip simply doesn't render.
function weekDelta(current, previous) {
  if (previous === undefined || previous === null) return null;
  if (current === previous) {
    return { label: "Same as last week", tone: "neutral", icon: "minus" };
  }
  if (previous === 0) {
    return { label: "New this week", tone: "success", icon: "arrow-up-right" };
  }
  const pct = Math.round(((current - previous) / previous) * 100);
  return {
    label: `${Math.abs(pct)}% vs last week`,
    tone: pct > 0 ? "success" : "warning",
    icon: pct > 0 ? "arrow-up-right" : "arrow-down-right",
  };
}

function DeltaChip({ delta }) {
  if (!delta) return null;
  const t = TONE_COLORS[delta.tone] ?? TONE_COLORS.neutral;
  return (
    <View
      className="flex-row items-center self-start rounded-full px-2 py-[3px] mt-2"
      style={{ backgroundColor: t.bg }}
      accessible
      accessibilityLabel={delta.label}
    >
      <Feather name={delta.icon} size={11} color={t.fg} />
      <Text className="text-[11px] font-bold ml-1" style={{ color: t.fg }}>
        {delta.label}
      </Text>
    </View>
  );
}

function WaitDot({ iso }) {
  const t = TONE_COLORS[waitTone(iso)] ?? TONE_COLORS.neutral;
  return (
    <View
      style={{
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: iso ? t.fg : colors.inkFaint,
        marginRight: 6,
      }}
    />
  );
}

// 1. Attention: the queues that have work in them, most overdue first.
function AttentionCard({ total, queues, clearQueues, onOpen }) {
  const clear = total === 0;
  return (
    <View
      className="mx-5 bg-white rounded-3xl border border-line/60 overflow-hidden"
      style={shadows.md}
    >
      <View
        className="flex-row items-center px-4 py-4"
        style={{
          backgroundColor: clear ? colors.primaryLight : colors.accentLight,
        }}
        accessible
        accessibilityRole="header"
        accessibilityLabel={
          clear
            ? "All clear. Nothing is waiting for review."
            : `${total} ${total === 1 ? "item needs" : "items need"} your attention`
        }
      >
        <View
          className="items-center justify-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors.white,
          }}
        >
          {clear ? (
            <Feather name="check" size={20} color={colors.primaryActive} />
          ) : (
            <Text
              className="text-[20px] font-extrabold"
              style={[{ color: colors.accentDark }, TABULAR_NUMS]}
            >
              {total}
            </Text>
          )}
        </View>
        <View className="flex-1 ml-3">
          <Text
            className="text-[16px] font-extrabold tracking-[-0.2px]"
            style={{ color: clear ? colors.primaryActive : colors.accentDark }}
          >
            {clear ? "All clear" : "Needs your attention"}
          </Text>
          <Text
            className="text-[12.5px] mt-0.5"
            style={{ color: clear ? colors.primaryActive : colors.accentDark }}
          >
            {clear
              ? "Nothing is waiting for review."
              : `${queues.length} ${queues.length === 1 ? "queue" : "queues"} · oldest first`}
          </Text>
        </View>
      </View>

      {queues.map((q, i) => (
        <Pressable
          key={q.key}
          onPress={() => onOpen(q.to)}
          accessibilityRole="button"
          accessibilityLabel={`${q.label}, ${q.count} waiting${
            q.oldest ? `, oldest ${ageLabel(q.oldest)}` : ""
          }`}
          style={({ pressed }) => ({
            backgroundColor: pressed ? colors.surface : colors.white,
          })}
          className={`flex-row items-center px-4 py-3 min-h-[60px] ${
            i === 0 ? "" : "border-t border-line/60"
          }`}
        >
          <IconBubble name={q.icon} tone="accent" />
          <View className="flex-1 min-w-0 ml-3">
            <Text className="text-[14.5px] font-bold text-ink" numberOfLines={1}>
              {q.label}
            </Text>
            <View className="flex-row items-center mt-0.5">
              <WaitDot iso={q.oldest} />
              <Text className="text-[12.5px] text-ink-muted" numberOfLines={1}>
                {q.oldest ? `Oldest waiting ${ageLabel(q.oldest)}` : "Waiting for review"}
              </Text>
            </View>
          </View>
          <StatusPill label={String(q.count)} tone="accent" />
          <Feather
            name="chevron-right"
            size={16}
            color={colors.inkFaint}
            style={{ marginLeft: 8 }}
          />
        </Pressable>
      ))}

      {!clear && clearQueues.length > 0 ? (
        <View className="flex-row items-start px-4 py-3 border-t border-line/60">
          <Feather
            name="check-circle"
            size={14}
            color={colors.primary}
            style={{ marginTop: 2 }}
          />
          <Text className="flex-1 ml-2 text-[12.5px] text-ink-muted leading-[18px]">
            Clear: {clearQueues.map((q) => q.label).join(", ")}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

// 2. Jump to: one-tap access to each Operations section.
function JumpRow({ items }) {
  return (
    <View className="flex-row px-5" style={{ gap: 10 }}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={item.onPress}
          accessibilityRole="button"
          accessibilityLabel={`Open ${item.label}`}
          style={({ pressed }) => ({
            flex: 1,
            opacity: pressed ? 0.9 : 1,
            ...shadows.card,
          })}
          className="items-center bg-white rounded-2xl border border-line/60 py-3 min-h-[72px] justify-center"
        >
          <View className="w-9 h-9 rounded-full bg-primary-light items-center justify-center">
            <Feather name={item.icon} size={16} color={colors.primary} />
          </View>
          <Text
            className="text-[12px] font-semibold text-ink-secondary mt-1.5"
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

// 3. Marketplace tiles: value first, label underneath, change last. The icon
// no longer shares a line with the label, so labels never truncate.
function KpiTile({ icon, label, value, hint, delta, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}${hint ? `, ${hint}` : ""}${
        delta ? `, ${delta.label}` : ""
      }`}
      style={({ pressed }) => ({
        flex: 1,
        opacity: pressed ? 0.92 : 1,
        ...shadows.card,
      })}
      className="bg-white rounded-2xl border border-line/60 p-4"
    >
      <View className="flex-row items-center justify-between">
        <View className="w-8 h-8 rounded-full bg-primary-light items-center justify-center">
          <Feather name={icon} size={15} color={colors.primary} />
        </View>
        <Feather name="chevron-right" size={15} color={colors.inkFaint} />
      </View>
      <Text
        className="text-[30px] leading-[36px] font-extrabold text-ink mt-3 tracking-[-0.8px]"
        style={TABULAR_NUMS}
      >
        {value}
      </Text>
      <Text className="text-[13.5px] font-semibold text-ink-secondary mt-0.5">
        {label}
      </Text>
      {hint ? (
        <Text className="text-[12px] text-ink-muted mt-0.5" numberOfLines={2}>
          {hint}
        </Text>
      ) : null}
      <DeltaChip delta={delta} />
    </Pressable>
  );
}

// 4. Orders this week: total, change, and a bar per day.
function OrdersWeekCard({ total, delta, series, onPress }) {
  const hasSeries = Array.isArray(series) && series.length > 0;
  const max = hasSeries ? Math.max(1, ...series.map((d) => d.count)) : 1;
  const summary = hasSeries
    ? series
        .map((d) => {
          const day = WEEKDAY_INITIALS[new Date(`${d.date}T00:00:00Z`).getUTCDay()];
          return `${day} ${d.count}`;
        })
        .join(", ")
    : "";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Orders in the last 7 days: ${total}${
        delta ? `, ${delta.label}` : ""
      }. ${summary}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1, ...shadows.card })}
      className="mx-5 bg-white rounded-2xl border border-line/60 p-4"
    >
      <View className="flex-row items-start justify-between">
        <View>
          <Text
            className="text-[30px] leading-[36px] font-extrabold text-ink tracking-[-0.8px]"
            style={TABULAR_NUMS}
          >
            {total}
          </Text>
          <Text className="text-[13.5px] font-semibold text-ink-secondary">
            New orders this week
          </Text>
        </View>
        <DeltaChip delta={delta} />
      </View>

      {hasSeries ? (
        <View
          className="flex-row items-end justify-between mt-4"
          style={{ height: 70 }}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {series.map((d, i) => {
            const isToday = i === series.length - 1;
            const barHeight =
              d.count === 0 ? 4 : Math.max(10, Math.round((d.count / max) * 48));
            return (
              <View key={d.date} className="items-center" style={{ flex: 1 }}>
                <View
                  style={{
                    width: 20,
                    height: barHeight,
                    borderRadius: 6,
                    backgroundColor:
                      d.count === 0
                        ? colors.skeleton
                        : isToday
                          ? colors.primary
                          : colors.primaryHover,
                    opacity: d.count === 0 || isToday ? 1 : 0.55,
                  }}
                />
                <Text
                  className="text-[10.5px] mt-1.5"
                  style={{
                    color: isToday ? colors.ink : colors.inkMuted,
                    fontWeight: isToday ? "700" : "500",
                  }}
                >
                  {WEEKDAY_INITIALS[new Date(`${d.date}T00:00:00Z`).getUTCDay()]}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </Pressable>
  );
}

// 5. Payment protection. The percentage now sits on its own line instead of
// crowding the amount.
function FundsCard({ currency, held, released }) {
  const total = held + released;
  const releasedPct = total > 0 ? Math.round((released / total) * 100) : 0;

  return (
    <View
      className="mx-5 bg-white rounded-2xl border border-line/60 p-4 mb-3"
      style={shadows.card}
      accessible
      accessibilityLabel={`${formatCurrency(total, currency)} processed. ${releasedPct} percent released to farmers, ${formatCurrency(held, currency)} held in protection.`}
    >
      <Text className="text-[12.5px] text-ink-muted">Total processed</Text>
      <Text
        className="text-[28px] leading-[34px] font-extrabold text-ink mt-0.5 tracking-[-0.6px]"
        style={TABULAR_NUMS}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {formatCurrency(total, currency)}
      </Text>
      {total > 0 ? (
        <View className="mt-2">
          <StatusPill label={`${releasedPct}% released`} tone="success" />
        </View>
      ) : null}

      <View
        className="flex-row h-2.5 rounded-full overflow-hidden mt-4"
        style={{ backgroundColor: colors.skeleton }}
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
            <Text className="ml-1.5 text-[12.5px] text-ink-muted">Released</Text>
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
            <Text className="ml-1.5 text-[12.5px] text-ink-muted">Held</Text>
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

// 6. Recent activity: the actor gets its own full-width line (it used to be
// cut off by the time column), and each row opens the audit event.
function ActivityRow({ event, isLast, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${humanize(event.action)}, ${event.actor?.fullName ?? "System"}, ${ageLabel(event.createdAt)} ago`}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.surface : colors.white,
      })}
      className={`flex-row items-center px-4 py-3 min-h-[64px] ${
        isLast ? "" : "border-b border-line/60"
      }`}
    >
      <IconBubble name="file-text" tone="neutral" />
      <View className="flex-1 min-w-0 ml-3">
        <View className="flex-row items-center">
          <Text
            className="flex-1 text-[14px] font-bold text-ink"
            numberOfLines={1}
          >
            {humanize(event.action)}
          </Text>
          <Text className="text-[11.5px] text-ink-muted ml-2">
            {ageLabel(event.createdAt)} ago
          </Text>
        </View>
        <Text className="text-[12.5px] text-ink-muted mt-0.5" numberOfLines={1}>
          {event.actor?.fullName ?? "System"} · {humanize(event.entityType)}
        </Text>
      </View>
      <Feather
        name="chevron-right"
        size={16}
        color={colors.inkFaint}
        style={{ marginLeft: 8 }}
      />
    </Pressable>
  );
}

function LoadingSkeleton() {
  return (
    <View className="px-5" style={{ gap: 12 }} accessibilityLabel="Loading overview">
      <Skeleton height={190} radius={24} />
      <View className="flex-row" style={{ gap: 10 }}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} className="flex-1">
            <Skeleton height={72} radius={16} />
          </View>
        ))}
      </View>
      <View className="flex-row" style={{ gap: 12 }}>
        <View className="flex-1">
          <Skeleton height={150} radius={16} />
        </View>
        <View className="flex-1">
          <Skeleton height={150} radius={16} />
        </View>
      </View>
      <Skeleton height={150} radius={16} />
    </View>
  );
}

export function AdminOverviewV2Page() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const query = useAdminOverview();
  const data = query.data;
  const counts = data?.counts ?? {};
  const oldest = data?.oldest ?? {};
  const trends = data?.trends ?? {};
  const events = (data?.auditEvents ?? []).slice(0, 5);
  const firstName = user?.fullName?.split(" ")[0];

  const go = (screen, params) => navigation.navigate(screen, params);
  const open = (to) => go(...to);

  const disputes =
    (counts.openDisputes ?? 0) + (counts.underReviewDisputes ?? 0);
  const allQueues = [
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
  const total = allQueues.reduce((sum, q) => sum + q.count, 0);
  // Active queues, longest-waiting first; queues without a wait time sort last.
  const activeQueues = allQueues
    .filter((q) => q.count > 0)
    .sort((a, b) => waitRank(b.oldest) - waitRank(a.oldest));
  const clearQueues = allQueues.filter((q) => q.count === 0);

  const byCurrency = {};
  for (const f of data?.funds ?? []) {
    const entry = (byCurrency[f.currency] ??= { held: 0, released: 0 });
    if (f.status === "RELEASED") entry.released += f.amount;
    else entry.held += f.amount;
  }

  const newUsers = trends.newUsers7d ?? 0;
  const orders7d = trends.orders7d ?? 0;

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
          <LoadingSkeleton />
        ) : query.isError ? (
          <ErrorState
            message={getErrorMessage(query.error)}
            onRetry={() => query.refetch()}
          />
        ) : (
          <>
            <AttentionCard
              total={total}
              queues={activeQueues}
              clearQueues={clearQueues}
              onOpen={open}
            />

            <SectionTitle title="Jump to" />
            <JumpRow
              items={[
                {
                  label: "Orders",
                  icon: "package",
                  onPress: () => go("Operations", { section: "orders" }),
                },
                {
                  label: "Payments",
                  icon: "credit-card",
                  onPress: () => go("Operations", { section: "payments" }),
                },
                {
                  label: "Listings",
                  icon: "shopping-bag",
                  onPress: () => go("Operations", { section: "listings" }),
                },
                {
                  label: "Audit",
                  icon: "file-text",
                  onPress: () => go("Operations", { section: "audit" }),
                },
              ]}
            />

            <SectionTitle title="Marketplace" />
            <View className="px-5" style={{ gap: 12 }}>
              <View className="flex-row" style={{ gap: 12 }}>
                <KpiTile
                  icon="users"
                  label="Users"
                  value={counts.users ?? 0}
                  hint={`${counts.farmers ?? 0} farmers · ${counts.buyers ?? 0} buyers`}
                  delta={weekDelta(newUsers, trends.newUsersPrev7d)}
                  onPress={() => go("Users")}
                />
                <KpiTile
                  icon="shopping-bag"
                  label="Active listings"
                  value={counts.activeListings ?? 0}
                  hint={
                    (counts.flaggedListings ?? 0) > 0
                      ? `${counts.flaggedListings} price flagged`
                      : "No price flags"
                  }
                  onPress={() => go("Operations", { section: "listings" })}
                />
              </View>
              <View className="flex-row" style={{ gap: 12 }}>
                <KpiTile
                  icon="package"
                  label="Orders"
                  value={counts.orders ?? 0}
                  hint={`${trends.deliveredOrders ?? 0} delivered`}
                  onPress={() => go("Operations", { section: "orders" })}
                />
                <KpiTile
                  icon="lock"
                  label="Payments held"
                  value={counts.heldPayments ?? 0}
                  hint="In buyer protection"
                  onPress={() => go("Operations", { section: "payments" })}
                />
              </View>
            </View>

            <SectionTitle title="This week" />
            <OrdersWeekCard
              total={orders7d}
              delta={weekDelta(orders7d, trends.ordersPrev7d)}
              series={trends.ordersByDay}
              onPress={() => go("Operations", { section: "orders" })}
            />

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
                  <ActivityRow
                    key={e.id}
                    event={e}
                    isLast={i === events.length - 1}
                    onPress={() => go("AdminAuditDetail", { eventId: e.id })}
                  />
                ))}
              </Group>
            )}

            {data?.generatedAt ? (
              <Text className="text-[11.5px] text-ink-muted text-center mt-5">
                Updated {ageLabel(data.generatedAt)} ago · pull down to refresh
              </Text>
            ) : null}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
