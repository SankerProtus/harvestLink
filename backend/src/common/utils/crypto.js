import { createHash, createHmac } from "node:crypto";

export function sha256Hash(input) {
  return createHash("sha256").update(input, "utf8").digest("hex");
}

export function hmacSha256(key, input) {
  return createHmac("sha256", key).update(input, "utf8").digest("hex");
}
