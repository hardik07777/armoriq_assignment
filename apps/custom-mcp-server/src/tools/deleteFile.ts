import fs from "fs/promises";
import path from "path";
import { z } from "zod";

import { SANDBOX_DIR } from "../constants.js";

export const deleteFileSchema = {
  fileName: z.string(),
};

export async function deleteFile(args: {
  fileName: string;
}) {
  const filePath = path.resolve(
    SANDBOX_DIR,
    args.fileName
  );

  if (!filePath.startsWith(SANDBOX_DIR)) {
    throw new Error("Access denied");
  }

  await fs.unlink(filePath);

  return {
    content: [
      {
        type: "text" as const,
        text: `Deleted ${args.fileName}`,
      },
    ],
  };
}