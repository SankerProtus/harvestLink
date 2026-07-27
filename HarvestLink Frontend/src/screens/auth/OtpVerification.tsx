import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { OtpInput } from "../../components/OtpInput";
import { useAuthStore } from "../../store/useAuthStore";
import { apiClient } from "../../api/client";

export default function OtpVerification() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const phoneNumber = route.params?.phoneNumber ?? "+233 24 123 4567";
  const verify = useAuthStore((s) => s.verify);

  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(28);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const formattedTime = `00:${seconds.toString().padStart(2, "0")}`;

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await apiClient.post("/auth/verify-otp", { phone: phoneNumber, code });
      // Flipping isVerified true causes RootNavigator to swap straight to
      // MainStack — no manual navigation needed from here.
      verify();
    } catch (err) {
      console.error("OTP verification failed:", err);
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiClient.post("/auth/login/request-otp", { phone: phoneNumber });
      setSeconds(28);
    } catch (err) {
      console.error("Failed to resend code:", err);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 pt-14">
      <Pressable onPress={() => navigation.goBack()} className="flex-row items-center mb-8">
        <ChevronLeft size={20} color="#1A1A1A" />
        <Text className="text-text-primary font-medium ml-1">Verify Phone</Text>
      </Pressable>

      <Text className="text-2xl font-bold text-text-primary mb-1">Verify your number</Text>
      <Text className="text-text-secondary mb-6">
        Enter the 4-digit code sent via SMS to {phoneNumber}
      </Text>

      <OtpInput length={4} onComplete={setCode} />

      <Pressable disabled={seconds > 0} onPress={handleResend} className="mt-3">
        <Text className="text-xs text-text-secondary">
          {seconds > 0 ? `Didn't get a code? Resend in ${formattedTime}` : "Resend code"}
        </Text>
      </Pressable>

      <View className="mt-8">
        <Button
          label={verifying ? "Verifying..." : "Verify & Continue"}
          onPress={handleVerify}
          disabled={code.length < 4 || verifying}
        />
      </View>
    </View>
  );
}
