/*
  Warnings:

  - You are about to drop the column `description` on the `recordedClass` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recordedClass" DROP COLUMN "description",
ADD COLUMN     "markAsComplete" BOOLEAN NOT NULL DEFAULT false;
