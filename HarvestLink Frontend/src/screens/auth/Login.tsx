import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Phone } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { apiClient } from "../../api/client";
import { useAuthStore } from "../../store/useAuthStore";

export default function Login() {
  const navigation = useNavigation<any>();
  const setPhoneNumber = useAuthStore((s) => s.setPhoneNumber);
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendCode = async () => {
    if (!phone) return;
    setSending(true);
    try {
      await apiClient.post("/auth/login/request-otp", { phone });
      setPhoneNumber(phone);
      navigation.navigate("OtpVerification", { phoneNumber: phone });
    } catch (err) {
      console.error("Failed to send code:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 pt-14">
      <Text className="text-lg font-semibold text-text-primary mb-8">Log In</Text>

      <View className="w-14 h-14 bg-primary-light rounded-full items-center justify-center mb-6">
        <Phone size={22} color="#2F6B3C" />
      </View>

      <Text className="text-2xl font-bold text-text-primary mb-1">Welcome back</Text>
      <Text className="text-text-secondary mb-6">
        Log in with the phone number you registered. We will send you a one-time code by SMS.
      </Text>

      <TextField
        label="Phone number"
        placeholder="+233 24 123 4567"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        helperText="Helper text"
      />

      <View className="mt-2">
        <Button label={sending ? "Sending..." : "Send Code"} onPress={handleSendCode} disabled={!phone || sending} />
      </View>

      <Pressable onPress={() => navigation.navigate("RoleSelect")} className="items-center mt-4">
        <Text className="text-primary font-medium">New to HarvestLink? Sign up</Text>
      </Pressable>
    </View>
  );
}
