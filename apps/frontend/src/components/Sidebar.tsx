"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shield,
  CheckCircle,
  FileClock,
  Server,
  Bot,
} from "lucide-react";

const links = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/policies",
    label: "Policies",
    icon: Shield,
  },
  {
    href: "/approvals",
    label: "Approvals",
    icon: CheckCircle,
  },
  {
    href: "/audit",
    label: "Audit Logs",
    icon: FileClock,
  },
  {
  name: "AI Agent",
  href: "/chat",
  icon: Bot,
},
  {
    href: "/mcp-tools",
    label: "MCP Servers",
    icon: Server,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-800 flex flex-col">
      <div className="p-8 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-white">
          ArmorIQ
        </h1>

        <p className="text-zinc-400 text-sm mt-2">
          Guarded AI Platform
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-zinc-800">
        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">
            Agent Status
          </p>

          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

            <span className="text-white">
              Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}