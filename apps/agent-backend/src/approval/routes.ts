import type { FastifyInstance } from "fastify";
import { ApprovalService } from "./approvalService.js";

const approvalService = new ApprovalService();

export async function approvalRoutes(app: FastifyInstance) {
  app.get("/api/approvals", async () => {
    return approvalService.getPendingRequests();
  });

  app.post("/api/approvals/:id/approve", async (request) => {
    const { id } = request.params as {
      id: string;
    };

    return approvalService.approveRequest(id);
  });

  app.post("/api/approvals/:id/reject", async (request) => {
    const { id } = request.params as {
      id: string;
    };

    return approvalService.rejectRequest(id);
  });
}