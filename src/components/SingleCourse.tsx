import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useParams } from "next/navigation";
import { useBulkCoursesStore } from "@/store/courseStore/bulkCoursesStore";

const SingleCourse = () => {
  const params = useParams();
  const courseId = params.courseId;

  const { getCourseById } = useBulkCoursesStore();
  const course = getCourseById(courseId as string);

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
              src={course?.thumbnail || ""}
              alt={course?.title || "Course thumbnail"}
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
