import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export async function testGemini() {
  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello in one sentence.",
    });

  return response.text;
}


export async function selectTool(
  prompt: string,
  availableTools: {
    serverId: string;
    toolName: string;
    description?: string;
    inputSchema?: unknown;
  }[]
) {
  const toolList = availableTools
    .map(
      (tool) => `
Server: ${tool.serverId}

Tool: ${tool.toolName}

Description:
${tool.description ?? "No description"}

Input Schema:
${JSON.stringify(tool.inputSchema, null, 2)}
`
    )
    .join("\n--------------------------------\n");

  const systemPrompt = `
You are an intelligent MCP Agent.

Your ONLY job is to select the best MCP tool for the user's request.

Available tools:

${toolList}

User Request:
"${prompt}"

Decision Rules:

1. If the user is asking about programming, frameworks, libraries, APIs,
documentation, React, Node.js, Express, TypeScript, Python, etc.
→ ALWAYS use Context7.

2. If the user is asking about files, folders, reading, writing, deleting,
listing or searching files
→ ALWAYS use File Vault.

3. Never call ping unless the user explicitly asks to check server health.

4. Choose exactly ONE tool.

5. Return ONLY valid JSON.

Format:

{
  "serverId": "...",
  "toolName": "...",
  "arguments": {}
}

Arguments MUST exactly match the tool schema.
Never invent argument names.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt,
  });

  return response.text ?? "";
}

export async function generateFinalResponse(
  userMessage: string,
  toolName: string,
  toolResult: unknown
) {

const prompt = `
You are summarizing the result of an MCP tool execution.

User request:
${userMessage}

Tool executed:
${toolName}

Tool result:
${JSON.stringify(toolResult, null, 2)}

Rules:

- Do NOT invent actions.
- Do NOT assume another tool should have been used.
- If the tool failed, explain the error.
- If the tool succeeded, summarize the output.

Respond naturally.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return response.text;
}