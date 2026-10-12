import { ForbiddenError } from "../../errors/commonErrors.js";
import { USER_ROLES } from "../../modules/auth/auth.constants.js";

export function adminMiddleware(req, _res, next) {
  if (!req.user || req.user.role !== USER_ROLES.ADMIN) {
    return next(new ForbiddenError("Admin access required"));
  }
  return next();
}
