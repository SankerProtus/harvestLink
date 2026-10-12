import { View, ScrollView, RefreshControl } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { Skeleton } from "../../../components/ui/Skeleton.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import { formatCurrency } from "../../../lib/currency.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useAdminOverview } from "../hooks/adminHooks.js";
import {
  AdminScreen,
  Group,
  IconBubble,
  KpiTile,
  Row,
  SectionTitle,
  ageLabel,
  humanize,
} from "../components/AdminUI.jsx";

export function AdminOverviewPage() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const query = useAdminOverview();
  const data = query.data;
  const counts = data?.counts ?? {};
  const oldest = data?.oldest ?? {};
  const trends = data?.trends ?? {};
  const events = (data?.auditEvents ?? []).slice(0, 5);
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

  const byCurrency = {};
  for (const f of data?.funds ?? []) {
    const entry = (byCurrency[f.currency] ??= { held: 0, released: 0 });
    if (f.status === "RELEASED") entry.released += f.amount;
    else entry.held += f.amount;
  }

  const go = (screen, params) => navigation.navigate(screen, params);

  return (
    <AdminScreen
      eyebrow="HarvestLink admin"
      title="Command center"
      tone="tinted"
      subtitle={firstName ? `Welcome back, ${firstName}` : undefined}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
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
          <View className="px-5 gap-3" accessibilityLabel="Loading overview">
            <Skeleton height={120} radius={20} />
            <Skeleton height={220} radius={16} />
            <Skeleton height={110} radius={16} />
          </View>
        ) : query.isError ? (
          <ErrorState
            message={getErrorMessage(query.error)}
            onRetry={() => query.refetch()}
          />
        ) : (
          <>
            <View
              className={`mx-5 rounded-2xl p-5 ${total > 0 ? "bg-accent-light" : "bg-primary-light"}`}
              accessible
              accessibilityLabel={
                total > 0
                  ? `${total} items need your review`
                  : "All clear. Nothing is waiting for review."
              }
            >
              <Text
                className="text-[11px] font-bold uppercase tracking-[1px]"
                style={{
                  color: total > 0 ? colors.accentDark : colors.primaryActive,
                }}
              >
                Review queue
              </Text>
              <Text
                className="text-[36px] font-extrabold text-ink mt-1 tracking-[-1px]"
                style={TABULAR_NUMS}
              >
                {total > 0 ? total : "All clear"}
              </Text>
              <Text className="text-[13.5px] text-ink-secondary mt-0.5">
                {total > 0
                  ? `${total === 1 ? "item needs" : "items need"} your review`
                  : "Nothing is waiting for review right now."}
              </Text>
              <Text className="text-[12px] text-ink-muted mt-2">
                Updated {ageLabel(data?.generatedAt)} ago · pull down to refresh
              </Text>
            </View>

            <SectionTitle title="Needs review" />
            <Group>
              {queues.map((q, i) => (
                <Row
                  key={q.key}
                  leading={
                    <IconBubble
                      name={q.icon}
                      tone={q.count > 0 ? "accent" : "primary"}
                    />
                  }
                  title={q.label}
                  subtitle={
                    q.count === 0
                      ? "Nothing waiting"
                      : q.oldest
                        ? `Oldest waiting ${ageLabel(q.oldest)}`
                        : "Waiting for review"
                  }
                  pill={
                    q.count > 0
                      ? { label: String(q.count), tone: "accent" }
                      : { label: "Clear", tone: "success" }
                  }
                  onPress={() => go(...q.to)}
                  isLast={i === queues.length - 1}
                />
              ))}
            </Group>

            <SectionTitle title="Marketplace" />
            <View className="flex-row flex-wrap gap-3 px-5">
              <KpiTile
                icon="users"
                label="Users"
                value={counts.users ?? 0}
                hint={`${counts.farmers ?? 0} farmers · ${counts.buyers ?? 0} buyers`}
                onPress={() => go("Users")}
              />
              <KpiTile
                icon="shopping-bag"
                label="Active listings"
                value={counts.activeListings ?? 0}
                onPress={() => go("Operations", { section: "listings" })}
              />
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
                hint="in buyer protection"
                onPress={() => go("Operations", { section: "payments" })}
              />
            </View>

            <SectionTitle title="Last 7 days" />
            <Group>
              <Row
                title="New users"
                meta={String(trends.newUsers7d ?? 0)}
                leading={<IconBubble name="user-plus" />}
              />
              <Row
                title="New orders"
                meta={String(trends.orders7d ?? 0)}
                leading={<IconBubble name="shopping-cart" />}
                isLast
              />
            </Group>

            <SectionTitle title="Payment protection" />
            {Object.keys(byCurrency).length === 0 ? (
              <View className="mx-5 rounded-2xl bg-white border border-line/60 p-4">
                <Text className="text-[13.5px] text-ink-secondary">
                  No escrow activity yet.
                </Text>
              </View>
            ) : (
              <Group>
                {Object.entries(byCurrency).map(([currency, v], i, arr) => (
                  <View
                    key={currency}
                    className={`px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-line/60" : ""}`}
                  >
                    <View className="flex-row justify-between">
                      <View>
                        <Text className="text-[12px] text-ink-muted">
                          Held in protection
                        </Text>
                        <Text
                          className="text-[20px] font-extrabold text-ink mt-0.5"
                          style={TABULAR_NUMS}
                        >
                          {formatCurrency(v.held, currency)}
                        </Text>
                      </View>
                      <View className="items-end">
                        <Text className="text-[12px] text-ink-muted">
                          Released to farmers
                        </Text>
                        <Text
                          className="text-[20px] font-extrabold text-primary-dark mt-0.5"
                          style={TABULAR_NUMS}
                        >
                          {formatCurrency(v.released, currency)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </Group>
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
    </AdminScreen>
  );
}
