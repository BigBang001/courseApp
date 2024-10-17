import React, { useEffect, useState } from "react"
import axios from "axios"
import { Star } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Course } from "@/types/courseType"

const CreatedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("/api/user-courses")
        setCourses(response.data.courses)
      } catch (error: any) {
        console.log(error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [toast])

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
              .fill(null)
              .map((_, index) => <SkeletonCard key={index} />)
          : courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
      </div>
    </div>
  )
}

function CourseCard(course: Course) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform hover:scale-105"
          src={course.thumbnail}
          alt={course.title}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="capitalize text-xl line-clamp-1">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">4.0</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Star key={index} className="fill-yellow-400 text-yellow-400" size={16} />
            ))}
          </div>
        </div>
        <div className="text-lg font-semibold">
          ₹{course.price}
          <span className="ml-2 text-sm line-through text-muted-foreground">
            ₹{course.price! + 2000}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Edit Course</Button>
      </CardFooter>
    </Card>
  )
}

const SkeletonCard = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-4 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  </Card>
)

export default CreatedCourses