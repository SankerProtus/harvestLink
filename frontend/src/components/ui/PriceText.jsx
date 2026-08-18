import { Text } from "react-native";
import { TABULAR_NUMS } from "../../theme/typography.js";

export function PriceText({
  amount,
  currency = "GHS",
  size = "md",
  className = "",
  suffix,
}) {
  const sizeClass =
    size === "lg"
      ? "text-[28px] leading-[32px]"
      : size === "sm"
        ? "text-[16px] leading-[20px]"
        : "text-[22px] leading-[26px]";

  const formatted =
    typeof amount === "number"
      ? amount.toLocaleString("en-GH")
      : String(amount);

  return (
    <Text
      className={`font-extrabold text-primary tracking-[-0.4px] ${sizeClass} ${className}`}
      style={TABULAR_NUMS}
    >
      {currency} {formatted}
      {suffix ? (
        <Text className="text-[12px] font-semibold text-ink-muted">
          {" "}
          {suffix}
        </Text>
      ) : null}
    </Text>
  );
}
