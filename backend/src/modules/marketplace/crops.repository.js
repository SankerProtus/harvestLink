import { prisma } from "../../common/utils/prismaClient.js";

export async function listActiveCrops({ search } = {}) {
  const where = { active: true };

  if (search?.trim()) {
    const term = search.trim();
    where.OR = [
      { name: { contains: term, mode: "insensitive" } },
      { slug: { contains: term, mode: "insensitive" } },
    ];
  }

  return prisma.crop.findMany({
    where,
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
}

export async function findActiveCropBySlug(slug) {
  return prisma.crop.findFirst({
    where: { slug, active: true },
  });
}

export async function findCropById(id) {
  return prisma.crop.findUnique({ where: { id } });
}
