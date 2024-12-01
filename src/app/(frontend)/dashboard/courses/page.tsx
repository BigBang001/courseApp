"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Loader2, PlusCircle } from "lucide-react";
import { useDataStore } from "@/store/dashboardStore/courseDetailsStore";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import CreatedCourseCard from "@/components/Course/CreatedCourseCard";

export default function CoursesPage() {
  const { courseDetails, fetchData, isLoading } = useDataStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto px-2 py-10">
      <div className="mb-8 flex items-center justify-between">
        <BackButton href="/dashboard" title="Back to Dashboard" />
        <Link href="/create">
          <Button variant="secondary" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </Link>
      </div>
      <h2 className="text-3xl font-bold py-3 tracking-tight">Courses</h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-neutral-700" />
          </div>
        ) : (
          courseDetails.map((course) => <CreatedCourseCard key={course.courseId} {...course} />)
        )}
      </div>
    </div>
  );
}
