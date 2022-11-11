import { PrismaClient } from "@prisma/client";

// Gives us access to database from anywhere in app that prisma is imported

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
