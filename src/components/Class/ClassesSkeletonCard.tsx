import React from "react";
import { Skeleton } from "../ui/skeleton";

export const ClassSkeletonCard = () => (
    <div className="border rounded-xl p-2 md:p-4 space-y-1">
      <Skeleton className="h-4 w-6" />
      <Skeleton className="h-12 md:h-48 w-full rounded-xl" />
      <div className="flex justify-end">
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );