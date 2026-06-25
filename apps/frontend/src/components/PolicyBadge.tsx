export default function PolicyBadge({
  type,
}: {
  type: string;
}) {
  const styles: Record<string, string> = {
    BLOCK_TOOL:
      "bg-red-500/15 text-red-400 border-red-500/30",

    REQUIRE_APPROVAL:
      "bg-amber-500/15 text-amber-400 border-amber-500/30",

    PATH_RESTRICTION:
      "bg-blue-500/15 text-blue-400 border-blue-500/30",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[type] ??
        "bg-zinc-700 text-white"
      }`}
    >
      {type.replaceAll("_", " ")}
    </span>
  );
}