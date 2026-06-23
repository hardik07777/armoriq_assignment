import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuditService {
  async log(data: {
    toolName: string;
    serverId: string;
    allowed: boolean;
    reason?: string;
  }) {
    return prisma.auditLog.create({
      data,
    });
  }

    async getLogs() {
    return prisma.auditLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  
}