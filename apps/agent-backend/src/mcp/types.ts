export interface MCPServerConfig {
  id: string;
  name: string;
  transport: "stdio" | "sse";
  command?: string;
  args?: string[];
  url?: string;
}

export interface MCPTool {
  serverId: string;
  name: string;
  description?: string;
  inputSchema?: unknown;
}
export interface MCPServerConfig {
  id: string;
  name: string;
  transport: "stdio" | "sse";

  command?: string;
  args?: string[];
  url?: string;

  cwd?: string;
}