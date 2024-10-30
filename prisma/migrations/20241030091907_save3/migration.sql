/*
  Warnings:

  - The primary key for the `savedCourses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `savedCourses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `savedCourses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "savedCourses_id_key";

-- AlterTable
ALTER TABLE "savedCourses" DROP CONSTRAINT "savedCourses_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "savedCourses_courseId_key" ON "savedCourses"("courseId");
