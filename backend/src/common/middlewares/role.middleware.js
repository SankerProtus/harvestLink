import { ForbiddenError } from "../../errors/commonErrors.js";

export function requireRole(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError("You do not have permission for this action"));
    }
    return next();
  };
}
