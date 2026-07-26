import { createHash } from "node:crypto";

export function sha256Hash(input) {
  return createHash("sha256").update(input, "utf8").digest("hex");
}
