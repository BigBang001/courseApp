import { create } from "zustand";
import axios from "axios";
import { Course } from "@/types/courseType";

interface BulkCoursesStore {
    courses: Course[];
    isLoading: boolean;
    isSearching: boolean;
    filter: string;
    setFilter: (filter: string) => void;
    fetchCourses: () => Promise<void>;
    getCourseById: (id: string) => Course | undefined;
}

export const useBulkCoursesStore = create<BulkCoursesStore>((set, get) => ({
    courses: [],
    isLoading: true,
    isSearching: false,
    filter: "",
    setFilter: (filter: string) => {
        set({ filter });
    },
    fetchCourses: async () => {
        set({ isSearching: true });
        try {
            const response = await axios.get(`/api/courses?filter=${encodeURIComponent(get().filter)}`);
            set({ courses: response.data.courses, isLoading: false, isSearching: false });
        } catch (error) {
            console.log(error);
            set({ isSearching: false, isLoading: false });
        }
    },
    getCourseById: (id: string) => {
        return get().courses.find((course) => course.id === id);
    },
}));