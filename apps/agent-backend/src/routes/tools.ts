import { Router } from "express";

import { MCPClient } from "../agent/mcpClient.js";

const router = Router();

router.get(
  "/tools",
  async (_, res) => {

    const client =
      new MCPClient();

    const tools =
      await client.discoverTools();

    res.json(tools);
  }
);




export default router;