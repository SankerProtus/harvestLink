import { prisma } from "../../common/utils/prismaClient.js";

// Create / Update / Find
export async function createOrder(data) {
  return prisma.order.create({ data });
}

export async function findOrderById(id) {
  return prisma.order.findUnique({ where: { id } });
}

export async function findOrderByIdWithRelations(id) {
  return prisma.order.findUnique({
    where: { id },
    include: { listing: true, buyer: true, farmer: true },
  });
}

export async function updateOrderStatus(id, status) {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
}

export async function updateOrderLocation(
  id,
  { latitude, longitude, locationReportedAt },
) {
  return prisma.order.update({
    where: { id },
    data: {
      latestLatitude: latitude,
      latestLongitude: longitude,
      locationReportedAt,
    },
  });
}

// List / Search

export async function listOrdersByBuyerId(buyerId, filters) {
  const { status, skip = 0, take = 20 } = filters;

  const where = {
    buyerId,
    ...(status ? { status } : {}),
  };

  const [items, totalCount] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      include: { listing: true, farmer: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.order.count({ where }),
  ]);

  return { items, totalCount };
}

export async function listOrdersByFarmerId(farmerId, filters) {
  const { status, skip = 0, take = 20 } = filters;

  const where = {
    farmerId,
    ...(status ? { status } : {}),
  };

  const [items, totalCount] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      include: { listing: true, buyer: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.order.count({ where }),
  ]);

  return { items, totalCount };
}
