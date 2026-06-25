import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function connectToServer(
  command: string,
  args: string[] = [],
  cwd?: string
) {
  const resolvedCwd = cwd
    ? path.resolve(process.cwd(), cwd)
    : undefined;

  console.log("Connecting to MCP");
  console.log({
    command,
    args,
    cwd: resolvedCwd,
  });

  const transport = new StdioClientTransport({
    command,
    args,

    ...(resolvedCwd
      ? {
          cwd: resolvedCwd,
        }
      : {}),

    env: {
      ...(process.env as Record<string, string>),

      PATH: [
        "C:\\Program Files\\nodejs",
        process.env.PATH,
      ].join(";"),
    },
  });

  const client = new Client({
    name: "armoriq-agent",
    version: "1.0.0",
  });

  await client.connect(transport);

  return client;
}