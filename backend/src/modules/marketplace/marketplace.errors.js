import { AppError } from "../../errors/AppError.js";

//  Listing Lookup / Availability Errors

export class ListingNotFoundError extends AppError {
  constructor(message = "Listing not found", details = null) {
    super(message, {
      statusCode: 404,
      code: "MARKETPLACE_LISTING_NOT_FOUND",
      isOperational: true,
      details,
    });
  }
}

export class ListingUnavailableError extends AppError {
  constructor(message = "This listing is no longer available", details = null) {
    super(message, {
      statusCode: 409,
      code: "MARKETPLACE_LISTING_UNAVAILABLE",
      isOperational: true,
      details,
    });
  }
}

export class ListingAlreadySoldError extends AppError {
  constructor(message = "This listing has already been sold", details = null) {
    super(message, {
      statusCode: 409,
      code: "MARKETPLACE_LISTING_ALREADY_SOLD",
      isOperational: true,
      details,
    });
  }
}

//  Authorization Errors

export class UnauthorizedListingAccessError extends AppError {
  constructor(
    message = "You do not have permission to modify this listing",
    details = null,
  ) {
    super(message, {
      statusCode: 403,
      code: "MARKETPLACE_UNAUTHORIZED_LISTING_ACCESS",
      isOperational: true,
      details,
    });
  }
}

//  State Transition Errors

export class InvalidListingStatusTransitionError extends AppError {
  constructor(
    message = "This listing status transition is not allowed",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "MARKETPLACE_INVALID_STATUS_TRANSITION",
      isOperational: true,
      details,
    });
  }
}

//  Creation / Uniqueness Errors

export class DuplicateListingError extends AppError {
  constructor(
    message = "A similar active listing already exists",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "MARKETPLACE_DUPLICATE_LISTING",
      isOperational: true,
      details,
    });
  }
}

//  Input Domain Errors

export class InvalidCropTypeError extends AppError {
  constructor(
    message = "The provided crop type is not supported",
    details = null,
  ) {
    super(message, {
      statusCode: 400,
      code: "MARKETPLACE_INVALID_CROP_TYPE",
      isOperational: true,
      details,
    });
  }
}

export class InvalidQuantityUnitError extends AppError {
  constructor(
    message = "The provided quantity unit is not supported",
    details = null,
  ) {
    super(message, {
      statusCode: 400,
      code: "MARKETPLACE_INVALID_QUANTITY_UNIT",
      isOperational: true,
      details,
    });
  }
}

export class InsufficientListingQuantityError extends AppError {
  constructor(
    message = "The listing does not have enough available quantity",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "MARKETPLACE_INSUFFICIENT_LISTING_QUANTITY",
      isOperational: true,
      details,
    });
  }
}
