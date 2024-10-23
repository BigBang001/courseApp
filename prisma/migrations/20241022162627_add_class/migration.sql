-- CreateTable
CREATE TABLE "recordedClass" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "classUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "recordedClass_id_key" ON "recordedClass"("id");

-- AddForeignKey
ALTER TABLE "recordedClass" ADD CONSTRAINT "recordedClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recordedClass" ADD CONSTRAINT "recordedClass_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
