import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { courseId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "unAuthorized",
        }, { status: 401 })
    }
    try {
                
        const course = await prisma.course.findUnique({
            where: {
                id: params.courseId
            }
        })
        

        return NextResponse.json({
            success: true,
            message: "Course fetched succesfully",
            course
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching course",
            error
        }, { status: 500 })
    }
}