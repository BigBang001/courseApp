'use client'

import React, { useState } from "react"
import axios from "axios"
import { Loader2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function AddClass({ courseId }: { courseId: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState({
    title: "",
    courseId: courseId
  })
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check for video file type
      if (!selectedFile.type.startsWith('video/')) {
        setError('Please upload a valid video file.')
        setFile(null)
        return
      }

      // Check for file size (e.g., limit of 100 MB)
      const maxSize = 100 * 1024 * 1024 // 100 MB
      if (selectedFile.size > maxSize) {
        setError('File size must be less than 100MB.')
        setFile(null)
        return
      }

      setFile(selectedFile)
      setError(null) // Reset error if the file is valid
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError("Please upload a valid video file.")
      return
    }
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("courseId", values.courseId)
      formData.append("recordedClass", file)

      await axios.post('/api/add-class', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast({
        title: "Created!",
        description: `Class added successfully!`,
        variant: "default",
      })

      setIsOpen(false)
      router.refresh() // Refresh the page to show the new class
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Add Class</SheetTitle>
          <SheetDescription>
            Enter the details of your new class
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter the title of the class"
              value={values.title}
              onChange={(e) =>
                setValues({ ...values, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Video</Label>
            <Input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Class"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}