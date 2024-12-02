import axios from "axios";
import { create } from "zustand";

interface response {
    PurchasedCourses: purchasedCourses[],
    title: string
}

interface purchasedCourses {
    User: {
        id: string,
        fullName: string,
        email: string,
        image: string
    }
}

interface recentStudentsStore {
    recentStudents: response | null;
    isLoading: boolean;
    fetchRecentStudents: () => Promise<void>;
}

export const useRecentStudentsStore = create<recentStudentsStore>((set) => ({
    recentStudents: null,
    isLoading: true,
    fetchRecentStudents: async () => {
        try {
            const response = await axios("/api/dashboard/recent-users");
            set({ recentStudents: response.data.recentUsers, isLoading: false });
        } catch (error) {
            console.log("error", error);
        }
    },
}));