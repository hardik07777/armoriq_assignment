import PolicyToggle from "./PolicyToggle";
import DeletePolicy from "./DeletePolicy";

export default function PolicyCard({
  policy,
}: {
  policy: any;
}) {

const badgeColors: Record<string, string> = {
  BLOCK_TOOL:
    "bg-red-500/15 text-red-400",

  REQUIRE_APPROVAL:
    "bg-yellow-500/15 text-yellow-400",

  PATH_RESTRICTION:
    "bg-blue-500/15 text-blue-400",
};

const badgeColor =
  badgeColors[policy.type] ??
  "bg-zinc-700 text-white";

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
      hover:border-blue-500
      hover:-translate-y-1
    "
    >

      <div className="flex justify-between items-center">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {policy.type.replaceAll("_", " ")}
        </span>

        {policy.enabled ? (
          <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm text-green-400">
            ● Enabled
          </span>
        ) : (
          <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm text-red-400">
            ● Disabled
          </span>
        )}

      </div>

      <div className="mt-6 space-y-4">

        <div>
          <p className="text-sm text-zinc-500">
            Tool
          </p>

          <p className="font-semibold text-lg">
            {policy.toolName ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">
            Value
          </p>

          <p>
            {policy.value ?? "-"}
          </p>
        </div>

      </div>

      <div className="mt-8 flex gap-3">

        <PolicyToggle
          id={policy.id}
          enabled={policy.enabled}
        />

        <DeletePolicy
          id={policy.id}
        />

      </div>

    </div>
  );
}