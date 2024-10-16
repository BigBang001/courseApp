import prisma from "@/lib/prisma";
import { courseValidation } from "@/validations/validation";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";

export async function POST(request: Request) {
    const { title, description, thumbnail, price, duration } = await request.json();
    const { success, error } = courseValidation.safeParse({ title, description, thumbnail, price, duration });
    const session = await getServerSession(authOptions);

    if (!success) {
        return NextResponse.json({
            success: false,
            message: "Validation Error",
            error: error.format()
        }, { status: 401 })
    }

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

        const course = await prisma.course.create({
            data: {
                title, description, price, duration, thumbnail, userId: user.id
            }
        })

        return NextResponse.json({
            success : true,
            message : "Course created Succesfully",
            course
        },{status : 201})


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while creating course",
            error
        }, { status: 500 })
    }
}