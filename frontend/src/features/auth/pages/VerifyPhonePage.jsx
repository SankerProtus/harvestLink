import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";

import { AuthButton } from "../components/AuthButton.jsx";
import { OTPInput } from "../components/OTPInput.jsx";
import {
  requestOtpSchema,
  OTP_PURPOSES,
  OTP_CONFIG,
} from "../schemas/authSchemas.js";
import {
  useProfile,
  useRequestOtp,
  useVerifyOtp,
  useChangePhoneNumber,
} from "../hooks/authHooks.js";
import { getErrorMessage, getRateLimitMessage } from "../../../lib/errorMap.js";
import { useRetryCountdown } from "../../../hooks/useRetryCountdown.js";
import {
  ScreenHeader,
  HeaderActionButton,
} from "../../../components/ui/ScreenHeader.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";

const COUNTRY_CODE = "+233";
const RESEND_COOLDOWN_SECONDS = 60;

function toLocalDigits(fullValue) {
  if (!fullValue) return "";
  return fullValue.startsWith(COUNTRY_CODE)
    ? fullValue.slice(COUNTRY_CODE.length)
    : fullValue;
}

function toFullPhone(localInput) {
  const digits = localInput.replace(/\D/g, "").replace(/^0+/, "");
  return digits ? `${COUNTRY_CODE}${digits}` : "";
}

function PhoneField({ value, onChange, onBlur }) {
  const [displayText, setDisplayText] = useState(toLocalDigits(value));

  function handleChangeText(text) {
    const digitsOnly = text.replace(/\D/g, "");
    setDisplayText(digitsOnly);
    onChange(toFullPhone(digitsOnly));
  }

  return (
    <TextInput
      value={displayText}
      onChangeText={handleChangeText}
      onBlur={onBlur}
      placeholder="24 123 4567"
      placeholderTextColor={colors.inkFaint}
      keyboardType="phone-pad"
      autoComplete="tel"
      textContentType="telephoneNumber"
      autoFocus
      className="flex-1 px-3 py-4 text-[20px] text-ink font-bold tracking-[-0.3px]"
      accessibilityLabel="Phone number"
      accessibilityHint="Enter your Ghanaian phone number"
    />
  );
}

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

const phoneOnlySchema = requestOtpSchema.pick({ phone: true });

