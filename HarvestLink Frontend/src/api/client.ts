import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { useAuthStore } from "../store/useAuthStore";

function getDebuggerHost(): string | undefined {
  const manifest = Constants.manifest as any;
  const expoConfig = Constants.expoConfig as any;

  return (
    manifest?.debuggerHost ||
    (manifest?.packagerOpts as any)?.devClient?.host ||
    (manifest?.packagerOpts as any)?.host ||
    expoConfig?.hostUri ||
    expoConfig?.extra?.expoGo?.hostUri ||
    (Constants as any)?.manifest2?.debuggerHost
  );
}

function getBackendHost() {
  const debuggerHost = getDebuggerHost();
  if (debuggerHost) {
    return debuggerHost.split(":")[0];
  }

  if (Platform.OS === "android" && !Constants.isDevice) {
    return "10.0.2.2";
  }

  return "localhost";
}

const BASE_URL = `http://${getBackendHost()}:4000/api`;
const USE_MOCK_API = true;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const { phoneNumber } = useAuthStore.getState();
  if (phoneNumber) {
    config.headers = config.headers ?? {};
    (config.headers as any)["X-User-Phone"] = phoneNumber;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.response?.data ?? err.message);
    return Promise.reject(err);
  }
);

function createMockResponse() {
  return Promise.resolve({
    data: {},
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
    request: {},
  });
}

if (USE_MOCK_API) {
  const mockFn = async (..._args: any[]) => createMockResponse();
  apiClient.post = mockFn as any;
  apiClient.get = mockFn as any;
  apiClient.put = mockFn as any;
  apiClient.delete = mockFn as any;
  console.log("Mock API enabled: all API calls will resolve locally.");
}

export { apiClient };
