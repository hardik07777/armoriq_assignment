export interface MCPTool {
  name: string;
  description?: string;
  inputSchema?: unknown;
}

export class MCPClient {
  async connect() {
    console.log("Connecting to MCP...");
  }

  async discoverTools(): Promise<MCPTool[]> {
    console.log("Discovering tools...");

    return [];
  }

  async callTool(
    toolName: string,
    args: Record<string, unknown>
  ) {
    console.log(
      `Calling ${toolName}`,
      args
    );

    return null;
  }
}