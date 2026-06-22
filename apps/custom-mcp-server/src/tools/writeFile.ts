import fs from "fs/promises";
import path from "path";
import { z } from "zod";

import { SANDBOX_DIR } from "../constants.js";

export const writeFileSchema = {
  fileName: z.string().min(1),
  content: z.string(),
};

export async function writeFile(args: {
  fileName: string;
  content: string;
}) {
  const filePath = path.resolve(
    SANDBOX_DIR,
    args.fileName
  );

  if (!filePath.startsWith(SANDBOX_DIR)) {
    throw new Error("Access denied");
  }

  await fs.writeFile(
    filePath,
    args.content,
    "utf8"
  );

  return {
    content: [
      {
        type: "text" as const,
        text: `Wrote ${args.fileName}`,
      },
    ],
  };
}