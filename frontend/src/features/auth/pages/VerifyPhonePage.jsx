import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthButton } from "../components/AuthButton.jsx";
import { OTPInput } from "../components/OTPInput.jsx";
import {
  requestOtpSchema,
  OTP_PURPOSES,
  OTP_CONFIG,
} from "../schemas/authSchemas.js";
import {
  useRequestOtp,
  useVerifyOtp,
  useChangePhoneNumber,
} from "../hooks/authHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";

const COUNTRY_CODE = "+233";
const RESEND_COOLDOWN_SECONDS = 60;

function toFullPhone(localInput) {
  const digits = localInput.replace(/\D/g, "").replace(/^0+/, "");
  return digits ? `${COUNTRY_CODE}${digits}` : "";
}

function PhoneField({ value, onChange, onBlur }) {
  const [displayText, setDisplayText] = useState("");

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

const phoneOnlySchema = requestOtpSchema.pick({ phone: true });

// Demo-mode banner: only rendered when the backend echoes back a debugCode,
// which only happens when OTP_DEBUG_EXPOSE=true on the server.
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

export function VerifyPhonePage() {
  const navigation = useNavigation();

  // "phone" -> collecting the number, "otp" -> confirming the code
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [debugCode, setDebugCode] = useState(null);

  const requestOtp = useRequestOtp();
  const verifyOtp = useVerifyOtp();
  const changePhoneNumber = useChangePhoneNumber();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneOnlySchema),
    defaultValues: { phone: "" },
  });

  useEffect(() => {
    if (step !== "otp" || cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, cooldown]);

  async function onSubmitPhone({ phone: fullPhone }) {
    try {
      const result = await requestOtp.mutateAsync({
        phone: fullPhone,
        purpose: OTP_PURPOSES.CHANGE_PHONE,
      });
      setPhone(fullPhone);
      setDebugCode(result?.debugCode ?? null);
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setCode("");
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

  const otpError = verifyOtp.error ?? changePhoneNumber.error;
  const isVerifying = verifyOtp.isPending || changePhoneNumber.isPending;

  useEffect(() => {
    if (
      step === "otp" &&
      code.length === OTP_CONFIG.CODE_LENGTH &&
      !isVerifying &&
      !otpError
    ) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader
        title="Verify phone number"
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 24,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === "phone" ? (
            <>
              <Text className="text-[15px] text-ink-muted leading-5 mb-6">
                Add a phone number so buyers and farmers can confirm it's really
                you. We'll text you a code to confirm it.
              </Text>

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur } }) => (
                  <View
                    className={`flex-row items-center rounded-lg border bg-white overflow-hidden ${
                      errors.phone ? "border-danger" : "border-line"
                    }`}
                    style={shadows.sm}
                  >
                    <View className="pl-4 pr-1">
                      <Text className="text-[20px] font-bold text-ink-muted">
                        {COUNTRY_CODE}
                      </Text>
                    </View>
                    <PhoneField onChange={onChange} onBlur={onBlur} />
                  </View>
                )}
              />

              {errors.phone?.message ? (
                <Text
                  className="mt-1.5 text-[12px] text-danger"
                  accessibilityRole="alert"
                >
                  {errors.phone.message}
                </Text>
              ) : null}

              {requestOtp.error ? (
                <Text
                  className="mt-1.5 text-[12px] text-danger"
                  accessibilityRole="alert"
                >
                  {getErrorMessage(requestOtp.error)}
                </Text>
              ) : null}

              <View className="mt-6">
                <AuthButton
                  label="Send code"
                  onPress={handleSubmit(onSubmitPhone)}
                  variant="primary"
                  isLoading={requestOtp.isPending}
                />
              </View>
            </>
          ) : (
            <>
              <Text className="text-[15px] text-ink-muted leading-5 mb-6">
                Code sent to{" "}
                <Text className="font-semibold text-ink">{phone}</Text>
              </Text>

              <DemoOtpBanner code={debugCode} />

              <View className="items-center py-6">
                <OTPInput
                  value={code}
                  onChangeText={setCode}
                  error={otpError ? getErrorMessage(otpError) : undefined}
                />
              </View>

              <AuthButton
                label="Verify"
                onPress={handleVerify}
                variant="primary"
                isLoading={isVerifying}
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

              <View className="mt-6 items-center">
                <Pressable
                  onPress={() => setStep("phone")}
                  accessibilityRole="button"
                  accessibilityLabel="Use a different phone number"
                  hitSlop={8}
                >
                  <Text className="text-[13px] font-semibold text-ink-muted">
                    Use a different number
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
