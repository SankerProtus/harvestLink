import { v2 as cloudinary } from "cloudinary";
import { ServiceUnavailableError } from "../../errors/commonErrors.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uploads an in-memory image buffer (from multer) to Cloudinary and
// resolves with the resulting secure URL. Wrapped in a Promise since
// Cloudinary's stream API is callback-based.
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
    return Promise.reject(
      new ServiceUnavailableError(
        "Evidence storage is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
      ),
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );
    uploadStream.end(buffer);
  });
}