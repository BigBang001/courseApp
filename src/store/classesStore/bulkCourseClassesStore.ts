import { Class } from "@/types/classTypes";
import axios from "axios";
import { create } from "zustand";

interface BulkCourseClassesStore {
    classes: Class[];
    isLoading: boolean;
    deletingClass: boolean;
    fetchClasses: (courseId: string) => Promise<void>;
    deleteClass: (courseId: string, classId: string) => Promise<void>;
}

export const useBulkCourseClassesStore = create<BulkCourseClassesStore>((set) => ({
    classes: [],
    isLoading: false,
    deletingClass: false,
    fetchClasses: async (courseId: string) => {
        try {
            set({ isLoading: true });
            const response = await axios.get<{ classes: Class[] }>(`/api/course-classes/${courseId}`,);
            const fetchedClasses = response.data.classes;
            set({ classes: fetchedClasses });
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteClass: async (courseId: string, classId: string) => {
        try {
            set({ deletingClass: true });
            await axios.delete(`/api/course-classes/${courseId}/${classId}`);
            set((state) => ({
                classes: state.classes.filter((cls) => cls.id !== classId),
            }));

            console.log("Class deleted successfully:", classId);
        } catch (error) {
            console.error("Error deleting class:", error);
        }finally {
            set({ deletingClass: false });
        }
    },
}));
