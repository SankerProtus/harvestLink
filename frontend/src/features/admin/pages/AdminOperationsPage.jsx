import { memo, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SegmentedControl } from "../../../components/ui/SegmentedControl.jsx";
import { StatusPill } from "../../../components/ui/StatusPill.jsx";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import { formatCurrency } from "../../../lib/currency.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  useAdminAuditLogs,
  useAdminListings,
  useAdminOrders,
  useAdminPayments,
} from "../../../../../operations-detail-screens/Frontend/src/features/admin/hooks/adminHooks.js";
import { getOrderStatusMeta } from "../../deliveryTracking/lib/orderStatus.js";
import {
  AdminScreen,
  EmptyNote,
  FilterChips,
  IconBubble,
  ListSkeleton,
  SearchField,
  ageLabel,
  humanize,
} from "../components/AdminUI.jsx";

const SECTIONS = [
  { value: "orders", label: "Orders" },
  { value: "payments", label: "Payments" },
  { value: "listings", label: "Listings" },
  { value: "audit", label: "Audit log" },
];

const FILTERS = {
  orders: [
    { value: "ALL", label: "All" },
    {
      value: "ACTIVE",
      label: "In progress",
      test: (o) => ["PENDING", "CONFIRMED", "IN_TRANSIT"].includes(o.status),
    },
    {
      value: "DISPUTED",
      label: "Disputed",
      test: (o) => o.status === "DISPUTED" || o.disputes?.length > 0,
    },
    {
      value: "DELIVERED",
      label: "Delivered",
      test: (o) => o.status === "DELIVERED",
    },
    {
      value: "CANCELLED",
      label: "Cancelled",
      test: (o) => o.status === "CANCELLED",
    },
  ],
  payments: [
    { value: "ALL", label: "All" },
    {
      value: "HELD",
      label: "Held",
      test: (p) => ["HELD", "RELEASE_PENDING"].includes(p.status),
    },
    {
      value: "REFUND",
      label: "Refund pending",
      test: (p) => p.status === "REFUND_PENDING",
    },
  ],
  listings: [
    { value: "ALL", label: "All" },
    { value: "ACTIVE", label: "Active", test: (l) => l.status === "ACTIVE" },
    {
      value: "FLAGGED",
      label: "Price flagged",
      test: (l) => l.priceReviewRequired,
    },
    {
      value: "INACTIVE",
      label: "Not active",
      test: (l) => l.status !== "ACTIVE",
    },
  ],
  audit: [],
};

const PAYMENT_TONE = {
  HELD: "primary",
  RELEASE_PENDING: "warning",
  REFUND_PENDING: "accent",
};

const SEARCH_TEXT = {
  orders: (o) =>
    `${o.listing?.title ?? ""} ${o.buyer?.fullName ?? ""} ${o.farmer?.fullName ?? ""} ${o.status} ${o.id}`,
  payments: (p) =>
    `${p.order?.listing?.title ?? ""} ${p.buyer?.fullName ?? ""} ${p.provider ?? ""} ${p.status}`,
  listings: (l) =>
    `${l.title ?? ""} ${l.crop?.name ?? ""} ${l.farmer?.fullName ?? ""} ${l.status}`,
  audit: (a) => `${a.action} ${a.entityType} ${a.actor?.fullName ?? ""}`,
};

// Where each section's rows open, and the route param that carries the id.
const DETAIL_ROUTES = {
  orders: { screen: "AdminOrderDetail", param: "orderId" },
  payments: { screen: "AdminPaymentDetail", param: "paymentId" },
  listings: { screen: "AdminListingDetail", param: "listingId" },
  audit: { screen: "AdminAuditDetail", param: "eventId" },
};

