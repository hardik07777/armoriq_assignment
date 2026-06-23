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
}

export class PolicyEngine {
  async evaluate(
  request: ToolRequest
): Promise<PolicyDecision> {

  const blockedPolicy =
    await prisma.policy.findFirst({
      where: {
        enabled: true,
        type: "BLOCK_TOOL",
        toolName: request.toolName,
      },
    });

  if (blockedPolicy) {
    return {
      action: "BLOCK",
      reason: `${request.toolName} is blocked by policy`,
    };
  }

  const approvalPolicy =
    await prisma.policy.findFirst({
      where: {
        enabled: true,
        type: "REQUIRE_APPROVAL",
        toolName: request.toolName,
      },
    });

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