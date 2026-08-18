import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";
import { Platform } from "react-native";

const DEVICE_ID_STORAGE_KEY = "harvestlink_device_id";

let cachedDeviceId = null;

async function getOrCreateDeviceId() {
  if (cachedDeviceId) return cachedDeviceId;

  const existing = await SecureStore.getItemAsync(DEVICE_ID_STORAGE_KEY);
  if (existing) {
    cachedDeviceId = existing;
    return existing;
  }

  const newDeviceId = Crypto.randomUUID();
  await SecureStore.setItemAsync(DEVICE_ID_STORAGE_KEY, newDeviceId);
  cachedDeviceId = newDeviceId;
  return newDeviceId;
}

function mapPlatform() {
  if (Platform.OS === "ios") return "IOS";
  if (Platform.OS === "android") return "ANDROID";
  return "WEB";
}

export async function getDeviceInfo() {
  const deviceId = await getOrCreateDeviceId();
  return {
    deviceId,
    platform: mapPlatform(),
  };
}
