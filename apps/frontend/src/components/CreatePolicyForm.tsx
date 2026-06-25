"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldPlus } from "lucide-react";

const API = "http://localhost:5000/api";

export default function CreatePolicyForm() {
  const router = useRouter();

  const [type, setType] = useState("BLOCK_TOOL");
  const [toolName, setToolName] = useState("");
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  async function createPolicy(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    await fetch(`${API}/policies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        toolName: toolName || null,
        value: value || null,
        enabled,
      }),
    });

    setLoading(false);

    router.refresh();

    setToolName("");
    setValue("");
  }

  return (
    <form
      onSubmit={createPolicy}
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Policy Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-950
              p-3
              outline-none
              transition
              focus:border-blue-500
            "
          >
            <option>BLOCK_TOOL</option>
            <option>REQUIRE_APPROVAL</option>
            <option>PATH_RESTRICTION</option>
            <option>TOKEN_LIMIT</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Tool Name
          </label>

          <input
            placeholder="write_file"
            value={toolName}
            onChange={(e) =>
              setToolName(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-950
              p-3
              outline-none
              transition
              focus:border-blue-500
            "
          />
        </div>

      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-400">
          Value
        </label>

        <input
          placeholder="docs/"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-950
            p-3
            outline-none
            transition
            focus:border-blue-500
          "
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4">

        <div>
          <p className="font-medium">
            Enable Policy
          </p>

          <p className="text-sm text-zinc-500">
            Activate immediately after creation.
          </p>
        </div>

        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) =>
            setEnabled(e.target.checked)
          }
          className="h-5 w-5 accent-blue-600"
        />
      </div>

      <button
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          py-3
          font-semibold
          text-white
          transition-all
          hover:bg-blue-500
          hover:shadow-lg
          hover:shadow-blue-500/20
          disabled:opacity-50
        "
      >
        <ShieldPlus size={18} />

        {loading
          ? "Creating..."
          : "Create Policy"}
      </button>
    </form>
  );
}