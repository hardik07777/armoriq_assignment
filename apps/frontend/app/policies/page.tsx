import CreatePolicyForm from "../../src/components/CreatePolicyForm";
import PolicyCard from "../../src/components/PolicyCard";

const API =
  process.env.NEXT_PUBLIC_API_URL!;

async function getPolicies() {
  const res = await fetch(
    `${API}/api/policies`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch policies");
  }

  return res.json();
}

export default async function PoliciesPage() {
  const policies = await getPolicies();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-5xl font-bold">
          Policy Engine
        </h1>

        <p className="mt-2 text-zinc-400 text-lg">
          Manage AI guardrails, approvals and runtime security policies.
        </p>
      </div>

      {/* Create Policy */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Create New Policy
        </h2>

        <CreatePolicyForm />
      </div>

      {/* Existing Policies */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold">
          Active Policies
        </h2>

        {policies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-16 text-center">
            <h3 className="text-xl font-semibold">
              No Policies Found
            </h3>

            <p className="mt-2 text-zinc-500">
              Create your first policy to start protecting your AI agent.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {policies.map((policy: any) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
