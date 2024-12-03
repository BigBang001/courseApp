import axios from "axios";
import { create } from "zustand";

interface Detail {
  avgRating: number;
  revenue: string;
  totalUsers: string;
  totalCourses: string;
}

interface DashboardDataStore {
  isLoading: boolean;
  dashboardData: Detail | null;
  fetchDashboardData: () => Promise<void>;
  refreshData: () => void; 
}

export const useDashboardDataStore = create<DashboardDataStore>((set, get) => ({
  isLoading: true,
  dashboardData: null, 
  fetchDashboardData: async () => {
    try {
      const state = get();
      if (state.dashboardData) {
        set({ isLoading: false });
        return; 
      }
      
      const response = await axios.get("/api/dashboard/dashboardData");
      set({ dashboardData: response.data.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  },
  refreshData: () => set({ dashboardData: null, isLoading: true }),
}));
