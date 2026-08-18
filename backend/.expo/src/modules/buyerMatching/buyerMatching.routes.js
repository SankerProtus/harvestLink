import { Router } from "express";

import { searchMatches } from "./buyerMatching.controller.js";
import { rateLimiter } from "../../common/middlewares/rateLimit.middleware.js";

const router = Router();

const lightLimiter = rateLimiter({
  routeName: "buyer-matching-light",
  windowMs: 15 * 60 * 1000,
  max: 100,
  strategy: "ip",
});

router.get("/matches", lightLimiter, searchMatches);

export default router;
