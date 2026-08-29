import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { AuthButton } from "../components/AuthButton.jsx";
import { OTPInput } from "../components/OTPInput.jsx";
import { OTP_PURPOSES, OTP_CONFIG } from "../schemas/authSchemas.js";
import { useVerifyOtp, useLogin, useRequestOtp } from "../hooks/authHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { getDeviceInfo } from "../../../lib/deviceInfo.js";
import { BackButton } from "../../../components/ui/InlinePageHeader.jsx";

const RESEND_COOLDOWN_SECONDS = 60;

// Demo-mode banner: only rendered when the backend echoes back a debugCode,
// which only happens when OTP_DEBUG_EXPOSE=true on the server (demo builds
// with no working SMS provider). Invisible in a normal deployment.
function DemoOtpBanner({ code }) {
  if (!code) return null;

  return (
    <View className="mb-6 rounded-2xl bg-warning-muted border border-warning/30 px-4 py-3">
      <Text className="text-[11px] font-bold text-warning uppercase tracking-wide mb-1">
        Demo mode — SMS not connected
      </Text>
      <Text className="text-[13px] text-ink">
        Your verification code is{" "}
        <Text className="font-extrabold text-ink text-[15px]">{code}</Text>
      </Text>
    </View>
  );
}

export function OtpVerifyPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { phone, purpose, role } = route.params;

  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  // Only ever populated when the backend has OTP_DEBUG_EXPOSE enabled
  // (demo builds) — undefined/null in a normal deployment.
  const [debugCode, setDebugCode] = useState(route.params?.debugCode ?? null);

  const verifyOtp = useVerifyOtp();
  const login = useLogin();
  const requestOtp = useRequestOtp();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleResend() {
    if (cooldown > 0 || requestOtp.isPending) return;
    try {
      const result = await requestOtp.mutateAsync({ phone, purpose });
      setDebugCode(result?.debugCode ?? null);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      // Already captured in requestOtp.error and rendered below.
    }
  }

  async function handleSubmit() {
    try {
      const { verificationToken } = await verifyOtp.mutateAsync({
        phone,
        code,
        purpose,
      });

      if (purpose === OTP_PURPOSES.REGISTRATION) {
        navigation.navigate("CompleteRegistration", {
          phone,
          role,
          otpVerificationToken: verificationToken,
        });
      } else {
        const device = await getDeviceInfo();
        await login.mutateAsync({
          phone,
          otpVerificationToken: verificationToken,
          device,
        });
      }
    } catch {
      // Already captured in verifyOtp.error / login.error below.
    }
  }

  const displayError = verifyOtp.error ?? login.error;
  const isBusy = verifyOtp.isPending || login.isPending;

  useEffect(() => {
    if (code.length === OTP_CONFIG.CODE_LENGTH && !isBusy && !displayError) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <StatusBar style="dark" />

      <View className="px-5 pt-2 pb-3">
        <BackButton onPress={() => navigation.goBack()} />
        <Text className="text-[28px] font-extrabold text-ink tracking-[-0.5px] mt-4">
          Verify your number
        </Text>
        <Text className="text-[14px] text-ink-muted mt-1.5 leading-5">
          Code sent to <Text className="font-semibold text-ink">{phone}</Text>
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <DemoOtpBanner code={debugCode} />

          <View className="items-center py-6">
            <OTPInput
              value={code}
              onChangeText={setCode}
              error={displayError ? getErrorMessage(displayError) : undefined}
            />
          </View>

          <AuthButton
            label={
              purpose === OTP_PURPOSES.REGISTRATION
                ? "Verify & Continue"
                : "Verify & Log In"
            }
            onPress={handleSubmit}
            variant="primary"
            isLoading={isBusy}
            disabled={code.length !== OTP_CONFIG.CODE_LENGTH}
          />

          <View className="mt-6 items-center">
            {cooldown > 0 ? (
              <Text className="text-[13px] text-ink-muted">
                Resend code in{" "}
                <Text className="font-bold text-primary">{cooldown}s</Text>
              </Text>
            ) : (
              <Pressable
                onPress={handleResend}
                disabled={requestOtp.isPending}
                accessibilityRole="button"
                accessibilityLabel="Resend verification code"
                hitSlop={8}
              >
                <Text className="text-[14px] font-bold text-primary">
                  {requestOtp.isPending ? "Sending…" : "Resend code"}
                </Text>
              </Pressable>
            )}
          </View>

          {login.error?.code === "AUTH_ACCOUNT_NOT_FOUND" ? (
            <View className="mt-8 pt-6 border-t border-line">
              <Text className="text-[13px] text-ink-muted text-center mb-3">
                No account with this number yet.
              </Text>
              <AuthButton
                label="Register Instead"
                onPress={() =>
                  navigation.navigate("Welcome", { prefillPhone: phone })
                }
                variant="secondary"
              />
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
