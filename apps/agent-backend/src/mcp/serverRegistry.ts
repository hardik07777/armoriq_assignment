import type { MCPServerConfig } from "./types.js";

export const servers: MCPServerConfig[] = [
  {
    id: "file-vault",
    name: "File Vault",
    transport: "stdio",

    command: process.platform === "win32"
      ? "npx.cmd"
      : "npx",

    args: [
      "tsx",
      "src/server.ts",
    ],

    cwd: "../custom-mcp-server",
  },
];