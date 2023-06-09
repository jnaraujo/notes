import { PrismaClient } from "@prisma/client";

const isDevelopment = process.env.NODE_ENV === "development";

export const prisma = new PrismaClient({
  errorFormat: isDevelopment ? "minimal" : "pretty",
  log: [isDevelopment ? "query" : "warn"],
});
