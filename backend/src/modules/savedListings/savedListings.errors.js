import { NotFoundError } from "../../errors/commonErrors.js";

export class ListingNotFoundError extends NotFoundError {
  constructor() {
    super("Listing not found");
  }
}
