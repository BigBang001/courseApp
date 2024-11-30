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

export default function SavedCourses() {
  const { isLoading, savedCourses } = useSavedCoursesStore();
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full transition-all duration-300 hover:scale-105"
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Saved Courses
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-4xl">
            <DrawerHeader>
              <DrawerTitle className="text-3xl font-serif">
                Saved Courses
              </DrawerTitle>
              <DrawerDescription>
                Courses you've bookmarked for later
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="w-full bgb h-[60vh] flex items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : savedCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 lg:grid-cols-4">
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
