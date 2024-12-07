import { Course } from '@/types/courseType'
import axios from 'axios'
import { create } from 'zustand'

interface CreatedCourseStore {
    createdCourses: Course[]
    isLoading: boolean
    fetchCreatedCourses: () => Promise<void>
}

export const useCreatedCourseStore = create<CreatedCourseStore>((set) => ({
    createdCourses: [],
    isLoading: false,
    fetchCreatedCourses: async () => {
        try {
            set({ isLoading: true })
            const response = await axios('/api/courses/created-courses')
            set({ createdCourses: response.data.courses})
        } catch (error) {
            console.error(error)
        } finally {
            set({ isLoading: false })
        }
    }
}))