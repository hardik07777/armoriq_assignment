import {
  Shield,
  CheckCircle2,
  FileClock,
  Server,
} from "lucide-react";

interface Props {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  const config = {
    Policies: {
      icon: Shield,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    "Pending Approvals": {
      icon: CheckCircle2,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    "Audit Events": {
      icon: FileClock,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    "MCP Servers": {
      icon: Server,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  } as const;

  const item =
    config[title as keyof typeof config];

  const Icon = item.icon;

  return (
    <div
      className="
      rounded-2xl
      border
      border-zinc-800
      bg-zinc-900
      p-6
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-blue-500
      hover:shadow-blue-500/10
    "
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-400">
          {title}
        </p>

        <div
          className={`rounded-xl p-3 ${item.bg}`}
        >
          <Icon
            className={item.color}
            size={22}
          />
        </div>
      </div>

      <h2 className="mt-6 text-5xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Live system data
      </p>
    </div>
  );
}