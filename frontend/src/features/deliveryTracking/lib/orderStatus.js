import { colors } from "../../../theme/colors.js";

// Class strings are literal so NativeWind can see them at build time.
export const ORDER_STATUS_META = {
  PENDING: { label: "Pending", dot: "bg-warning", line: "bg-warning/40", tone: "warning", icon: "clock" },
  CONFIRMED: { label: "Confirmed", dot: "bg-info", line: "bg-info/40", tone: "info", icon: "check-circle" },
  IN_TRANSIT: { label: "In transit", dot: "bg-primary", line: "bg-primary/40", tone: "primary", icon: "truck" },
  DELIVERED: { label: "Delivered", dot: "bg-success", line: "bg-success/40", tone: "success", icon: "package" },
  DISPUTED: { label: "Disputed", dot: "bg-accent-dark", line: "bg-accent/40", tone: "accent", icon: "alert-circle" },
  CANCELLATION_REQUESTED: { label: "Cancellation requested", dot: "bg-accent", line: "bg-accent/40", tone: "accent", icon: "x-circle" },
  CANCELLED: { label: "Cancelled", dot: "bg-ink-faint", line: "bg-line", tone: "neutral", icon: "slash" },
};

const UNKNOWN_META = { label: "Unknown", dot: "bg-ink-faint", line: "bg-line", tone: "neutral", icon: "help-circle" };

export function getOrderStatusMeta(status) {
  return ORDER_STATUS_META[status] ?? UNKNOWN_META;
}

export const TONE_COLORS = {
  warning: { bg: colors.warningMuted, fg: "#8A5A00" },
  info: { bg: colors.infoMuted, fg: "#1E40AF" },
  primary: { bg: colors.primaryLight, fg: colors.primaryActive },
  success: { bg: colors.successMuted, fg: colors.primaryActive },
  accent: { bg: colors.accentLight, fg: colors.accentDark },
  danger: { bg: colors.dangerMuted, fg: "#B42318" },
  neutral: { bg: "#F1F2F4", fg: colors.inkSecondary },
};

export const TIMELINE_STEPS = ["PENDING", "CONFIRMED", "IN_TRANSIT", "DELIVERED"];
export const TIMELINE_LABELS = {
  PENDING: "Requested",
  CONFIRMED: "Confirmed",
  IN_TRANSIT: "In transit",
  DELIVERED: "Delivered",
};

// What this person should understand and do next, per role.
export function getOrderStatusCopy({ status, isFarmer }) {
  switch (status) {
    case "PENDING":
      return isFarmer
        ? { title: "New order to confirm", next: "Confirm to accept this order, or cancel if you can't fulfil it.", actionNeeded: true }
        : { title: "Waiting for the farmer", next: "The farmer needs to confirm your order. You can cancel any time before then.", actionNeeded: false };
    case "CONFIRMED":
      return isFarmer
        ? { title: "Ready to deliver", next: "Start delivery when you set off, then share the handover code at drop-off.", help: "Need to change plans? You can request a cancellation below.", actionNeeded: true }
        : { title: "Order confirmed", next: "The farmer is preparing your produce. You'll be notified when delivery starts.", help: "Need to change plans? You can request a cancellation below.", actionNeeded: false };
    case "IN_TRANSIT":
      return isFarmer
        ? { title: "Out for delivery", next: "Report your location as you go and generate a handover code for the buyer at drop-off.", help: "If something goes wrong, you can open a dispute below.", actionNeeded: false }
        : { title: "On its way", next: "When it arrives, enter the 6-digit code from the farmer to confirm delivery.", help: "If something goes wrong, you can open a dispute below.", actionNeeded: true };
    case "DELIVERED":
      return isFarmer
        ? { title: "Delivered", next: "This order is complete. Your payout follows once the buyer protection window ends.", actionNeeded: false }
        : { title: "Delivered", next: "Rate the farmer to help other buyers trust good produce.", help: "If something isn't right, you can open a dispute below.", actionNeeded: false };
    case "DISPUTED":
      return { title: "Dispute under review", next: "Our team is reviewing this order. Payout to the farmer is paused until it's resolved.", actionNeeded: false };
    case "CANCELLATION_REQUESTED":
      return { title: "Cancellation requested", next: "The other party needs to approve or reject the request.", actionNeeded: false };
    case "CANCELLED":
      return { title: "Order cancelled", next: "No further action is needed.", actionNeeded: false };
    default:
      return { title: getOrderStatusMeta(status).label, next: "", actionNeeded: false };
  }
}