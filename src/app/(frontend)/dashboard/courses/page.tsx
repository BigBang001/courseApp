"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useDataStore } from "@/store/dashboardStore/courseDetailsStore";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesPage() {
  const { courseDetails, fetchData, isLoading } = useDataStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto py-10">
      <BackButton href="/dashboard" title="Back to Dashboard" />
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        <Link href="/create">
          <Button variant="secondary" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Income</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-5 w-[250px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[50px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[50px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[80px]" />
                    </TableCell>
                  </TableRow>
                ))
              : courseDetails.map((course) => (
                  <TableRow key={course.courseId}>
                    <TableCell className="font-medium">
                      {course.courseTitle}
                    </TableCell>
                    <TableCell>+{course.purchaseCount}</TableCell>
                    <TableCell>{course.avgRating}</TableCell>
                    <TableCell>₹{course.coursePrice}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
