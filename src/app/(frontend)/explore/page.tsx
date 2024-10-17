'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import CourseCard from "@/components/CourseCard"
import { Course } from "@/types/courseType"
import { Skeleton } from "@/components/ui/skeleton"

const CoursesPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("/api/courses")
        setCourses(response.data.courses)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const categories = [
    "all",
    "web development",
    "Leadership",
    "data science",
    "Engineering",
    "physics",
    "Web3",
    "Artificial intelligence",
  ]

  const SkeletonCard = () => (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )

  return (
    <div className="w-[95%] md:w-[80%] mx-auto py-7">
      <div className="border-b mb-10">
        <div className="headings pb-10">
          <h1 className="md:text-5xl text-3xl font-serif">
            All the skills you need in one place
          </h1>
          <p className="text-neutral-400">
            Explore Courses according to your need
          </p>
        </div>
        <div className="flex flex-wrap gap-4 pb-2">
          {categories.map((text, idx) => (
            <h1
              key={idx}
              className="capitalize font-semibold font-sans md:text-lg dark:hover:text-white hover:text-black hover:underline transition-colors cursor-pointer text-neutral-500"
            >
              {text}
            </h1>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array(6)
              .fill(null)
              .map((_, index) => <SkeletonCard key={index} />)
          : courses.map((course) => (
              <CourseCard
                key={course.id}
                createdAt={course.createdAt}
                description={course.description}
                duration={course.duration}
                id={course.id}
                level={course.level}
                userId={course.userId}
                title={course.title}
                shortDescription={course.shortDescription}
                thumbnail={course.thumbnail}
                tags={course.tags}
                price={course.price}
              />
            ))}
      </div>
    </div>
  )
}

export default CoursesPage