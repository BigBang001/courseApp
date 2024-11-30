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
import { BookOpen } from "lucide-react";
import PurchasedCoursesPage from "../PurchasedCoursesPage";

export default function PurchasedCourses() {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Purchased Courses
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full">
            <DrawerHeader>
              <DrawerTitle className="text-3xl font-serif">
                Purchased Courses
              </DrawerTitle>
              <DrawerDescription>Your learning progress</DrawerDescription>
            </DrawerHeader>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <PurchasedCoursesPage />
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
