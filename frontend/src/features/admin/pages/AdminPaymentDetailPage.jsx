import { useNavigation, useRoute } from "@react-navigation/native";
import { formatCurrency } from "../../../lib/currency.js";
import { getOrderStatusMeta } from "../../deliveryTracking/lib/orderStatus.js";
import { useAdminPayment } from "../../../../../operations-detail-screens/Frontend/src/features/admin/hooks/adminHooks.js";
import {
  DetailScreen,
  Field,
  FieldGroup,
  HeroCard,
  PartyRow,
  TimelineGroup,
  formatDateTime,
  shortId,
  statusTone,
} from "../components/AdminDetailKit.jsx";
import { IconBubble, Row, humanize } from "../components/AdminUI.jsx";

function buildTimeline(payment) {
  const items = [
    { id: "created", title: "Payment created", at: payment.createdAt, tone: "neutral" },
    { id: "authorized", title: "Authorised", at: payment.authorizedAt, tone: "info" },
    { id: "captured", title: "Captured", at: payment.capturedAt, tone: "primary" },
    { id: "failed", title: "Failed", at: payment.failedAt, tone: "danger" },
    {
      id: "escrow-funded",
      title: "Escrow funded",
      at: payment.escrow?.fundedAt,
      tone: "primary",
    },
    {
      id: "escrow-released",
      title: "Escrow released",
      at: payment.escrow?.releasedAt,
      tone: "success",
    },
  ];
  for (const refund of payment.refunds ?? []) {
    items.push({
      id: `refund-${refund.id}`,
      title: `Refund ${humanize(refund.status).toLowerCase()}`,
      detail: refund.reason ?? undefined,
      at: refund.processedAt,
      tone: statusTone(refund.status),
    });
  }
  for (const payout of payment.payouts ?? []) {
    items.push({
      id: `payout-${payout.id}`,
      title: `Payout ${humanize(payout.status).toLowerCase()}`,
      detail: payout.failureReason ?? undefined,
      at: payout.processedAt,
      tone: statusTone(payout.status),
    });
  }
  return items;
}

export function AdminPaymentDetailPage() {
  const navigation = useNavigation();
  const { paymentId } = useRoute().params;
  const query = useAdminPayment(paymentId);

  return (
    <DetailScreen
      eyebrow="Operations"
      title="Payment details"
      onBack={() => navigation.goBack()}
      query={query}
    >
      {(payment) => {
        const tone = statusTone(payment.status);
        const order = payment.order;
        const orderMeta = getOrderStatusMeta(order?.status);
        const escrow = payment.escrow;

        return (
          <>
            <HeroCard
              icon="credit-card"
              tone={tone}
              title={order?.listing?.title ?? "Payment"}
              subtitle={`${payment.buyer?.fullName ?? "—"} · ${humanize(payment.provider)}`}
              pills={[{ label: humanize(payment.status), tone }]}
              amount={formatCurrency(payment.amount, payment.currency)}
              amountCaption="Amount"
            />

            <FieldGroup title="Payment">
              <Field label="Payment ID" value={shortId(payment.id)} />
              <Field label="Provider" value={humanize(payment.provider)} />
              <Field label="Provider reference" value={payment.providerPaymentId} />
              <Field label="Currency" value={payment.currency} />
              <Field label="Created" value={formatDateTime(payment.createdAt)} />
              <Field label="Last updated" value={formatDateTime(payment.updatedAt)} />
            </FieldGroup>

            <FieldGroup title="Linked order">
              <Row
                leading={<IconBubble name={orderMeta.icon} tone={orderMeta.tone} />}
                title={order?.listing?.title ?? "Order"}
                subtitle={
                  order
                    ? `${Number(order.quantity)} units × ${formatCurrency(order.pricePerUnitAtOrder, payment.currency)}`
                    : undefined
                }
                pill={{ label: orderMeta.label, tone: orderMeta.tone }}
                onPress={
                  order
                    ? () => navigation.navigate("AdminOrderDetail", { orderId: order.id })
                    : undefined
                }
              />
              {order?.protectionEndsAt ? (
                <Field
                  label="Protection ends"
                  value={formatDateTime(order.protectionEndsAt)}
                />
              ) : null}
            </FieldGroup>

            <FieldGroup title="People">
              <PartyRow role="Buyer" party={payment.buyer} />
              <PartyRow role="Farmer" party={order?.farmer} />
            </FieldGroup>

            <FieldGroup title="Escrow" empty="No escrow has been opened for this payment.">
              {escrow ? (
                <Field label="Status" value={humanize(escrow.status)} emphasis />
              ) : null}
              {escrow ? (
                <Field
                  label="Held amount"
                  value={formatCurrency(escrow.amount, escrow.currency)}
                />
              ) : null}
              {escrow?.providerEscrowId ? (
                <Field label="Escrow reference" value={escrow.providerEscrowId} />
              ) : null}
              {escrow?.fundedAt ? (
                <Field label="Funded" value={formatDateTime(escrow.fundedAt)} />
              ) : null}
              {escrow?.releasedAt ? (
                <Field label="Released" value={formatDateTime(escrow.releasedAt)} />
              ) : null}
            </FieldGroup>

            {(payment.refunds ?? []).length > 0 ? (
              <FieldGroup title="Refunds">
                {payment.refunds.map((refund) => (
                  <Row
                    key={refund.id}
                    leading={<IconBubble name="rotate-ccw" tone={statusTone(refund.status)} />}
                    title={formatCurrency(refund.amount, refund.currency)}
                    subtitle={refund.reason ?? refund.providerRefundId ?? undefined}
                    pill={{ label: humanize(refund.status), tone: statusTone(refund.status) }}
                  />
                ))}
              </FieldGroup>
            ) : null}

            {(payment.payouts ?? []).length > 0 ? (
              <FieldGroup title="Payouts">
                {payment.payouts.map((payout) => (
                  <Row
                    key={payout.id}
                    leading={<IconBubble name="send" tone={statusTone(payout.status)} />}
                    title={formatCurrency(payout.amount, payout.currency)}
                    subtitle={payout.failureReason ?? payout.providerPayoutId ?? undefined}
                    pill={{ label: humanize(payout.status), tone: statusTone(payout.status) }}
                  />
                ))}
              </FieldGroup>
            ) : null}

            <TimelineGroup title="Timeline" items={buildTimeline(payment)} />
          </>
        );
      }}
    </DetailScreen>
  );
}
