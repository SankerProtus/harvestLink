import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import { normalizeKnownError } from "../../../common/utils/errorNormalizer.js";
import { errorHandlerMiddleware } from "../../../common/middlewares/errorHandler.middleware.js";
import { UploadProviderError } from "../../../errors/commonErrors.js";
import { HandoverCodeRequiredError, InvalidOrderStatusTransitionError } from "../../../modules/deliveryTracking/deliveryTracking.errors.js";

function makeRes() {
  const res = { headersSent: false };
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
}
const req = { method: "POST", originalUrl: "/api/marketplace/listings/photos" };

describe("normalizeKnownError", () => {
  test("multer LIMIT_FILE_SIZE becomes a 413 with a user-meaningful code", () => {
    const err = Object.assign(new Error("File too large"), { name: "MulterError", code: "LIMIT_FILE_SIZE", field: "photo" });
    const out = normalizeKnownError(err);
    expect(out.statusCode).toBe(413);
    expect(out.code).toBe("UPLOAD_FILE_TOO_LARGE");
  });

  test("body-parser entity.too.large becomes a 413", () => {
    const out = normalizeKnownError(Object.assign(new Error("too big"), { type: "entity.too.large" }));
    expect(out.statusCode).toBe(413);
    expect(out.code).toBe("PAYLOAD_TOO_LARGE");
  });

  test.each([
    ["P2002", 409],
    ["P2025", 404],
    ["P2003", 409],
    ["P1001", 503],
    ["P2024", 503],
  ])("Prisma %s maps to HTTP %i", (code, status) => {
    const out = normalizeKnownError(Object.assign(new Error("x"), { name: "PrismaClientKnownRequestError", code }));
    expect(out.statusCode).toBe(status);
  });

  test("an unknown Prisma code (e.g. P2022 missing column) is NOT swallowed - it must stay a loud 500", () => {
    const out = normalizeKnownError(Object.assign(new Error("x"), { name: "PrismaClientKnownRequestError", code: "P2022" }));
    expect(out).toBeNull();
  });

  test("a plain Error is unknown", () => {
    expect(normalizeKnownError(new Error("boom"))).toBeNull();
  });
});

describe("errorHandlerMiddleware", () => {
  let log;
  beforeEach(() => {
    log = jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  test("returns translated library errors with their real status/code, not a 500", () => {
    const res = makeRes();
    const err = Object.assign(new Error("File too large"), { name: "MulterError", code: "LIMIT_FILE_SIZE" });
    errorHandlerMiddleware(err, req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(413);
    expect(res.json.mock.calls[0][0].error.code).toBe("UPLOAD_FILE_TOO_LARGE");
  });

  test("provider failures surface as 502 UPLOAD_PROVIDER_ERROR", () => {
    const res = makeRes();
    errorHandlerMiddleware(new UploadProviderError(), req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json.mock.calls[0][0].error.code).toBe("UPLOAD_PROVIDER_ERROR");
  });

  test("unexpected errors are 500, never leak the message, and log the stack", () => {
    const res = makeRes();
    errorHandlerMiddleware(new Error("secret db detail"), req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(JSON.stringify(res.json.mock.calls[0][0])).not.toContain("secret db detail");
    const logged = JSON.parse(log.mock.calls[0][0]);
    expect(logged.metadata.stack).toContain("secret db detail");
    expect(logged.metadata.path).toBe("/api/marketplace/listings/photos");
  });
});

describe("HandoverCodeRequiredError", () => {
  test("is a distinct code but still an InvalidOrderStatusTransitionError (409)", () => {
    const err = new HandoverCodeRequiredError();
    expect(err).toBeInstanceOf(InvalidOrderStatusTransitionError);
    expect(err.statusCode).toBe(409);
    expect(err.code).toBe("DELIVERY_HANDOVER_CODE_REQUIRED");
  });
});
