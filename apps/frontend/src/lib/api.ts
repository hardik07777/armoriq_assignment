const API_BASE_URL = "http://localhost:5000/api";

export async function getApprovals() {
  const res = await fetch(`${API_BASE_URL}/approvals`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch approvals");
  }

  return res.json();
}

export async function approveRequest(id: string) {
  const res = await fetch(
    `${API_BASE_URL}/approvals/${id}/approve`,
    {
      method: "POST",
    }
  );

  return res.json();
}

export async function rejectRequest(id: string) {
  const res = await fetch(
    `${API_BASE_URL}/approvals/${id}/reject`,
    {
      method: "POST",
    }
  );

  return res.json();
}
export async function getAuditLogs() {
  const res = await fetch(
    "http://localhost:5000/api/audit-logs",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch audit logs");
  }

  return res.json();
}

export async function getPolicies() {
  const res = await fetch(
    "http://localhost:5000/api/policies",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export async function getMcpTools() {
  const res = await fetch(
    "http://localhost:5000/api/mcp/tools",
    {
      cache: "no-store",
    }
  );

  return res.json();
}
