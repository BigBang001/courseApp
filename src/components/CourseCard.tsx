import { useToast } from "@/hooks/use-toast";
import { Course } from "@/types/courseType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Bookmark, Star } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import CourseReviews from "./CourseReviews";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Image from "next/image";
import SaveUnsaveButton from "./Course/saveUnsaveButton";

const CourseCard = ({ course }: { course: Course }) => {
  const { data: session } = useSession();
  
  const offerPercentage =
    ((course.price! -
      course.price! +
      parseInt((Math.random() * 2000).toFixed())) /
      course.price!) *
    100;

  const reviews = Array.isArray(course.Review) ? course.Review : [];
  const rating = reviews.reduce((acc: number, cv: any) => acc + cv.rating, 0);
  const avgRating = reviews.length > 0 ? rating / reviews.length : null;
  const roundedRating = avgRating ? Math.round(avgRating * 2) / 2 : 0;

  return (
    <div>
      <Card className="overflow-hidden flex flex-col group h-full bg-stone-50 dark:bg-stone-950/50">
        <div className="aspect-video overflow-hidden">
          <Image
            className="h-full w-full object-cover transition-transform hover:scale-105"
            src={course.thumbnail!}
            alt="course thumbnail"
            width={1920}
            height={1080}
          />
        </div>
        <CardHeader className="p-2 md:p-3">
          <CardTitle className="capitalize text-xl line-clamp-1">
            {course.title}
          </CardTitle>
          <CardDescription className="capitalize line-clamp-2">
            {course.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 md:p-3 flex-grow">
          <div className="flex flex-wrap gap-2 mb-2 md:mb-4">
            {course.tags
              .split(",")
              .slice(0, 10)
              .map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="select-none capitalize"
                >
                  {tag}
                </Badge>
              ))}
          </div>
          <div className="flex items-center gap-2 mb-2">
            {avgRating !== null ? (
              <>
                <span className="font-semibold">{avgRating.toFixed(1)}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Star
                      key={index}
                      className={`${
                        index < Math.floor(roundedRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : index < roundedRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                      size={16}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({reviews.length})
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">
                No reviews yet
              </span>
            )}
          </div>
          <div className="text-lg font-semibold">
            ₹{course.price}
            <span className="ml-2 text-sm line-through text-muted-foreground">
              ₹{course.price! + 2000}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <Drawer>
              <DrawerTrigger>
                <Button className="font-semibold" size={"sm"}>
                  Explore Course
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    <h1 className="md:text-3xl">{course.title}</h1>
                  </DrawerTitle>
                  <p className="md:text-sm text-xs font-base text-neutral-400">
                    {course.shortDescription}
                  </p>

                  <DrawerDescription className="dark:bg-neutral-900 bg-neutral-100 dark:text-white text-black h-[50vh] md:h-[65vh] text-left overflow-y-scroll rounded-xl p-2 md:p-5">
                    <h1 className="font-semibold text-xl text-blue-500 pb-2">
                      Course Details:
                    </h1>
                    <h1>
                      Duration:{" "}
                      <span className="font-semibold">{course.duration}</span>
                    </h1>
                    <h1>
                      Course Created:
                      <span className="font-semibold">
                        {new Date(course.createdAt!).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </h1>
                    <h1>
                      Course Level:{" "}
                      <span className="font-semibold capitalize">
                        {course.level}
                      </span>
                    </h1>
                    <h1 className="mb-4">
                      Langauge:{" "}
                      <span className="font-semibold capitalize">
                        {course.language}
                      </span>
                    </h1>
                    <div className="py-4">
                      <h1 className="text-blue-500 font-semibold text-lg">
                        Reviews :
                      </h1>
                      {reviews.length > 0 ? (
                        <div className="dark:bg-neutral-800 bg-neutral-200 rounded-2xl p-2">
                          <CourseReviews reviews={reviews} />
                        </div>
                      ) : (
                        <p className="text-neutral-400">
                          No reviews available for this course.
                        </p>
                      )}
                    </div>
                    <h1 className="font-semibold text-2xl text-blue-500 mb-2">
                      Course description:
                    </h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: course.description as string,
                      }}
                    ></p>
                  </DrawerDescription>
                  <div className="dark:bg-neutral-900 bg-neutral-100 dark:text-white text-black flex items-center justify-between rounded-xl p-5">
                    <h1 className="text-blue-500">
                      Price:{" "}
                      <span className="font-semibold dark:text-white text-black">
                        ₹{course.price}
                      </span>{" "}
                      <span className="text-neutral-500 line-through">
                        ₹
                        {course.price! +
                          parseInt((Math.random() * 2000).toFixed())}
                      </span>
                    </h1>
                    <h2 className="text-green-500 font-semibold">
                      {offerPercentage.toFixed(2)}% off
                    </h2>
                  </div>
                </DrawerHeader>
                <DrawerFooter className="flex items-center justify-center flex-row">
                  {session?.user.role === "USER" && (
                    <Link href={`/course/${course.id}`}>
                      <Button
                        size={"default"}
                        className="font-semibold bg-green-500 text-green-900 hover:bg-green-600"
                      >
                        Buy Course
                      </Button>
                    </Link>
                  )}
                  <DrawerClose>
                    <Button variant="outline" size={"lg"}>
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <div>
            <SaveUnsaveButton courseId={course.id!} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseCard;
