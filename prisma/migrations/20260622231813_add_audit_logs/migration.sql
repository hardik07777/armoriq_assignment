-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "allowed" BOOLEAN NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);
