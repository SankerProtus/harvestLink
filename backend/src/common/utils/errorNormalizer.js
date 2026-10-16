import {
  AppError,
} from "../../errors/AppError.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  PayloadTooLargeError,
  ServiceUnavailableError,
} from "../../errors/commonErrors.js";

/**
 * Library errors (multer, body-parser, Prisma) are not AppErrors, so without
 * this step every one of them became an opaque HTTP 500 — e.g. a photo over
 * the size limit surfaced to the user as "Something went wrong on our end".
 *
 * This function is deliberately dependency-free (it matches on `name`/`code`
 * rather than importing the libraries) so it is cheap to unit test.
 *
 * Returns an AppError when the failure is a known, user-meaningful condition,
 * or null when the error is genuinely unexpected and should be a 500.
 */
export function normalizeKnownError(err) {
  if (!err || err instanceof AppError) return err instanceof AppError ? err : null;

  // multer ---------------------------------------------------------------
  if (err.name === "MulterError") {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return new PayloadTooLargeError(
          "That photo is too large. Please choose a smaller photo.",
          { field: err.field ?? "photo" },
          "UPLOAD_FILE_TOO_LARGE",
        );
      case "LIMIT_UNEXPECTED_FILE":
      case "LIMIT_FILE_COUNT":
        return new BadRequestError("Unexpected file in upload", {
          field: err.field ?? null,
        });
      default:
        return new BadRequestError("The upload could not be processed");
    }
  }

  // body-parser (express.json / urlencoded) --------------------------------
  if (err.type === "entity.too.large") {
    return new PayloadTooLargeError("The request body is too large");
  }
  if (err.type === "entity.parse.failed" || err.type === "encoding.unsupported") {
    return new BadRequestError("The request body could not be read");
  }

  // Prisma -----------------------------------------------------------------
  if (err.name === "PrismaClientKnownRequestError") {
    switch (err.code) {
      case "P2002": // unique constraint
        return new ConflictError("That record already exists");
      case "P2003": // foreign key
        return new ConflictError("That record is linked to other data");
      case "P2025": // record not found
        return new NotFoundError("The requested record could not be found");
      case "P1001": // can't reach database
      case "P1002":
      case "P1008": // timeout
      case "P1017": // server closed connection
      case "P2024": // pool timeout
        return new ServiceUnavailableError(
          "The service is busy right now. Please try again shortly.",
        );
      default:
        return null; // e.g. P2022 missing column = a deploy/migration bug → 500 + loud log
    }
  }
  if (err.name === "PrismaClientInitializationError") {
    return new ServiceUnavailableError(
      "The service is busy right now. Please try again shortly.",
    );
  }

  return null;
}
