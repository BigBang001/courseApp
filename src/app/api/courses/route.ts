import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
            success: false,
            message: "UnAuthorized",
        }, { status: 401 })
    }
    try {
        const courses = await prisma.course.findMany({
            orderBy: {
                createdAt: "desc",
            }, take: 10
        })
        return NextResponse.json({
            success: true,
            message: "Courses Fetched Succesfully",
            courses
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching courses",
            error
        })
    }
}