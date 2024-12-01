import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createdCourseDetail } from "@/store/dashboardStore/courseDetailsStore"
import AddClass from "../AddClass"
import { Users, DollarSign, Star } from 'lucide-react'

interface CreatedCourseCardProps extends createdCourseDetail {}

export default function CreatedCourseCard({
  courseId,
  courseTitle,
  purchaseCount,
  coursePrice,
  avgRating,
}: CreatedCourseCardProps) {
  return (
    <Card className="w-full max-w-sm dark:bg-stone-950 bg-stone-100">
      <CardHeader>
        <CardTitle className="text-4xl text-stone-400 font-serif text-primary">{courseTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Students:</span>
          <span className="font-medium">{purchaseCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Price:</span>
          <span className="font-medium">{coursePrice}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Average Rating:</span>
          <span className="font-medium">{avgRating}</span>
        </div>
      </CardContent>
      <CardFooter>
        <AddClass courseId={courseId} courseName={courseTitle} />
      </CardFooter>
    </Card>
  )
}

