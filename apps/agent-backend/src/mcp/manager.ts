import { Prisma } from "@prisma/client";

import { servers } from "./serverRegistry.js";
import { connectToServer } from "./stdioClient.js";
import type { MCPTool } from "./types.js";

import { PolicyEngine } from "../policy/policyEngine.js";
import { AuditService } from "../audit/auditService.js";
import { ApprovalService } from "../approval/approvalService.js";

export interface ExecuteToolResult {
  policy: {
    action: "ALLOW" | "BLOCK" | "REQUIRE_APPROVAL";
    reason?: string;
  };

  toolResult?: unknown;

  execution: {
    status: "SUCCESS" | "BLOCKED" | "WAITING_APPROVAL";
    duration: string;
  };
}

export class MCPManager {
  private clients = new Map<
    string,
    Awaited<ReturnType<typeof connectToServer>>
  >();
  private discoveredTools: MCPTool[] | null = null;


  private policyEngine = new PolicyEngine();

  private auditService = new AuditService();

  private approvalService = new ApprovalService();

  private async getClient(serverId: string) {
    const existing = this.clients.get(serverId);

    if (existing) {
      return existing;
    }

    const server = servers.find(
      (s) => s.id === serverId
    );

    if (!server) {
      throw new Error(
        `Server ${serverId} not found`
      );
    }

    const client = await connectToServer(
      server.command!,
      server.args ?? [],
      server.cwd
    );

    this.clients.set(serverId, client);

    return client;
  }
  async executeToolDirect(
    serverId: string,
    toolName: string,
    args: Record<string, unknown>
  ) {
    const client =
      await this.getClient(serverId);

    return client.callTool({
      name: toolName,
      arguments: args,
    });
  }

  async executeTool(
    serverId: string,
    toolName: string,
    args: Record<string, unknown>,
    prompt?: string
  ): Promise<ExecuteToolResult> {

    const start = Date.now();

  
const request = {
  toolName,
  args,
  ...(prompt ? { prompt } : {}),
};

const decision =
  await this.policyEngine.evaluate(request);
    // BLOCK

    if (decision.action === "BLOCK") {

await this.auditService.log({
          toolName,
        serverId,
        allowed: false,
        reason: decision.reason,
      });

      return {

        policy: {
          action: "BLOCK",
          reason: decision.reason,
        },

        execution: {
          status: "BLOCKED",
          duration: `${Date.now() - start} ms`,
        },

      };
    }

    // REQUIRE APPROVAL

    if (
      decision.action ===
      "REQUIRE_APPROVAL"
    ) {

await this.approvalService.createRequest({
        toolName,
        serverId,
        arguments:
          args as Prisma.InputJsonValue,
      });

      await this.auditService.log({
        toolName,
        serverId,
        allowed: false,
        reason: decision.reason,
      });

      return {

        policy: {
          action: "REQUIRE_APPROVAL",
          reason: decision.reason,
        },

        execution: {
          status: "WAITING_APPROVAL",
          duration: `${Date.now() - start} ms`,
        },

      };
    }

    // ALLOW

    await this.auditService.log({
      toolName,
      serverId,
      allowed: true,
    });

    const toolResult =
      await this.executeToolDirect(
        serverId,
        toolName,
        args
      );

    return {

      policy: {
        action: "ALLOW",
      },

      toolResult,

      execution: {
        status: "SUCCESS",
        duration: `${Date.now() - start} ms`,
      },

    };
  }

  async discoverTools(): Promise<MCPTool[]> {
    if (this.discoveredTools) {
  return this.discoveredTools;
}

    const discovered: MCPTool[] = [];

    for (const server of servers) {

      try {

        console.log(
          "\n=========================="
        );

        console.log(
          "Connecting to server:",
          server.id
        );

        console.log(
          "Command:",
          server.command
        );

        console.log(
          "Args:",
          server.args
        );

        console.log(
          "CWD:",
          server.cwd
        );

        const client =
  await this.getClient(server.id);

        console.log(
          "✅ Connected to",
          server.id
        );

        const result =
          await client.listTools();

        console.log(
          "Tools:",
          result.tools
        );

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
          `Failed to discover tools from ${server.id}`
        );

        console.error(error);

      }

    }
    this.discoveredTools = discovered;


    return discovered;
  }
}