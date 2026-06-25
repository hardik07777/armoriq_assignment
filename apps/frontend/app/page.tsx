import StatCard from "../src/components/StatCard";
import {
  getApprovals,
  getAuditLogs,
  getMcpTools,
  getPolicies,
} from "../src/lib/api";

export default async function HomePage() {
  const approvals = await getApprovals();
  const logs = await getAuditLogs();
  const policies = await getPolicies();

  const tools = await getMcpTools();

  const serverCount = new Set(
    tools.map((tool: any) => tool.serverId)
  ).size;

  const recentLogs = logs.slice(0, 5);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-bold tracking-tight">
          ArmorIQ Dashboard
        </h1>

        <p className="mt-2 text-lg text-zinc-400">
          AI Governance & MCP Control Center
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending Approvals"
          value={approvals.length}
        />

        <StatCard
          title="Audit Events"
          value={logs.length}
        />

        <StatCard
          title="Policies"
          value={policies.length}
        />

        <StatCard
          title="MCP Servers"
          value={serverCount}
        />
      </div>

      {/* Dashboard Panels */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Recent Activity */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Recent Activity
            </h2>

            <span className="text-sm text-zinc-500">
              Latest Events
            </span>
          </div>

          <div className="space-y-4">
            {recentLogs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-700 p-10 text-center">
                <p className="text-zinc-500">
                  No audit events yet.
                </p>
              </div>
            ) : (
              recentLogs.map((log: any) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-xl bg-zinc-800/40 p-4"
                >
                  <div>
                    <p className="font-medium text-white">
                      {log.toolName}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {log.serverId}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      log.allowed
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {log.allowed ? "Allowed" : "Blocked"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              System Status
            </h2>

            <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
              Healthy
            </span>
          </div>

          <div className="space-y-5">

            <StatusRow
              name="Gemini Agent"
              status="Online"
            />

            <StatusRow
              name="Policy Engine"
              status="Active"
            />

            <StatusRow
              name="Approval Service"
              status="Running"
            />

            <StatusRow
              name="Audit Service"
              status="Running"
            />

            <StatusRow
              name="Configured Policies"
              status={`${policies.length} Loaded`}
            />

            <StatusRow
              name="Pending Approvals"
              status={`${approvals.length} Pending`}
            />

          </div>
        </div>

      </div>
    </div>
  );
}

function StatusRow({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-none last:pb-0">
      <span className="text-zinc-300">
        {name}
      </span>

      <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
        {status}
      </span>
    </div>
  );
}