export function VerifyPhonePage() {
  const navigation = useNavigation();
  const profile = useProfile();

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [debugCode, setDebugCode] = useState(null);

  const requestOtp = useRequestOtp();
  const verifyOtp = useVerifyOtp();
  const changePhoneNumber = useChangePhoneNumber();

  const requestRateLimitSeconds = useRetryCountdown(requestOtp.error);
  const verifyDisplayError = verifyOtp.error ?? changePhoneNumber.error;
  const verifyRateLimitSeconds = useRetryCountdown(verifyDisplayError);

  useEffect(() => {
    if (step !== "otp" || cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, cooldown]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneOnlySchema),
    defaultValues: { phone: profile.data?.phone ?? "" },
  });

  async function onSubmitPhone({ phone: submittedPhone }) {
    try {
      const result = await requestOtp.mutateAsync({
        phone: submittedPhone,
        purpose: OTP_PURPOSES.CHANGE_PHONE,
      });
      setPhone(submittedPhone);
      setCode("");
      setDebugCode(result?.debugCode ?? null);
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setStep("otp");
    } catch {
      // Already captured in requestOtp.error and rendered below.
    }
  }

  async function handleResend() {
    if (cooldown > 0 || requestOtp.isPending) return;
    try {
      const result = await requestOtp.mutateAsync({
        phone,
        purpose: OTP_PURPOSES.CHANGE_PHONE,
      });
      setDebugCode(result?.debugCode ?? null);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      // Already captured in requestOtp.error and rendered below.
    }
  }

  async function handleVerify() {
    try {
      const { verificationToken } = await verifyOtp.mutateAsync({
        phone,
        code,
        purpose: OTP_PURPOSES.CHANGE_PHONE,
      });
      await changePhoneNumber.mutateAsync({
        newPhone: phone,
        otpVerificationToken: verificationToken,
      });
      navigation.goBack();
    } catch {
      // Already captured in verifyOtp.error / changePhoneNumber.error below.
    }
  }

  const isVerifyBusy = verifyOtp.isPending || changePhoneNumber.isPending;

  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => (step === "otp" ? setStep("phone") : navigation.goBack())}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <StatusBar style="dark" />

      <ScreenHeader
        title={step === "phone" ? "Verify your phone" : "Enter the code"}
        subtitle={
          step === "phone"
            ? "We'll text you a code to confirm this number"
            : `Code sent to ${phone}`
        }
        leftAction={backAction}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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
          {step === "phone" ? (
            <>
              <View
                className="flex-row items-stretch overflow-hidden rounded-xl2 border-2 border-primary/30 bg-white"
                style={shadows.md}
              >
                <View className="flex-row items-center gap-2 px-4 py-4 border-r border-line bg-cream">
                  <View className="h-8 w-8 rounded-lg bg-primary-muted items-center justify-center">
                    <Text className="text-[10px] font-extrabold text-primary">
                      GH
                    </Text>
                  </View>
                  <Text className="text-[17px] font-bold text-ink">
                    {COUNTRY_CODE}
                  </Text>
                </View>

                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <PhoneField
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>

              {errors.phone?.message ? (
                <Text
                  className="mt-1.5 text-[12px] text-danger"
                  accessibilityRole="alert"
                >
                  {errors.phone.message}
                </Text>
              ) : null}

              {requestOtp.isError ? (
                <Text
                  className="mt-2 text-[12px] text-danger"
                  accessibilityRole="alert"
                >
                  {requestOtp.error?.code === "RATE_LIMIT_EXCEEDED"
                    ? getRateLimitMessage(requestRateLimitSeconds)
                    : getErrorMessage(requestOtp.error)}
                </Text>
              ) : null}

              <View className="h-6" />

              <AuthButton
                label="Send Code"
                onPress={handleSubmit(onSubmitPhone)}
                isLoading={requestOtp.isPending}
                icon="arrow-right"
                disabled={
                  requestRateLimitSeconds != null && requestRateLimitSeconds > 0
                }
              />
            </>
          ) : (
            <>
              <DemoOtpBanner code={debugCode} />

              <View className="items-center py-6">
                <OTPInput
                  value={code}
                  onChangeText={setCode}
                  error={
                    verifyDisplayError
                      ? verifyDisplayError.code === "RATE_LIMIT_EXCEEDED"
                        ? getRateLimitMessage(verifyRateLimitSeconds)
                        : getErrorMessage(verifyDisplayError)
                      : undefined
                  }
                />
              </View>

              <AuthButton
                label="Verify Number"
                onPress={handleVerify}
                variant="primary"
                isLoading={isVerifyBusy}
                disabled={
                  code.length !== OTP_CONFIG.CODE_LENGTH ||
                  (verifyRateLimitSeconds != null && verifyRateLimitSeconds > 0)
                }
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
                    disabled={
                      requestOtp.isPending ||
                      (requestRateLimitSeconds != null &&
                        requestRateLimitSeconds > 0)
                    }
                    accessibilityRole="button"
                    accessibilityLabel="Resend verification code"
                    hitSlop={8}
                  >
                    <Text className="text-[14px] font-bold text-primary">
                      {requestOtp.isPending ? "Sending…" : "Resend code"}
                    </Text>
                  </Pressable>
                )}

                {requestOtp.isError ? (
                  <Text
                    className="text-[12px] text-danger mt-2 text-center"
                    accessibilityRole="alert"
                  >
                    {requestOtp.error?.code === "RATE_LIMIT_EXCEEDED"
                      ? getRateLimitMessage(requestRateLimitSeconds)
                      : getErrorMessage(requestOtp.error)}
                  </Text>
                ) : null}
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
