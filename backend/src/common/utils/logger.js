const LOG_LEVELS = Object.freeze({
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  AUDIT: "audit",
});

const isProduction = process.env.NODE_ENV === "production";

// Redaction of sensitive metadata
const SENSITIVE_KEYS = new Set([
  "password",
  "otp",
  "code",
  "token",
  "refreshtoken",
  "accesstoken",
  "tokenhash",
  "codehash",
  "authorization",
  "secret",
  "idtoken",
]);

const REDACTED_PLACEHOLDER = "[REDACTED]";

function maskPhone(phone) {
  if (typeof phone !== "string") return phone;

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "[MASKED]";

  const prefix = phone.startsWith("+") ? phone.slice(0, 5) : digits.slice(0, 4);
  return `${prefix}****${digits.slice(-2)}`;
}

// Redacts sensitive keys in an object or array recursively. Used to prevent logging secrets in plaintext.
function redact(value) {
  if (Array.isArray(value)) {
    return value.map(redact);
  }

  if (value && typeof value === "object") {
    const result = {};
    for (const [key, val] of Object.entries(value)) {
      const normalizedKey = key.toLowerCase();
      if (normalizedKey === "phone") {
        result[key] = maskPhone(val);
      } else if (SENSITIVE_KEYS.has(normalizedKey)) {
        result[key] = REDACTED_PLACEHOLDER;
      } else {
        result[key] = redact(val);
      }
    }
    return result;
  }

  return value;
}

// Logging function that serializes log entries as JSON and writes to stdout/stderr. Suppresses debug logs in production.
function log(level, message, metadata) {
  if (level === LOG_LEVELS.DEBUG && isProduction) {
    return;
  }

  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(metadata ? { metadata: redact(metadata) } : {}),
  };

  const serialized = JSON.stringify(entry);

  // eslint-disable-next-line no-console
  const writer = level === LOG_LEVELS.ERROR ? console.error : console.log;
  writer(serialized);
}

// Public logger interface with methods for each log level. All methods accept a message string and an optional metadata object. Metadata is redacted for sensitive keys before logging.
export const logger = Object.freeze({
  debug: (message, metadata) => log(LOG_LEVELS.DEBUG, message, metadata),
  info: (message, metadata) => log(LOG_LEVELS.INFO, message, metadata),
  warn: (message, metadata) => log(LOG_LEVELS.WARN, message, metadata),
  error: (message, metadata) => log(LOG_LEVELS.ERROR, message, metadata),
  // Audit logs are for security-relevant events that should be recorded even in production, such as authentication attempts, permission changes, or other sensitive operations. They are treated as a separate log level to ensure they are always captured and can be monitored independently of regular application logs.
  audit: (message, metadata) => log(LOG_LEVELS.AUDIT, message, metadata),
});
