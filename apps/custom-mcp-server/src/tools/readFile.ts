import fs from "fs/promises";
import path from "path";

import { z } from "zod";
import { SANDBOX_DIR } from "../constants.js";

export const readFileSchema = {
  fileName: z.string().min(1),
};

export async function readFile(
  args: { fileName: string }
) {
  const { fileName } = args;
  const filePath = path.resolve(
  SANDBOX_DIR,
  fileName
);

if (!filePath.startsWith(SANDBOX_DIR)) {
  throw new Error("Access denied");
}

  const content =
    await fs.readFile(
      filePath,
      "utf8"
    );

  return {
    content: [
      {
        type: "text" as const,
        text: content,
      },
    ],
  };
}