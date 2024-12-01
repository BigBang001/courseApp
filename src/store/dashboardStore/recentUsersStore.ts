import axios from "axios";
import { create } from "zustand";

interface response {
    PurchasedCourses : purchasedCourses[]
}

interface purchasedCourses {
    User: {
        id: string,
        fullName: string,
        email: string,
        image: string
    }
}

interface recentUsersStore {
    recentUsers: response | null;
    isLoading: boolean;
    fetchRecentUsers: () => Promise<void>;
}

export const useRecentUsersStore = create<recentUsersStore>((set) => ({
    recentUsers: null,
    isLoading: false,
    fetchRecentUsers: async () => {
        set({ isLoading: true });
        try {
            const response = await axios("/api/dashboard/recent-users");
            set({ recentUsers: response.data.recentUsers });
        } catch (error) {
            console.log("error", error);
        }
        set({ isLoading: false });
    },
}));