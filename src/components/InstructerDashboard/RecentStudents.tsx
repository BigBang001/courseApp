"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecentStudentsStore } from "@/store/dashboardStore/recentStudentsStore";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

export function RecentStudents() {
  const { fetchRecentStudents, isLoading, recentStudents } = useRecentStudentsStore();
  useEffect(() => {
    fetchRecentStudents();
  }, [fetchRecentStudents]);

  return (
    <div className="space-y-2 w-full">
      {isLoading ? (
        <RecentStudentSkelton />
      ) : recentStudents?.PurchasedCourses.length === 0 ? (
        <p className="text-neutral-600 text-center">
          No students enrolled yet!
        </p>
      ) : (
        recentStudents?.PurchasedCourses.map((value) => (
          <div key={value.User.id} className="flex gap-1 flex-col dark:bg-neutral-900 bg-neutral-100 rounded-lg px-1 py-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={value.User.image}
                  alt={value.User.fullName[0]}
                />
                <AvatarFallback>
                  {value.User.fullName
                    .split(" ")
                    .map((e) => e[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {value.User.fullName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {value.User.email}
                </p>
              </div>
            </div>
            <div className="text-sm text-neutral-500">Course: {recentStudents.title}</div>
          </div>
        ))
      )}
    </div>
  );
}

function RecentStudentSkelton() {
  return (
    <div className="flex border p-1 rounded-lg items-center justify-between">
      <div className="flex gap-2 items-center">
        <Skeleton className="h-[50px] w-[50px] rounded-full" />
        <Skeleton className="h-[30px] w-[150px]" />
      </div>
      <Skeleton className="h-[30px] w-[60px]" />
    </div>
  );
}
