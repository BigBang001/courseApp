"use client";

import ClassCard from "@/components/ClassCard";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useBulkCourseClassesStore } from "@/store/classesStore/bulkCourseClassesStore";
import { ClassSkeletonCard } from "@/components/Class/ClassesSkeletonCard";

export default function Page() {
  const { classes, fetchClasses, isLoading } = useBulkCourseClassesStore();
  const params = useParams();
  const courseId = params.courseId;
  const searchParams = useSearchParams();

  const title = searchParams.get("courseTitle");

  useEffect(() => {
    fetchClasses(courseId as string);
  }, [courseId,fetchClasses]);
  
  return (
    <div className="container mx-auto px-4 md:px-20 py-8">
      <div className="flex flex-col space-y-6">
        <Link href="/purchased" className="w-fit">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Purchased Courses
          </Button>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {title || "Course Classes"}
          </h1>
          <p className="text-muted-foreground font-sans mt-2">
            View and complete your course classes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ClassSkeletonCard key={index} />
            ))
          ) : classes.length > 0 ? (
            classes.map((classItem, idx) => (
              <ClassCard
                key={classItem.id}
                index={idx + 1}
                classId={classItem.id}
                classURL={classItem.videoUrl}
                title={classItem.title}
                duration={classItem.duration}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-lg font-semibold text-muted-foreground italic">
              No classes added yet...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
