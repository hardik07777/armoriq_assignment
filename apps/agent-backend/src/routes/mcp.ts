import { Router } from "express";
import { mcpManager } from "../mcp/index.js";
import { AuditService } from "../audit/auditService.js";

const router = Router();

router.get(
  "/mcp/tools",
  async (_, res) => {
    const tools =
  await mcpManager.discoverTools();

    res.json(tools);
  }
);

router.post(
  "/mcp/execute",
  async (req, res) => {
    try {
      const {
        serverId,
        toolName,
        arguments: args,
      } = req.body;

      const result =
  await mcpManager.executeTool(
    serverId,
    toolName,
    args ?? {}
  );

      res.json(result);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    }
  }
);
router.get(
  "/audit-logs",
  async (_, res) => {
    try {
      const auditService =
        new AuditService();

      const logs =
        await auditService.getLogs();

      res.json(logs);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    }
  }
);

export default router;