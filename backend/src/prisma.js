// Shared Prisma client used across the app so we only open one connection.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
