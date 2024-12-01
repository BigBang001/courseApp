/*
  Warnings:

  - You are about to drop the column `instructerId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `langauge` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `purchasedCourses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recordedClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `savedCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_instructerId_fkey";

-- DropForeignKey
ALTER TABLE "purchasedCourses" DROP CONSTRAINT "purchasedCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "purchasedCourses" DROP CONSTRAINT "purchasedCourses_userId_fkey";

-- DropForeignKey
ALTER TABLE "recordedClass" DROP CONSTRAINT "recordedClass_courseId_fkey";

-- DropForeignKey
ALTER TABLE "recordedClass" DROP CONSTRAINT "recordedClass_userId_fkey";

-- DropForeignKey
ALTER TABLE "savedCourses" DROP CONSTRAINT "savedCourses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "savedCourses" DROP CONSTRAINT "savedCourses_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "instructerId",
DROP COLUMN "langauge",
ADD COLUMN     "instructorId" TEXT,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'English',
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CreditCard" ALTER COLUMN "balance" SET DEFAULT 30000,
ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "purchasedCourses";

-- DropTable
DROP TABLE "recordedClass";

-- DropTable
DROP TABLE "savedCourses";

-- CreateTable
CREATE TABLE "PurchasedCourses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "RecordedClass" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "markAsComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SavedCourses" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedCourses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedCourses_id_key" ON "PurchasedCourses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedCourses_userId_courseId_key" ON "PurchasedCourses"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordedClass_id_key" ON "RecordedClass"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SavedCourses_id_key" ON "SavedCourses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SavedCourses_courseId_userId_key" ON "SavedCourses"("courseId", "userId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedCourses" ADD CONSTRAINT "PurchasedCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedCourses" ADD CONSTRAINT "PurchasedCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordedClass" ADD CONSTRAINT "RecordedClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordedClass" ADD CONSTRAINT "RecordedClass_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCourses" ADD CONSTRAINT "SavedCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCourses" ADD CONSTRAINT "SavedCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
