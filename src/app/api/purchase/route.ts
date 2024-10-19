import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/option";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "unAuthorized",
        }, { status: 401 })
    }
    try {

        const purchasedCourses = await prisma.purchasedCourses.findMany({
            where: {
                userId: session.user.id
            }, include: {
                course: true
            },
            orderBy: {
                createdAt: 'desc'
            }

        })

        return NextResponse.json({
            success: true,
            message: "Course fetched succesfully",
            purchasedCourses
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error while fetching course",
            error
        }, { status: 500 })
    }
}