import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { courseId: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            }, { status: 401 });
        }

        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
                role: "user"
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        await prisma.savedCourses.delete({
            where: {
                courseId_userId: { courseId : params.courseId, userId: user.id }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Course deleted successfully",
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Server error during deleting course",
            error: error.message
        }, { status: 500 });
    }
}
