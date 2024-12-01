"use client";

import { useEffect } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGraphDataStore } from "@/store/dashboardStore/graphDataStore";

export function Overview() {
  const { fetchGraphData, graphData } = useGraphDataStore();

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
              <LineChart data={graphData}>
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
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={3}
                  dot={{ r: 5, stroke: "var(--color-revenue)", strokeWidth: 2, fill: "white" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
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
