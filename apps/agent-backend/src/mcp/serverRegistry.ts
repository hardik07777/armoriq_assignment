import type { MCPServerConfig } from "./types.js";

export const servers: MCPServerConfig[] = [
  {
    id: "file-vault",
    name: "File Vault",
    transport: "stdio",

    command: "C:\\Program Files\\nodejs\\npx.cmd",

    args: [
      "tsx",
      "src/server.ts",
    ],

    cwd: "../custom-mcp-server",
  },

  {
    id: "context7",
    name: "Context7",
    transport: "stdio",

    command: "C:\\Program Files\\nodejs\\npx.cmd",

    args: [
      "-y",
      "@upstash/context7-mcp",
    ],
  },
];