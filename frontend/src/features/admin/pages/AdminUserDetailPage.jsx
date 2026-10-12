import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { Alert } from "../../../lib/alert.js";
import { useAdminAuditLogs, useSetUserStatus } from "../hooks/adminHooks.js";
import {
  AdminScreen,
  Group,
  IconBubble,
  Row,
  SectionTitle,
  StatusPill,
  ageLabel,
  formatShortDate,
  humanize,
} from "../components/AdminUI.jsx";

const STATUS_TONE = {
  ACTIVE: "success",
  SUSPENDED: "danger",
  PENDING_VERIFICATION: "warning",
};

export function AdminUserDetailPage() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user: me } = useAuth();
  const user = params.user;

  const [status, setStatus] = useState(user.accountStatus);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const mutation = useSetUserStatus();
  const audit = useAdminAuditLogs();

  const isSelf = me?.id === user.id;
  const isAdminTarget = user.role === "ADMIN";
  const canAct = !isSelf && !isAdminTarget && status !== "DELETED";
  const suspended = status === "SUSPENDED";
  const trimmed = reason.trim();
  const events = (audit.data ?? [])
    .filter((e) => e.entityId === user.id)
    .slice(0, 5);

  const confirm = () => {
    const next = suspended ? "ACTIVE" : "SUSPENDED";
    Alert.alert(
      suspended ? "Reactivate account?" : "Suspend account?",
      suspended
        ? `${user.fullName} will be able to sign in again.`
        : `${user.fullName} will be signed out of all devices and blocked from signing in.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: suspended ? "Reactivate" : "Suspend",
          style: suspended ? "default" : "destructive",
          onPress: () =>
            mutation.mutate(
              { userId: user.id, status: next, reason: trimmed },
              {
                onSuccess: (data) => {
                  setStatus(data?.accountStatus ?? next);
                  setReason("");
                  setShowReason(false);
                },
              },
            ),
        },
      ],
    );
  };

  return (
    <AdminScreen title="Account" onBack={() => navigation.goBack()}>
      <KeyboardAvoidingView className="flex-1">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="items-center px-5 pt-2 pb-4">
            <Avatar uri={user.profileImageUrl} name={user.fullName} size="lg" />
            <Text className="text-[22px] font-extrabold text-ink mt-3">
              {user.fullName}
            </Text>
            <View className="flex-row gap-2 mt-2">
              <StatusPill label={humanize(user.role)} tone="neutral" />
              <StatusPill
                label={humanize(status)}
                tone={STATUS_TONE[status] ?? "neutral"}
              />
            </View>
          </View>

          <SectionTitle title="Details" />
          <Group>
            <Row title="Phone" meta={user.phone ?? "—"} />
            <Row
              title="Phone verified"
              meta={
                user.phoneVerifiedAt
                  ? formatShortDate(user.phoneVerifiedAt)
                  : "Not verified"
              }
            />
            <Row
              title="Verification tier"
              meta={`Tier ${user.verificationLevel ?? 0}`}
            />
            <Row title="Joined" meta={formatShortDate(user.createdAt)} />
            <Row
              title="Last sign-in"
              meta={
                user.lastLoginAt ? `${ageLabel(user.lastLoginAt)} ago` : "Never"
              }
            />
            <Row title="Listings" meta={String(user._count?.listings ?? 0)} />
            <Row
              title="Orders"
              meta={String(
                (user._count?.buyerOrders ?? 0) +
                  (user._count?.farmerOrders ?? 0),
              )}
              isLast
            />
          </Group>

          <SectionTitle title="Account actions" />
          <View className="mx-5 bg-white rounded-2xl border border-line/60 p-4">
            {!canAct ? (
              <Text className="text-[13.5px] text-ink-secondary leading-5">
                {isSelf
                  ? "You can't change your own account."
                  : isAdminTarget
                    ? "Admin accounts can't be changed from here."
                    : "This account is no longer available."}
              </Text>
            ) : showReason ? (
              <>
                <Text className="text-[13.5px] text-ink-secondary leading-5">
                  {suspended
                    ? "Explain why this account is being reactivated. This is saved to the audit log."
                    : "Explain why this account is being suspended. This is saved to the audit log."}
                </Text>
                <TextInput
                  value={reason}
                  onChangeText={setReason}
                  placeholder="Reason (min 10 characters)"
                  placeholderTextColor={colors.inkFaint}
                  accessibilityLabel="Reason for status change"
                  multiline
                  autoFocus
                  className="rounded-xl bg-surface border border-line px-3 py-2.5 text-[14px] text-ink mt-3"
                />
                {mutation.isError ? (
                  <Text className="text-[12.5px] text-danger mt-2">
                    {getErrorMessage(mutation.error)}
                  </Text>
                ) : null}
                <View className="flex-row gap-2 mt-3">
                  <View className="flex-1">
                    <Button
                      label="Cancel"
                      variant="secondary"
                      onPress={() => {
                        setShowReason(false);
                        setReason("");
                      }}
                    />
                  </View>
                  <View className="flex-1">
                    <Button
                      label={suspended ? "Reactivate" : "Suspend"}
                      variant={suspended ? "primary" : "danger"}
                      disabled={trimmed.length < 10}
                      isLoading={mutation.isPending}
                      onPress={confirm}
                    />
                  </View>
                </View>
              </>
            ) : (
              <Button
                label={suspended ? "Reactivate account" : "Suspend account"}
                variant={suspended ? "soft" : "danger"}
                onPress={() => setShowReason(true)}
              />
            )}
          </View>

          <SectionTitle title="Recent admin actions on this account" />
          {events.length === 0 ? (
            <View className="mx-5 rounded-2xl bg-white border border-line/60 p-4">
              <Text className="text-[13.5px] text-ink-secondary">
                No admin actions recorded.
              </Text>
            </View>
          ) : (
            <Group>
              {events.map((e, i) => (
                <Row
                  key={e.id}
                  leading={<IconBubble name="file-text" tone="neutral" />}
                  title={humanize(e.action)}
                  subtitle={e.actor?.fullName ?? "System"}
                  footer={
                    typeof e.metadata?.reason === "string"
                      ? e.metadata.reason
                      : undefined
                  }
                  meta={`${ageLabel(e.createdAt)} ago`}
                  isLast={i === events.length - 1}
                />
              ))}
            </Group>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </AdminScreen>
  );
}
