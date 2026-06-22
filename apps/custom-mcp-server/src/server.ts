import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { listFiles } from "./tools/listFiles.js";
import {
  readFile,
  readFileSchema,
} from "./tools/readFile.js";

const server = new McpServer({
  name: "file-vault",
  version: "1.0.0",
});

server.registerTool(
  "ping",
  {
    description: "Simple health check",
  },
  async () => ({
    content: [
      {
        type: "text",
        text: "pong",
      },
    ],
  })
);





async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("File Vault MCP running...");
}

main().catch(console.error);