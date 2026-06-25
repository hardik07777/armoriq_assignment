"use client";

import { useRouter } from "next/navigation";

export default function PolicyToggle({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) {
  const router = useRouter();

  async function toggle() {
    await fetch(
      `http://localhost:5000/api/policies/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enabled: !enabled,
        }),
      }
    );

    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      className={`rounded px-3 py-1 text-white ${
        enabled
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {enabled ? "Enabled" : "Disabled"}
    </button>
  );
}