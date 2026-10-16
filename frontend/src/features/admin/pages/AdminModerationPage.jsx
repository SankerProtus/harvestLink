import { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import {
  LoadingState,
  ErrorState,
} from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { formatCurrency } from "../../../lib/currency.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  useVerificationQueue,
  useVerificationDecision,
  usePriceReviewQueue,
  useClearPriceReview,
  useDisputeQueue,
  useAdminOverview,
  useAdminUsers,
  useAdminListings,
  useAdminOrders,
  useAdminPayments,
  useAdminAuditLogs,
} from "../hooks/adminHooks.js";
import {
  useAdminReports,
  useReviewAdminReport,
} from "../../trust/hooks/reportHooks.js";
import { Alert } from "../../../lib/alert.js";

const TABS = [
  {
    value: "overview",
    label: "Overview",
    icon: "grid",
    description: "Platform health and priorities",
  },
  {
    value: "verification",
    label: "Verification",
    icon: "check-circle",
    description: "Review farmer identity requests",
  },
  {
    value: "reports",
    label: "Reports",
    icon: "flag",
    description: "Investigate account complaints",
  },
  {
    value: "price",
    label: "Price review",
    icon: "tag",
    description: "Resolve unusual listing prices",
  },
  {
    value: "disputes",
    label: "Disputes",
    icon: "alert-circle",
    description: "Protect buyers and farmers",
  },
  {
    value: "users",
    label: "Users",
    icon: "users",
    description: "Browse accounts and activity",
  },
  {
    value: "listings",
    label: "Listings",
    icon: "shopping-bag",
    description: "Monitor marketplace inventory",
  },
  {
    value: "orders",
    label: "Orders",
    icon: "package",
    description: "Track fulfilment and delivery",
  },
  {
    value: "payments",
    label: "Payments",
    icon: "credit-card",
    description: "Review protected funds",
  },
  {
    value: "audit",
    label: "Audit log",
    icon: "file-text",
    description: "Trace administrative actions",
  },
];

const TAB_GROUPS = [
  ["Command center", "A live view of what needs attention", ["overview"]],
  [
    "Trust & safety",
    "Review risk, identity and customer reports",
    ["verification", "reports", "price", "disputes"],
  ],
  [
    "Operations",
    "Read-only operational visibility",
    ["users", "listings", "orders", "payments"],
  ],
  ["Governance", "Accountability and change history", ["audit"]],
];

function TabIcon({ name, active = false, size = 17 }) {
  return (
    <Feather
      name={name}
      size={size}
      color={active ? colors.primary : colors.inkMuted}
    />
  );
}

