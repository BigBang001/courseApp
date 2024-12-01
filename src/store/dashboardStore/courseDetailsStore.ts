import axios from "axios";
import { create } from "zustand";

export interface createdCourseDetail {
    avgRating: number
    courseId: string
    courseTitle: string
    purchaseCount: number;
    coursePrice: number
}

interface dataStore {
    isLoading: boolean,
    fetchData: () => Promise<void>
    courseDetails: createdCourseDetail[]
}

export const useDataStore = create<dataStore>((set) => ({
    courseDetails: [],
    isLoading: false,
    fetchData: async () => {
        try {
            set({ isLoading: true })
            const response = await axios.get("/api/dashboard/statistics");
            set({ courseDetails: response.data.courseDetails, isLoading: false })
        } catch (error) {
            console.log(error);
        }
    },
}))