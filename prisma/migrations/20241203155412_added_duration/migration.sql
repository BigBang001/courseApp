/*
  Warnings:

  - Added the required column `duration` to the `RecordedClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordedClass" ADD COLUMN     "duration" TEXT NOT NULL;
