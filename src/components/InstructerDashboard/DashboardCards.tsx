"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpen, DollarSign, Star, Users } from "lucide-react";
import { useDashboardDataStore } from "@/store/dashboardStore/dashboardDataStore";

export default function DashboardCards() {
  const { dashboardData, fetchDashboardData, isLoading } =
    useDashboardDataStore();
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mb-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <div>
            <DollarSign className="h-4 w-4 text-neutral-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${dashboardData?.revenue}
          </div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          <div>
            <Users className="h-4 w-4 text-neutral-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{dashboardData?.totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
          <div>
            <BookOpen className="h-4 w-4 text-neutral-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {dashboardData?.totalCourses}
          </div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rating</CardTitle>
          <div>
            <Star className="h-4 w-4 text-neutral-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData?.avgRating}</div>
          <p className="text-xs text-muted-foreground">+0.2 from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
