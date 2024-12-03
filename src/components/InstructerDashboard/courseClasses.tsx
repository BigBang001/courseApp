"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBulkCourseClassesStore } from "@/store/classesStore/bulkCourseClassesStore";
import BackButton from "../BackButton";
import { Skeleton } from "../ui/skeleton";
import AddClass from "../AddClass";
import DeleteClass from "../Class/DeleteClass";

export default function CourseClasses() {
  const { courseId } = useParams();
  const { classes, fetchClasses, isLoading } = useBulkCourseClassesStore();
  useEffect(() => {
    if (courseId) {
      fetchClasses(courseId as string);
    }
  }, [fetchClasses, courseId]);

  return (
    <div className="space-y-4">
      <div className="py-2 flex items-center justify-between">
        <BackButton href="/dashboard/courses" title="Back to courses" />
        <AddClass courseId={courseId as string} courseName={"title"} />
      </div>
      <Table>
        <TableCaption>List of classes for this course</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Serial No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <CourseClassSkeleton key={index} />
            ))
          ) : classes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No classes found for this course.
              </TableCell>
            </TableRow>
          ) : (
            classes.map((classItem, index) => (
              <TableRow key={classItem.id}>
                <TableCell className="font-semibold text-blue-500">
                  {index + 1}.
                </TableCell>
                <TableCell>{classItem.title}</TableCell>
                <TableCell>
                  {new Date(classItem.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {classItem.duration < 60
                    ? `${classItem.duration.toFixed(2)} sec`
                    : classItem.duration < 3600
                    ? `${(classItem.duration / 60).toFixed(2)} min`
                    : `${(classItem.duration / 3600).toFixed(2)} hr`}
                </TableCell>
                <TableCell className="text-right">
                  <DeleteClass classId={classItem.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function CourseClassSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-[60px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-8 w-[80px] ml-auto" />
      </TableCell>
    </TableRow>
  );
}
