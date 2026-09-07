-- schema.prisma had drifted from migration history: several models were added
-- (or had columns added) directly to schema.prisma without a corresponding
-- migration ever being generated/committed. This left `prisma migrate deploy`
-- unable to build a working database from scratch (missing tables caused
-- runtime errors such as "The table `public.IndexedEvent` does not exist").
--
-- Generated from `prisma migrate diff --from-url <live db> --to-schema-datamodel
-- prisma/schema.prisma --script`, with the DropIndex statements removed: those
-- were flagging indexes that migration 20260529000002_add_missing_indexes
-- created directly via raw SQL without matching `@@index` annotations in
-- schema.prisma. That's a docs/schema mismatch, not a bug — dropping them
-- would remove working performance indexes, so they're left in place.

-- AlterTable
ALTER TABLE "ChainEventOutbox" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "EscrowReleaseMilestone" ADD COLUMN     "conditionHash" VARCHAR(255),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "NotificationPreference" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
-- NOTE: if this is ever applied to a database with existing RefreshToken rows,
-- this NOT NULL column-add (no default) will fail until those rows are backfilled.
ALTER TABLE "RefreshToken" ADD COLUMN     "jti" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "IndexedEvent" (
    "id" SERIAL NOT NULL,
    "eventId" VARCHAR(255) NOT NULL,
    "tradeId" VARCHAR(255),
    "eventType" VARCHAR(100) NOT NULL,
    "ledgerSequence" INTEGER NOT NULL,
    "contractId" VARCHAR(255) NOT NULL,
    "txHash" VARCHAR(255),
    "payload" JSONB NOT NULL,
    "ingestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IndexedEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWallet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletAddress" VARCHAR(255) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Webhook" (
    "id" SERIAL NOT NULL,
    "userAddress" VARCHAR(255) NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "description" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookDeliveryAttempt" (
    "id" SERIAL NOT NULL,
    "webhookId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(50) NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "responseBody" TEXT,

    CONSTRAINT "WebhookDeliveryAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InAppNotification" (
    "id" SERIAL NOT NULL,
    "userAddress" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InAppNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeNote" (
    "id" SERIAL NOT NULL,
    "tradeId" VARCHAR(255) NOT NULL,
    "authorAddress" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TradeNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IndexedEvent_tradeId_eventType_ledgerSequence_idx" ON "IndexedEvent"("tradeId", "eventType", "ledgerSequence");

-- CreateIndex
CREATE INDEX "IndexedEvent_eventType_ledgerSequence_idx" ON "IndexedEvent"("eventType", "ledgerSequence");

-- CreateIndex
CREATE INDEX "IndexedEvent_ledgerSequence_idx" ON "IndexedEvent"("ledgerSequence");

-- CreateIndex
CREATE UNIQUE INDEX "IndexedEvent_eventId_key" ON "IndexedEvent"("eventId");

-- CreateIndex
CREATE INDEX "UserWallet_userId_idx" ON "UserWallet"("userId");

-- CreateIndex
CREATE INDEX "UserWallet_walletAddress_idx" ON "UserWallet"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_userId_walletAddress_key" ON "UserWallet"("userId", "walletAddress");

-- CreateIndex
CREATE INDEX "Webhook_userAddress_createdAt_idx" ON "Webhook"("userAddress", "createdAt");

-- CreateIndex
CREATE INDEX "WebhookDeliveryAttempt_webhookId_timestamp_idx" ON "WebhookDeliveryAttempt"("webhookId", "timestamp");

-- CreateIndex
CREATE INDEX "InAppNotification_userAddress_isRead_createdAt_idx" ON "InAppNotification"("userAddress", "isRead", "createdAt");

-- CreateIndex
CREATE INDEX "TradeNote_tradeId_authorAddress_createdAt_idx" ON "TradeNote"("tradeId", "authorAddress", "createdAt");

-- CreateIndex
CREATE INDEX "TradeNote_tradeId_createdAt_idx" ON "TradeNote"("tradeId", "createdAt");

-- CreateIndex
CREATE INDEX "TradeNote_authorAddress_idx" ON "TradeNote"("authorAddress");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_jti_key" ON "RefreshToken"("jti");

-- CreateIndex
CREATE INDEX "RefreshToken_jti_idx" ON "RefreshToken"("jti");

-- AddForeignKey
ALTER TABLE "UserWallet" ADD CONSTRAINT "UserWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebhookDeliveryAttempt" ADD CONSTRAINT "WebhookDeliveryAttempt_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "Webhook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InAppNotification" ADD CONSTRAINT "InAppNotification_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeNote" ADD CONSTRAINT "TradeNote_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("tradeId") ON DELETE CASCADE ON UPDATE CASCADE;
