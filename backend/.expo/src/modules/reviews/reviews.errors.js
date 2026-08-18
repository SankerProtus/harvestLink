import {
  NotFoundError,
  ForbiddenError,
  ConflictError,
} from "../../errors/commonErrors.js";

export class OrderNotFoundError extends NotFoundError {
  constructor() {
    super("Order not found");
  }
}

export class NotOrderParticipantError extends ForbiddenError {
  constructor() {
    super("You do not have permission to view this order's review");
  }
}

export class NotOrderBuyerError extends ForbiddenError {
  constructor() {
    super("Only the buyer on this order can leave a review");
  }
}

export class OrderNotDeliveredError extends ConflictError {
  constructor() {
    super("You can only review an order after it has been delivered");
  }
}

export class OrderAlreadyReviewedError extends ConflictError {
  constructor() {
    super("This order has already been reviewed");
  }
}
