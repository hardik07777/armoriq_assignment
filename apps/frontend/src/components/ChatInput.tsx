"use client";

interface ChatInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  value,
  loading,
  onChange,
  onSend,
}: ChatInputProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSend();
        }}
        placeholder="Ask ArmorIQ Agent..."
        className="flex-1 bg-transparent outline-none text-white"
      />

      <button
        disabled={loading}
        onClick={onSend}
        className="rounded-xl bg-blue-600 px-5 py-2 hover:bg-blue-500 disabled:opacity-50"
      >
        {loading ? "..." : "Send"}
      </button>

    </div>
  );
}