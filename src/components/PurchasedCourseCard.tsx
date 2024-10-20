"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course } from "@/types/courseType";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewCourse from "./ReviewCourse";

const PurchasedCourseCard = ({ course }: { course: Course }) => {

  return (
    <Card className="overflow-hidden flex flex-col h-full max-w-[300px]">
      <div className="aspect-video overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform hover:scale-105"
          src={course.course.thumbnail!}
          alt={course.course.title!}
        />
      </div>
      <CardHeader className="p-3">
        <CardTitle className="capitalize text-lg line-clamp-1">
          {course.course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {course.course.tags.split(",").map((tag: string, index: string) => (
            <Badge
              key={index}
              variant="secondary"
              className="select-none capitalize text-xs px-1 py-0"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-1 mb-1">
          <span className="font-semibold text-sm">4.0</span>
          <div className="flex">
            
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 flex gap-1">
        <Button className="w-full" size="sm">
          Open Classes
        </Button>
        <ReviewCourse courseId={course.course.id}/>
      </CardFooter>
    </Card>
  );
};

export default PurchasedCourseCard;
