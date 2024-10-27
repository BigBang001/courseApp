"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";

import React, { useEffect, useState } from "react";

const CourseStatics = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get("/api/dashboard/statistics");
        const data = response.data;
        if (data.success) {
          setTotalCourses(data.courseDetails.length);
          const uniqueStudentsCount = data.courseDetails.reduce(
            (acc: any, course: any) => {
              return acc + course.purchaseCount;
            },
            0
          );
          setAverageRating(data.courseDetails[0].avgRating)
          setTotalStudents(uniqueStudentsCount);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, []);


  return (
    <div>
      <p className="text-lg flex  items-center gap-1">
        Total Courses:{" "}
        <span className="font-bold">
          {isLoading ? (
            <div className="font-normal">
              <Loader2 className="animate-spin text-neutral-700" />
            </div>
          ) : (
            `${totalCourses}`
          )}
        </span>
      </p>
      <p className="text-lg flex  items-center gap-1">
        Total Students:{" "}
        <span className="font-bold">
          {isLoading ? (
            <div className="flex font-normal">
              <Loader2 className="animate-spin text-neutral-700" />
            </div>
          ) : (
            `${totalStudents}`
          )}
        </span>
      </p>
      <p className="text-lg flex  items-center gap-1">
        Average Rating:{" "}
        <span className="font-bold">
          {isLoading ? (
            <div className="flex font-normal">
              <Loader2 className="animate-spin text-neutral-700" />
            </div>
          ) : (
            `${averageRating.toFixed(2)}`
          )}
        </span>
      </p>
    </div>
  );
};

export default CourseStatics;
