const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL!;

export async function getApprovals() {
  const res = await fetch(`${API_BASE_URL}/api/approvals`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch approvals");

  return res.json();
}

export async function approveRequest(id: string) {
  const res = await fetch(
    `${API_BASE_URL}/api/approvals/${id}/approve`,
    {
      method: "POST",
    }
  );

  return res.json();
}

export async function rejectRequest(id: string) {
  const res = await fetch(
    `${API_BASE_URL}/api/approvals/${id}/reject`,
    {
      method: "POST",
    }
  );

  return res.json();
}

export async function getAuditLogs() {
  const res = await fetch(
    `${API_BASE_URL}/api/audit-logs`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch audit logs");

  return res.json();
}

export async function getPolicies() {
  const res = await fetch(
    `${API_BASE_URL}/api/policies`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch policies");

  return res.json();
}

export async function getMcpTools() {
  const res = await fetch(
    `${API_BASE_URL}/api/mcp/tools`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch MCP tools");

  return res.json();
}