function requireEnvVar(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        `Check your .env file exists at the project root and restart the Expo dev server.`,
    );
  }
  return value;
}

export const env = Object.freeze({
  API_BASE_URL: requireEnvVar("EXPO_PUBLIC_API_BASE_URL"),
  GOOGLE_CLIENT_ID: requireEnvVar("EXPO_PUBLIC_GOOGLE_CLIENT_ID"),
});
