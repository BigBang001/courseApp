"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useCourseDetailStore } from "@/store/dashboardStore/courseDetailsStore";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import CreatedCourseCard from "@/components/Course/CreatedCourseCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesPage() {
  const { courseDetails, fetchData, isLoading } = useCourseDetailStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto px-3 md:py-10 py-6">
      <div className="md:mb-8 mb-4 gap-2 flex items-center w-full justify-between">
        <BackButton href="/dashboard" title="Back to Dashboard" />
        <Link href="/create">
          <Button variant="secondary">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </Link>
      </div>
      <h2 className="text-3xl font-bold py-3 tracking-tight">Your Courses</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <CreatedCourseCardSkeleton key={index} />
          ))}
        </div>
      ) : courseDetails.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {courseDetails.map((course, idx) => (
            <CreatedCourseCard
              idx={idx + 1}
              key={course.courseId}
              {...course}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          <p>
            No courses found. Click "Add New Course" to create your first one!
          </p>
        </div>
      )}
    </div>
  );
}

function CreatedCourseCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[250px]" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>
  );
}
