export default function StatusBadge({
  enabled,
}: {
  enabled: boolean;
}) {
  return enabled ? (
    <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
      ● Enabled
    </span>
  ) : (
    <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-400">
      ● Disabled
    </span>
  );
}