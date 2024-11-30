import { Course } from '@/types/courseType'
import axios from 'axios'
import { create } from 'zustand'

interface CreatedCourseStore {
    courses: Course[]
    isLoading: boolean
    fetchCourse: () => Promise<void>
}

export const useCreatedCourseStore = create<CreatedCourseStore>((set) => ({
    courses: [],
    isLoading: false,
    fetchCourse: async () => {
        try {
            set({ isLoading: true })
            const response = await axios('/api/user-courses')
            set({ courses: response.data.courses })
        } catch (error) {
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    }
}))