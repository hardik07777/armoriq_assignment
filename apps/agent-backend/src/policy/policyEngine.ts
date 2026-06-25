import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type PolicyDecision =
  | {
      action: "ALLOW";
    }
  | {
      action: "BLOCK";
      reason: string;
    }
  | {
      action: "REQUIRE_APPROVAL";
      reason: string;
    };

export interface ToolRequest {
  toolName: string;
  args: Record<string, unknown>;
  prompt?: string;
}

export class PolicyEngine {
  async evaluate(
    request: ToolRequest
  ): Promise<PolicyDecision> {
    // Fetch all enabled policies once
    const policies = await prisma.policy.findMany({
      where: {
        enabled: true,
      },
    });

    /*
     * ----------------------------------
     * BLOCK TOOL
     * ----------------------------------
     */
    const blockedPolicy = policies.find(
      (p) =>
        p.type === "BLOCK_TOOL" &&
        p.toolName === request.toolName
    );

    if (blockedPolicy) {
      return {
        action: "BLOCK",
        reason: `${request.toolName} is blocked by policy`,
      };
    }

    /*
     * ----------------------------------
     * PATH RESTRICTION
     * ----------------------------------
     */
    const pathPolicy = policies.find(
      (p) =>
        p.type === "PATH_RESTRICTION" &&
        p.toolName === request.toolName
    );

    if (pathPolicy) {
      const fileName = request.args.fileName;

      if (typeof fileName !== "string") {
        return {
          action: "BLOCK",
          reason: "Missing fileName",
        };
      }

      const allowedPrefix = pathPolicy.value ?? "";

      if (!fileName.startsWith(allowedPrefix)) {
        return {
          action: "BLOCK",
          reason: `Path must start with '${allowedPrefix}'`,
        };
      }
    }

    /*
     * ----------------------------------
     * TOKEN LIMIT
     * ----------------------------------
     */
    const tokenPolicy = policies.find(
      (p) => p.type === "TOKEN_LIMIT"
    );

    if (tokenPolicy) {
      const estimatedTokens = Math.ceil(
        (request.prompt ?? "").length / 4
      );

      const limit = Number(tokenPolicy.value);

      if (
        !Number.isNaN(limit) &&
        estimatedTokens >= limit
      ) {
        return {
          action: "BLOCK",
          reason: `Token budget exceeded (${estimatedTokens}/${limit})`,
        };
      }
    }

    /*
     * ----------------------------------
     * REQUIRE APPROVAL
     * ----------------------------------
     */
    const approvalPolicy = policies.find(
      (p) =>
        p.type === "REQUIRE_APPROVAL" &&
        p.toolName === request.toolName
    );

    if (approvalPolicy) {
      return {
        action: "REQUIRE_APPROVAL",
        reason: `${request.toolName} requires approval`,
      };
    }

    return {
      action: "ALLOW",
    };
  }
}