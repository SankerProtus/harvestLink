import { View } from "react-native";
import { Text } from "./AppText.jsx";
import { TABULAR_NUMS } from "../../theme/typography.js";
import { formatMoneyParts } from "../../lib/currency.js";

const SIZES = {
  lg: {
    currency: "text-[13px]",
    whole: "text-[28px] leading-[32px]",
    decimal: "text-[15px]",
    lift: -3,
  },
  md: {
    currency: "text-[11.5px]",
    whole: "text-[22px] leading-[26px]",
    decimal: "text-[13px]",
    lift: -2.5,
  },
  sm: {
    currency: "text-[10px]",
    whole: "text-[16px] leading-[20px]",
    decimal: "text-[10.5px]",
    lift: -2,
  },
};

export function PriceText({
  amount,
  currency = "GHS",
  size = "md",
  className = "",
  suffix,
}) {
  const cfg = SIZES[size] ?? SIZES.md;

  const isNumeric =
    typeof amount === "number" ||
    (typeof amount === "string" &&
      amount.trim() !== "" &&
      !Number.isNaN(Number(amount)));

  const { whole, decimals } = isNumeric
    ? formatMoneyParts(amount)
    : { whole: String(amount), decimals: null };

  return (
    <View className={`flex-row items-end ${className}`}>
      <Text
        className={`font-bold text-primary/80 ${cfg.currency} mr-1`}
        style={TABULAR_NUMS}
      >
        {currency}
      </Text>
      <Text
        className={`font-extrabold text-primary tracking-[-0.4px] ${cfg.whole}`}
        style={TABULAR_NUMS}
      >
        {whole}
      </Text>
      {decimals ? (
        <Text
          className={`font-bold text-primary/70 ${cfg.decimal}`}
          style={[TABULAR_NUMS, { transform: [{ translateY: cfg.lift }] }]}
        >
          .{decimals}
        </Text>
      ) : null}
      {suffix ? (
        <Text className="text-[12px] font-semibold text-ink-muted">
          {" "}
          {suffix}
        </Text>
      ) : null}
    </View>
  );
}
