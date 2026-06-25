import { getAuditLogs } from "../../src/lib/api";
import AuditStatusBadge from "../../src/components/AuditStatusBadge";

export default async function AuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-5xl font-bold">
          Audit Logs
        </h1>

        <p className="mt-2 text-lg text-zinc-400">
          Review every AI tool invocation and policy decision.
        </p>
      </div>

      {logs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-16 text-center">
          <h2 className="text-2xl font-semibold">
            No Audit Events
          </h2>

          <p className="mt-3 text-zinc-500">
            Tool executions will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

          <table className="w-full">

            <thead className="bg-zinc-950">

              <tr className="border-b border-zinc-800">

                <th className="p-5 text-left">
                  Tool
                </th>

                <th className="p-5 text-left">
                  Server
                </th>

                <th className="p-5 text-left">
                  Status
                </th>

                <th className="p-5 text-left">
                  Reason
                </th>

                <th className="p-5 text-left">
                  Time
                </th>

              </tr>

            </thead>

            <tbody>

              {logs.map((log: any) => (

                <tr
                  key={log.id}
                  className="border-b border-zinc-800 transition hover:bg-zinc-800/50"
                >

                  <td className="p-5 font-medium">
                    {log.toolName}
                  </td>

                  <td className="p-5 text-zinc-400">
                    {log.serverId}
                  </td>

                  <td className="p-5">
                    <AuditStatusBadge
                      allowed={log.allowed}
                    />
                  </td>

                  <td className="p-5 max-w-xs truncate text-zinc-400">
                    {log.reason ?? "-"}
                  </td>

                  <td className="p-5 text-sm text-zinc-500">
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}