import {
  PrismaClient,
  Prisma
} from "@prisma/client";

const prisma = new PrismaClient();

export class ApprovalService {
  async createRequest(data: {
    toolName: string;
    serverId: string;
    arguments: Prisma.InputJsonValue;
  }) {
    return prisma.approvalRequest.create({
      data: {
        toolName: data.toolName,
        serverId: data.serverId,
        arguments: data.arguments,
        status: "PENDING",
      },
    });
  }

  async getPendingRequests() {
    return prisma.approvalRequest.findMany({
      where: {
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
    async approveRequest(id: string) {
    return prisma.approvalRequest.update({
      where: { id },
      data: {
        status: "APPROVED",
      },
    });
  }

  async rejectRequest(id: string) {
    return prisma.approvalRequest.update({
      where: { id },
      data: {
        status: "REJECTED",
      },
    });
  }
}
