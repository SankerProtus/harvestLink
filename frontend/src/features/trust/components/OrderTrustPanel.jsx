import { useState } from "react";
import { View } from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import { SectionLabel } from "../../../components/ui/SectionHeader.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../../src/lib/errorMap.js";
import {
  useDecideCancellation,
  useGenerateHandoverCode,
  useOrderTrustContext,
  useRequestCancellation,
  useVerifyHandoverCode,
} from "../hooks/trustHooks.js";

const STATUS_LABELS = {
  OPEN: "Open",
  UNDER_REVIEW: "Under review",
  RESOLVED: "Resolved",
};

export function OrderTrustPanel({
  orderId,
  orderStatus,
  userId,
  isBuyer,
  isFarmer,
  onDisputePress,
  onOrderUpdated,
}) {
  const trustContext = useOrderTrustContext(orderId);
  const requestCancellation = useRequestCancellation();
  const decideCancellation = useDecideCancellation();
  const generateCode = useGenerateHandoverCode();
  const verifyCode = useVerifyHandoverCode();

  const [cancelReason, setCancelReason] = useState("");
  const [handoverCode, setHandoverCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);

  const openDispute = trustContext.data?.openDispute;
  const pendingCancellation = trustContext.data?.pendingCancellation;

  const canOpenDispute =
    (isBuyer || isFarmer) &&
    ["IN_TRANSIT", "DELIVERED"].includes(orderStatus) &&
    !openDispute;

  const showHandoverFarmer = isFarmer && orderStatus === "IN_TRANSIT";
  const showHandoverBuyer = isBuyer && orderStatus === "IN_TRANSIT";

  const canRequestCancellation =
    orderStatus === "CONFIRMED" &&
    !pendingCancellation &&
    (isBuyer || isFarmer);

  const canDecideCancellation =
    orderStatus === "CANCELLATION_REQUESTED" &&
    pendingCancellation &&
    pendingCancellation.requesterId !== userId;

  const showTrustSection =
    canOpenDispute ||
    openDispute ||
    canRequestCancellation ||
    canDecideCancellation ||
    showHandoverFarmer ||
    showHandoverBuyer;

  if (!showTrustSection) return null;

  async function handleGenerateCode() {
    try {
      const result = await generateCode.mutateAsync(orderId);
      setGeneratedCode(result.code);
    } catch (err) {
      setGeneratedCode(null);
    }
  }

  async function handleVerifyCode() {
    try {
      await verifyCode.mutateAsync({ orderId, code: handoverCode.trim() });
      setHandoverCode("");
      onOrderUpdated?.();
    } catch {
      // Error surfaced below
    }
  }

  return (
    <View className="px-5 mt-6">
      <SectionLabel>Trust &amp; delivery</SectionLabel>
      <Card className="p-5">
        {openDispute ? (
          <View className="mb-4">
            <Text className="text-[13px] font-semibold text-ink">
              Dispute {STATUS_LABELS[openDispute.status] ?? openDispute.status}
            </Text>
            <Text className="text-[12px] text-ink-muted mt-1">
              {openDispute.reason.replace(/_/g, " ")} · opened{" "}
              {new Date(openDispute.createdAt).toLocaleDateString()}
            </Text>
          </View>
        ) : null}

        {canOpenDispute ? (
          <Button
            label="Open a dispute"
            icon="alert-circle"
            variant="secondary"
            onPress={onDisputePress}
          />
        ) : null}

        {canRequestCancellation ? (
          <View className={canOpenDispute ? "mt-4" : ""}>
            <Text className="text-[13px] font-semibold text-ink mb-2">
              Request cancellation
            </Text>
            <Text className="text-[12px] text-ink-muted mb-3">
              After confirmation, the other party must approve your request.
            </Text>
            <TextInput
              placeholder="Why do you need to cancel?"
              placeholderTextColor={colors.inkFaint}
              value={cancelReason}
              onChangeText={setCancelReason}
              multiline
              maxLength={500}
              className="rounded-xl2 bg-cream border border-line/50 px-4 py-3 text-[13.5px] text-ink min-h-[70px] mb-3"
              textAlignVertical="top"
            />
            {requestCancellation.isError ? (
              <Text className="text-[12px] text-danger mb-2">
                {getErrorMessage(requestCancellation.error)}
              </Text>
            ) : null}
            <Button
              label="Submit cancellation request"
              variant="secondary"
              disabled={cancelReason.trim().length < 3}
              isLoading={requestCancellation.isPending}
              onPress={() =>
                requestCancellation.mutate(
                  { orderId, reason: cancelReason.trim() },
                  {
                    onSuccess: () => {
                      setCancelReason("");
                      onOrderUpdated?.();
                    },
                  },
                )
              }
            />
          </View>
        ) : null}

        {canDecideCancellation && pendingCancellation ? (
          <View>
            <Text className="text-[13px] font-semibold text-ink mb-2">
              Cancellation awaiting your decision
            </Text>
            {pendingCancellation.reason ? (
              <Text className="text-[12.5px] text-ink-muted mb-3">
                “{pendingCancellation.reason}”
              </Text>
            ) : null}
            {decideCancellation.isError ? (
              <Text className="text-[12px] text-danger mb-2">
                {getErrorMessage(decideCancellation.error)}
              </Text>
            ) : null}
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Button
                  label="Reject"
                  variant="secondary"
                  isLoading={decideCancellation.isPending}
                  onPress={() =>
                    decideCancellation.mutate(
                      {
                        orderId,
                        requestId: pendingCancellation.id,
                        decision: "REJECT",
                      },
                      { onSuccess: () => onOrderUpdated?.() },
                    )
                  }
                />
              </View>
              <View className="flex-1">
                <Button
                  label="Approve"
                  variant="danger"
                  isLoading={decideCancellation.isPending}
                  onPress={() =>
                    decideCancellation.mutate(
                      {
                        orderId,
                        requestId: pendingCancellation.id,
                        decision: "APPROVE",
                      },
                      { onSuccess: () => onOrderUpdated?.() },
                    )
                  }
                />
              </View>
            </View>
          </View>
        ) : null}

        {showHandoverFarmer ? (
          <View
            className={
              canOpenDispute || canRequestCancellation
                ? "mt-4 pt-4 border-t border-line/60"
                : ""
            }
          >
            <Text className="text-[13px] font-semibold text-ink mb-2">
              Buyer handover code
            </Text>
            <Text className="text-[12px] text-ink-muted mb-3">
              Generate a six-digit code and share it at delivery. The buyer
              enters it to confirm receipt.
            </Text>
            {generatedCode ? (
              <Text className="text-[28px] font-extrabold text-primary tracking-[6px] text-center mb-3">
                {generatedCode}
              </Text>
            ) : null}
            {generateCode.isError ? (
              <Text className="text-[12px] text-danger mb-2">
                {getErrorMessage(generateCode.error)}
              </Text>
            ) : null}
            <Button
              label={
                generatedCode ? "Generate new code" : "Generate handover code"
              }
              icon="key"
              variant="secondary"
              isLoading={generateCode.isPending}
              onPress={handleGenerateCode}
            />
          </View>
        ) : null}

        {showHandoverBuyer ? (
          <View
            className={
              canOpenDispute ? "mt-4 pt-4 border-t border-line/60" : ""
            }
          >
            <Text className="text-[13px] font-semibold text-ink mb-2">
              Confirm delivery
            </Text>
            <Text className="text-[12px] text-ink-muted mb-3">
              Enter the code from the farmer or driver to mark this order
              delivered.
            </Text>
            <TextInput
              placeholder="6-digit code"
              placeholderTextColor={colors.inkFaint}
              value={handoverCode}
              onChangeText={setHandoverCode}
              keyboardType="number-pad"
              maxLength={6}
              className="rounded-xl2 bg-cream border border-line/50 px-4 py-3 text-[16px] text-ink text-center tracking-[4px] mb-3"
            />
            {verifyCode.isError ? (
              <Text className="text-[12px] text-danger mb-2">
                {getErrorMessage(verifyCode.error)}
              </Text>
            ) : null}
            <Button
              label="Verify &amp; complete delivery"
              isLoading={verifyCode.isPending}
              disabled={handoverCode.trim().length !== 6}
              onPress={handleVerifyCode}
            />
          </View>
        ) : null}
      </Card>
    </View>
  );
}
