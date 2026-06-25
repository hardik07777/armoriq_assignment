import {
  Server,
  Wrench,
} from "lucide-react";

export default function MCPServerCard({
  serverId,
  tools,
}: {
  serverId: string;
  tools: any[];
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900
      p-6
      transition
      hover:border-blue-500
      hover:-translate-y-1
    "
    >
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <Server
            className="text-blue-400"
            size={26}
          />

          <div>

            <h2 className="text-2xl font-bold">
              {serverId}
            </h2>

            <p className="text-zinc-500">
              {tools.length} tools discovered
            </p>

          </div>

        </div>

        <span className="rounded-full bg-green-500/15 px-3 py-1 text-green-400 text-sm">
          ● Connected
        </span>

      </div>

      <div className="mt-6 space-y-3">

        {tools.map((tool) => (

          <div
            key={tool.name}
            className="
            flex
            justify-between
            rounded-xl
            bg-zinc-800/40
            p-3
            "
          >

            <div>

              <div className="flex items-center gap-2">

                <Wrench
                  size={16}
                  className="text-blue-400"
                />

                <span className="font-medium">
                  {tool.name}
                </span>

              </div>

              <p className="mt-1 text-sm text-zinc-500">
                {tool.description ??
                  "No description"}
              </p>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}