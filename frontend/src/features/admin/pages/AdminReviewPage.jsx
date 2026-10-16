import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { ErrorState } from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { formatCurrency } from "../../../lib/currency.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { Alert } from "../../../lib/alert.js";
import {
  useDisputeQueue,
  useVerificationQueue,
  useVerificationDecision,
  usePriceReviewQueue,
  useClearPriceReview,
} from "../hooks/adminHooks.js";
import {
  useAdminReports,
  useReviewAdminReport,
} from "../../trust/hooks/reportHooks.js";
import {
  AdminScreen,
  EmptyNote,
  FilterChips,
  Group,
  IconBubble,
  ListSkeleton,
  Row,
  StatusPill,
  ageLabel,
  humanize,
} from "../components/AdminUI.jsx";

const QUEUES = [
  { value: "disputes", label: "Disputes" },
  { value: "verification", label: "Verification" },
  { value: "reports", label: "Reports" },
  { value: "price", label: "Price flags" },
];

const inputClass =
  "rounded-xl bg-surface border border-line px-3 py-2.5 text-[14px] text-ink mt-3";

function DisputeQueue({ items }) {
  const navigation = useNavigation();
  if (!items.length) {
    return (
      <EmptyNote
        title="No disputes waiting"
        body="Open and in-review disputes will appear here, oldest first."
      />
    );
  }
  return (
    <View className="px-5">
      <Group>
        {items.map((d, i) => (
          <Row
            key={d.id}
            leading={<IconBubble name="alert-circle" tone="accent" />}
            title={d.order?.listing?.title ?? "Dispute"}
            subtitle={`${d.order?.buyer?.fullName ?? "Buyer"} ↔ ${d.order?.farmer?.fullName ?? "Farmer"} · opened ${ageLabel(d.createdAt)} ago`}
            footer={d.description}
            pill={
              d.status === "UNDER_REVIEW"
                ? { label: "In review", tone: "info" }
                : { label: "Open", tone: "accent" }
            }
            onPress={() =>
              navigation.navigate("AdminDisputeDetail", { disputeId: d.id })
            }
            isLast={i === items.length - 1}
          />
        ))}
      </Group>
    </View>
  );
}

