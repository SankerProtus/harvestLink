import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";

import { AuthButton } from "../components/AuthButton.jsx";
import { registerSchema } from "../schemas/authSchemas.js";
import { useRegister } from "../hooks/authHooks.js";
import { getErrorMessage, getRateLimitMessage } from "../../../lib/errorMap.js";
import { useRetryCountdown } from "../../../hooks/useRetryCountdown.js";
import { getDeviceInfo } from "../../../lib/deviceInfo.js";
import {
  ScreenHeader,
  HeaderActionButton,
} from "../../../components/ui/ScreenHeader.jsx";
import { Input } from "../../../components/ui/Input.jsx";

const fullNameSchema = registerSchema.pick({ fullName: true });

export function CompleteRegistrationPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { phone, role, otpVerificationToken } = route.params;

  const register = useRegister();
  const rateLimitSeconds = useRetryCountdown(register.error);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullNameSchema),
    defaultValues: { fullName: "" },
  });

  async function onSubmit({ fullName }) {
    try {
      const device = await getDeviceInfo();
      await register.mutateAsync({
        phone,
        role,
        fullName,
        otpVerificationToken,
        device,
      });
    } catch {
      // Already captured in register.error and rendered below.
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <StatusBar style="dark" />

      <ScreenHeader
        title="One last step"
        subtitle="What should we call you?"
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
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
          <Text className="text-[13px] text-ink-muted text-center mb-6">
            Setting up your account for{" "}
            <Text className="font-semibold text-ink">{phone}</Text>
          </Text>

          <Controller
            control={control}
            name="fullName"
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                label="Full Name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your full name"
                error={errors.fullName?.message}
                leftIcon="user"
                autoComplete="name"
                textContentType="name"
                autoFocus
              />
            )}
          />

          <View className="h-6" />

          <AuthButton
            label="Create Account"
            onPress={handleSubmit(onSubmit)}
            isLoading={register.isPending}
            icon="arrow-right"
            disabled={rateLimitSeconds != null && rateLimitSeconds > 0}
          />

          {register.isError ? (
            <Text
              className="text-[13px] text-danger mt-4 text-center"
              accessibilityRole="alert"
            >
              {register.error?.code === "RATE_LIMIT_EXCEEDED"
                ? getRateLimitMessage(rateLimitSeconds)
                : getErrorMessage(register.error)}
            </Text>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}