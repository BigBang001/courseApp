"use client";

import { useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGraphDataStore } from "@/store/dashboardStore/graphDataStore";

export function Overview() {
  const { fetchGraphData, graphData } = useGraphDataStore();
  const dummmyGraphData = [
    { month: "Jan", revenue: 4500 },
    { month: "Feb", revenue: 5200 },
    { month: "Mar", revenue: 6100 },
    { month: "Apr", revenue: 4900 },
    { month: "May", revenue: 5300 },
    { month: "Jun", revenue: 5800 },
    { month: "Jul", revenue: 6200 },
    { month: "Aug", revenue: 5700 },
    { month: "Sep", revenue: 5900 },
    { month: "Oct", revenue: 6100 },
    { month: "Nov", revenue: 5500 },
    { month: "Dec", revenue: 5989 },
    { month: "Dec", revenue: 2989 },
  ];

  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        {graphData.length === 0 ? (
          <OverviewSkeleton />
        ) : (
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "#adfa1d",
              },
            }}
            className="min-w-[200px]"
          >
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={graphData}>
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} maxBarSize={20} /> 
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[350px]" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>
  );
}
