"use client";

import PurchasedCourseCard from "@/components/PurchasedCourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { usePurchasedCourses } from "@/hooks/usePurchasedCourse";

const purchasedCoursesPage = () => {
 
  const  { purchasedCourses, isLoading } = usePurchasedCourses();

  return (
    <div className="container px-4 w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array(8)
            .fill(null)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : purchasedCourses.length > 0 ? (
          purchasedCourses.map((course) => (
            <PurchasedCourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="font-semibold">
            <h1>No Course Found</h1>
            <h1 className="text-sm text-neutral-400 italic">
              First Purchase the course...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="space-y-3 w-full">
    <Skeleton className="h-[168px] w-full" />
    <Skeleton className="h-5 w-3/4" />
    <div className="flex gap-1">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
    </div>
    <div className="flex items-center gap-1">
      <Skeleton className="h-3 w-8" />
      <div className="flex gap-[2px]">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Skeleton key={index} className="h-3 w-3" />
        ))}
      </div>
    </div>
    <Skeleton className="h-8 w-full" />
  </div>
);

export default purchasedCoursesPage;
