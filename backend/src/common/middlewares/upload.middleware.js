import multer from "multer";
import { BadRequestError } from "../../errors/commonErrors.js";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

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
