import { servers } from "./serverRegistry.js";
import { connectToServer } from "./stdioClient.js";
import type { MCPTool } from "./types.js";
import { PolicyEngine } from "../policy/policyEngine.js";
import { AuditService } from "../audit/auditService.js";
import { ApprovalService } from "../approval/approvalService.js";
import { Prisma } from "@prisma/client";
export class MCPManager {

  private async getClient(serverId: string) {
    const server = servers.find(
      (s) => s.id === serverId
    );

    if (!server) {
      throw new Error(
        `Server ${serverId} not found`
      );
    }

    return connectToServer(
      server.command!,
      server.args ?? [],
      server.cwd
    );
  }


async executeToolDirect(
  serverId: string,
  toolName: string,
  args: Record<string, unknown>
) {
  const client = await this.getClient(serverId);

  return client.callTool({
    name: toolName,
    arguments: args,
  });
}
async executeTool(
  serverId: string,
  toolName: string,
  args: Record<string, unknown>
) {
  const policyEngine = new PolicyEngine();
  const auditService = new AuditService();
  const approvalService = new ApprovalService();

  const decision = await policyEngine.evaluate({
    toolName,
    args,
  });

  if (decision.action === "BLOCK") {
    await auditService.log({
      toolName,
      serverId,
      allowed: false,
      reason: decision.reason,
    });

    throw new Error(decision.reason);
  }

  if (decision.action === "REQUIRE_APPROVAL") {
    await approvalService.createRequest({
      toolName,
      serverId,
      arguments:
        args as Prisma.InputJsonValue,    });

    await auditService.log({
      toolName,
      serverId,
      allowed: false,
      reason: decision.reason,
    });

    return {
      message: "Approval required",
      reason: decision.reason,
    };
  }

  // ALLOW
  await auditService.log({
    toolName,
    serverId,
    allowed: true,
  });

 return this.executeToolDirect(
  serverId,
  toolName,
  args
);
}
  async discoverTools(): Promise<MCPTool[]> {
    const discovered: MCPTool[] = [];

    for (const server of servers) {
      try {
        const client = await connectToServer(
          server.command!,
          server.args ?? [],
          server.cwd
        );

        const result = await client.listTools();

        for (const tool of result.tools) {
          const discoveredTool: MCPTool = {
            serverId: server.id,
            name: tool.name,
          };

          if (tool.description) {
            discoveredTool.description = tool.description;
          }

          if (tool.inputSchema) {
            discoveredTool.inputSchema = tool.inputSchema;
          }

          discovered.push(discoveredTool);
        }
      } catch (error) {
        console.error(
          `Failed to discover tools from ${server.id}`,
          error
        );
      }
    }

    return discovered;
  }
 
}
