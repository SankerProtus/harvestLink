import { z } from "zod";
import { parseOrThrow } from "../marketplace/marketplace.validators.js";
import { createUserReport, listUserReports, reviewUserReport } from "./reports.service.js";

const reason = z.enum(["FRAUD", "HARASSMENT", "IMPERSONATION", "UNSAFE_BEHAVIOR", "OTHER"]);
const createSchema = z.object({
  reason,
  description: z.string().trim().min(10).max(1000),
  evidenceUrls: z.array(z.string().url()).max(5).default([]),
}).strict();
const userParam = z.object({ userId: z.string().uuid() }).strict();
const reportParam = z.object({ reportId: z.string().uuid() }).strict();
const reviewSchema = z.object({
  decision: z.enum(["BLOCK", "DISMISS"]),
  resolutionNotes: z.string().trim().min(10).max(1000),
}).strict();

const success = (res, data) => res.status(200).json({ success: true, data });

export async function postUserReport(req, res, next) {
  try {
    const { userId: reportedUserId } = parseOrThrow(userParam, req.params);
    const input = parseOrThrow(createSchema, req.body);
    return res.status(201).json({
      success: true,
      data: await createUserReport({ reporterId: req.user.id, reportedUserId, ...input }),
    });
  } catch (err) { next(err); }
}

export async function getUserReports(req, res, next) {
  try { return success(res, await listUserReports()); }
  catch (err) { next(err); }
}

export async function postReviewUserReport(req, res, next) {
  try {
    const { reportId } = parseOrThrow(reportParam, req.params);
    const input = parseOrThrow(reviewSchema, req.body);
    return success(res, await reviewUserReport({ reportId, adminId: req.user.id, ...input }));
  } catch (err) { next(err); }
}
