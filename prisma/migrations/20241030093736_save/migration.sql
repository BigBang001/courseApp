/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `savedCourses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,userId]` on the table `savedCourses` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `savedCourses` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "savedCourses_courseId_key";

-- AlterTable
ALTER TABLE "savedCourses" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "savedCourses_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "savedCourses_id_key" ON "savedCourses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "savedCourses_courseId_userId_key" ON "savedCourses"("courseId", "userId");
