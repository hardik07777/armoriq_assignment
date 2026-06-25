import ApprovalActions from "./ApprovalActions";

type Approval = {
  id: string;
  toolName: string;
  serverId: string;
  status: string;
  arguments: Record<string, unknown>;
  createdAt: string;
};

export default function ApprovalCard({
  approval,
}: {
  approval: Approval;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500
      "
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">
          ● {approval.status}
        </span>

        <span className="text-sm text-zinc-500">
          {new Date(approval.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm text-zinc-500">
            Tool
          </p>

          <p className="text-xl font-semibold">
            {approval.toolName}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Server
          </p>

          <p>{approval.serverId}</p>
        </div>

        <div>
          <p className="mb-2 text-sm text-zinc-500">
            Arguments
          </p>

          <pre className="overflow-x-auto rounded-xl bg-black/30 p-3 text-sm text-zinc-300">
{JSON.stringify(approval.arguments, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-6">
        <ApprovalActions id={approval.id} />
      </div>
    </div>
  );
}