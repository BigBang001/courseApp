import axios from "axios";
import { create } from "zustand";

interface detail {
    avgRating: number
    revenue: string
    totalUsers: string
    totalCourses: string
}

interface dashboardDataStore {
    isLoading: boolean,
    dashboardData: detail | null,
    fetchDashboardData: () => Promise<void>
}

export const useDashboardDataStore = create<dashboardDataStore>((set) => ({
    isLoading: true,
    dashboardData: {
        avgRating: 0,
        revenue: "00.00",
        totalUsers: "00",
        totalCourses: "00"
    },
    fetchDashboardData: async () => {
        try {
            const response = await axios.get("/api/dashboard/dashboardData");
            set({ dashboardData: response.data.data, isLoading: false })
        } catch (error) {
            console.log(error);
        }
    }
}))