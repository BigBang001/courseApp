'use client'

import PurchasedCourseCard from "@/components/PurchasedCourseCard"
import { Course } from "@/types/courseType"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`/api/purchase`);
      setPurchasedCourses(response.data.purchasedCourses);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchCards();
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Purchased Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array(8)
              .fill(null)
              .map((_, index) => <SkeletonCard key={index} />)
          : purchasedCourses.map((course) => (
              <PurchasedCourseCard
                key={course.id}
                course={course}
              />
            ))}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="space-y-3 max-w-[300px]">
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
)

export default Page;