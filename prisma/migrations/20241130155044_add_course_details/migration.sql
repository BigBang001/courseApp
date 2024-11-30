/*
  Warnings:

  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "userId",
ADD COLUMN     "instructerId" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "langauge" TEXT NOT NULL DEFAULT 'English';

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructerId_fkey" FOREIGN KEY ("instructerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
