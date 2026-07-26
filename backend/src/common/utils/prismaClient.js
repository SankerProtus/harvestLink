import { PrismaClient } from "../../generated/client/index.js";

const isProduction = process.env.NODE_ENV === "production";

const logLevels = isProduction ? ["warn", "error"] : ["query", "warn", "error"];

function createPrismaClient() {
  return new PrismaClient({
    log: logLevels,
  });
}

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.__prismaClient ?? createPrismaClient();

if (!isProduction) {
  globalForPrisma.__prismaClient = prisma;
}
