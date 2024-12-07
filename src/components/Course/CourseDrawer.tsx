import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Bookmark, Loader2 } from "lucide-react";
import { useSavedCoursesStore } from "@/store/courseStore/savedCoursesStore";
import CourseCard from "../CourseCard";
import { useCreatedCourseStore } from "@/store/courseStore/createdCourseStore";
import { useSession } from "next-auth/react";
import CreatedCourseCard from "./CreatedCourseCard";

export default function SavedCourses() {
  const { data: session } = useSession();
  const { isLoading: isLoadingSavedCourses, savedCourses } =
    useSavedCoursesStore();
  const { isLoading: isLoadingCreatedCourses, createdCourses } =
    useCreatedCourseStore();
    
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full transition-all duration-300 hover:scale-105"
          >
            {session?.user.role === "INSTRUCTOR"
              ? "Created Courses"
              : "Saved Courses"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-4xl">
            <DrawerHeader>
              <DrawerTitle className="text-3xl font-serif">
                {session?.user.role === "INSTRUCTOR"
                  ? "Created Courses"
                  : "Saved Courses"}
              </DrawerTitle>
              <DrawerDescription>
                {session?.user.role === "INSTRUCTOR"
                  ? "Courses you've created"
                  : "Courses you've bookmarked for later"}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {session?.user.role === "INSTRUCTOR" ? (
                isLoadingCreatedCourses ? (
                  <div className="w-full bgb h-[60vh] flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : createdCourses.length > 0 ? (
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 lg:grid-cols-3">
                    {createdCourses.map((createdCourse, index) => (
                      <CreatedCourseCard
                        key={createdCourse.id}
                        Price={createdCourse.price!}
                        Students={2}
                        avgRating={4.5}
                        courseId={createdCourse.id!}
                        title={createdCourse.title!}
                        idx={index + 1}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="col-span-full mt-40 text-center">
                    <h2 className="text-2xl font-semibold italic">
                      No Courses Available!
                    </h2>
                    <p className="text-neutral-400 italic">
                      Try creating courses from dashboard.
                    </p>
                  </div>
                )
              ) : isLoadingSavedCourses ? (
                <div className="w-full bgb h-[60vh] flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : savedCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 lg:grid-cols-3">
                  {savedCourses.map((savedCourse) => (
                    <CourseCard
                      key={savedCourse.id}
                      course={savedCourse.course}
                    />
                  ))}
                </div>
              ) : (
                <div className="col-span-full mt-40 text-center">
                  <h2 className="text-2xl font-semibold italic">
                    No Courses Available!
                  </h2>
                  <p className="text-neutral-400 italic">
                    Try saving courses from explore page.
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 flex justify-center">
              <DrawerClose>
                <Button
                  variant="outline"
                  className="w-40 transition-all duration-300 hover:scale-105"
                >
                  Close
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
