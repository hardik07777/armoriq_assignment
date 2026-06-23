import type { MCPServerConfig } from "./types.js";

export const servers: MCPServerConfig[] = [
  {
    id: "file-vault",
    name: "File Vault",
    transport: "stdio",

    command: "npm",
    args: ["run", "dev"],

    cwd: "../custom-mcp-server",
  },
];