import { v2 as cloudinary } from "cloudinary";
import {
  ServiceUnavailableError,
  UploadProviderError,
} from "../../errors/commonErrors.js";
import { logger } from "../utils/logger.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Phones on mobile data are slow; the provider call itself should not hang
// forever and tie up a request (and the 5-10 MB buffer held in memory).
const UPLOAD_TIMEOUT_MS = 45_000;

// Uploads an in-memory image buffer (from multer) to Cloudinary and
// resolves with the resulting secure URL. Wrapped in a Promise since
// Cloudinary's stream API is callback-based.
//
// Provider failures are converted to UploadProviderError (HTTP 502) instead of
// leaking Cloudinary's plain `{ message, http_code }` objects, which the error
// handler could only report as an anonymous 500.
export function uploadImageBuffer(
  buffer,
  {
    folder = "harvestlink/avatars",
    transformation = [{ width: 512, height: 512, crop: "fill", gravity: "face" }],
  } = {},
) {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    logger.error("Image storage is not configured", {
      missing: [
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
      ].filter((name) => !process.env[name]),
    });
    return Promise.reject(
      new ServiceUnavailableError(
        "Photo uploads are temporarily unavailable. Please try again later.",
      ),
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation,
        timeout: UPLOAD_TIMEOUT_MS,
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          logger.error("Image provider upload failed", {
            providerMessage: error?.message,
            providerStatus: error?.http_code,
            folder,
          });
          return reject(
            new UploadProviderError(undefined, null, error ?? undefined),
          );
        }
        resolve(result.secure_url);
      },
    );
    uploadStream.on("error", (streamError) => {
      logger.error("Image upload stream error", {
        providerMessage: streamError?.message,
      });
      reject(new UploadProviderError(undefined, null, streamError));
    });
    uploadStream.end(buffer);
  });
}
