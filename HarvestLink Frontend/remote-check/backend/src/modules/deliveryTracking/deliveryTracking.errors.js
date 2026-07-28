import { AppError } from "../../errors/AppError.js";

//  Order Lookup / Authorization Errors.

export class OrderNotFoundError extends AppError {
  constructor(message = "Order not found", details = null) {
    super(message, {
      statusCode: 404,
      code: "DELIVERY_ORDER_NOT_FOUND",
      isOperational: true,
      details,
    });
  }
}

export class UnauthorizedOrderAccessError extends AppError {
  constructor(
    message = "You do not have permission to access this order",
    details = null,
  ) {
    super(message, {
      statusCode: 403,
      code: "DELIVERY_UNAUTHORIZED_ORDER_ACCESS",
      isOperational: true,
      details,
    });
  }
}

//  State Transition Errors

export class InvalidOrderStatusTransitionError extends AppError {
  constructor(
    message = "This order status transition is not allowed",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "DELIVERY_INVALID_STATUS_TRANSITION",
      isOperational: true,
      details,
    });
  }
}

//  Inventory Errors

export class InsufficientListingQuantityError extends AppError {
  constructor(
    message = "The listing does not have enough available quantity for this order",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "DELIVERY_INSUFFICIENT_LISTING_QUANTITY",
      isOperational: true,
      details,
    });
  }
}

//  Location Reporting Errors

export class LocationReportingNotAllowedError extends AppError {
  constructor(
    message = "Location cannot be reported for this order in its current state",
    details = null,
  ) {
    super(message, {
      statusCode: 409,
      code: "DELIVERY_LOCATION_REPORTING_NOT_ALLOWED",
      isOperational: true,
      details,
    });
  }
}
