import { getMcpTools } from "../../src/lib/api";
import MCPServerCard from "../../src/components/MCPServerCard";

export default async function MCPToolsPage() {
  const tools = await getMcpTools();

  const grouped = tools.reduce(
    (acc: any, tool: any) => {
      if (!acc[tool.serverId]) {
        acc[tool.serverId] = [];
      }

      acc[tool.serverId].push(tool);

      return acc;
    },
    {}
  );

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-5xl font-bold">
          MCP Servers
        </h1>

        <p className="mt-2 text-lg text-zinc-400">
          Runtime discovery of connected Model Context Protocol servers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {Object.entries(grouped).map(
          ([serverId, serverTools]: any) => (
            <MCPServerCard
              key={serverId}
              serverId={serverId}
              tools={serverTools}
            />
          )
        )}

      </div>

    </div>
  );
}