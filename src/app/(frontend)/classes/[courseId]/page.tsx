"use client";

import ClassCard from "@/components/ClassCard";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Class {
  videoUrl: string;
  title: string;
  id: string;
  markAsComplete: boolean;
}

export default function Page() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const searchParams = useSearchParams();
  const title = searchParams.get("courseTitle");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/api/course-classes/${params.courseId}`
        );
        const fetchedClasses = response.data.classes;
        setClasses(fetchedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [params.courseId]);

  const SkeletonCard = () => (
    <div className="border rounded-xl p-2 md:p-4 space-y-1">
      <Skeleton className="h-4 w-6" />
      <Skeleton className="h-12 md:h-48 w-full rounded-xl" />
      <div className="flex justify-end">
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );

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
              <SkeletonCard key={index} />
            ))
          ) : classes.length > 0 ? (
            classes.map((classItem, idx) => (
              <ClassCard
                classId={classItem.id}
                key={classItem.id}
                index={idx + 1}
                classURL={classItem.videoUrl}
                title={classItem.title}
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
