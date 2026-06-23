-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "toolName" TEXT,
    "value" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);
