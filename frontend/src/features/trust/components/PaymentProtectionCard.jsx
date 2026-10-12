import { View } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../../components/ui/Card.jsx";
import { formatCurrency } from "../../../lib/currency.js";
import { TONE_COLORS } from "../../deliveryTracking/lib/orderStatus.js";

function formatWhen(iso) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function describe(order, isBuyer) {
  const { escrow, payment } = order;

  if (!escrow) {
    if (payment?.status === "FAILED") {
      return {
        icon: "close-circle",
        tone: "danger",
        title: "Payment failed",
        body: isBuyer
          ? "Your payment didn't go through."
          : "The buyer's payment didn't go through.",
      };
    }
    if (payment?.status === "PENDING") {
      return {
        icon: "time",
        tone: "warning",
        title: "Awaiting payment confirmation",
        body: "This order will update as soon as the payment is confirmed.",
      };
    }
    return null;
  }

  const amount = formatCurrency(escrow.amount, escrow.currency || "GHS");
  const windowEnds = order.protectionEndsAt
    ? new Date(order.protectionEndsAt)
    : null;
  const windowActive = windowEnds && windowEnds.getTime() > Date.now();

  switch (escrow.status) {
    case "FUNDED":
      if (order.status === "DELIVERED" && windowActive) {
        return {
          icon: "shield-checkmark",
          tone: "primary",
          title: "Buyer protection active",
          body: isBuyer
            ? `${amount} stays protected until ${formatWhen(order.protectionEndsAt)}. Open a dispute before then if something is wrong.`
            : `${amount} becomes payable after ${formatWhen(order.protectionEndsAt)}, unless a dispute is opened.`,
        };
      }
      if (order.status === "DELIVERED") {
        return {
          icon: "shield-checkmark",
          tone: "primary",
          title: "Protection window ended",
          body: isBuyer
            ? `${amount} is now eligible for release to the farmer.`
            : `${amount} is eligible for release to you.`,
        };
      }
      return {
        icon: "lock-closed",
        tone: "primary",
        title: "Payment protected",
        body: isBuyer
          ? `${amount} is held securely. It's only released to the farmer after your delivery is verified.`
          : `${amount} is held securely and becomes payable after delivery is verified and the protection window ends.`,
      };
    case "FROZEN":
      return {
        icon: "pause-circle",
        tone: "accent",
        title: "Payment on hold",
        body: `${amount} is frozen while the dispute is reviewed.`,
      };
    case "RELEASED":
      return {
        icon: "checkmark-circle",
        tone: "success",
        title: isBuyer
          ? "Payment released to the farmer"
          : "Payment released to you",
        body: `${amount}${escrow.releasedAt ? ` · ${formatWhen(escrow.releasedAt)}` : ""}`,
      };
    case "REFUNDED":
      return {
        icon: "return-up-back",
        tone: "neutral",
        title: "Payment refunded",
        body: `${amount} was returned to the buyer.`,
      };
    case "FAILED":
      return {
        icon: "close-circle",
        tone: "danger",
        title: "Payment failed",
        body: "The payment couldn't be secured for this order.",
      };
    default:
      return {
        icon: "time",
        tone: "warning",
        title: "Awaiting payment confirmation",
        body: "This order will update as soon as the payment is confirmed.",
      };
  }
}

export function PaymentProtectionCard({ order, isBuyer }) {
  const info = describe(order, isBuyer);
  if (!info) return null;
  const tone = TONE_COLORS[info.tone];

  return (
    <Card padded={false}>
      <View
        accessible
        accessibilityLabel={`${info.title}. ${info.body}`}
        className="flex-row items-start p-4"
      >
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: tone.bg }}
        >
          <Ionicons name={info.icon} size={20} color={tone.fg} />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-bold text-ink">{info.title}</Text>
          <Text className="text-[13px] text-ink-secondary mt-0.5 leading-[19px]">
            {info.body}
          </Text>
        </View>
      </View>
    </Card>
  );
}
