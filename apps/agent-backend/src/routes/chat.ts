import { Router } from "express";

import {
  PolicyEngine,
} from "../policy/policyEngine.js";

import { MCPManager } from "../mcp/manager.js";
import {
  testGemini,
  selectTool,
  generateFinalResponse,
} from "../ai/geminiService.js";


const router = Router();
const manager = new MCPManager();

const policy =
  new PolicyEngine();

router.post(
  "/chat",
  async (req, res) => {
    try {
const message = String(req.body.message ?? "");
      const tools =
        await manager.discoverTools();

const availableTools = tools.map((tool) => {
  const result: {
    serverId: string;
    toolName: string;
    description?: string;
    inputSchema?: unknown;
  } = {
    serverId: tool.serverId,
    toolName: tool.name,
  };

  if (tool.description) {
    result.description = tool.description;
  }

  if (tool.inputSchema) {
    result.inputSchema = tool.inputSchema;
  }

  return result;
});

const geminiResponse =
  await selectTool(
    message,
    availableTools
  );

      const cleaned = geminiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    
    const toolCall =
      JSON.parse(cleaned);
    
   const execution =
  await manager.executeTool(
    toolCall.serverId,
    toolCall.toolName,
    toolCall.arguments,
    message
  );

let finalResponse = "";

if (execution.policy.action === "ALLOW") {

  finalResponse =
  String(
    await generateFinalResponse(
      message,
      toolCall.toolName,
      execution.toolResult
    ));
    

}
else {

  finalResponse = String(
  execution.policy.reason ?? ""
);

}

return res.json({

  toolCall,

  policy: execution.policy,

  execution: execution.execution,

  toolResult: execution.toolResult,

  response: finalResponse,

});

    } 
    catch (error) {

      return res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      });
    }
  }
);

router.get(
  "/gemini-test",
  async (_, res) => {
    const result =
      await testGemini();

    res.json({
      response: result,
    });
  }
);




export default router;