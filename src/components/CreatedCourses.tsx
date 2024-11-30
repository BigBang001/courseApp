"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Edit,
  Loader2,
  LucideChartNoAxesColumnIncreasing,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@/types/courseType";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditCourse from "@/components/EditCourse";
import AddClass from "@/components/AddClass";
import { useCreatedCourseStore } from "@/store/courseStore/createdCourseStore";

const CreatedCourses = () => {
  const { courses, isLoading, fetchCourse } = useCreatedCourseStore();
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Created Courses
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {isLoading ? (
          Array(6)
            .fill(null)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course.id} {...course} />)
        ) : (
          <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
            You haven't created any courses yet. Start creating your first
            course!
          </p>
        )}
      </div>
    </div>
  );
};

function CourseCard(course: Course) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteCourse = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/delete-course/${course.id}`);
      if (response.status === 200) {
        toast({
          title: "Course Deleted",
          description: "Your course has been successfully removed",
          variant: "success",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: "Deletion Failed",
        description: axiosError.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl">
      <div className="aspect-video h-full w-full z-10 absolute overflow-hidden">
        <Image
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          src={course.thumbnail!}
          alt={course.title!}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="z-50 flex flex-col h-full bg-gradient-to-t from-black/95 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="capitalize text-blue-300 text-2xl line-clamp-1 font-bold">
            {course.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-neutral-300 text-base">
            {course.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-xl text-white font-semibold">
            <span className="text-blue-200">Course Fee:</span> ₹{course.price}
          </div>
          <div className="createdAt text-sm text-neutral-400 mt-2">
            <span className="text-blue-200">Published on:</span>{" "}
            {new Date(course.createdAt!).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-5 gap-3">
          <Button
            className="text-white font-semibold col-span-2 hover:text-blue-300 transition-colors"
            variant="link"
            size="sm"
          >
            <EditCourse
              duration={course.duration!}
              id={course.id!}
              price={course.price!}
              title={course.title!}
            />
          </Button>
          <div>
            <AddClass courseId={course.id!} />
          </div>
          <div className="absolute bottom-0 right-0">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  className="font-semibold rounded-tl-3xl col-span-1 hover:bg-red-600 transition-colors"
                >
                  {isLoading ? (
                    <div>
                      <Loader2 className="animate-spin font-semibold text-white" />
                    </div>
                  ) : (
                    <Trash2 />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl font-bold text-red-600">
                    Confirm Course Deletion
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{course.title}</span>? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Course</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteCourse}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Course
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

const SkeletonCard = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-6 space-y-4">
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-3">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-28" />
      </div>
      <Skeleton className="h-12 w-full" />
    </div>
  </Card>
);

export default CreatedCourses;
