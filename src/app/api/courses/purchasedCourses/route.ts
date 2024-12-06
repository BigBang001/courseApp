import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "UnAuthorized"
        }, { status: 401 })
    }

    try {

        const student = await prisma.user.findUnique({
            where: {
                id: session.user.id
            }
        })

        if (!student || student.role != "USER") {
            return NextResponse.json({
                success: false,
                message: "User Not found"
            }, { status: 404 })

        }

        const purchasedCourses = await prisma.purchase.findMany({
            where: {
                studentId: student.id,
                status: "SUCCESS"
            }, select: {
                course: true
            }
        })

        return NextResponse.json({
            purchasedCourses
        }, { status: 200 })


    } catch (error) {
        console.error('Error during fetching purchasedCourses:', error);
        return NextResponse.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}