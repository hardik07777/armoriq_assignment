import type { MCPServerConfig } from "./types.js";

export const servers: MCPServerConfig[] = [
  {
    id: "file-vault",
    name: "File Vault",
    transport: "stdio",

    command: "npx",

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

    command: "npx",

    args: [
      "-y",
      "@upstash/context7-mcp",
    ],
  },
];
