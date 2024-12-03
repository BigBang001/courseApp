"use client";

import { useDashboardDataStore } from "@/store/dashboardStore/dashboardDataStore";
import React from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { useGraphDataStore } from "@/store/dashboardStore/graphDataStore";

export default function RefreshDashboardData() {
  const { fetchDashboardData, refreshData } = useDashboardDataStore();
  const { fetchGraphData, refreshGraphData } = useGraphDataStore();

  const [isRefereshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshData();
    refreshGraphData();
    fetchGraphData();
    fetchDashboardData();
    setIsRefreshing(false);
  };
  return (
    <div>
      <Button
        disabled={isRefereshing}
        size={"sm"}
        variant="outline"
        onClick={handleRefresh}
      >
        <RefreshCcw className={`${isRefereshing && "animate-spin"}`} /> Refresh
      </Button>
    </div>
  );
}
