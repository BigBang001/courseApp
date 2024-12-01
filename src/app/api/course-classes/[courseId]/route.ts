import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: Request, { params }: { params: { courseId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "unAuthorized",
        }, { status: 401 })
    }
    try {
                
        const classes = await prisma.recordedClass.findMany({
            where: {
                courseId : params.courseId
            },select : {
                id: true,
                title : true,
                videoUrl :  true,
                isCompleted: true
            },orderBy:{
                createdAt: "asc"
            }
        })
        
        return NextResponse.json({
            success: true,
            message: "Classes fetched succesfully",
            classes
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching Classes",
            error
        }, { status: 500 })
    }
}