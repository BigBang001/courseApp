/*
  Warnings:

  - A unique constraint covering the columns `[userId,courseId]` on the table `purchasedCourses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "purchasedCourses" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "purchasedCourses_userId_courseId_key" ON "purchasedCourses"("userId", "courseId");
