import axios from "axios";
import { create } from "zustand";

export interface createdCourseDetail {
    courseId: string,
    Students: number,
    avgRating: number,
    Price: number,
    title: string,
}

interface dataStore {
    isLoading: boolean,
    fetchData: () => Promise<void>
    courseDetails: createdCourseDetail[]
}

export const useCourseDetailStore = create<dataStore>((set) => ({
    courseDetails: [],
    isLoading: true,
    fetchData: async () => {
        try {
            const response = await axios.get("/api/dashboard/course-details");
            set({ courseDetails: response.data.courseDetails})
        } catch (error) {
            console.log(error);
        }finally{
            set({isLoading: false})
        }
    },
}))