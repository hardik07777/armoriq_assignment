import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function connectToServer(
  command: string,
  args: string[] = [],
  cwd?: string
) {
 const transport = new StdioClientTransport({
  command,
  args,
  ...(cwd ? { cwd } : {}),
});

  const client = new Client({
    name: "armoriq-agent",
    version: "1.0.0",
  });

  await client.connect(transport);

  return client;
}