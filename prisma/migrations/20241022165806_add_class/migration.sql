/*
  Warnings:

  - You are about to drop the column `classUrl` on the `recordedClass` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `recordedClass` table. All the data in the column will be lost.
  - Added the required column `videoUrl` to the `recordedClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recordedClass" DROP COLUMN "classUrl",
DROP COLUMN "thumbnail",
ADD COLUMN     "videoUrl" TEXT NOT NULL;
