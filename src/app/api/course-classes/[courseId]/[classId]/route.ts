import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request,{ params }: { params: {classId: string , courseId: string} }) {
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

        const { classId } = params;

        if (!classId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ClassId is required",
                },
                { status: 400 }
            );
        }

        // Delete the class from the database
        const deletedClass = await prisma.recordedClass.delete({
            where: { id: classId,courseId: params.courseId },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Class deleted successfully",
                deletedClass,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while deleting Class:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error while deleting class",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
