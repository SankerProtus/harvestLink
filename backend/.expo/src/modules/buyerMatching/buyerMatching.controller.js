import { parseOrThrow, matchSearchSchema } from "./buyerMatching.validators.js";
import { searchMatches as searchMatchesService } from "./buyerMatching.service.js";

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function searchMatches(req, res, next) {
  try {
    const filters = parseOrThrow(matchSearchSchema, req.query);
    const result = await searchMatchesService(filters);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}
