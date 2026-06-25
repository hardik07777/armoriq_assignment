import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_, res) => {
  const policies = await prisma.policy.findMany();

  res.json(policies);
});

router.post("/", async (req, res) => {
  try {
    const {
      type,
      toolName,
      value,
      enabled,
    } = req.body;

    const policy =
      await prisma.policy.create({
        data: {
          type,
          toolName,
          value,
          enabled,
        },
      });

    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create policy",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { enabled } = req.body;

  const policy =
    await prisma.policy.update({
      where: {
        id: req.params.id,
      },
      data: {
        enabled,
      },
    });

  res.json(policy);
});

router.delete("/:id", async (req, res) => {
  await prisma.policy.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    success: true,
  });
});

export default router;