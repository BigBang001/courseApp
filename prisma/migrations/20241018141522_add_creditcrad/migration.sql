-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 30000,
    "expiryDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_id_key" ON "CreditCard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_bankName_key" ON "CreditCard"("bankName");

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