function WorkspaceNavigation({ tab, onChange }) {
  return (
    <Card className="mx-5 mt-3 mb-4 p-3">
      <View className="flex-row items-center justify-between px-1 mb-3">
        <View>
          <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-primary">
            Workspace
          </Text>
          <Text className="text-[12px] text-ink-muted mt-1">
            Choose an operational area
          </Text>
        </View>
        <Feather name="sliders" size={18} color={colors.inkFaint} />
      </View>
      {TAB_GROUPS.map(([group, description, values]) => (
        <View key={group} className="mb-3 last:mb-0">
          <Text className="text-[12px] font-bold text-ink px-1">{group}</Text>
          <Text className="text-[11px] text-ink-muted px-1 mt-0.5 mb-2">
            {description}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {values.map((value) => {
              const option = TABS.find((item) => item.value === value);
              const active = tab === value;
              return (
                <Pressable
                  key={value}
                  onPress={() => onChange(value)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  className={`w-[48%] min-h-[58px] rounded-xl2 border px-3 py-2.5 ${active ? "bg-primary/10 border-primary/40" : "bg-surface border-line/60"}`}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`w-7 h-7 rounded-lg items-center justify-center ${active ? "bg-primary/15" : "bg-white"}`}
                    >
                      <TabIcon name={option.icon} active={active} />
                    </View>
                    <Text
                      className={`text-[12px] font-bold ml-2 flex-1 ${active ? "text-primary" : "text-ink"}`}
                    >
                      {option.label}
                    </Text>
                    {active ? (
                      <View className="w-1.5 h-1.5 rounded-full bg-primary" />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </Card>
  );
}

function WorkspaceHeader({ tab }) {
  const option = TABS.find((item) => item.value === tab);
  return (
    <View className="mb-4">
      <View className="flex-row items-center">
        <View className="w-9 h-9 rounded-xl bg-primary/10 items-center justify-center mr-3">
          <TabIcon name={option.icon} active size={19} />
        </View>
        <View className="flex-1">
          <Text className="text-[21px] font-extrabold text-ink">
            {option.label}
          </Text>
          <Text className="text-[12px] text-ink-muted mt-0.5">
            {option.description}
          </Text>
        </View>
      </View>
      <View className="h-px bg-line/60 mt-4" />
    </View>
  );
}

function QueueState({ query, label, children }) {
  if (query.isLoading) return <LoadingState label={`Loading ${label}…`} />;
  if (query.isError) {
    return (
      <ErrorState
        message={getErrorMessage(query.error)}
        onRetry={() => query.refetch()}
      />
    );
  }
  return children;
}

function OverviewTab({ onOpenQueue }) {
  const query = useAdminOverview();
  return (
    <QueueState query={query} label="admin analytics">
      {(() => {
        const counts = query.data?.counts ?? {};
        const events = query.data?.auditEvents ?? [];
        const cards = [
          ["users", "Users", "users", colors.primary],
          ["activeListings", "Active listings", "shopping-bag", colors.accent],
          ["orders", "Orders", "package", colors.primary],
          ["heldPayments", "Protected payments", "lock", colors.warning],
        ];
        const queues = [
          ["pendingVerifications", "Verification reviews", "verification"],
          ["flaggedListings", "Price flags", "price"],
          ["openDisputes", "Open disputes", "disputes"],
          ["underReviewDisputes", "Disputes under review", "disputes"],
          ["refundPending", "Refunds pending", "payments"],
        ];
        return (
          <>
            <Text className="text-[12px] text-ink-muted mb-3">
              Live operational snapshot · refreshed every minute
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {cards.map(([key, label, icon, color]) => (
                <Card key={key} className="w-[48%] p-3">
                  <Feather name={icon} size={18} color={color} />
                  <Text className="text-[22px] font-extrabold text-ink mt-2">
                    {counts[key] ?? 0}
                  </Text>
                  <Text className="text-[11.5px] text-ink-muted mt-1">
                    {label}
                  </Text>
                </Card>
              ))}
            </View>
            <Card className="p-4 mb-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-[14px] font-bold text-ink">
                  Needs attention
                </Text>
                <Text className="text-[11px] text-ink-muted">
                  Prioritized queues
                </Text>
              </View>
              {queues.map(([key, label, target]) => (
                <Pressable
                  key={key}
                  onPress={() => onOpenQueue(target)}
                  className="flex-row items-center justify-between py-2 border-b border-line/40"
                >
                  <Text className="text-[13px] text-ink">{label}</Text>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[13px] font-bold text-primary">
                      {counts[key] ?? 0}
                    </Text>
                    <Feather
                      name="chevron-right"
                      size={16}
                      color={colors.inkFaint}
                    />
                  </View>
                </Pressable>
              ))}
            </Card>
            <Card className="p-4 mb-4">
              <Text className="text-[14px] font-bold text-ink mb-3">
                Platform health
              </Text>
              {[
                [
                  "Marketplace",
                  counts.activeListings > 0,
                  `${counts.activeListings ?? 0} active listings`,
                ],
                [
                  "Trust & safety",
                  (counts.openDisputes ?? 0) === 0,
                  `${counts.openDisputes ?? 0} open disputes`,
                ],
                [
                  "Payment protection",
                  (counts.refundPending ?? 0) === 0,
                  `${counts.heldPayments ?? 0} payments held`,
                ],
              ].map(([label, healthy, detail]) => (
                <View
                  key={label}
                  className="flex-row items-center py-2 border-b border-line/40"
                >
                  <View
                    className={`w-2.5 h-2.5 rounded-full mr-2 ${healthy ? "bg-success" : "bg-warning"}`}
                  />
                  <Text className="text-[13px] text-ink flex-1">{label}</Text>
                  <Text className="text-[11.5px] text-ink-muted">{detail}</Text>
                </View>
              ))}
            </Card>
            <Card className="p-4 mb-4">
              <Text className="text-[14px] font-bold text-ink mb-2">
                Recent admin activity
              </Text>
              {events.length ? (
                events.map((event) => (
                  <View key={event.id} className="py-2 border-b border-line/40">
                    <Text className="text-[12.5px] font-semibold text-ink">
                      {event.action.replace(/_/g, " ")}
                    </Text>
                    <Text className="text-[11.5px] text-ink-muted mt-1">
                      {event.entityType} · {event.actor?.fullName ?? "System"} ·{" "}
                      {new Date(event.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-[12.5px] text-ink-muted">
                  No audit activity recorded yet.
                </Text>
              )}
            </Card>
          </>
        );
      })()}
    </QueueState>
  );
}

function VerificationTab() {
  const queue = useVerificationQueue();
  const decision = useVerificationDecision();
  const [notesById, setNotesById] = useState({});
  return (
    <QueueState query={queue} label="verification queue">
      {(() => {
        const items = queue.data ?? [];
        if (!items.length)
          return (
            <Text className="text-[13px] text-ink-muted text-center py-8">
              No pending verification requests.
            </Text>
          );
        return items.map((record) => (
          <Card key={record.id} className="p-4 mb-3">
            <Text className="text-[14px] font-bold text-ink">
              {record.user?.fullName ?? "User"}
            </Text>
            <Text className="text-[12px] text-ink-muted mt-1">
              {record.user?.role} · tier {record.tierRequested} ·{" "}
              {record.provider}
            </Text>
            {record.notes ? (
              <Text className="text-[13px] text-ink mt-2">{record.notes}</Text>
            ) : null}
            <TextInput
              placeholder="Reviewer notes (optional)"
              placeholderTextColor={colors.inkFaint}
              value={notesById[record.id] ?? ""}
              onChangeText={(text) =>
                setNotesById((prev) => ({ ...prev, [record.id]: text }))
              }
              className="rounded-xl2 bg-cream border border-line/50 px-3 py-2 text-[13px] text-ink mt-3 mb-3"
            />
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Button
                  label="Reject"
                  variant="secondary"
                  isLoading={decision.isPending}
                  onPress={() =>
                    decision.mutate({
                      recordId: record.id,
                      decision: "REJECT",
                      notes: notesById[record.id]?.trim() || undefined,
                    })
                  }
                />
              </View>
              <View className="flex-1">
                <Button
                  label="Approve"
                  isLoading={decision.isPending}
                  onPress={() =>
                    decision.mutate({
                      recordId: record.id,
                      decision: "APPROVE",
                      notes: notesById[record.id]?.trim() || undefined,
                    })
                  }
                />
              </View>
            </View>
          </Card>
        ));
      })()}
    </QueueState>
  );
}

function PriceReviewTab() {
  const queue = usePriceReviewQueue();
  const clearReview = useClearPriceReview();
  return (
    <QueueState query={queue} label="price review queue">
      {(() => {
        const items = queue.data ?? [];
        if (!items.length)
          return (
            <Text className="text-[13px] text-ink-muted text-center py-8">
              No listings flagged for price review.
            </Text>
          );
        return items.map((listing) => (
          <Card key={listing.id} className="p-4 mb-3">
            <Text className="text-[14px] font-bold text-ink">
              {listing.title}
            </Text>
            <Text className="text-[12px] text-ink-muted mt-1">
              {listing.crop?.name ?? listing.cropType} ·{" "}
              {formatCurrency(listing.pricePerUnit)} / {listing.quantityUnit}
            </Text>
            <Text className="text-[12px] text-ink-muted">
              Farmer: {listing.farmer?.fullName ?? "—"}
            </Text>
            <View className="mt-3">
              <Button
                label="Clear price review flag"
                variant="secondary"
                isLoading={clearReview.isPending}
                onPress={() => clearReview.mutate(listing.id)}
              />
            </View>
          </Card>
        ));
      })()}
    </QueueState>
  );
}

function DisputesTab() {
  const navigation = useNavigation();
  const queue = useDisputeQueue();
  return (
    <QueueState query={queue} label="disputes">
      {(() => {
        const items = queue.data ?? [];
        if (!items.length)
          return (
            <Text className="text-[13px] text-ink-muted text-center py-8">
              No open disputes in the queue.
            </Text>
          );
        return items.map((dispute) => (
          <Pressable
            key={dispute.id}
            onPress={() =>
              navigation.navigate("AdminDisputeDetail", {
                disputeId: dispute.id,
              })
            }
          >
            <Card className="p-4 mb-3">
              <View className="flex-row justify-between">
                <Text className="text-[14px] font-bold text-ink flex-1">
                  {dispute.order?.listing?.title ?? "Dispute"}
                </Text>
                <Feather
                  name="chevron-right"
                  size={18}
                  color={colors.inkFaint}
                />
              </View>
              <Text className="text-[12px] text-ink-muted mt-1">
                {dispute.status.replace(/_/g, " ")} · opened by{" "}
                {dispute.openedBy?.fullName}
              </Text>
              <Text className="text-[13px] text-ink mt-2" numberOfLines={2}>
                {dispute.description}
              </Text>
              {dispute.evidenceUrls?.length ? (
                <ScrollView horizontal className="mt-2">
                  {dispute.evidenceUrls.slice(0, 3).map((url) => (
                    <Image
                      key={url}
                      source={{ uri: url }}
                      className="w-14 h-14 rounded-lg mr-2 bg-line"
                    />
                  ))}
                </ScrollView>
              ) : null}
            </Card>
          </Pressable>
        ));
      })()}
    </QueueState>
  );
}

function ReportsTab() {
  const reports = useAdminReports();
  const review = useReviewAdminReport();
  return (
    <QueueState query={reports} label="account reports">
      {(() => {
        const items = reports.data ?? [];
        if (!items.length)
          return (
            <Text className="text-[13px] text-ink-muted text-center py-8">
              No active account reports.
            </Text>
          );
        return items.map((item) => (
          <Card key={item.id} className="p-4 mb-3">
            <Text className="text-[14px] font-bold text-ink">
              {item.reportedUser?.fullName ?? "Reported account"}
            </Text>
            <Text className="text-[12px] text-ink-muted mt-1">
              {item.reason.replace(/_/g, " ")} · reported by{" "}
              {item.reporter?.fullName ?? "User"} · {item.status}
            </Text>
            <Text className="text-[13px] text-ink mt-2">
              {item.description}
            </Text>
            <View className="flex-row gap-2 mt-3">
              <View className="flex-1">
                <Button
                  label="Dismiss"
                  variant="secondary"
                  isLoading={review.isPending}
                  onPress={() =>
                    review.mutate({
                      reportId: item.id,
                      decision: "DISMISS",
                      resolutionNotes:
                        "Evidence and details did not confirm a policy violation.",
                    })
                  }
                />
              </View>
              <View className="flex-1">
                <Button
                  label="Block account"
                  variant="danger"
                  isLoading={review.isPending}
                  onPress={() =>
                    Alert.alert(
                      "Block account",
                      `Block ${item.reportedUser?.fullName ?? "this account"} and revoke its active sessions?`,
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Block",
                          style: "destructive",
                          onPress: () =>
                            review.mutate({
                              reportId: item.id,
                              decision: "BLOCK",
                              resolutionNotes:
                                "Review confirmed a policy violation. Account blocked.",
                            }),
                        },
                      ],
                    )
                  }
                />
              </View>
            </View>
            {review.isError ? (
              <Text className="text-[12px] text-danger mt-2">
                {getErrorMessage(review.error)}
              </Text>
            ) : null}
          </Card>
        ));
      })()}
    </QueueState>
  );
}

function AdminDataTab({ type, search }) {
  const queries = {
    users: useAdminUsers(),
    listings: useAdminListings(),
    orders: useAdminOrders(),
    payments: useAdminPayments(),
    audit: useAdminAuditLogs(),
  };
  const query = queries[type];
  return (
    <QueueState query={query} label={type}>
      {(() => {
        const rows = (query.data ?? []).filter((row) => {
          const haystack = JSON.stringify(row).toLowerCase();
          return (
            !search.trim() || haystack.includes(search.trim().toLowerCase())
          );
        });
        if (!rows.length)
          return (
            <Text className="text-[13px] text-ink-muted text-center py-8">
              No records found.
            </Text>
          );
        return rows.map((row) => {
          const title =
            type === "users"
              ? row.fullName
              : type === "listings"
                ? row.title
                : type === "orders"
                  ? (row.listing?.title ?? "Order")
                  : type === "payments"
                    ? `${row.provider} payment`
                    : row.action?.replace(/_/g, " ");
          const detail =
            type === "users"
              ? `${row.role} · ${row.accountStatus} · verification tier ${row.verificationLevel}`
              : type === "listings"
                ? `${row.crop?.name ?? "Crop"} · ${formatCurrency(row.pricePerUnit)} / ${row.quantityUnit} · ${row.status}`
                : type === "orders"
                  ? `${row.status} · Buyer: ${row.buyer?.fullName ?? "—"} · Farmer: ${row.farmer?.fullName ?? "—"}`
                  : type === "payments"
                    ? `${formatCurrency(row.amount, row.currency)} · ${row.status} · escrow ${row.escrow?.status ?? "—"}`
                    : `${row.entityType} · ${row.actor?.fullName ?? "System"}`;
          return (
            <Card key={row.id} className="p-4 mb-3">
              <View className="flex-row items-start justify-between">
                <Text className="text-[14px] font-bold text-ink flex-1">
                  {title}
                </Text>
                <Text className="text-[10px] text-ink-muted ml-2">
                  {new Date(
                    row.createdAt ?? row.updatedAt,
                  ).toLocaleDateString()}
                </Text>
              </View>
              <Text className="text-[12px] text-ink-muted mt-1">{detail}</Text>
              {type === "users" ? (
                <Text className="text-[11.5px] text-ink-muted mt-2">
                  Listings: {row._count?.listings ?? 0} · Orders:{" "}
                  {(row._count?.buyerOrders ?? 0) +
                    (row._count?.farmerOrders ?? 0)}
                </Text>
              ) : null}
              {type === "listings" ? (
                <Text className="text-[11.5px] text-ink-muted mt-2">
                  Farmer: {row.farmer?.fullName ?? "—"} · Orders:{" "}
                  {row._count?.orders ?? 0} · Interests:{" "}
                  {row._count?.interests ?? 0}
                </Text>
              ) : null}
              {type === "orders" && row.disputes?.length ? (
                <Text className="text-[11.5px] text-danger mt-2">
                  Active dispute attached
                </Text>
              ) : null}
              {type === "payments" ? (
                <Text className="text-[11.5px] text-ink-muted mt-2">
                  Refund: {row.refunds?.[0]?.status ?? "—"} · Payout:{" "}
                  {row.payouts?.[0]?.status ?? "—"}
                </Text>
              ) : null}
            </Card>
          );
        });
      })()}
    </QueueState>
  );
}

export function AdminModerationPage() {
  const navigation = useNavigation();
  const [tab, setTab] = useState("overview");
  const [search, setSearch] = useState("");
  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => navigation.goBack()}
    />
  );
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
      <ScreenHeader
        title="Admin operations"
        subtitle="Monitor, investigate and manage HarvestLink"
        leftAction={backAction}
      />
      <KeyboardAvoider className="flex-1">
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <WorkspaceNavigation
            tab={tab}
            onChange={(value) => {
              setTab(value);
              setSearch("");
            }}
          />
          {["users", "listings", "orders", "payments", "audit"].includes(
            tab,
          ) ? (
            <View className="px-5 pb-3">
              <View className="flex-row items-center bg-white border border-line/60 rounded-xl2 px-3">
                <Feather name="search" size={16} color={colors.inkFaint} />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder={`Search ${tab}…`}
                  placeholderTextColor={colors.inkFaint}
                  accessibilityLabel={`Search ${tab}`}
                  className="flex-1 px-2 py-2.5 text-[13px] text-ink"
                />
                {search ? (
                  <Pressable
                    onPress={() => setSearch("")}
                    accessibilityLabel="Clear search"
                  >
                    <Feather
                      name="x-circle"
                      size={16}
                      color={colors.inkFaint}
                    />
                  </Pressable>
                ) : null}
              </View>
            </View>
          ) : null}
          <View className="px-5">
            <WorkspaceHeader tab={tab} />
            {tab === "overview" ? <OverviewTab onOpenQueue={setTab} /> : null}
            {tab === "verification" ? <VerificationTab /> : null}
            {tab === "price" ? <PriceReviewTab /> : null}
            {tab === "disputes" ? <DisputesTab /> : null}
            {tab === "reports" ? <ReportsTab /> : null}
            {["users", "listings", "orders", "payments", "audit"].includes(
              tab,
            ) ? (
              <AdminDataTab type={tab} search={search} />
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoider>
    </SafeAreaView>
  );
}
