import express from "express";

import chatRouter from "./routes/chat.js";
import mcpRouter from "./routes/mcp.js";

import toolsRouter from "./routes/tools.js";
import approvalsRouter from "./routes/approvals.js";



const app = express();

app.use(express.json());

app.use("/api", chatRouter);
app.use("/api", toolsRouter);
app.use("/api", mcpRouter);
app.use("/api", approvalsRouter);

app.listen(5000, () => {
  console.log(
    "Agent backend running"
  );
});