import { TrustValidationError } from "./trust.errors.js";

export const DISPUTE_EVIDENCE_MAX_COUNT = 5;
export const DISPUTE_EVIDENCE_FOLDER = "harvestlink/dispute-evidence";

function allowedEvidenceHosts() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const hosts = new Set(["res.cloudinary.com"]);
  if (cloudName) {
    hosts.add(`${cloudName}.cloudinary.com`);
  }
  const extra = process.env.EVIDENCE_ALLOWED_HOSTS?.split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  for (const host of extra ?? []) {
    hosts.add(host);
  }
  return hosts;
}

export function isAllowedEvidenceUrl(urlString) {
  let parsed;
  try {
    parsed = new URL(urlString);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  return allowedEvidenceHosts().has(parsed.hostname);
}

export function assertEvidenceUrlsAllowed(urls) {
  if (!urls?.length) return;
  if (urls.length > DISPUTE_EVIDENCE_MAX_COUNT) {
    throw new TrustValidationError(
      `At most ${DISPUTE_EVIDENCE_MAX_COUNT} evidence photos are allowed`,
    );
  }
  for (const url of urls) {
    if (!isAllowedEvidenceUrl(url)) {
      throw new TrustValidationError(
        "Evidence must use HTTPS URLs from the platform upload endpoint",
      );
    }
  }
}
