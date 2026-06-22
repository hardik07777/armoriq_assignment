import fs from "fs/promises";
import { SANDBOX_DIR } from "../constants.js";

export async function listFiles() {
  const files = await fs.readdir(SANDBOX_DIR);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(files, null, 2),
      },
    ],
  };
}