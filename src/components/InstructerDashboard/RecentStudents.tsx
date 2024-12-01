"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecentUsersStore } from "@/store/dashboardStore/recentUsersStore";
import { Loader2 } from 'lucide-react';
import { useEffect } from "react";

export function RecentStudents() {
  const { fetchRecentUsers, isLoading, recentUsers } = useRecentUsersStore();
  useEffect(() => {
    fetchRecentUsers();
  }, [fetchRecentUsers]);

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <Loader2 className="animate-spin text-neutral-600 h-8 w-8" />
        </div>
      ) : (
        recentUsers?.PurchasedCourses.length === 0 ? (
          <p className="text-neutral-600 text-center">No students enrolled yet!</p>
        ) :
        recentUsers?.PurchasedCourses.map(({ User }) => (
          <div key={User.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={User.image} alt={User.fullName[0]} />
              <AvatarFallback>
                {User.fullName.split(" ").map((e) => e[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {User.fullName}
              </p>
              <p className="text-sm text-muted-foreground">{User.email}</p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
        ))
      )}
    </div>
  );
}

