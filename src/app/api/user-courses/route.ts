import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 400 })
    }
    try {

        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 401 })
        }

        const courses = await prisma.course.findMany({
            where: {
                userId: user.id
            }, orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json({
            success: true,
            message: "Courses Fetched Successfully",
            courses
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while Geting user Courses"
        }, { status: 500 })
    }
}