import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "../../../components/ui/AppText.jsx";
import { useAdminAuditEvent } from "../hooks/adminHooks.js";
import {
  DetailScreen,
  Field,
  FieldGroup,
  HeroCard,
  JsonBlock,
  TimelineGroup,
  formatDateTime,
  shortId,
} from "../components/AdminDetailKit.jsx";
import {
  Group,
  SectionTitle,
  ageLabel,
  humanize,
} from "../components/AdminUI.jsx";

// Audit entity types that have a detail screen of their own.
const ENTITY_ROUTES = {
  ORDER: (id) => ["AdminOrderDetail", { orderId: id }],
  PAYMENT: (id) => ["AdminPaymentDetail", { paymentId: id }],
  LISTING: (id) => ["AdminListingDetail", { listingId: id }],
  DISPUTE: (id) => ["AdminDisputeDetail", { disputeId: id }],
};

function actorLabel(actor) {
  if (!actor) return "System";
  return actor.role
    ? `${actor.fullName} (${humanize(actor.role).toLowerCase()})`
    : actor.fullName;
}

export function AdminAuditEventDetailPage() {
  const navigation = useNavigation();
  const { eventId } = useRoute().params;
  const query = useAdminAuditEvent(eventId);

  return (
    <DetailScreen
      eyebrow="Operations"
      title="Audit event"
      onBack={() => navigation.goBack()}
      query={query}
    >
      {(event) => {
        const openRecord = ENTITY_ROUTES[event.entityType];
        const reason =
          typeof event.metadata?.reason === "string"
            ? event.metadata.reason
            : null;
        const hasMetadata =
          event.metadata &&
          typeof event.metadata === "object" &&
          Object.keys(event.metadata).length > 0;

        return (
          <>
            <HeroCard
              icon="file-text"
              tone="neutral"
              title={humanize(event.action)}
              subtitle={`${actorLabel(event.actor)} · ${ageLabel(event.createdAt)} ago`}
              pills={[{ label: humanize(event.entityType), tone: "neutral" }]}
            />

            {reason ? (
              <>
                <SectionTitle title="Reason given" />
                <View className="mx-5 bg-white rounded-2xl border border-line/60 p-4">
                  <Text selectable className="text-[13.5px] text-ink leading-5">
                    {reason}
                  </Text>
                </View>
              </>
            ) : null}

            <FieldGroup title="Event">
              <Field label="Event ID" value={shortId(event.id)} />
              <Field label="Action code" value={event.action} />
              <Field label="Recorded" value={formatDateTime(event.createdAt)} />
              <Field label="Actor" value={actorLabel(event.actor)} />
              {event.actor?.id ? (
                <Field label="Actor ID" value={shortId(event.actor.id)} />
              ) : null}
            </FieldGroup>

            <FieldGroup title="Affected record">
              <Field label="Type" value={humanize(event.entityType)} />
              <Field
                label="Record ID"
                value={event.entityId}
                onPress={
                  openRecord
                    ? () => navigation.navigate(...openRecord(event.entityId))
                    : undefined
                }
              />
            </FieldGroup>

            {event.ipAddress || event.userAgent ? (
              <FieldGroup title="Request origin">
                {event.ipAddress ? (
                  <Field label="IP address" value={event.ipAddress} />
                ) : null}
                {event.userAgent ? (
                  <Field label="Device" value={event.userAgent} />
                ) : null}
              </FieldGroup>
            ) : null}

            {hasMetadata ? (
              <>
                <SectionTitle title="Recorded details" />
                <Group>
                  <JsonBlock value={event.metadata} />
                </Group>
              </>
            ) : null}

            <TimelineGroup
              title="Other events on this record"
              newestFirst
              empty="No other events have been recorded against this record."
              items={(event.related ?? []).map((related) => ({
                id: related.id,
                title: humanize(related.action),
                detail: actorLabel(related.actor),
                at: related.createdAt,
                tone: "neutral",
                onPress: () =>
                  navigation.push("AdminAuditDetail", { eventId: related.id }),
              }))}
            />
          </>
        );
      }}
    </DetailScreen>
  );
}
