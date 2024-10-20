import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Course } from "@/types/courseType";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CourseCard = (course: Course) => {
  const offerPercentage =
    ((course.price! -
      course.price! +
      parseInt((Math.random() * 2000).toFixed())) /
      course.price!) *
    100;

  const { data: session } = useSession();
  return (
    <div>
      <Card className="overflow-hidden flex flex-col h-full">
        <div className="aspect-video overflow-hidden">
          <img
            className="h-full w-full object-cover transition-transform hover:scale-105"
            src={course.thumbnail!}
            alt={course.title!}
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="capitalize text-xl line-clamp-1">
            {course.title}
          </CardTitle>
          <CardDescription className="capitalize line-clamp-2">
            {course.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.split(",").map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className=" select-none capitalize"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">4.0</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star
                  key={index}
                  className="fill-yellow-400 text-yellow-400"
                  size={16}
                />
              ))}
            </div>
          </div>
          <div className="text-lg font-semibold">
            ₹{course.price}
            <span className="ml-2 text-sm line-through text-muted-foreground">
              ₹{course.price! + 2000}
            </span>
          </div>
        </CardContent>
        <CardFooter>
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

                <DrawerDescription className="dark:bg-neutral-900 bg-neutral-100 dark:text-white text-black h-[50vh] md:h-[55vh] text-left overflow-y-scroll rounded-xl p-5">
                  <h1 className="font-semibold text-xl dark:text-white pb-2">
                    Course Details:
                  </h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: course.description as string,
                    }}
                  ></p>
                </DrawerDescription>
                <div className="dark:bg-neutral-900 bg-neutral-100 dark:text-white text-black flex items-center justify-between rounded-xl p-5">
                  <h1>
                    Price: <span>₹{course.price}</span>{" "}
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
                {session?.user.role === "user" && (
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseCard;
