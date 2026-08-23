import * as SecureStore from "expo-secure-store";

const ONBOARDING_SEEN_STORAGE_KEY = "harvestlink_onboarding_seen";

export async function getHasSeenOnboarding() {
  try {
    const value = await SecureStore.getItemAsync(ONBOARDING_SEEN_STORAGE_KEY);
    return value === "true";
  } catch {
    return false;
  }
}

export async function setHasSeenOnboarding() {
  try {
    await SecureStore.setItemAsync(ONBOARDING_SEEN_STORAGE_KEY, "true");
  } catch {
    // Best-effort. Worst case the intro shows again next launch.
  }
}
