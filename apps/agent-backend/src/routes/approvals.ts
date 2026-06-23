import { Router } from "express";
import { ApprovalService } from "../approval/approvalService.js";

const router = Router();
const approvalService = new ApprovalService();

router.get("/approvals", async (_, res) => {
  const requests =
    await approvalService.getPendingRequests();

  res.json(requests);
});

router.post(
  "/approvals/:id/approve",
  async (req, res) => {
    const result =
      await approvalService.approveRequest(
        req.params.id
      );

    res.json(result);
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