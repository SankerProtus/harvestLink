import { v2 as cloudinary } from "cloudinary";

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