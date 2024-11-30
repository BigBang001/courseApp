import { Course } from "@/types/courseType"
import axios from "axios";
import { create } from "zustand";

interface SavedCoursesStore {
    savedCourses: Course[]
    isLoading: boolean;
    fetchSavedCourses: () => Promise<void>;
}

export const useSavedCoursesStore = create<SavedCoursesStore>((set) => ({
    savedCourses: [],
    isLoading: true,
    fetchSavedCourses: async () => {
        try {
            const response = await axios.get(`/api/courses/save`);
            set({ savedCourses: response.data.savedCourses, isLoading: false });
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
        }
    }
}))