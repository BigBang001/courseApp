"use client";

import ClassCard from "@/components/ClassCard";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Class {
  videoUrl: string;
  title: string;
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
    <div className="mx-2 md:mx-10">
      <h1 className="font-semibold text-2xl mt-2 mb-4">{title || "Classes"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : classes.length > 0 ? (
          classes.map((classItem, idx) => (
            <ClassCard
              key={idx}
              index={idx + 1}
              classURL={classItem.videoUrl}
              title={classItem.title}
            />
          ))
        ) : (
          <div className="col-span-full capitalize font-semibold italic">
            No classes added yet...
          </div>
        )}
      </div>
    </div>
  );
}
