import { View } from "react-native";
import { Text } from "./AppText.jsx";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";

const TYPES = {
  verifiedFarmer: {
    icon: "shield-checkmark",
    label: "Verified farmer",
    tone: "green",
  },
  paymentProtected: {
    icon: "lock-closed",
    label: "Payment protected",
    tone: "green",
  },
  deliveryVerified: {
    icon: "checkmark-done-circle",
    label: "Delivery verified",
    tone: "green",
  },
  buyerProtection: {
    icon: "shield-half",
    label: "Buyer protection",
    tone: "green",
  },
  disputeOpen: {
    icon: "alert-circle",
    label: "Dispute open",
    tone: "terracotta",
  },
};

const TONES = {
  green: { bg: colors.primaryLight, fg: colors.primaryActive },
  terracotta: { bg: colors.accentLight, fg: colors.accentDark },
};

const SIZES = {
  sm: { h: 22, px: 8, font: 11, icon: 12, gap: 4 },
  md: { h: 28, px: 10, font: 12.5, icon: 14, gap: 5 },
};

export function TrustBadge({ type, size = "md", label }) {
  const cfg = TYPES[type];
  if (!cfg) return null;
  const tone = TONES[cfg.tone];
  const s = SIZES[size] ?? SIZES.md;
  const text = label ?? cfg.label;

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={text}
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        height: s.h,
        paddingHorizontal: s.px,
        borderRadius: 999,
        backgroundColor: tone.bg,
        gap: s.gap,
      }}
    >
      <Ionicons name={cfg.icon} size={s.icon} color={tone.fg} />
      <Text
        numberOfLines={1}
        style={{ fontSize: s.font, fontWeight: "700", color: tone.fg }}
      >
        {text}
      </Text>
    </View>
  );
}

// Derives badges ONLY from fields the order actually carries. Until the
// backend exposes `escrow` / `deliveryVerifiedAt` on the order DTO, only the
// dispute badge can appear, which is deliberate: no invented trust claims.
export function getOrderTrustSignals(order) {
  if (!order) return [];
  const signals = [];
  const escrowStatus = order.escrow?.status;
  if (escrowStatus === "FUNDED" || escrowStatus === "FROZEN") {
    signals.push("paymentProtected");
  }
  if (order.deliveryVerifiedAt) signals.push("deliveryVerified");
  if (order.status === "DISPUTED") signals.push("disputeOpen");
  return signals;
}
