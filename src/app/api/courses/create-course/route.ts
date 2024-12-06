import prisma from "@/lib/prisma";
import { courseValidation } from "@/validations/validation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    const { title, description, category , shortDescription, tags, thumbnail, price, duration, language, level } = await request.json();
    const { success, error } = courseValidation.safeParse({
        title,
        tags,
        level,
        shortDescription,
        description,
        thumbnail,
        price,
        duration,
        language,
        category,
    });
    if (!success) {
        return NextResponse.json({
            success: false,
            message: error.errors[0].message
        }, { status: 400 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            }
        });

        console.log(user);


        if (!user || user.role != "INSTRUCTOR") {
            return NextResponse.json({
                success: false,
                message: "User not found || User not INSTRUCTOR",
            }, { status: 404 });
        }

        const course = await prisma.course.create({
            data: {
                title,
                description,
                price,
                duration,
                level,
                thumbnail,
                instructorId: user.id,
                shortDescription,
                tags,
                language,
                category,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Course created successfully",
            course
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while creating course",
            error: error.message
        }, { status: 500 });
    }
}
