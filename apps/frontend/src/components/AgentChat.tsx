"use client";

import { useState } from "react";

import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import AgentResponseCard from "./AgentResponseCard";

const API =
process.env.NEXT_PUBLIC_API_URL!;

interface ChatMessage {
  type: "user" | "assistant";
  data: any;
}

export default function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        data: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          data,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          data: {
            response: "Something went wrong.",
            policy: {
              action: "ERROR",
            },
          },
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-4">

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

        <div className="h-full overflow-y-auto p-4 md:p-6">

          {messages.length === 0 ? (

            <div className="flex h-full items-center justify-center">

              <div className="max-w-xl text-center">

                <div className="mb-6 text-6xl">
                  🤖
                </div>

                <h2 className="text-2xl md:text-3xl font-bold">
                  ArmorIQ AI Agent
                </h2>

                <p className="mt-4 text-sm md:text-base text-zinc-400 leading-7">
                  Ask me anything. I'll discover MCP tools,
                  evaluate security policies, execute only
                  permitted tools, and explain every decision.
                </p>

              </div>

            </div>

          ) : (

            <div className="space-y-5">

              {messages.map((message, index) => (

                <div key={index}>

                  {message.type === "user" ? (

                    <ChatBubble
                      message={message.data}
                    />

                  ) : (

                    <AgentResponseCard
                      data={message.data}
                    />

                  )}

                </div>

              ))}

              {loading && <TypingIndicator />}

            </div>

          )}

        </div>

      </div>

      {/* Input */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 md:p-4">

        <ChatInput
          value={input}
          loading={loading}
          onChange={setInput}
          onSend={sendMessage}
        />

      </div>

    </div>
  );
}