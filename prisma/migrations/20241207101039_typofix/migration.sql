/*
  Warnings:

  - You are about to drop the column `ifsc` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - Added the required column `ifscCode` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "ifsc",
ADD COLUMN     "ifscCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "phoneNumber" TEXT;
