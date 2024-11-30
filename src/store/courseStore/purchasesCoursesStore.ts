import { Course } from '@/types/courseType';
import axios from 'axios';
import { create } from 'zustand';

export interface purchasedCourse {
    id: string;
    userId: string;
    courseId: string;
    createdAt: string;
    course: Course
}

interface purchasedCoursesStore {
    purchasedCourses: purchasedCourse[];
    isLoading: boolean;
    fetchPurchasedCourses: () => Promise<void>;
}

export const usePurchasedCoursesStore = create<purchasedCoursesStore>((set) => ({
    purchasedCourses: [],
    isLoading: true,
    fetchPurchasedCourses: async () => {
        try {
            const response = await axios('/api/courses/purchase');    
            set({ purchasedCourses: response.data.purchasedCourses, isLoading: false });
        } catch (error) {
            console.log(error);
            set({ isLoading: false });
        }
    }
}));