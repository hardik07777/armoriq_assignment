import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { listFiles } from "./tools/listFiles.js";
import {
  readFile,
  readFileSchema,
} from "./tools/readFile.js";
import {
  writeFile,
  writeFileSchema,
} from "./tools/writeFile.js";

import {
  deleteFile,
  deleteFileSchema,
} from "./tools/deleteFile.js";

import {
  searchFiles,
  searchFilesSchema,
} from "./tools/searchFiles.js";

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
server.registerTool(
  "write_file",
  {
    description: "Write file",
    inputSchema: writeFileSchema,
  },
  writeFile
);

server.registerTool(
  "delete_file",
  {
    description: "Delete file",
    inputSchema: deleteFileSchema,
  },
  deleteFile
);

server.registerTool(
  "search_files",
  {
    description: "Search files",
    inputSchema: searchFilesSchema,
  },
  searchFiles
);





async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("File Vault MCP running...");
}

main().catch(console.error);