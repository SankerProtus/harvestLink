import { NotFoundError, ForbiddenError } from "../../errors/commonErrors.js";

export class NotificationNotFoundError extends NotFoundError {
  constructor() {
    super("Notification not found");
  }
}

export class NotNotificationOwnerError extends ForbiddenError {
  constructor() {
    super("You do not have permission to modify this notification");
  }
}
