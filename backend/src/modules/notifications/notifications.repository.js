import { prisma } from "../../common/utils/prismaClient.js";

export async function createNotification({
  userId,
  type,
  title,
  body,
  orderId,
  listingId,
}) {
  return prisma.notification.create({
    data: {
      userId,
      type,
      title,
      body,
      orderId: orderId ?? null,
      listingId: listingId ?? null,
    },
  });
}

export async function listNotificationsForUser(userId, { skip, take }) {
  const [items, totalCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.notification.count({ where: { userId } }),
  ]);
  return { items, totalCount };
}

export async function countUnreadForUser(userId) {
  return prisma.notification.count({ where: { userId, isRead: false } });
}

export async function findNotificationById(id) {
  return prisma.notification.findUnique({ where: { id } });
}

export async function markNotificationRead(id) {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function markAllNotificationsReadForUser(userId) {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
