export interface Course {
    course: Course
    id?: string
    title?: string
    description?: string
    price?: number
    thumbnail?: string
    createdAt?: Date
    shortDescription?: string
    duration?: string
    instructorId?: string
    language?: string
    tags: string
    level?: string
    Review : ReviewTypes[]
}

interface ReviewTypes {
    id: string,
    content: string,
    userId: string,
    courseId: string,
    rating: number,
    createdAt: string
}