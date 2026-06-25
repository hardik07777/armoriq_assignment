export default function AuditStatusBadge({
  allowed,
}: {
  allowed: boolean;
}) {
  return allowed ? (
    <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-semibold text-green-400">
      ● Allowed
    </span>
  ) : (
    <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-semibold text-red-400">
      ● Blocked
    </span>
  );
}