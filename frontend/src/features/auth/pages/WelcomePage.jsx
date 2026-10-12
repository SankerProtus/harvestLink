import { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

import { requestOtpSchema, OTP_PURPOSES } from "../schemas/authSchemas.js";
import { useRequestOtp } from "../hooks/authHooks.js";
import { getErrorMessage, getRateLimitMessage } from "../../../lib/errorMap.js";
import { useRetryCountdown } from "../../../hooks/useRetryCountdown.js";
import { AuthButton } from "../components/AuthButton.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";

const COUNTRY_CODE = "+233";

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
      className="flex-1 px-3 py-4 text-[20px] text-ink font-bold tracking-[-0.3px]"
      accessibilityLabel="Phone number"
      accessibilityHint="Enter your Ghanaian phone number"
    />
  );
}

const phoneOnlySchema = requestOtpSchema.pick({ phone: true });

const ROLE_OPTIONS = [
  {
    value: "FARMER",
    label: "Farmer",
    icon: "sprout-outline",
  },
  {
    value: "BUYER",
    label: "Buyer",
    icon: "cart-outline",
  },
];

function AuthModeToggle({ mode, onChange }) {
  const options = [
    { value: "signin", label: "Sign In" },
    { value: "register", label: "Register" },
  ];

  return (
    <View className="flex-row gap-4 mb-1">
      {options.map((option) => {
        const isActive = mode === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={option.label}
            hitSlop={4}
          >
            <Text
              className={`text-[13px] font-bold pb-1 border-b-2 ${
                isActive
                  ? "text-primary border-primary"
                  : "text-ink-faint border-transparent"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function RolePill({ selected, label, icon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
      className={`flex-1 flex-row items-center justify-center gap-2 rounded-xl border px-3 py-2.5 ${
        selected
          ? "bg-primary-muted border-primary/40"
          : "bg-white border-line/70"
      }`}
    >
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={selected ? colors.primary : colors.inkMuted}
      />
      <Text
        className={`text-[13px] font-semibold ${
          selected ? "text-primary" : "text-ink-muted"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function WelcomePage() {
  const navigation = useNavigation();
  const requestOtp = useRequestOtp();
  const rateLimitSeconds = useRetryCountdown(requestOtp.error);
  const [mode, setMode] = useState("register");
  const [role, setRole] = useState(undefined);
  const [roleTouched, setRoleTouched] = useState(false);
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneOnlySchema),
    defaultValues: { phone: "" },
  });

  function handleModeChange(nextMode) {
    setMode(nextMode);
    setRoleTouched(false);
  }

  async function requestOtpForPurpose(phone, purpose, purposeRole) {
    try {
      const result = await requestOtp.mutateAsync({ phone, purpose });
      navigation.navigate("OtpVerify", {
        phone,
        purpose,
        role: purpose === OTP_PURPOSES.REGISTRATION ? purposeRole : undefined,
        // Only present when the backend has OTP_DEBUG_EXPOSE enabled
        // (demo builds) — undefined in a normal deployment.
        debugCode: result?.debugCode,
      });
    } catch {
      // Already captured in requestOtp.error and rendered below.
    }
  }

  async function submitWithPurpose({ phone }) {
    if (mode === "register" && !role) {
      setRoleTouched(true);
      return;
    }
    const purpose =
      mode === "register" ? OTP_PURPOSES.REGISTRATION : OTP_PURPOSES.LOGIN;
    await requestOtpForPurpose(phone, purpose, role);
  }

  const onSubmit = handleSubmit(submitWithPurpose);

  async function handleSwitchToSignIn() {
    const phone = getValues("phone");
    const validation = phoneOnlySchema.safeParse({ phone });
    if (!validation.success) {
      setMode("signin");
      return;
    }

    setMode("signin");
    await requestOtpForPurpose(phone, OTP_PURPOSES.LOGIN, undefined);
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero section */}
          <View className="relative">
            <Image
              source={require("../../../../assets/sign_cover_photo.jpg")}
              className="w-full h-[260px]"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-primary-dark/55" />

            <View
              className="absolute left-5 flex-row items-center"
              style={{ top: insets.top - 8 }}
            >
              <View
                className="h-10 w-10 rounded-xl bg-white items-center justify-center overflow-hidden"
                style={shadows.sm}
              >
                <Image
                  source={require("../../../../assets/icon.png")}
                  resizeMode="contain"
                  className="h-8 w-8"
                />
              </View>
              <View className="ml-2.5">
                <Text className="text-[16px] font-extrabold text-white tracking-[-0.3px]">
                  HarvestLink
                </Text>
              </View>
            </View>

            <View className="absolute inset-x-0 bottom-0 px-5 pb-8">
              <Text className="text-white text-[28px] leading-[32px] font-extrabold tracking-[-0.5px]">
                Fresh produce, direct markets
              </Text>
            </View>
          </View>

          {/* Form sheet — dramatic overlap */}
          <View
            className="flex-1 px-5 pt-7 bg-surface rounded-t-xl3 -mt-8"
            style={{ paddingBottom: insets.bottom + 24, ...shadows.lg }}
          >
            <AuthModeToggle mode={mode} onChange={handleModeChange} />

            {/* Phone input — single focal point */}
            <View className="mt-5">
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
                  <Text className="text-[17px] font-bold text-ink">+233</Text>
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
                <View className="mt-2">
                  <Text
                    className="text-[12px] text-danger"
                    accessibilityRole="alert"
                  >
                    {requestOtp.error?.code === "RATE_LIMIT_EXCEEDED"
                      ? getRateLimitMessage(rateLimitSeconds)
                      : getErrorMessage(requestOtp.error)}
                  </Text>
                  {requestOtp.error?.code ===
                  "AUTH_PHONE_ALREADY_REGISTERED" ? (
                    <Pressable
                      onPress={handleSwitchToSignIn}
                      accessibilityRole="button"
                      accessibilityLabel="Switch to Sign In"
                      className="mt-2 self-start"
                    >
                      <Text className="text-[13px] font-semibold text-primary">
                        Switch to Sign In →
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              ) : null}
            </View>

            {mode === "register" ? (
              <View className="mt-4">
                <Text className="text-[12px] text-ink-muted mb-2">I am a…</Text>
                <View className="flex-row gap-2">
                  {ROLE_OPTIONS.map((option) => (
                    <RolePill
                      key={option.value}
                      selected={role === option.value}
                      label={option.label}
                      icon={option.icon}
                      onPress={() => {
                        setRoleTouched(true);
                        setRole((current) =>
                          current === option.value ? undefined : option.value,
                        );
                      }}
                    />
                  ))}
                </View>
                {roleTouched && !role ? (
                  <Text
                    className="mt-2 text-[12px] text-danger"
                    accessibilityRole="alert"
                  >
                    Choose whether you're a farmer or a buyer to continue.
                  </Text>
                ) : null}
              </View>
            ) : null}

            <View className="mt-5">
              <AuthButton
                label={mode === "register" ? "Send OTP" : "Sign In"}
                onPress={onSubmit}
                isLoading={requestOtp.isPending}
                disabled={rateLimitSeconds != null && rateLimitSeconds > 0}
              />
            </View>

            <View className="flex-row items-center mt-5">
              <View className="flex-1 h-px bg-line" />
              <Text className="mx-3 text-[11px] font-semibold text-ink-faint uppercase tracking-wider">
                Or
              </Text>
              <View className="flex-1 h-px bg-line" />
            </View>

            <Pressable
              onPress={() => navigation.navigate("GoogleSignIn")}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              style={({ pressed }) => ({
                opacity: pressed ? 0.85 : 1,
                ...shadows.sm,
              })}
              className="flex-row items-center justify-center rounded-xl2 border border-line bg-white py-3 mt-4"
            >
              <MaterialCommunityIcons
                name="google"
                size={18}
                color={colors.inkSecondary}
              />
              <Text className="ml-2.5 text-[14px] font-semibold text-ink">
                Continue with Google
              </Text>
            </Pressable>

            <Text className="mt-5 text-center text-[11px] leading-[16px] text-ink-faint px-2">
              By continuing, you agree to HarvestLink's{" "}
              <Text className="font-semibold text-ink-muted">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="font-semibold text-ink-muted">
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
