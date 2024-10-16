import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, courseId: string) {
    const session = await getServerSession(authOptions);
    const { duration, price } = await request.json()
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session?.user?.email || ""
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 404 })
        }

        const editCourse = await prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                duration, price
            }
        })

        return NextResponse.json({
            success: true,
            message: "Course edited succesfully",
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while editing course details",
            error
        }, { status: 500 })
    }
}