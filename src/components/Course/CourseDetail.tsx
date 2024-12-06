"use client";

import { useEffect} from "react";
import Script from "next/script";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { createOrderId } from "@/lib/createOrderId";
import { useParams } from "next/navigation";
import { useSingleCourseStore } from "@/store/courseStore/singleCourseStore";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { BuyButtonPopUp } from "../PurchasePageCompnents/BuyButtonPopUp";

export default function CourseDetail() {
  const { courseId } = useParams();
  const { course, fetchSingleCourse, isLoading } = useSingleCourseStore();

  useEffect(() => {
    fetchSingleCourse(courseId as string);
  }, [fetchSingleCourse, courseId]);

  if (isLoading || !course) {
    return (
      <div className="container mx-auto px-3 py-4 md:py-14">
        <CourseSkeleton />
      </div>
    );
  }

  const BuyCard = () => (
    <Card className="sticky top-4 shadow-none overflow-hidden">
      <CardContent className="space-y-4 p-0 ">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={course.thumbnail!}
            alt={course.title!}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div>
          <p className="text-sm text-neutral-500 uppercase ">Price</p>
          <p className="text-2xl font-semibold">₹{course.price}</p>
        </div>
        <p className="text-sm pb-2 text-neutral-500">One-time payment</p>
        <BuyButtonPopUp {...course} />
      </CardFooter>
    </Card>
  );

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onError={() =>
          toast({
            title: "Error",
            description: "Failed to load Razorpay script. Please reload.",
            variant: "destructive",
          })
        }
      />

      <section className="container mx-auto px-3 md:py-14 py-4">
        <CardTitle className="text-3xl md:hidden block text-blue-500 pb-2 font-bold">
          {course.title}
        </CardTitle>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-8">
          <div className="lg:hidden mb-4">
            <BuyCard />
          </div>
          <div className="lg:col-span-2 py-4 space-y-8">
            <div>
              <CardTitle className="text-5xl hidden md:block text-blue-500 font-bold">
                {course.title}
              </CardTitle>
              <CardDescription>{course.shortDescription}</CardDescription>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Course Details</h3>
                  <p>Duration: {course.duration}</p>
                  <p>Level: {course.level}</p>
                  <p>Language: {course.language}</p>
                  <div className="bg-secondary rounded-xl p-2 my-2 ">
                    <h3 className="text-lg text-primary font-semibold">
                      Instructor
                    </h3>
                    <div className="flex items-center gap-4 mt-2 dark:bg-neutral-700 bg-neutral-200 p-2 rounded-lg">
                      <Avatar>
                        <AvatarImage
                          className="w-full h-full object-cover"
                          src={course.instructor.image}
                          alt={course.instructor.fullName}
                        />
                        <AvatarFallback>
                          {course.instructor.fullName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg font-semibold">
                          {course.instructor.fullName}
                        </p>
                        <p>{course.instructor.email}</p>
                        <p>{course.instructor.bio || ""}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Description</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: course.description || "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <BuyCard />
          </div>
        </div>
      </section>
    </>
  );
}

function CourseSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 w-3/4" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Card>
        <CardContent className="p-0">
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}
