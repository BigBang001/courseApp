import { getServerSession } from "next-auth"
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/options"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Input validation schema
const inputSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(1, { message: "Title is required" }).max(30, { message: "Title is of maximum 30 characters" }),
})

export async function POST(request: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    // Check if user exists and is an admin
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, message: "User not authorized" }, { status: 403 })
    }

    // Parse and validate input
    const formData = await request.formData()
    const courseId = formData.get("courseId") as string
    const title = formData.get("title") as string

    try {
      inputSchema.parse({ courseId, title })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ success: false, message: "Invalid input", errors: error.errors }, { status: 400 })
      }
    }

    // Process file upload
    const file = formData.get("recordedClass") as File | null


    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "courses/recordedClasses", resource_type: "video" },
        (error, result) => {
          if (error) reject(error)
          else if (result) resolve(result)
          else reject(new Error('Upload failed'))
        }
      )
      uploadStream.end(buffer)
    })

    const classUrl = uploadResult.secure_url
    const classDuration = uploadResult.duration

    const recordedClass = await prisma.recordedClass.create({
      data: {
        title,
        userId: user.id,
        courseId,
        videoUrl: classUrl,
        duration: classDuration
      }
    })

    // Success response
    return NextResponse.json({
      success: true,
      message: "Class Created Successfully",
      data: { id: recordedClass.id, title: recordedClass.title, videoUrl: recordedClass.videoUrl, duration: recordedClass.duration }
    }, { status: 201 })

  } catch (error) {
    console.error("Error in add-class API:", error)
    return NextResponse.json({
      success: false,
      message: "Server Error while adding class",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}