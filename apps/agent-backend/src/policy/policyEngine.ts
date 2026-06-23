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
  const pathPolicy =
  await prisma.policy.findFirst({
    where: {
      enabled: true,
      type: "PATH_RESTRICTION",
      toolName: request.toolName,
    },
  });

if (pathPolicy) {
  const fileName =
    request.args.fileName;

  if (typeof fileName !== "string") {
    return {
      action: "BLOCK",
      reason: "Missing fileName",
    };
  }

  const allowedPrefix =
    pathPolicy.value ?? "";

  if (
    !fileName.startsWith(
      allowedPrefix
    )
  ) {
    return {
      action: "BLOCK",
      reason:
        "Path restriction violation",
    };
  }
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