import { useNavigation, useRoute } from "@react-navigation/native";
import { formatCurrency } from "../../../lib/currency.js";
import { getOrderStatusMeta } from "../../deliveryTracking/lib/orderStatus.js";
import { useAdminOrder } from "../hooks/adminHooks.js";
import {
  Field,
  FieldGroup,
  HeroCard,
  PartyRow,
  TimelineGroup,
  DetailScreen,
  formatDateTime,
  shortId,
  statusTone,
} from "../components/AdminDetailKit.jsx";
import {
  IconBubble,
  Row,
  humanize,
} from "../components/AdminUI.jsx";

const OPEN_DISPUTE = ["OPEN", "UNDER_REVIEW"];

function handoverState(code) {
  if (!code) return "Not issued";
  if (code.usedAt) return `Used ${formatDateTime(code.usedAt)}`;
  if (new Date(code.expiresAt).getTime() < Date.now()) return "Expired";
  return `Active until ${formatDateTime(code.expiresAt)}`;
}

function buildTimeline(order, navigation) {
  const items = [
    { id: "created", title: "Order placed", at: order.createdAt, tone: "neutral" },
    { id: "confirmed", title: "Confirmed by farmer", at: order.confirmedAt, tone: "info" },
    {
      id: "location",
      title: "Last location reported",
      detail:
        order.latestLatitude != null && order.latestLongitude != null
          ? `${order.latestLatitude.toFixed(5)}, ${order.latestLongitude.toFixed(5)}`
          : undefined,
      at: order.locationReportedAt,
      tone: "primary",
    },
    {
      id: "delivered",
      title: "Delivery verified",
      at: order.deliveryVerifiedAt,
      tone: "success",
    },
  ];

  for (const request of order.cancellationRequests ?? []) {
    items.push({
      id: `cancel-${request.id}`,
      title: "Cancellation requested",
      detail: [
        request.requester?.fullName &&
          `${request.requester.fullName} (${humanize(request.requester.role).toLowerCase()})`,
        request.reason,
      ]
        .filter(Boolean)
        .join(": "),
      at: request.createdAt,
      tone: "accent",
    });
    if (request.decidedAt) {
      items.push({
        id: `cancel-decided-${request.id}`,
        title: `Cancellation ${humanize(request.status).toLowerCase()}`,
        at: request.decidedAt,
        tone: statusTone(request.status),
      });
    }
  }

  for (const dispute of order.disputes ?? []) {
    items.push({
      id: `dispute-${dispute.id}`,
      title: `Dispute opened · ${humanize(dispute.reason)}`,
      at: dispute.createdAt,
      tone: "accent",
      onPress: () =>
        navigation.navigate("AdminDisputeDetail", { disputeId: dispute.id }),
    });
    if (dispute.resolvedAt) {
      items.push({
        id: `dispute-resolved-${dispute.id}`,
        title: "Dispute resolved",
        at: dispute.resolvedAt,
        tone: "success",
        onPress: () =>
          navigation.navigate("AdminDisputeDetail", { disputeId: dispute.id }),
      });
    }
  }

  for (const refund of order.refunds ?? []) {
    items.push({
      id: `refund-${refund.id}`,
      title: `Refund ${humanize(refund.status).toLowerCase()}`,
      detail: refund.reason ?? undefined,
      at: refund.processedAt,
      tone: statusTone(refund.status),
    });
  }
  for (const payout of order.payouts ?? []) {
    items.push({
      id: `payout-${payout.id}`,
      title: `Payout ${humanize(payout.status).toLowerCase()}`,
      detail: payout.failureReason ?? undefined,
      at: payout.processedAt,
      tone: statusTone(payout.status),
    });
  }
  if (order.review) {
    items.push({
      id: "review",
      title: `Review left · ${order.review.rating}/5`,
      detail: order.review.comment ?? undefined,
      at: order.review.createdAt,
      tone: "neutral",
    });
  }
  return items;
}