function VerificationCard({ record, decide }) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const busy = decide.isPending && decide.variables?.recordId === record.id;

  const submit = (decision) => {
    const trimmed = notes.trim();
    if (decision === "REJECT" && trimmed.length < 5) {
      setError("Add a short reason for the rejection.");
      return;
    }
    setError(null);
    Alert.alert(
      decision === "APPROVE" ? "Approve verification?" : "Reject verification?",
      `${record.user?.fullName ?? "This user"} · tier ${record.tierRequested}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: decision === "APPROVE" ? "Approve" : "Reject",
          style: decision === "REJECT" ? "destructive" : "default",
          onPress: () =>
            decide.mutate({
              recordId: record.id,
              decision,
              notes: trimmed || undefined,
            }),
        },
      ],
    );
  };

  return (
    <Card className="mb-3 p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-2">
          <Text className="text-[15px] font-bold text-ink">
            {record.user?.fullName ?? "User"}
          </Text>
          <Text className="text-[12.5px] text-ink-muted mt-0.5">
            {humanize(record.user?.role)} · tier {record.tierRequested} ·{" "}
            {humanize(record.provider)}
          </Text>
        </View>
        <StatusPill
          label={`${ageLabel(record.createdAt)} ago`}
          tone="neutral"
        />
      </View>
      {record.notes ? (
        <Text className="text-[13.5px] text-ink-secondary mt-2 leading-5">
          {record.notes}
        </Text>
      ) : null}
      <TextInput
        value={notes}
        onChangeText={(t) => {
          setNotes(t);
          if (error) setError(null);
        }}
        placeholder="Reviewer notes (required to reject)"
        placeholderTextColor={colors.inkFaint}
        accessibilityLabel="Reviewer notes"
        multiline
        className={inputClass}
      />
      {error ? (
        <Text className="text-[12.5px] text-danger mt-2">{error}</Text>
      ) : null}
      {decide.isError && decide.variables?.recordId === record.id ? (
        <Text className="text-[12.5px] text-danger mt-2">
          {getErrorMessage(decide.error)}
        </Text>
      ) : null}
      <View className="flex-row gap-2 mt-3">
        <View className="flex-1">
          <Button
            label="Reject"
            variant="secondary"
            isLoading={busy}
            onPress={() => submit("REJECT")}
          />
        </View>
        <View className="flex-1">
          <Button
            label="Approve"
            isLoading={busy}
            onPress={() => submit("APPROVE")}
          />
        </View>
      </View>
    </Card>
  );
}

function ReportCard({ item, review }) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const busy = review.isPending && review.variables?.reportId === item.id;
  const name = item.reportedUser?.fullName ?? "this account";

  const submit = (decision) => {
    const trimmed = notes.trim();
    if (trimmed.length < 10) {
      setError("Write at least 10 characters explaining your decision.");
      return;
    }
    setError(null);
    const isBlock = decision === "BLOCK";
    Alert.alert(
      isBlock ? "Block account" : "Dismiss report",
      isBlock
        ? `Block ${name} and sign them out of all devices?`
        : "Dismiss this report as not a policy violation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: isBlock ? "Block" : "Dismiss",
          style: isBlock ? "destructive" : "default",
          onPress: () =>
            review.mutate({
              reportId: item.id,
              decision,
              resolutionNotes: trimmed,
            }),
        },
      ],
    );
  };

  return (
    <Card className="mb-3 p-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-2">
          <Text className="text-[15px] font-bold text-ink">
            {item.reportedUser?.fullName ?? "Reported account"}
          </Text>
          <Text className="text-[12.5px] text-ink-muted mt-0.5">
            Reported by {item.reporter?.fullName ?? "a user"} ·{" "}
            {ageLabel(item.createdAt)} ago
          </Text>
        </View>
        <StatusPill label={humanize(item.reason)} tone="accent" />
      </View>
      <Text className="text-[13.5px] text-ink-secondary mt-2 leading-5">
        {item.description}
      </Text>
      <TextInput
        value={notes}
        onChangeText={(t) => {
          setNotes(t);
          if (error) setError(null);
        }}
        placeholder="Your decision and reasoning (min 10 characters)"
        placeholderTextColor={colors.inkFaint}
        accessibilityLabel="Resolution notes"
        multiline
        className={inputClass}
      />
      {error ? (
        <Text className="text-[12.5px] text-danger mt-2">{error}</Text>
      ) : null}
      {review.isError && review.variables?.reportId === item.id ? (
        <Text className="text-[12.5px] text-danger mt-2">
          {getErrorMessage(review.error)}
        </Text>
      ) : null}
      <View className="flex-row gap-2 mt-3">
        <View className="flex-1">
          <Button
            label="Dismiss"
            variant="secondary"
            isLoading={busy}
            onPress={() => submit("DISMISS")}
          />
        </View>
        <View className="flex-1">
          <Button
            label="Block account"
            variant="danger"
            isLoading={busy}
            onPress={() => submit("BLOCK")}
          />
        </View>
      </View>
    </Card>
  );
}

function PriceCard({ listing, clear }) {
  const busy = clear.isPending && clear.variables === listing.id;
  return (
    <Card className="mb-3 p-4">
      <Text className="text-[15px] font-bold text-ink">{listing.title}</Text>
      <Text className="text-[12.5px] text-ink-muted mt-0.5">
        {listing.crop?.name ?? listing.cropType} ·{" "}
        {formatCurrency(listing.pricePerUnit)} / {listing.quantityUnit}
      </Text>
      <Text className="text-[12.5px] text-ink-muted">
        Farmer: {listing.farmer?.fullName ?? "—"}
      </Text>
      <View className="mt-3">
        <Button
          label="Clear price flag"
          variant="secondary"
          isLoading={busy}
          onPress={() =>
            Alert.alert(
              "Clear price flag?",
              "This listing's price will be treated as acceptable.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Clear flag", onPress: () => clear.mutate(listing.id) },
              ],
            )
          }
        />
      </View>
    </Card>
  );
}

export function AdminReviewPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const [queue, setQueue] = useState(route.params?.queue ?? "disputes");

  useEffect(() => {
    if (route.params?.queue) {
      setQueue(route.params.queue);
      navigation.setParams({ queue: undefined });
    }
  }, [route.params?.queue, navigation]);

  const disputes = useDisputeQueue();
  const verification = useVerificationQueue();
  const reports = useAdminReports();
  const price = usePriceReviewQueue();
  const decide = useVerificationDecision();
  const review = useReviewAdminReport();
  const clear = useClearPriceReview();

  const queries = { disputes, verification, reports, price };
  const active = queries[queue];
  const options = QUEUES.map((q) => ({
    ...q,
    count: queries[q.value].data?.length ?? 0,
  }));
  const items = active.data ?? [];

  let content;
  if (active.isLoading) content = <ListSkeleton rows={4} />;
  else if (active.isError)
    content = (
      <ErrorState
        message={getErrorMessage(active.error)}
        onRetry={() => active.refetch()}
      />
    );
  else if (queue === "disputes") content = <DisputeQueue items={items} />;
  else if (!items.length)
    content = (
      <EmptyNote
        title="Nothing waiting"
        body={
          queue === "verification"
            ? "No farmer verification requests are pending."
            : queue === "reports"
              ? "No active account reports."
              : "No listings are flagged for price review."
        }
      />
    );
  else
    content = (
      <View className="px-5">
        {queue === "verification" &&
          items.map((r) => (
            <VerificationCard key={r.id} record={r} decide={decide} />
          ))}
        {queue === "reports" &&
          items.map((r) => <ReportCard key={r.id} item={r} review={review} />)}
        {queue === "price" &&
          items.map((l) => <PriceCard key={l.id} listing={l} clear={clear} />)}
      </View>
    );

  return (
    <AdminScreen
      title="Review"
      subtitle="Decisions that protect buyers and farmers"
    >
      <FilterChips options={options} value={queue} onChange={setQueue} />
      <KeyboardAvoider className="flex-1">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 32 }}
          refreshControl={
            <RefreshControl
              refreshing={active.isRefetching && !active.isLoading}
              onRefresh={() =>
                Promise.all(Object.values(queries).map((q) => q.refetch()))
              }
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {content}
        </ScrollView>
      </KeyboardAvoider>
    </AdminScreen>
  );
}
