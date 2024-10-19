/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `CreditCard` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CreditCard_bankName_key";

-- AlterTable
ALTER TABLE "CreditCard" ALTER COLUMN "cvv" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "purchasedCourses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "purchasedCourses_id_key" ON "purchasedCourses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_accountNumber_key" ON "CreditCard"("accountNumber");

-- AddForeignKey
ALTER TABLE "purchasedCourses" ADD CONSTRAINT "purchasedCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasedCourses" ADD CONSTRAINT "purchasedCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
