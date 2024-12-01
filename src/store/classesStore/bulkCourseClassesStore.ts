import { Class } from "@/types/classTypes";
import axios from "axios";
import { create } from "zustand";

interface BulkCourseClassesStore {
    classes: Class[];
    isLoading: boolean;
    fetchClasses: (courseId: string) => Promise<void>;
}

export const useBulkCourseClassesStore = create<BulkCourseClassesStore>((set) => ({
    classes: [],
    isLoading: true,
    fetchClasses: async (courseId: string) => {
        try {
            set({ isLoading: true });
            const response = await axios.get(`/api/course-classes/${courseId}`);
            const fetchedClasses = response.data.classes;
            set({ classes: fetchedClasses });
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));