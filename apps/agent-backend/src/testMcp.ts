import { connectToServer } from "./mcp/stdioClient.js";

async function main() {
  const client = await connectToServer(
    "npm",
    ["run", "dev"],
    "../custom-mcp-server"
  );

  console.log("Connected!");

  const tools = await client.listTools();

  console.log(
    JSON.stringify(tools, null, 2)
  );
}

main().catch(console.error);