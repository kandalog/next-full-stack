import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// 環境に応じてデータベースURLを設定
const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    // 本番環境ではSupabaseのURLを使用
    return process.env.SUPABASE_DATABASE_URL;
  }
  // 開発環境ではローカルのDocker PostgreSQLを使用
  return process.env.DATABASE_URL;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
