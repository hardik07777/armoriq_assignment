import { Router } from "express";
import { ApprovalService } from "../approval/approvalService.js";
import { MCPManager } from "../mcp/manager.js";

const router = Router();
const approvalService = new ApprovalService();
const manager = new MCPManager();
router.get("/approvals", async (_, res) => {
  const requests =
    await approvalService.getPendingRequests();

  res.json(requests);
});

router.post(
  "/approvals/:id/approve",
  async (req, res) => {
    const request =
      await approvalService.getRequestById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        error: "Approval request not found",
      });
    }

    await approvalService.approveRequest(
      req.params.id
    );

    const result =
      await manager.executeToolDirect(
        request.serverId,
        request.toolName,
        request.arguments as Record<
          string,
          unknown
        >
      );

    res.json({
      message:
        "Request approved and executed",
      result,
    });
  }
);

router.post(
  "/approvals/:id/reject",
  async (req, res) => {
    const result =
      await approvalService.rejectRequest(
        req.params.id
      );

    res.json(result);
  }
);


export default router;
