import { Router } from "express";

import {
  PolicyEngine,
} from "../policy/policyEngine.js";

const router = Router();

const policy =
  new PolicyEngine();

router.post(
  "/chat",
  async (req, res) => {

    const result =
      policy.evaluate({
        toolName:
          "delete_file",
        args: {},
      });

    return res.json(result);
  }
);

export default router;