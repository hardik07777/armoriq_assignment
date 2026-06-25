"use client";

import { useRouter } from "next/navigation";

export default function DeletePolicy({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function remove() {
    if (!confirm("Delete policy?")) return;

    await fetch(
      `http://localhost:5000/api/policies/${id}`,
      {
        method: "DELETE",
      }
    );

    router.refresh();
  }

  return (
    <button
      onClick={remove}
      className="rounded bg-red-600 px-3 py-1 text-white"
    >
      Delete
    </button>
  );
}