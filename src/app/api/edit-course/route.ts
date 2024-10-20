import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    const { title, duration, price ,courseId } = await request.json()
    console.log(title, duration, price ,courseId);
    
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session?.user.email || ""
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 404 })
        }

        await prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                duration, price, title
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