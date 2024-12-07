import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request : Request,{ params: { courseId } }: { params: { courseId: string } }) {
    try {

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized access",
                },
                { status: 401 }
            );
        }

        if (!courseId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "CourseId is required",
                },
                { status: 400 }
            );
        }

        // Fetch classes from the database
        const classes = await prisma.recordedClass.findMany({
            where: { courseId },
            select: {
                id: true,
                title: true,
                videoUrl: true,
                duration: true,
                isCompleted: true,
                createdAt: true,
            },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Classes fetched successfully",
                classes,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while fetching Classes:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error while fetching classes",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}