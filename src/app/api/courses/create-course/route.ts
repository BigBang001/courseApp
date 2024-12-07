import prisma from "@/lib/prisma";
import { CourseLevel, courseValidation } from "@/validations/validation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            }
        });


        if (!user || user.role != "INSTRUCTOR") {
            return NextResponse.json({
                success: false,
                message: "User not found || User not INSTRUCTOR",
            }, { status: 404 });
        }

        const formData = await request.formData();

        const file = formData.get("thumbnail") as File;
        if (!file || file.size === 0) {
            return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
        }


        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "course-thumbnails",
                    quality: "auto:best",
                    format: "jpg",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        if (!uploadResult || typeof uploadResult !== "object" || !("secure_url" in uploadResult)) {
            throw new Error("Invalid upload result");

        }

        const thumbnail = uploadResult.secure_url;


        const course = await prisma.course.create({
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                price: parseInt(formData.get("price") as string),
                duration: formData.get("duration") as string,
                level: formData.get("level") as CourseLevel,
                thumbnail: thumbnail as string,
                instructorId: user.id,
                shortDescription: formData.get("shortDescription") as string,
                tags: formData.get("tags") as string,
                language: formData.get("language") as string,
                category: formData.get("category") as string,
            }
        });

        return NextResponse.json({
            success: true,
            message: `Course created successfully with title ${course.title}`,
            course: {
                title: course.title,
            }
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while creating course",
            error: error.message
        }, { status: 500 });
    }
}