const OpsRow = memo(function OpsRow({
  icon,
  tone,
  title,
  time,
  subtitle,
  pill,
  amount,
  note,
  isLast,
  onPress,
}) {
  const label = [title, subtitle, pill?.label, amount, time, note]
    .filter(Boolean)
    .join(", ");
  const rowClass = `flex-row px-4 py-3.5 ${isLast ? "" : "border-b border-line/60"}`;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={label}
      accessibilityHint={onPress ? "Opens full details" : undefined}
      style={({ pressed }) => ({
        backgroundColor: pressed && onPress ? colors.surface : colors.white,
      })}
      className={rowClass}
    >
      <IconBubble name={icon} tone={tone} />
      <View className="flex-1 min-w-0 ml-3">
        <View className="flex-row items-center">
          <Text
            className="flex-1 text-[14.5px] font-bold text-ink"
            numberOfLines={1}
          >
            {title}
          </Text>
          {time ? (
            <Text className="text-[11.5px] text-ink-muted ml-2">{time}</Text>
          ) : null}
        </View>
        {subtitle ? (
          <Text
            className="text-[12.5px] text-ink-muted mt-0.5"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
        {pill || amount ? (
          <View className="flex-row items-center justify-between mt-2">
            {pill ? (
              <StatusPill label={pill.label} tone={pill.tone} />
            ) : (
              <View />
            )}
            {amount ? (
              <Text
                className="text-[13.5px] font-bold text-ink"
                style={TABULAR_NUMS}
              >
                {amount}
              </Text>
            ) : null}
          </View>
        ) : null}
        {note ? (
          <Text
            className="text-[12px] text-ink-secondary mt-1.5"
            numberOfLines={2}
          >
            {note}
          </Text>
        ) : null}
      </View>
      {onPress ? (
        <View className="justify-center ml-2">
          <Feather name="chevron-right" size={16} color={colors.inkFaint} />
        </View>
      ) : null}
    </Pressable>
  );
});

function orderValue(order) {
  // Every order has quantity and price; a payment record may not exist yet.
  const total = Number(order.quantity) * Number(order.pricePerUnitAtOrder);
  if (!Number.isFinite(total)) return undefined;
  return formatCurrency(total, order.payments?.[0]?.currency ?? "GHS");
}

function renderRow(section, item, isLast, onOpen) {
  const onPress = () => onOpen(section, item.id);
  if (section === "orders") {
    const meta = getOrderStatusMeta(item.status);
    return (
      <OpsRow
        icon={meta.icon}
        tone={meta.tone}
        title={item.listing?.title ?? "Order"}
        time={`${ageLabel(item.updatedAt)} ago`}
        subtitle={`${item.buyer?.fullName ?? "—"} → ${item.farmer?.fullName ?? "—"}`}
        pill={{ label: meta.label, tone: meta.tone }}
        amount={orderValue(item)}
        note={item.disputes?.length ? "Active dispute under review" : undefined}
        isLast={isLast}
        onPress={onPress}
      />
    );
  }
  if (section === "payments") {
    const tone = PAYMENT_TONE[item.status] ?? "neutral";
    const note =
      [
        item.escrow?.status &&
          `Escrow ${humanize(item.escrow.status).toLowerCase()}`,
        item.refunds?.[0]?.status &&
          `Refund ${humanize(item.refunds[0].status).toLowerCase()}`,
        item.payouts?.[0]?.status &&
          `Payout ${humanize(item.payouts[0].status).toLowerCase()}`,
      ]
        .filter(Boolean)
        .join(" · ") || undefined;
    return (
      <OpsRow
        icon="credit-card"
        tone={tone}
        title={item.order?.listing?.title ?? "Payment"}
        time={`${ageLabel(item.updatedAt)} ago`}
        subtitle={`${item.buyer?.fullName ?? "—"} · ${humanize(item.provider)}`}
        pill={{ label: humanize(item.status), tone }}
        amount={formatCurrency(item.amount, item.currency)}
        note={note}
        isLast={isLast}
        onPress={onPress}
      />
    );
  }
  if (section === "listings") {
    return (
      <OpsRow
        icon="shopping-bag"
        tone={item.priceReviewRequired ? "accent" : "primary"}
        title={item.title}
        subtitle={`${item.farmer?.fullName ?? "—"} · ${item.crop?.name ?? "Crop"}`}
        pill={
          item.priceReviewRequired
            ? { label: "Price flagged", tone: "accent" }
            : {
                label: humanize(item.status),
                tone: item.status === "ACTIVE" ? "success" : "neutral",
              }
        }
        amount={`${formatCurrency(item.pricePerUnit)} / ${String(item.quantityUnit ?? "").toLowerCase()}`}
        note={`${item._count?.orders ?? 0} orders · ${item._count?.interests ?? 0} interests`}
        isLast={isLast}
        onPress={onPress}
      />
    );
  }
  return (
    <OpsRow
      icon="file-text"
      tone="neutral"
      title={humanize(item.action)}
      time={`${ageLabel(item.createdAt)} ago`}
      subtitle={`${item.actor?.fullName ?? "System"}${
        item.actor?.role ? ` (${humanize(item.actor.role).toLowerCase()})` : ""
      } · ${humanize(item.entityType)}`}
      note={
        typeof item.metadata?.reason === "string"
          ? item.metadata.reason
          : undefined
      }
      isLast={isLast}
      onPress={onPress}
    />
  );
}

function Section({ section, query, search, filter }) {
  const navigation = useNavigation();
  const openDetail = (type, id) => {
    const target = DETAIL_ROUTES[type];
    navigation.navigate(target.screen, { [target.param]: id });
  };

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const test = FILTERS[section].find((f) => f.value === filter)?.test;
    return (query.data ?? []).filter(
      (r) =>
        (!test || test(r)) &&
        (!q || SEARCH_TEXT[section](r).toLowerCase().includes(q)),
    );
  }, [query.data, section, search, filter]);

  if (query.isLoading) return <ListSkeleton />;
  if (query.isError)
    return (
      <ErrorState
        message={getErrorMessage(query.error)}
        onRetry={() => query.refetch()}
      />
    );

  return (
    <FlatList
      data={rows}
      keyExtractor={(r) => r.id}
      keyboardShouldPersistTaps="handled"
      initialNumToRender={10}
      windowSize={7}
      renderItem={({ item, index }) =>
        renderRow(section, item, index === rows.length - 1, openDetail)
      }
      refreshControl={
        <RefreshControl
          refreshing={query.isRefetching && !query.isLoading}
          onRefresh={() => query.refetch()}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
      ListEmptyComponent={
        <EmptyNote
          icon="inbox"
          title="No records found"
          body="Try a different search or filter."
        />
      }
      ListFooterComponent={
        (query.data?.length ?? 0) >= 100 ? (
          <Text className="text-[12px] text-ink-muted text-center px-8 py-5">
            Showing the latest 100 records. Search and filters cover these only.
          </Text>
        ) : null
      }
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}

export function AdminOperationsPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const [section, setSection] = useState(route.params?.section ?? "orders");
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (route.params?.section) {
      setSection(route.params.section);
      setFilter("ALL");
      setSearch("");
      navigation.setParams({ section: undefined });
    }
  }, [route.params?.section, navigation]);

  const orders = useAdminOrders();
  const payments = useAdminPayments();
  const listings = useAdminListings();
  const audit = useAdminAuditLogs();
  const queries = { orders, payments, listings, audit };

  const changeSection = (value) => {
    setSection(value);
    setFilter("ALL");
    setSearch("");
  };

  return (
    <AdminScreen title="Operations" subtitle="Read-only marketplace activity">
      <View className="px-5 pb-3">
        <SegmentedControl
          options={SECTIONS}
          value={section}
          onChange={changeSection}
        />
      </View>
      <SearchField
        value={search}
        onChangeText={setSearch}
        placeholder={`Search ${section === "audit" ? "audit log" : section}`}
      />
      {FILTERS[section].length > 0 ? (
        <FilterChips
          options={FILTERS[section]}
          value={filter}
          onChange={setFilter}
        />
      ) : null}
      <Section
        section={section}
        query={queries[section]}
        search={search}
        filter={filter}
      />
    </AdminScreen>
  );
}
