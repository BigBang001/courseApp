import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Course } from "@/types/courseType";
import axios from "axios";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

const SingleCourse = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const courseId = params.courseId;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/course-by-id/${courseId}`);
        const fetchedCourse = response.data.course;
        setCourse(fetchedCourse);
        localStorage.setItem(`Singlecourse`, JSON.stringify(fetchedCourse));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (isLoading) {
    return (
      <div>
        <Card className="flex items-center justify-between">
          <CardHeader className="w-full">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-20 rounded-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>{course?.title}</CardTitle>
          <CardDescription>{course?.shortDescription}</CardDescription>
          <h1 className="font-semibold text-green-700">
            Price: ₹{course?.price}
          </h1>
        </CardHeader>
        <CardContent>
          <div className="h-20 w-20 overflow-hidden rounded-full relative">
            <Image
              src={course?.thumbnail || ''}
              alt={course?.title || 'Course thumbnail'}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleCourse;
