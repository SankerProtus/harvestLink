import multer from "multer";
import { BadRequestError } from "../../errors/commonErrors.js";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
// Cloudinary's free-plan cap for a single image is 10 MB. Mobile clients
// downscale before upload (see uploadListingPhoto on the app), so this is the
// safety net for older app builds, not the normal path.
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const storage = multer.memoryStorage();

export const uploadSingleImage = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(
        new BadRequestError("Only JPEG, PNG, or WEBP images are allowed"),
      );
    }
    cb(null, true);
  },
}).single("photo");
