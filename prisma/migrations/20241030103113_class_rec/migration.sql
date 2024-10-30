/*
  Warnings:

  - You are about to drop the column `markAsComplete` on the `recordedClass` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recordedClass" DROP COLUMN "markAsComplete",
ADD COLUMN     "description" TEXT;
