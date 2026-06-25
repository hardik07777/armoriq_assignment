"use client";

import { useRouter } from "next/navigation";

export default function ApprovalActions({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function approve() {
    await fetch(
      `http://localhost:5000/api/approvals/${id}/approve`,
      {
        method: "POST",
      }
    );

    router.refresh();
  }

  async function reject() {
    await fetch(
      `http://localhost:5000/api/approvals/${id}/reject`,
      {
        method: "POST",
      }
    );

    router.refresh();
  }

  return (
   <div className="flex gap-3">

  <button
    onClick={approve}
    className="
      flex-1
      rounded-xl
      bg-green-600
      py-3
      font-semibold
      transition
      hover:bg-green-500
    "
  >
    ✓ Approve
  </button>

  <button
    onClick={reject}
    className="
      flex-1
      rounded-xl
      bg-red-600
      py-3
      font-semibold
      transition
      hover:bg-red-500
    "
  >
    ✕ Reject
  </button>

</div>
  );
}