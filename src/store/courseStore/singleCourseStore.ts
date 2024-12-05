import { Course } from "@/types/courseType";
import axios from "axios";
import { create } from "zustand";

interface instructor {
    fullName: string
    email: string
    bio: string
    image: string
}

interface singleCourse extends Course {
    instructor: instructor
}

interface singleCourseStore {
    isLoading: boolean
    fetchSingleCourse: (courseId: string) => Promise<void>
    course: singleCourse | null
}

export const useSingleCourseStore = create<singleCourseStore>((set) => ({
    course: null,
    isLoading: true,
    fetchSingleCourse: async (courseId: string) => {
        try {
            const response = await axios.get(`/api/courses/singleCourse/${courseId}`)
            set({ course: response.data.course, isLoading: false })
        } catch (error) {
            console.log(error);
        }
    }
}))