export function AdminOrderDetailPage() {
  const navigation = useNavigation();
  const { orderId } = useRoute().params;
  const query = useAdminOrder(orderId);

  return (
    <DetailScreen
      eyebrow="Operations"
      title="Order details"
      onBack={() => navigation.goBack()}
      query={query}
    >
      {(order) => {
        const meta = getOrderStatusMeta(order.status);
        const payment = order.payments?.[0];
        const refund = order.refunds?.[0];
        const payout = order.payouts?.[0];
        const escrow = order.escrow;
        const currency = payment?.currency ?? "GHS";
        const unit = humanize(order.listing?.quantityUnit).toLowerCase();
        const total = Number(order.quantity) * Number(order.pricePerUnitAtOrder);
        const hasOpenDispute = (order.disputes ?? []).some((d) =>
          OPEN_DISPUTE.includes(d.status),
        );

        const pills = [{ label: meta.label, tone: meta.tone }];
        if (hasOpenDispute) pills.push({ label: "Dispute open", tone: "accent" });

        return (
          <>
            <HeroCard
              icon={meta.icon}
              tone={meta.tone}
              title={order.listing?.title ?? "Order"}
              subtitle={[order.listing?.crop?.name, order.listing?.location]
                .filter(Boolean)
                .join(" · ")}
              pills={pills}
              amount={Number.isFinite(total) ? formatCurrency(total, currency) : undefined}
              amountCaption="Order value"
            />

            <FieldGroup title="Order">
              <Field label="Order ID" value={shortId(order.id)} />
              <Field label="Quantity" value={`${Number(order.quantity)} ${unit}`} />
              <Field
                label="Price per unit"
                value={formatCurrency(order.pricePerUnitAtOrder, currency)}
              />
              <Field label="Placed" value={formatDateTime(order.createdAt)} />
              <Field label="Last updated" value={formatDateTime(order.updatedAt)} />
              <Field
                label="Protection ends"
                value={order.protectionEndsAt ? formatDateTime(order.protectionEndsAt) : null}
              />
            </FieldGroup>

            <FieldGroup title="People">
              <PartyRow role="Buyer" party={order.buyer} />
              <PartyRow role="Farmer" party={order.farmer} />
            </FieldGroup>

            <FieldGroup
              title="Payment and settlement"
              empty="No payment has been recorded for this order yet."
            >
              {payment ? (
                <Field
                  label="Payment"
                  value={`${humanize(payment.status)} · ${humanize(payment.provider)}`}
                  onPress={() =>
                    navigation.navigate("AdminPaymentDetail", { paymentId: payment.id })
                  }
                />
              ) : null}
              {escrow ? (
                <Field
                  label="Escrow"
                  value={`${humanize(escrow.status)} · ${formatCurrency(escrow.amount, escrow.currency)}`}
                />
              ) : null}
              {escrow?.fundedAt ? (
                <Field label="Escrow funded" value={formatDateTime(escrow.fundedAt)} />
              ) : null}
              {escrow?.releasedAt ? (
                <Field label="Escrow released" value={formatDateTime(escrow.releasedAt)} />
              ) : null}
              {refund ? (
                <Field
                  label="Refund"
                  value={`${humanize(refund.status)} · ${formatCurrency(refund.amount, refund.currency)}`}
                />
              ) : null}
              {payout ? (
                <Field
                  label="Payout"
                  value={`${humanize(payout.status)} · ${formatCurrency(payout.amount, payout.currency)}`}
                />
              ) : null}
              {payout?.failureReason ? (
                <Field label="Payout failure" value={payout.failureReason} />
              ) : null}
            </FieldGroup>

            <FieldGroup title="Delivery">
              <Field label="Handover code" value={handoverState(order.handoverCode)} />
              {order.handoverCode ? (
                <Field label="Code attempts" value={order.handoverCode.attempts} />
              ) : null}
              <Field
                label="Delivery verified"
                value={order.deliveryVerifiedAt ? formatDateTime(order.deliveryVerifiedAt) : "Not yet"}
              />
              <Field
                label="Last location"
                value={
                  order.latestLatitude != null && order.latestLongitude != null
                    ? `${order.latestLatitude.toFixed(5)}, ${order.latestLongitude.toFixed(5)}`
                    : "Not reported"
                }
              />
            </FieldGroup>

            {(order.disputes ?? []).length > 0 ? (
              <FieldGroup title="Disputes">
                {order.disputes.map((dispute) => (
                  <Row
                    key={dispute.id}
                    leading={<IconBubble name="alert-circle" tone={statusTone(dispute.status)} />}
                    title={humanize(dispute.reason)}
                    subtitle={`Opened ${formatDateTime(dispute.createdAt)}`}
                    pill={{ label: humanize(dispute.status), tone: statusTone(dispute.status) }}
                    onPress={() =>
                      navigation.navigate("AdminDisputeDetail", { disputeId: dispute.id })
                    }
                  />
                ))}
              </FieldGroup>
            ) : null}

            <TimelineGroup title="Timeline" items={buildTimeline(order, navigation)} />
          </>
        );
      }}
    </DetailScreen>
  );
}
