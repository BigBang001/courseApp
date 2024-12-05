import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function SaveUnsaveButton({ courseId }: { courseId: string }) {
  const { data: session } = useSession();

  const [isCourseSaved, setIsCourseSaved] = useState(() => {
    const savedCourses = JSON.parse(
      localStorage.getItem("savedCourses") || "[]"
    );
    return savedCourses.includes(courseId);
  });

  const handleSaveCourse = async () => {
    if (!session?.user) return;
    try {
      const savedCourses = JSON.parse(
        localStorage.getItem("savedCourses") || "[]"
      );

      if (isCourseSaved === false) {
        await axios.post("/api/courses/save", {
          courseId: courseId,
          userId: session.user.id,
        });

        savedCourses.push(courseId);
        localStorage.setItem("savedCourses", JSON.stringify(savedCourses));
        setIsCourseSaved(true);
      } else {
        await axios.delete(`/api/courses/save`, {
          data: { courseId: courseId },
        });
        const updatedCourses = savedCourses.filter(
          (id: string) => id !== courseId
        );
        localStorage.setItem("savedCourses", JSON.stringify(updatedCourses));
        setIsCourseSaved(false);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  return (
    <div
      onClick={handleSaveCourse}
      className="group-hover:opacity-100 opacity-0 cursor-pointer transition-opacity duration-300"
    >
      {session?.user.role === "USER" && (
        <Bookmark
          aria-label={isCourseSaved ? "Unsave Course" : "Save Course"}
          className={`${
            isCourseSaved ? "fill-white" : "fill-transparent"
          } cursor-pointer`}
        />
      )}
    </div>
  );
}
