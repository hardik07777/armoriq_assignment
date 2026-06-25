import "dotenv/config";
import express from "express";
import cors from "cors";

import chatRouter from "./routes/chat.js";
import mcpRouter from "./routes/mcp.js";
import toolsRouter from "./routes/tools.js";
import approvalsRouter from "./routes/approvals.js";
import policyRoutes from "./routes/policies.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL!,
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", chatRouter);
app.use("/api", toolsRouter);
app.use("/api", mcpRouter);
app.use("/api", approvalsRouter);
app.use("/api/policies", policyRoutes);

console.log(
  "GOOGLE_API_KEY loaded:",
  !!process.env.GOOGLE_API_KEY
);

app.listen(5000, () => {
  console.log("Agent backend running");
});