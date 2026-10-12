import { prisma } from "../../common/utils/prismaClient.js";
import { AppError } from "../../errors/AppError.js";

export async function createUserReport({
  reporterId,
  reportedUserId,
  reason,
  description,
  evidenceUrls = [],
}) {
  if (reporterId === reportedUserId) {
    throw new AppError("You cannot report your own account", {
      statusCode: 400, code: "REPORT_SELF", isOperational: true,
    });
  }
  const user = await prisma.user.findUnique({ where: { id: reportedUserId } });
  if (!user || user.deletedAt) {
    throw new AppError("User not found", {
      statusCode: 404, code: "REPORTED_USER_NOT_FOUND", isOperational: true,
    });
  }
  const existing = await prisma.userReport.findFirst({
    where: { reporterId, reportedUserId, status: { in: ["OPEN", "UNDER_REVIEW"] } },
  });
  if (existing) {
    throw new AppError("You already have an active report for this user", {
      statusCode: 409, code: "REPORT_ALREADY_EXISTS", isOperational: true,
    });
  }
  return prisma.userReport.create({
    data: { reporterId, reportedUserId, reason, description, evidenceUrls },
    include: {
      reportedUser: { select: { id: true, fullName: true } },
    },
  });
}

export function listUserReports() {
  return prisma.userReport.findMany({
    where: { status: { in: ["OPEN", "UNDER_REVIEW"] } },
    orderBy: { createdAt: "asc" },
    include: {
      reporter: { select: { id: true, fullName: true, role: true } },
      reportedUser: {
        select: { id: true, fullName: true, role: true, accountStatus: true, phone: true },
      },
    },
  });
}

export async function reviewUserReport({ reportId, adminId, decision, resolutionNotes }) {
  const report = await prisma.userReport.findUnique({ where: { id: reportId } });
  if (!report || !["OPEN", "UNDER_REVIEW"].includes(report.status)) {
    throw new AppError("Report not found or already resolved", {
      statusCode: 404, code: "REPORT_NOT_FOUND", isOperational: true,
    });
  }
  return prisma.$transaction(async (tx) => {
    const status = decision === "BLOCK" ? "CONFIRMED" : "DISMISSED";
    const updated = await tx.userReport.update({
      where: { id: reportId },
      data: { status, resolutionNotes, resolvedById: adminId, resolvedAt: new Date() },
    });
    if (decision === "BLOCK") {
      await tx.user.update({
        where: { id: report.reportedUserId },
        data: { accountStatus: "SUSPENDED" },
      });
      await tx.refreshToken.deleteMany({ where: { userId: report.reportedUserId } });
      await tx.auditLog.create({
        data: {
          actorId: adminId,
          action: "USER_BLOCKED_AFTER_REPORT",
          entityType: "USER",
          entityId: report.reportedUserId,
          metadata: { reportId, reason: report.reason },
        },
      });
    } else {
      await tx.auditLog.create({
        data: {
          actorId: adminId,
          action: "USER_REPORT_DISMISSED",
          entityType: "USER_REPORT",
          entityId: reportId,
        },
      });
    }
    return updated;
  });
}
