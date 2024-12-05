import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { courseId: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    try {
        const { courseId } = params;

        const course = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                instructor: {
                    select: {
                        fullName: true,
                        email: true,
                        bio: true,
                        image: true
                    }
                },
            }
        });

        if (!course) {
            return NextResponse.json({
                success: false,
                message: "Course not found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Course fetched successfully",
            course,
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching course:", error);

        return NextResponse.json({
            success: false,
            message: "Error while fetching course",
            error: error.message || error,
        }, { status: 500 });
    }
}
