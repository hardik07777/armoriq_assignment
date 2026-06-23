import { Router } from "express";
import  { MCPManager } from "../mcp/manager.js";
import { AuditService } from "../audit/auditService.js";

const router = Router();

router.get(
  "/mcp/tools",
  async (_, res) => {
    const manager = new MCPManager();

    const tools =
      await manager.discoverTools();

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

      const manager =
        new MCPManager();

      const result =
        await manager.executeTool(
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