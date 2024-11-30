import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function POST(request: Request ,{params} : {params : {courseId : string}}) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "UnAuthorized",
        }, { status: 401 })
    }
    try {

        const user = await prisma.user.findFirst({
            where : {
                id : session.user.id,
                role : "admin"
            }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found || User not Instructor",
            }, { status: 404 })
        }

        const deleteCourse = await prisma.course.delete({
            where :{
                id : params.courseId
            }
        })

        return NextResponse.json({
            success: true,
            message: "Course deleted successfully",
            deleteCourse
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while deleting course",
            error
        }, { status: 500 })
    }
}