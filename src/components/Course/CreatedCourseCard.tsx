import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createdCourseDetail } from "@/store/dashboardStore/courseDetailsStore";
import AddClass from "../AddClass";
import { Users, Star, IndianRupee } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface CreatedCourseCardProps extends createdCourseDetail {
  idx: number;
}

export default function CreatedCourseCard({
  idx,
  courseId,
  Price,
  Students,
  title,
  avgRating,
}: CreatedCourseCardProps) {
  return (
    <Card className="w-full flex flex-col justify-between dark:bg-neutral-900 bg-stone-100">
      <CardHeader>
        <CardTitle className="text-4xl dark:text-stone-300 font-serif text-primary">
          <span className="text-blue-500">{idx}.</span> {title}
        </CardTitle>
      </CardHeader>
      <div>
        <CardContent className="space-y-1">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Students:</span>
            <span className="font-medium">{Students}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IndianRupee className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Price:</span>
            <span className="font-medium">₹{Price}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Average Rating:
            </span>
            <span className="font-medium">{avgRating}</span>
          </div>
        </CardContent>
        <CardFooter className="space-x-2">
          <AddClass courseId={courseId} courseName={title} />
          <Link href={`/dashboard/courses/${courseId}`}>
            <Button variant="secondary" >View Classes</Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
