import fs from "fs/promises";

import { z } from "zod";
import { SANDBOX_DIR } from "../constants.js";

export const searchFilesSchema = {
  query: z.string(),
};

export async function searchFiles(args: {
  query: string;
}) {
  const files =
    await fs.readdir(SANDBOX_DIR);

  const matches = files.filter((f) =>
    f.includes(args.query)
  );

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(matches),
      },
    ],
  };
}