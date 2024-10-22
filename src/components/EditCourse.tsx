"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

interface UpdateCourse {
  id: string
  title: string
  duration: string
  price: number
}

const EditCourse = ({ id, title, duration, price }: UpdateCourse) => {
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    title,
    price,
    duration,
  })

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await axios.put(`/api/edit-course`, {
        courseId: id,
        ...values,
      })
      console.log(response.data)
      toast({
        title: "Updated!",
        description: response.data.message,
      })
      setDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.error?.[0]?.message ||
          "Error while updating course details",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="link" size="sm" className="flex text-white gap-1 items-center">
            <Edit  />
            Edit Course Details
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Course Details</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently update your
              course.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateCourse} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                placeholder="Change Course Title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Update Price</Label>
              <Input
                id="price"
                type="number"
                value={values.price}
                onChange={(e) =>
                  setValues({ ...values, price: Number(e.target.value) })
                }
                placeholder="Change Course Price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={values.duration}
                onChange={(e) =>
                  setValues({ ...values, duration: e.target.value })
                }
                placeholder="Course duration"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit">
                {isLoading ? (
                  <div className="flex gap-1 items-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditCourse