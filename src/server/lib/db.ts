import type { PrismaClient } from "generated/prisma";
import type { ITXClientDenyList } from "generated/prisma/runtime/client";

export type TransactionClient = Omit<PrismaClient, ITXClientDenyList>;

// use this as your db param type in all services
export type DBClient = PrismaClient | TransactionClient;
