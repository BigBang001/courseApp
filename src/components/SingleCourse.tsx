import React, { useEffect, useState } from "react";
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

const SingleCourse = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const params = useParams();
  const courseId = params.courseId;  

  useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`/api/course-by-id/${courseId}`);
          const fetchedCourse = response.data.course;
          setCourse(fetchedCourse);
          localStorage.setItem(`Singlecourse`, JSON.stringify(fetchedCourse));
        } catch (error) {
          console.log(error);
        }
      };
      fetchCourse();
  }, [courseId]);

  return (
    <div>
      <Card className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>{course?.title}</CardTitle>
          <CardDescription>{course?.shortDescription}</CardDescription>
          <h1 className="font-semibold text-green-200">
            Price: ₹{course?.price}
          </h1>
        </CardHeader>
        <CardContent>
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <img
              className="w-full h-full object-cover"
              src={course?.thumbnail}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleCourse;
