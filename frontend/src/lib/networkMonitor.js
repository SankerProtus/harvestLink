import NetInfo from "@react-native-community/netinfo";

export async function isOnline() {
  const state = await NetInfo.fetch();
  return Boolean(state.isConnected && state.isInternetReachable);
}

export function subscribeToNetworkChanges(callback) {
  const unsubscribe = NetInfo.addEventListener((state) => {
    callback(Boolean(state.isConnected && state.isInternetReachable));
  });
  return unsubscribe;
}
