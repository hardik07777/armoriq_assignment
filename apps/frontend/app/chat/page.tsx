import AgentChat from "../../src/components/AgentChat";

export default function ChatPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          AI Agent
        </h1>

        <p className="mt-2 text-zinc-500">
          Interact with the ArmorIQ Guarded AI Agent
        </p>

      </div>

      <AgentChat />

    </div>
  );
}