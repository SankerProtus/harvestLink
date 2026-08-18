import * as SecureStore from "expo-secure-store";

const ONBOARDING_SEEN_STORAGE_KEY = "harvestlink_onboarding_seen";

// Whether the one-time intro carousel has already been shown on this
// device. Returns false (not true) if the key can't be read for any
// reason, so a storage error never traps the user in a loop that skips
// the app entirely — worst case they see the intro screen again.
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
