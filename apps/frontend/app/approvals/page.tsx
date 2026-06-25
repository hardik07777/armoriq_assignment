import ApprovalCard from "../../src/components/ApprovalCard";
import { getApprovals } from "../../src/lib/api";

export default async function ApprovalsPage() {
  const approvals = await getApprovals();

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-5xl font-bold">
          Approval Queue
        </h1>

        <p className="mt-2 text-lg text-zinc-400">
          Review and approve sensitive AI tool executions.
        </p>
      </div>

      {approvals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-16 text-center">
          <h2 className="text-2xl font-semibold">
            🎉 No Pending Approvals
          </h2>

          <p className="mt-3 text-zinc-500">
            Everything is approved and under control.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {approvals.map((approval: any) => (
            <ApprovalCard
              key={approval.id}
              approval={approval}
            />
          ))}
        </div>
      )}
    </div>
  );
}