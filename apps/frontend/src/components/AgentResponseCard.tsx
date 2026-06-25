interface Props {
  data: any;
}

export default function AgentResponseCard({
  data,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-5 text-xl font-bold">
        🤖 ArmorIQ Agent
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-zinc-400 text-sm">
            Selected Tool
          </p>

          <p className="font-semibold">
            {data.toolCall?.toolName}
          </p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            MCP Server
          </p>

          <p>{data.toolCall?.serverId}</p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            Policy Decision
          </p>

          <span className="rounded bg-green-700 px-2 py-1">
            {data.policy?.action}
          </span>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            Execution
          </p>

          <p>
            {data.execution?.status}
          </p>

          <p className="text-xs text-zinc-500">
            {data.execution?.duration}
          </p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            Final Response
          </p>

          <div className="rounded-xl bg-zinc-950 p-4">
            {data.response}
          </div>
        </div>

      </div>

    </div>
  );
}