import { NotFoundError, ForbiddenError } from "../../errors/commonErrors.js";

export class ListingNotFoundError extends NotFoundError {
  constructor() {
    super("Listing not found");
  }
}

export class CannotExpressInterestInOwnListingError extends ForbiddenError {
  constructor() {
    super("You cannot express interest in your own listing");
  }
}

export class NotListingOwnerError extends ForbiddenError {
  constructor() {
    super("You do not have permission to view interest on this listing");
  }
}
