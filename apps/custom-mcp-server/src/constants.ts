import path from "path";

console.log("CWD =", process.cwd());

export const SANDBOX_DIR = path.join(
  process.cwd(),
  "sandbox"
);

console.log("SANDBOX =", SANDBOX_DIR);